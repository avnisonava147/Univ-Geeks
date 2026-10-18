package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.QuestionRequest;
import com.univgeeks.model.Question;
import com.univgeeks.repository.QuestionRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private static final Logger log = LoggerFactory.getLogger(QuestionService.class);

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;
    private final Map<String, Question> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "questions_cache.json");

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<Question> cachedList = objectMapper.readValue(cacheFilePath.toFile(), new TypeReference<List<Question>>() {});
                for (Question q : cachedList) {
                    if (q.getId() != null) {
                        localCache.put(q.getId(), q);
                    }
                }
                log.info("Loaded {} questions from local persistent cache", localCache.size());
            }

            // Sync from MongoDB Atlas if available
            try {
                List<Question> dbList = questionRepository.findAllByOrderByCreatedAtDesc();
                if (!dbList.isEmpty()) {
                    for (Question q : dbList) {
                        if (q.getId() != null) {
                            localCache.put(q.getId(), q);
                        }
                    }
                    persistLocalCache();
                    log.info("Synchronized {} questions from MongoDB Atlas", dbList.size());
                } else if (!localCache.isEmpty()) {
                    // Seed MongoDB Atlas with existing cached entries if Atlas is empty
                    questionRepository.saveAll(localCache.values());
                }
            } catch (Exception ex) {
                log.warn("Could not query MongoDB for questions on startup (using cache fallback): {}", ex.getMessage());
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local Questions cache: {}", ex.getMessage());
        }
    }

    public synchronized Question createQuestion(QuestionRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Question request cannot be null");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getSubject() == null || request.getSubject().trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Message is required");
        }

        Question question = new Question();
        question.setName(request.getName().trim());
        question.setEmail(request.getEmail().trim().toLowerCase());
        question.setSubject(request.getSubject().trim());
        question.setMessage(request.getMessage().trim());
        question.setStatus("open");
        question.setCreatedAt(Instant.now());
        question.setUpdatedAt(Instant.now());

        try {
            Question saved = questionRepository.save(question);
            localCache.put(saved.getId(), saved);
            persistLocalCache();
            log.info("Successfully persisted question '{}' to MongoDB Atlas with ID: {}", saved.getSubject(), saved.getId());
            return saved;
        } catch (Exception ex) {
            log.error("Failed to save question to MongoDB Atlas, saving to local fallback cache: {}", ex.getMessage());
            if (question.getId() == null) {
                question.setId(UUID.randomUUID().toString());
            }
            localCache.put(question.getId(), question);
            persistLocalCache();
            return question;
        }
    }

    public List<Question> getAllQuestions(String search, String status, String subject) {
        List<Question> list;
        try {
            list = questionRepository.findAllByOrderByCreatedAtDesc();
            for (Question q : list) {
                if (q.getId() != null) {
                    localCache.put(q.getId(), q);
                }
            }
        } catch (Exception ex) {
            log.warn("Failed to fetch questions from MongoDB Atlas, using local cache: {}", ex.getMessage());
            list = new ArrayList<>(localCache.values());
            list.sort((a, b) -> {
                Instant tA = a.getCreatedAt() != null ? a.getCreatedAt() : Instant.EPOCH;
                Instant tB = b.getCreatedAt() != null ? b.getCreatedAt() : Instant.EPOCH;
                return tB.compareTo(tA);
            });
        }

        return list.stream()
                .filter(q -> {
                    if (search != null && !search.trim().isEmpty()) {
                        String s = search.trim().toLowerCase();
                        boolean nameMatch = q.getName() != null && q.getName().toLowerCase().contains(s);
                        boolean subjMatch = q.getSubject() != null && q.getSubject().toLowerCase().contains(s);
                        boolean msgMatch = q.getMessage() != null && q.getMessage().toLowerCase().contains(s);
                        boolean emailMatch = q.getEmail() != null && q.getEmail().toLowerCase().contains(s);
                        if (!nameMatch && !subjMatch && !msgMatch && !emailMatch) {
                            return false;
                        }
                    }
                    if (status != null && !status.trim().isEmpty() && !"all".equalsIgnoreCase(status.trim())) {
                        if (q.getStatus() == null || !q.getStatus().equalsIgnoreCase(status.trim())) {
                            return false;
                        }
                    }
                    if (subject != null && !subject.trim().isEmpty() && !"all".equalsIgnoreCase(subject.trim())) {
                        if (q.getSubject() == null || !q.getSubject().equalsIgnoreCase(subject.trim())) {
                            return false;
                        }
                    }
                    return true;
                })
                .collect(Collectors.toList());
    }

    public Question getQuestionById(String id) {
        try {
            Optional<Question> found = questionRepository.findById(id);
            if (found.isPresent()) {
                localCache.put(id, found.get());
                return found.get();
            }
        } catch (Exception ex) {
            log.warn("Failed to find question in MongoDB Atlas: {}", ex.getMessage());
        }

        Question cached = localCache.get(id);
        if (cached != null) {
            return cached;
        }

        throw new IllegalArgumentException("Question not found with ID: " + id);
    }

    public synchronized Question updateStatus(String id, String status) {
        Question question = getQuestionById(id);
        String normalizedStatus = (status != null && status.equalsIgnoreCase("resolved")) ? "resolved" : "open";
        question.setStatus(normalizedStatus);
        question.setUpdatedAt(Instant.now());

        try {
            Question saved = questionRepository.save(question);
            localCache.put(saved.getId(), saved);
            persistLocalCache();
            return saved;
        } catch (Exception ex) {
            log.warn("Failed to update status in MongoDB Atlas: {}", ex.getMessage());
            localCache.put(question.getId(), question);
            persistLocalCache();
            return question;
        }
    }

    public synchronized Question replyToQuestion(String id, String reply, String status) {
        Question question = getQuestionById(id);
        question.setReply(reply != null ? reply.trim() : null);
        question.setRepliedAt(Instant.now());
        String normalizedStatus = (status != null && !status.trim().isEmpty())
                ? (status.equalsIgnoreCase("open") ? "open" : "resolved")
                : "resolved";
        question.setStatus(normalizedStatus);
        question.setUpdatedAt(Instant.now());

        try {
            Question saved = questionRepository.save(question);
            localCache.put(saved.getId(), saved);
            persistLocalCache();
            return saved;
        } catch (Exception ex) {
            log.warn("Failed to save reply in MongoDB Atlas: {}", ex.getMessage());
            localCache.put(question.getId(), question);
            persistLocalCache();
            return question;
        }
    }

    public synchronized int bulkResolve(List<String> ids) {
        if (ids == null || ids.isEmpty()) {
            return 0;
        }
        int count = 0;
        List<Question> toSave = new ArrayList<>();
        for (String id : ids) {
            try {
                Question q = getQuestionById(id);
                q.setStatus("resolved");
                q.setUpdatedAt(Instant.now());
                toSave.add(q);
                localCache.put(id, q);
                count++;
            } catch (Exception ignored) {
            }
        }
        if (!toSave.isEmpty()) {
            try {
                questionRepository.saveAll(toSave);
            } catch (Exception ex) {
                log.warn("Failed to bulk resolve in MongoDB Atlas: {}", ex.getMessage());
            }
            persistLocalCache();
        }
        return count;
    }

    public synchronized void deleteQuestion(String id) {
        try {
            questionRepository.deleteById(id);
        } catch (Exception ex) {
            log.warn("Failed to delete question from MongoDB Atlas: {}", ex.getMessage());
        }
        localCache.remove(id);
        persistLocalCache();
    }

    private void persistLocalCache() {
        try {
            List<Question> list = new ArrayList<>(localCache.values());
            objectMapper.writeValue(cacheFilePath.toFile(), list);
        } catch (Exception ex) {
            log.warn("Failed to persist questions to local cache: {}", ex.getMessage());
        }
    }
}
