package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.PyqRequest;
import com.univgeeks.model.Pyq;
import com.univgeeks.repository.PyqRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class PyqService {

    private static final Logger log = LoggerFactory.getLogger(PyqService.class);

    private final PyqRepository pyqRepository;
    private final ImageKitService imageKitService;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;
    private final Map<String, Pyq> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "pyqs_cache.json");

    public PyqService(PyqRepository pyqRepository,
                      ImageKitService imageKitService,
                      FileStorageService fileStorageService) {
        this.pyqRepository = pyqRepository;
        this.imageKitService = imageKitService;
        this.fileStorageService = fileStorageService;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<Pyq> cachedList = objectMapper.readValue(cacheFilePath.toFile(), new TypeReference<List<Pyq>>() {});
                for (Pyq p : cachedList) {
                    if (p.getId() != null) {
                        localCache.put(p.getId(), p);
                    }
                }
                log.info("Loaded {} PYQs from local persistent cache", localCache.size());
            }

            // If cache is empty, seed with known existing uploaded papers in uploads directory
            if (localCache.isEmpty()) {
                seedInitialUploads();
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local PYQ cache: {}", ex.getMessage());
        }
    }

    private void seedInitialUploads() {
        try {
            Path uploadsDir = Paths.get("uploads");
            if (Files.exists(uploadsDir)) {
                File[] files = uploadsDir.toFile().listFiles((dir, name) -> name.toLowerCase().endsWith(".pdf"));
                if (files != null) {
                    for (File f : files) {
                        String fileName = f.getName();
                        Pyq p = new Pyq();
                        p.setId("pyq-" + UUID.randomUUID().toString().substring(0, 8));
                        p.setFileName(fileName);
                        p.setFileUrl("/api/files/" + fileName);
                        p.setFileSizeMb(Math.round((f.length() / (1024.0 * 1024.0)) * 10.0) / 10.0);
                        p.setPublished(true);
                        p.setDownloads(45);
                        p.setUploadedAt(Instant.now());
                        p.setUpdatedAt(Instant.now());

                        if (fileName.contains("Paper-5") || fileName.contains("Math")) {
                            p.setTitle("Class 12 Mathematics 2025 Board Paper");
                            p.setClassLevel("Class 12");
                            p.setSubject("Mathematics");
                            p.setExam("RBSE");
                            p.setYear("2025");
                        } else if (fileName.contains("Paper-4") || fileName.contains("Physics")) {
                            p.setTitle("Class 12 Physics 2025 Board Paper");
                            p.setClassLevel("Class 12");
                            p.setSubject("Physics");
                            p.setExam("RBSE");
                            p.setYear("2025");
                        } else if (fileName.contains("Paper-3") || fileName.contains("Chem")) {
                            p.setTitle("Class 12 Chemistry 2024 Question Paper");
                            p.setClassLevel("Class 12");
                            p.setSubject("Chemistry");
                            p.setExam("RBSE");
                            p.setYear("2024");
                        } else if (fileName.contains("DMDW")) {
                            p.setTitle("Class 12 Computer Science 2024 Final Paper");
                            p.setClassLevel("Class 12");
                            p.setSubject("Science");
                            p.setExam("CBSE");
                            p.setYear("2024");
                        } else {
                            p.setTitle("Class 10 Science 2025 Board Paper");
                            p.setClassLevel("Class 10");
                            p.setSubject("Science");
                            p.setExam("CBSE");
                            p.setYear("2025");
                        }

                        localCache.put(p.getId(), p);
                    }
                    persistCacheToFile();
                    log.info("Seeded {} uploaded papers into local PYQ cache", localCache.size());
                }
            }
        } catch (Exception e) {
            log.warn("Error seeding uploaded files: {}", e.getMessage());
        }
    }

    private synchronized void persistCacheToFile() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            objectMapper.writeValue(cacheFilePath.toFile(), new ArrayList<>(localCache.values()));
        } catch (Exception ex) {
            log.warn("Could not save PYQ cache file: {}", ex.getMessage());
        }
    }

    private boolean matchesClassLevel(String actual, String target) {
        if (actual == null || target == null) return false;
        if (actual.equalsIgnoreCase(target)) return true;
        String a = actual.replaceAll("[^0-9]", "");
        String t = target.replaceAll("[^0-9]", "");
        return !a.isEmpty() && a.equals(t);
    }

    public List<Pyq> getPublishedPyqs(String classLevel, String subject, String year) {
        try {
            List<Pyq> results;
            if (classLevel != null && !classLevel.isEmpty() && subject != null && !subject.isEmpty()) {
                if (year != null && !year.isEmpty()) {
                    results = pyqRepository.findByClassLevelAndSubjectIgnoreCaseAndYearAndPublishedTrue(classLevel, subject, year);
                } else {
                    results = pyqRepository.findByClassLevelAndSubjectIgnoreCaseAndPublishedTrue(classLevel, subject);
                }
            } else if (subject != null && !subject.isEmpty()) {
                results = pyqRepository.findBySubjectIgnoreCaseAndPublishedTrue(subject);
            } else if (classLevel != null && !classLevel.isEmpty()) {
                results = pyqRepository.findByClassLevelAndPublishedTrue(classLevel);
            } else {
                results = pyqRepository.findByPublishedTrueOrderByUploadedAtDesc();
            }

            if ((results == null || results.isEmpty()) && classLevel != null && !classLevel.isEmpty()) {
                List<Pyq> all = pyqRepository.findByPublishedTrueOrderByUploadedAtDesc();
                results = all.stream()
                        .filter(p -> matchesClassLevel(p.getClassLevel(), classLevel))
                        .filter(p -> subject == null || subject.isEmpty() || subject.equalsIgnoreCase(p.getSubject()))
                        .filter(p -> year == null || year.isEmpty() || year.equalsIgnoreCase(p.getYear()))
                        .collect(Collectors.toList());
            }

            return results != null ? results : Collections.emptyList();
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getPublishedPyqs, falling back to local store: {}", ex.getMessage());
            return localCache.values().stream()
                    .filter(Pyq::isPublished)
                    .filter(p -> classLevel == null || classLevel.isEmpty() || matchesClassLevel(p.getClassLevel(), classLevel))
                    .filter(p -> subject == null || subject.isEmpty() || subject.equalsIgnoreCase(p.getSubject()))
                    .filter(p -> year == null || year.isEmpty() || year.equalsIgnoreCase(p.getYear()))
                    .sorted((a, b) -> (b.getUploadedAt() != null && a.getUploadedAt() != null)
                            ? b.getUploadedAt().compareTo(a.getUploadedAt()) : 0)
                    .collect(Collectors.toList());
        }
    }

    public Optional<Pyq> getPublishedPyqById(String id) {
        try {
            return pyqRepository.findById(id).filter(Pyq::isPublished);
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getPublishedPyqById, checking local store: {}", ex.getMessage());
            return Optional.ofNullable(localCache.get(id)).filter(Pyq::isPublished);
        }
    }

    public List<Pyq> getAllPyqs() {
        try {
            List<Pyq> fromDb = pyqRepository.findAllByOrderByUploadedAtDesc();
            if (fromDb != null && !fromDb.isEmpty()) {
                for (Pyq p : fromDb) {
                    if (p.getId() != null) {
                        localCache.put(p.getId(), p);
                    }
                }
                persistCacheToFile();
                return fromDb;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getAllPyqs, using local store: {}", ex.getMessage());
        }

        return localCache.values().stream()
                .sorted((a, b) -> (b.getUploadedAt() != null && a.getUploadedAt() != null)
                        ? b.getUploadedAt().compareTo(a.getUploadedAt()) : 0)
                .collect(Collectors.toList());
    }

    public Optional<Pyq> getPyqById(String id) {
        try {
            return pyqRepository.findById(id);
        } catch (Exception ex) {
            return Optional.ofNullable(localCache.get(id));
        }
    }

    public Pyq createPyq(PyqRequest request) {
        Pyq pyq = new Pyq();
        pyq.setId("pyq-" + UUID.randomUUID().toString().substring(0, 8));
        pyq.setTitle(request.getTitle().trim());
        pyq.setClassLevel(request.getClassLevel().trim());
        pyq.setSubject(request.getSubject().trim());
        pyq.setExam(request.getExam().trim());
        pyq.setYear(request.getYear().trim());
        pyq.setChapter(request.getChapter() != null ? request.getChapter().trim() : null);
        pyq.setMedium(request.getMedium() != null && !request.getMedium().trim().isEmpty() ? request.getMedium().trim() : null);
        pyq.setFileUrl(request.getFileUrl() != null ? request.getFileUrl().trim() : null);
        pyq.setFileName(request.getFileName() != null ? request.getFileName().trim() : null);
        pyq.setImageKitFileId(request.getImageKitFileId() != null ? request.getImageKitFileId().trim() : null);
        pyq.setFileSizeMb(request.getFileSizeMb() > 0 ? request.getFileSizeMb() : 1.0);
        pyq.setPublished(request.isPublished());
        pyq.setDownloads(0);
        pyq.setUploadedAt(Instant.now());
        pyq.setUpdatedAt(Instant.now());

        // Always register in local store first
        localCache.put(pyq.getId(), pyq);
        persistCacheToFile();

        // Then attempt MongoDB Atlas persistence
        try {
            Pyq saved = pyqRepository.save(pyq);
            if (saved != null) {
                localCache.remove(pyq.getId());
                localCache.put(saved.getId(), saved);
                persistCacheToFile();
                return saved;
            }
        } catch (Exception ex) {
            log.warn("MongoDB Atlas unavailable during PYQ save ({}), safely persisted in local cache: {}",
                    ex.getMessage(), pyq.getTitle());
        }

        return pyq;
    }

    public Pyq updatePyq(String id, PyqRequest request) {
        Pyq pyq = localCache.get(id);

        try {
            Optional<Pyq> opt = pyqRepository.findById(id);
            if (opt.isPresent()) {
                pyq = opt.get();
            }
        } catch (Exception ignored) {}

        if (pyq == null) {
            throw new IllegalArgumentException("PYQ not found with id: " + id);
        }

        pyq.setTitle(request.getTitle().trim());
        pyq.setClassLevel(request.getClassLevel().trim());
        pyq.setSubject(request.getSubject().trim());
        pyq.setExam(request.getExam().trim());
        pyq.setYear(request.getYear().trim());
        pyq.setChapter(request.getChapter() != null ? request.getChapter().trim() : null);
        if (request.getMedium() != null) {
            pyq.setMedium(request.getMedium().trim().isEmpty() ? null : request.getMedium().trim());
        }
        if (request.getFileUrl() != null && !request.getFileUrl().isEmpty()) {
            pyq.setFileUrl(request.getFileUrl().trim());
        }
        if (request.getFileName() != null && !request.getFileName().isEmpty()) {
            pyq.setFileName(request.getFileName().trim());
        }
        if (request.getImageKitFileId() != null && !request.getImageKitFileId().isEmpty()) {
            pyq.setImageKitFileId(request.getImageKitFileId().trim());
        }
        if (request.getFileSizeMb() > 0) {
            pyq.setFileSizeMb(request.getFileSizeMb());
        }
        pyq.setPublished(request.isPublished());
        pyq.setUpdatedAt(Instant.now());

        localCache.put(id, pyq);
        persistCacheToFile();

        try {
            return pyqRepository.save(pyq);
        } catch (Exception ex) {
            log.warn("MongoDB unavailable during update, updated local cache: {}", ex.getMessage());
            return pyq;
        }
    }

    public boolean deletePyq(String id) {
        Pyq pyq = localCache.get(id);
        if (pyq == null) {
            try {
                pyq = pyqRepository.findById(id).orElse(null);
            } catch (Exception ignored) {}
        }

        if (pyq != null) {
            // Delete remote ImageKit file if present
            if (pyq.getImageKitFileId() != null && !pyq.getImageKitFileId().trim().isEmpty()) {
                try {
                    imageKitService.deleteFile(pyq.getImageKitFileId().trim());
                } catch (Exception e) {
                    log.warn("Could not delete ImageKit file for PYQ {}: {}", id, e.getMessage());
                }
            } else if (pyq.getFileUrl() != null && pyq.getFileUrl().startsWith("/api/files/")) {
                // Delete legacy local disk file if present
                String fileName = pyq.getFileUrl().substring("/api/files/".length());
                fileStorageService.deleteFileIfExists(fileName);
            }
        }

        boolean removed = localCache.remove(id) != null;
        persistCacheToFile();

        try {
            if (pyqRepository.existsById(id)) {
                pyqRepository.deleteById(id);
                return true;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable during delete: {}", ex.getMessage());
        }

        return removed;
    }

    public Optional<Pyq> findByFileName(String fileName) {
        if (fileName == null || fileName.isBlank()) return Optional.empty();
        String decoded = fileName.trim();
        try {
            decoded = java.net.URLDecoder.decode(fileName, java.nio.charset.StandardCharsets.UTF_8).trim();
        } catch (Exception ignored) {}

        final String searchName = decoded.toLowerCase();
        final String searchClean = searchName.replaceAll("[^a-zA-Z0-9.-]", "_");

        return getAllPyqs().stream()
                .filter(p -> {
                    if (p.getFileName() != null) {
                        String fn = p.getFileName().trim().toLowerCase();
                        String fnClean = fn.replaceAll("[^a-zA-Z0-9.-]", "_");
                        if (fn.equals(searchName) || fn.endsWith("_" + searchName)
                                || fnClean.equals(searchClean) || fnClean.endsWith("_" + searchClean)) {
                            return true;
                        }
                    }
                    if (p.getFileUrl() != null) {
                        String url = p.getFileUrl().trim().toLowerCase();
                        String urlClean = url.replaceAll("[^a-zA-Z0-9.-]", "_");
                        if (url.endsWith("/" + searchName) || url.endsWith("/" + searchClean)
                                || urlClean.endsWith("/" + searchClean) || url.equals(searchName) || urlClean.equals(searchClean)) {
                            return true;
                        }
                    }
                    return false;
                })
                .findFirst();
    }

    public Pyq togglePublish(String id) {
        Pyq pyq = localCache.get(id);
        try {
            Optional<Pyq> opt = pyqRepository.findById(id);
            if (opt.isPresent()) pyq = opt.get();
        } catch (Exception ignored) {}

        if (pyq == null) {
            throw new IllegalArgumentException("PYQ not found with id: " + id);
        }

        pyq.setPublished(!pyq.isPublished());
        pyq.setUpdatedAt(Instant.now());
        localCache.put(id, pyq);
        persistCacheToFile();

        try {
            return pyqRepository.save(pyq);
        } catch (Exception ex) {
            return pyq;
        }
    }

    public void incrementDownloads(String id) {
        Pyq pyq = localCache.get(id);
        if (pyq != null) {
            pyq.setDownloads(pyq.getDownloads() + 1);
            persistCacheToFile();
        }

        try {
            pyqRepository.findById(id).ifPresent(p -> {
                p.setDownloads(p.getDownloads() + 1);
                pyqRepository.save(p);
            });
        } catch (Exception ignored) {}
    }
}
