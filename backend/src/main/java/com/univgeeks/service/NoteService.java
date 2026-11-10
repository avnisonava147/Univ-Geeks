package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.NoteRequest;
import com.univgeeks.model.Note;
import com.univgeeks.repository.NoteRepository;
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
public class NoteService {

    private static final Logger log = LoggerFactory.getLogger(NoteService.class);

    private final NoteRepository noteRepository;
    private final ImageKitService imageKitService;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;
    private final Map<String, Note> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "notes_cache.json");

    public NoteService(NoteRepository noteRepository,
                       ImageKitService imageKitService,
                       FileStorageService fileStorageService) {
        this.noteRepository = noteRepository;
        this.imageKitService = imageKitService;
        this.fileStorageService = fileStorageService;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<Note> cachedList = objectMapper.readValue(cacheFilePath.toFile(), new TypeReference<List<Note>>() {});
                for (Note n : cachedList) {
                    if (n.getId() != null) {
                        localCache.put(n.getId(), n);
                    }
                }
                log.info("Loaded {} notes from local persistent cache", localCache.size());
            }

            // Bidirectional sync with MongoDB Atlas: load from DB first to preserve production truth
            try {
                List<Note> dbList = noteRepository.findAllByOrderByUpdatedAtDesc();
                if (dbList != null && !dbList.isEmpty()) {
                    for (Note n : dbList) {
                        if (n.getId() != null) {
                            normalizeNote(n);
                            localCache.put(n.getId(), n);
                        }
                    }
                    log.info("Synchronized {} notes from MongoDB Atlas", dbList.size());
                }

                // If local cache contains notes not yet in Atlas (e.g. uploaded during offline window), persist them safely
                if (!localCache.isEmpty()) {
                    int syncedToDb = 0;
                    for (Note n : localCache.values()) {
                        if (n.getId() != null && !noteRepository.existsById(n.getId())) {
                            try {
                                normalizeNote(n);
                                noteRepository.save(n);
                                syncedToDb++;
                            } catch (Exception ex) {
                                log.warn("Could not sync cached note '{}' to MongoDB: {}", n.getTitle(), ex.getMessage());
                            }
                        }
                    }
                    if (syncedToDb > 0) {
                        log.info("Persisted {} previously uncommitted notes from cache into MongoDB Atlas", syncedToDb);
                    }
                    correctAllCachedStreams();
                    persistCacheToFile();
                } else {
                    seedInitialNotes();
                }
            } catch (Exception ex) {
                log.warn("Could not query MongoDB for notes on startup (using cache fallback): {}", ex.getMessage());
                if (localCache.isEmpty()) {
                    seedInitialNotes();
                } else {
                    correctAllCachedStreams();
                }
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local Notes cache: {}", ex.getMessage());
        }
    }

    public String deriveStream(String subject, String classLevel, String requestedStream) {
        if ("10".equals(classLevel)) {
            return "Common";
        }
        if (subject == null) {
            return (requestedStream != null && !requestedStream.isBlank()) ? requestedStream : "Science";
        }
        String s = subject.trim().toLowerCase();
        if (s.equals("physics") || s.equals("chemistry") || s.equals("mathematics") || s.equals("biology")) {
            return "Science";
        }
        if (s.equals("accountancy") || s.equals("business studies") || s.equals("economics")) {
            return "Commerce";
        }
        if (s.equals("history") || s.equals("political science") || s.equals("geography") || s.equals("sociology")) {
            return "Arts";
        }
        if (requestedStream != null && !requestedStream.isBlank() && !"Common".equalsIgnoreCase(requestedStream)) {
            return requestedStream;
        }
        return "Science";
    }

    public boolean normalizeNote(Note n) {
        if (n == null) return false;
        boolean changed = false;
        String derived = deriveStream(n.getSubject(), n.getClassLevel(), n.getStream());
        if (derived != null && !derived.equalsIgnoreCase(n.getStream())) {
            log.info("Correcting note '{}' ({}, class {}) stream from '{}' to '{}'",
                    n.getTitle(), n.getSubject(), n.getClassLevel(), n.getStream(), derived);
            n.setStream(derived);
            changed = true;
        }
        if (n.getPdfUrl() != null && !n.getPdfUrl().isBlank()
                && !n.getPdfUrl().startsWith("http") && !n.getPdfUrl().startsWith("/")) {
            log.info("Normalizing note '{}' pdfUrl from '{}' to '/api/files/{}'",
                    n.getTitle(), n.getPdfUrl(), n.getPdfUrl().trim());
            n.setPdfUrl("/api/files/" + n.getPdfUrl().trim());
            changed = true;
        }
        return changed;
    }

    private synchronized void correctAllCachedStreams() {
        boolean modified = false;
        for (Note n : localCache.values()) {
            if (normalizeNote(n)) {
                modified = true;
                try {
                    noteRepository.save(n);
                } catch (Exception ignored) {}
            }
        }
        if (modified) {
            persistCacheToFile();
        }
    }

    private void seedInitialNotes() {
        addSeedNote("n1", "Real Numbers", "Mathematics", "10", "Common", 1, 24, 1.8, 1240, "published", "/pdfs/class-10/mathematics/1.pdf");
        addSeedNote("n2", "Polynomials", "Mathematics", "10", "Common", 2, 18, 1.2, 0, "draft", "/pdfs/class-10/mathematics/2.pdf");
        addSeedNote("n3", "Chemical Reactions and Equations", "Science", "10", "Common", 1, 30, 2.6, 980, "published", "/pdfs/class-10/science/1.pdf");
        addSeedNote("n4", "Electricity", "Science", "10", "Common", 11, 34, 3.1, 1523, "published", "/pdfs/class-10/science/11.pdf");
        addSeedNote("n5", "Electric Charges and Fields", "Physics", "12", "Science", 1, 28, 2.2, 864, "published", "/pdfs/class-12/science/physics/1.pdf");
        addSeedNote("n6", "Electrostatic Potential and Capacitance", "Physics", "12", "Science", 2, 32, 2.9, 0, "draft", "/pdfs/class-12/science/physics/2.pdf");
        addSeedNote("n7", "Some Basic Concepts of Chemistry", "Chemistry", "11", "Science", 1, 22, 1.9, 712, "published", "/pdfs/class-11/science/chemistry/1.pdf");
        addSeedNote("n8", "Trigonometric Functions", "Mathematics", "11", "Science", 3, 26, 2.0, 590, "published", "/pdfs/class-11/science/maths/3.pdf");
        persistCacheToFile();
    }

    private void addSeedNote(String id, String title, String subject, String classLevel, String stream,
                             int chapterNo, int pages, double sizeMb, int downloads, String status, String pdfUrl) {
        Note n = new Note();
        n.setId(id);
        n.setTitle(title);
        n.setSubject(subject);
        n.setClassLevel(classLevel);
        n.setStream(stream);
        n.setChapterNo(chapterNo);
        n.setPages(pages);
        n.setSizeMb(sizeMb);
        n.setDownloads(downloads);
        n.setStatus(status);
        n.setPdfUrl(pdfUrl);
        n.setUploadedBy("Admin");
        n.setUpdatedAt(Instant.now());
        n.setCreatedAt(Instant.now());
        localCache.put(id, n);
    }

    private synchronized void persistCacheToFile() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            objectMapper.writeValue(cacheFilePath.toFile(), new ArrayList<>(localCache.values()));
        } catch (Exception ex) {
            log.warn("Could not save Notes cache file: {}", ex.getMessage());
        }
    }

    public List<Note> getPublishedNotes(String classLevel, String stream, String subject) {
        List<Note> results;
        try {
            if (classLevel != null && !classLevel.isEmpty() && stream != null && !stream.isEmpty() && subject != null && !subject.isEmpty()) {
                results = noteRepository.findByClassLevelAndStreamIgnoreCaseAndSubjectIgnoreCaseAndStatusIgnoreCase(classLevel, stream, subject, "published");
            } else if (classLevel != null && !classLevel.isEmpty() && stream != null && !stream.isEmpty()) {
                results = noteRepository.findByClassLevelAndStreamIgnoreCaseAndStatusIgnoreCase(classLevel, stream, "published");
            } else if (classLevel != null && !classLevel.isEmpty()) {
                results = noteRepository.findByClassLevelAndStatusIgnoreCase(classLevel, "published");
            } else if (subject != null && !subject.isEmpty()) {
                results = noteRepository.findBySubjectIgnoreCaseAndStatusIgnoreCase(subject, "published");
            } else {
                results = noteRepository.findByStatusIgnoreCase("published");
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getPublishedNotes, using local cache: {}", ex.getMessage());
            results = localCache.values().stream()
                    .filter(n -> "published".equalsIgnoreCase(n.getStatus()))
                    .filter(n -> classLevel == null || classLevel.isEmpty() || classLevel.equalsIgnoreCase(n.getClassLevel()))
                    .filter(n -> stream == null || stream.isEmpty() || stream.equalsIgnoreCase(n.getStream()))
                    .filter(n -> subject == null || subject.isEmpty() || subject.equalsIgnoreCase(n.getSubject()))
                    .sorted((a, b) -> (b.getUpdatedAt() != null && a.getUpdatedAt() != null)
                            ? b.getUpdatedAt().compareTo(a.getUpdatedAt()) : 0)
                    .collect(Collectors.toList());
        }

        for (Note n : results) {
            normalizeNote(n);
        }
        return results;
    }

    public Optional<Note> getPublishedNoteById(String id) {
        Optional<Note> opt;
        try {
            opt = noteRepository.findById(id).filter(n -> "published".equalsIgnoreCase(n.getStatus()));
        } catch (Exception ex) {
            opt = Optional.ofNullable(localCache.get(id)).filter(n -> "published".equalsIgnoreCase(n.getStatus()));
        }
        opt.ifPresent(this::normalizeNote);
        return opt;
    }

    public List<Note> getAllNotes() {
        try {
            List<Note> fromDb = noteRepository.findAllByOrderByUpdatedAtDesc();
            if (fromDb != null && !fromDb.isEmpty()) {
                boolean modified = false;
                for (Note n : fromDb) {
                    if (normalizeNote(n)) {
                        modified = true;
                        try {
                            noteRepository.save(n);
                        } catch (Exception ignored) {}
                    }
                    if (n.getId() != null) {
                        localCache.put(n.getId(), n);
                    }
                }
                if (modified) {
                    persistCacheToFile();
                }
                return fromDb;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getAllNotes, using local cache: {}", ex.getMessage());
        }

        correctAllCachedStreams();
        return localCache.values().stream()
                .sorted((a, b) -> (b.getUpdatedAt() != null && a.getUpdatedAt() != null)
                        ? b.getUpdatedAt().compareTo(a.getUpdatedAt()) : 0)
                .collect(Collectors.toList());
    }

    public Optional<Note> getNoteById(String id) {
        try {
            return noteRepository.findById(id);
        } catch (Exception ex) {
            return Optional.ofNullable(localCache.get(id));
        }
    }

    public Note createNote(NoteRequest request) {
        Note note = new Note();
        note.setId("note-" + UUID.randomUUID().toString().substring(0, 8));
        note.setTitle(request.getTitle().trim());
        note.setSubject(request.getSubject().trim());
        note.setClassLevel(request.getClassLevel().trim());
        note.setStream(deriveStream(note.getSubject(), note.getClassLevel(), request.getStream()));
        note.setChapterNo(request.getChapterNo());
        note.setPages(request.getPages() > 0 ? request.getPages() : 1);
        note.setSizeMb(request.getSizeMb() > 0 ? request.getSizeMb() : 1.0);
        note.setStatus(request.getStatus() != null && !request.getStatus().trim().isEmpty() ? request.getStatus().trim().toLowerCase() : "published");
        note.setUploadedBy(request.getUploadedBy() != null ? request.getUploadedBy().trim() : "Admin");
        String rawPdf = request.getPdfUrl() != null ? request.getPdfUrl().trim() : null;
        if (rawPdf != null && !rawPdf.isEmpty() && !rawPdf.startsWith("http") && !rawPdf.startsWith("/")) {
            rawPdf = "/api/files/" + rawPdf;
        }
        note.setPdfUrl(rawPdf);
        note.setFileName(request.getFileName() != null ? request.getFileName().trim() : null);
        note.setImageKitFileId(request.getImageKitFileId() != null ? request.getImageKitFileId().trim() : null);
        note.setDownloads(0);
        note.setCreatedAt(Instant.now());
        note.setUpdatedAt(Instant.now());

        localCache.put(note.getId(), note);
        persistCacheToFile();

        try {
            Note saved = noteRepository.save(note);
            if (saved != null) {
                localCache.remove(note.getId());
                localCache.put(saved.getId(), saved);
                persistCacheToFile();
                return saved;
            }
        } catch (Exception ex) {
            log.warn("MongoDB Atlas unavailable during note save ({}), saved locally: {}", ex.getMessage(), note.getTitle());
        }

        return note;
    }

    public Note updateNote(String id, NoteRequest request) {
        Note note = localCache.get(id);
        try {
            Optional<Note> opt = noteRepository.findById(id);
            if (opt.isPresent()) note = opt.get();
        } catch (Exception ignored) {}

        if (note == null) {
            throw new IllegalArgumentException("Note not found with id: " + id);
        }

        note.setTitle(request.getTitle().trim());
        note.setSubject(request.getSubject().trim());
        note.setClassLevel(request.getClassLevel().trim());
        note.setStream(deriveStream(note.getSubject(), note.getClassLevel(), request.getStream()));
        note.setChapterNo(request.getChapterNo());
        if (request.getPages() > 0) note.setPages(request.getPages());
        if (request.getSizeMb() > 0) note.setSizeMb(request.getSizeMb());
        if (request.getStatus() != null) note.setStatus(request.getStatus().trim().toLowerCase());
        if (request.getPdfUrl() != null) {
            String rawPdf = request.getPdfUrl().trim();
            if (!rawPdf.isEmpty() && !rawPdf.startsWith("http") && !rawPdf.startsWith("/")) {
                rawPdf = "/api/files/" + rawPdf;
            }
            note.setPdfUrl(rawPdf);
        }
        if (request.getFileName() != null) note.setFileName(request.getFileName().trim());
        if (request.getImageKitFileId() != null) note.setImageKitFileId(request.getImageKitFileId().trim());
        note.setUpdatedAt(Instant.now());

        localCache.put(id, note);
        persistCacheToFile();

        try {
            return noteRepository.save(note);
        } catch (Exception ex) {
            return note;
        }
    }

    public boolean deleteNote(String id) {
        Note note = localCache.get(id);
        if (note == null) {
            try {
                note = noteRepository.findById(id).orElse(null);
            } catch (Exception ignored) {}
        }

        if (note != null) {
            if (note.getImageKitFileId() != null && !note.getImageKitFileId().trim().isEmpty()) {
                try {
                    imageKitService.deleteFile(note.getImageKitFileId().trim());
                } catch (Exception e) {
                    log.warn("Could not delete ImageKit file for Note {}: {}", id, e.getMessage());
                }
            } else if (note.getPdfUrl() != null && note.getPdfUrl().startsWith("/api/files/")) {
                String fileName = note.getPdfUrl().substring("/api/files/".length());
                fileStorageService.deleteFileIfExists(fileName);
            }
        }

        boolean removed = localCache.remove(id) != null;
        persistCacheToFile();

        try {
            if (noteRepository.existsById(id)) {
                noteRepository.deleteById(id);
                return true;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable during note delete: {}", ex.getMessage());
        }

        return removed;
    }

    public Note toggleStatus(String id) {
        Note note = localCache.get(id);
        try {
            Optional<Note> opt = noteRepository.findById(id);
            if (opt.isPresent()) note = opt.get();
        } catch (Exception ignored) {}

        if (note == null) {
            throw new IllegalArgumentException("Note not found with id: " + id);
        }

        String currentStatus = note.getStatus() != null ? note.getStatus().toLowerCase() : "draft";
        note.setStatus("published".equals(currentStatus) ? "draft" : "published");
        note.setUpdatedAt(Instant.now());

        localCache.put(id, note);
        persistCacheToFile();

        try {
            return noteRepository.save(note);
        } catch (Exception ex) {
            return note;
        }
    }

    public void incrementDownloads(String id) {
        Note note = localCache.get(id);
        if (note != null) {
            note.setDownloads(note.getDownloads() + 1);
            persistCacheToFile();
        }

        try {
            noteRepository.findById(id).ifPresent(n -> {
                n.setDownloads(n.getDownloads() + 1);
                noteRepository.save(n);
            });
        } catch (Exception ignored) {}
    }

    public Optional<Note> findByFileName(String fileName) {
        if (fileName == null || fileName.isBlank()) return Optional.empty();
        String decoded = fileName.trim();
        try {
            decoded = java.net.URLDecoder.decode(fileName, java.nio.charset.StandardCharsets.UTF_8).trim();
        } catch (Exception ignored) {}

        final String searchName = decoded.toLowerCase();
        final String searchClean = searchName.replaceAll("[^a-zA-Z0-9.-]", "_");

        return getAllNotes().stream()
                .filter(n -> matchesNoteFileNameOrUrl(n, searchName, searchClean))
                .findFirst();
    }

    private boolean matchesNoteFileNameOrUrl(Note n, String searchName, String searchClean) {
        if (n == null) return false;
        if (n.getFileName() != null) {
            String fn = n.getFileName().trim().toLowerCase();
            String fnClean = fn.replaceAll("[^a-zA-Z0-9.-]", "_");
            if (fn.equals(searchName) || fn.endsWith("_" + searchName)
                    || fnClean.equals(searchClean) || fnClean.endsWith("_" + searchClean)) {
                return true;
            }
        }
        if (n.getPdfUrl() != null) {
            String url = n.getPdfUrl().trim().toLowerCase();
            String urlClean = url.replaceAll("[^a-zA-Z0-9.-]", "_");
            if (url.endsWith("/" + searchName) || url.endsWith("/" + searchClean)
                    || urlClean.endsWith("/" + searchClean) || url.equals(searchName) || urlClean.equals(searchClean)) {
                return true;
            }
        }
        return false;
    }
}
