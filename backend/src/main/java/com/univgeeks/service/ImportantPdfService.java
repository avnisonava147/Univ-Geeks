package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.FileUploadResponse;
import com.univgeeks.dto.ImportantPdfRequest;
import com.univgeeks.model.ImportantPdf;
import com.univgeeks.repository.ImportantPdfRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class ImportantPdfService {

    private static final Logger log = LoggerFactory.getLogger(ImportantPdfService.class);

    private final ImportantPdfRepository repository;
    private final ImageKitService imageKitService;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;
    private final Map<String, ImportantPdf> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "important_pdfs_cache.json");

    private volatile boolean mongoAvailable = true;
    private volatile long lastMongoFailure = 0;

    public ImportantPdfService(ImportantPdfRepository repository,
                               ImageKitService imageKitService,
                               FileStorageService fileStorageService) {
        this.repository = repository;
        this.imageKitService = imageKitService;
        this.fileStorageService = fileStorageService;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    private boolean shouldAttemptMongo() {
        if (!mongoAvailable && (System.currentTimeMillis() - lastMongoFailure < 300_000)) {
            return false;
        }
        return true;
    }

    private void recordMongoFailure(Exception ex, String operation) {
        mongoAvailable = false;
        lastMongoFailure = System.currentTimeMillis();
        log.warn("MongoDB unavailable in {}, using local cache: {}", operation, ex.getMessage());
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<ImportantPdf> cachedList = objectMapper.readValue(
                        cacheFilePath.toFile(),
                        new TypeReference<List<ImportantPdf>>() {}
                );
                for (ImportantPdf p : cachedList) {
                    if (p.getId() != null) {
                        localCache.put(p.getId(), p);
                    }
                }
                log.info("Loaded {} important PDFs from local persistent cache", localCache.size());
            }

            // Sync with MongoDB Atlas
            try {
                List<ImportantPdf> dbList = repository.findAllByOrderByDateDesc();
                if (dbList != null && !dbList.isEmpty()) {
                    for (ImportantPdf p : dbList) {
                        if (p.getId() != null) {
                            localCache.put(p.getId(), p);
                        }
                    }
                    log.info("Synchronized {} important PDFs from MongoDB Atlas", dbList.size());
                }

                if (!localCache.isEmpty()) {
                    int syncedToDb = 0;
                    for (ImportantPdf p : localCache.values()) {
                        if (p.getId() != null && !repository.existsById(p.getId())) {
                            try {
                                repository.save(p);
                                syncedToDb++;
                            } catch (Exception ex) {
                                log.warn("Could not sync cached important PDF '{}' to MongoDB: {}", p.getTitle(), ex.getMessage());
                            }
                        }
                    }
                    if (syncedToDb > 0) {
                        log.info("Persisted {} cached important PDFs into MongoDB Atlas", syncedToDb);
                    }
                    persistCacheToFile();
                } else {
                    seedInitialPdfs();
                }
            } catch (Exception ex) {
                log.warn("Could not query MongoDB for important PDFs on startup (using cache fallback): {}", ex.getMessage());
                if (localCache.isEmpty()) {
                    seedInitialPdfs();
                }
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local important PDFs cache: {}", ex.getMessage());
        }
    }

    private void seedInitialPdfs() {
        addSeedPdf("ip1", "Advisory for Students regarding Aadhaar Data Updates and Biometric Authentication.", "2026-11-17", "288.26 KB", "/pdfs/advisory-aadhaar.pdf", true);
        addSeedPdf("ip2", "RBSE Class 12 Science Board Exam 2026 — Revised Date Sheet & Important Instructions", "2026-11-17", "2.26 MB", "/pdfs/revised-datesheet-2026.pdf", true);
        addSeedPdf("ip3", "Combined Higher Secondary (10+2) Level Examination, 2025 (Tier-II): Uploading of Final Answer Key(s) along with Response Sheet(s) and Marks", "2026-11-17", "230.92 KB", "/pdfs/answer-key-2025.pdf", true);
        addSeedPdf("ip4", "Important Notice: Changes in Syllabus for Class 12 Physics & Chemistry — RBSE 2026-27 Session", "2026-11-16", "282.53 KB", "/pdfs/syllabus-changes.pdf", true);
        addSeedPdf("ip5", "Information regarding Exam Center allocation and Admit Card download for Class 12 Board Examination, 2026", "2026-11-13", "320.80 KB", "/pdfs/exam-center-info.pdf", false);
        addSeedPdf("ip6", "Identity Verification (IV) for the candidates shortlisted in RBSE Merit List of Class 10 Toppers, 2025 - reg.", "2026-11-07", "315.38 KB", "/pdfs/identity-verification.pdf", false);
        addSeedPdf("ip7", "RBSE Class 10 & 12 Board Exam 2026 — Model Papers Released for All Subjects", "2026-10-28", "1.45 MB", "/pdfs/model-papers-2026.pdf", false);
        addSeedPdf("ip8", "Scholarship Application Form for Meritorious Students — Last Date 15 Nov 2026", "2026-10-20", "512.00 KB", "/pdfs/scholarship-form.pdf", false);
        persistCacheToFile();
    }

    private void addSeedPdf(String id, String title, String date, String fileSize, String pdfUrl, boolean isNew) {
        ImportantPdf p = new ImportantPdf(id, title, date, fileSize, pdfUrl, isNew);
        p.setFileName(pdfUrl.startsWith("/pdfs/") ? pdfUrl.substring("/pdfs/".length()) : "document.pdf");
        localCache.put(id, p);
    }

    private void persistCacheAsync() {
        java.util.concurrent.CompletableFuture.runAsync(this::persistCacheToFile);
    }

    private synchronized void persistCacheToFile() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            objectMapper.writeValue(cacheFilePath.toFile(), new ArrayList<>(localCache.values()));
        } catch (Exception ex) {
            log.warn("Could not save Important PDFs cache file: {}", ex.getMessage());
        }
    }

    public List<ImportantPdf> getAllPdfs() {
        List<ImportantPdf> results = null;
        if (shouldAttemptMongo()) {
            try {
                results = repository.findAllByOrderByDateDesc();
            } catch (Exception ex) {
                recordMongoFailure(ex, "getAllPdfs");
            }
        }

        if (results == null || results.isEmpty()) {
            results = new ArrayList<>(localCache.values());
        }

        return results.stream()
                .sorted((a, b) -> {
                    String d1 = a.getDate() != null ? a.getDate() : "";
                    String d2 = b.getDate() != null ? b.getDate() : "";
                    int cmp = d2.compareTo(d1);
                    if (cmp != 0) return cmp;
                    Instant u1 = a.getUpdatedAt() != null ? a.getUpdatedAt() : Instant.EPOCH;
                    Instant u2 = b.getUpdatedAt() != null ? b.getUpdatedAt() : Instant.EPOCH;
                    return u2.compareTo(u1);
                })
                .collect(Collectors.toList());
    }

    public Optional<ImportantPdf> getPdfById(String id) {
        if (shouldAttemptMongo()) {
            try {
                Optional<ImportantPdf> opt = repository.findById(id);
                if (opt.isPresent()) return opt;
            } catch (Exception ex) {
                recordMongoFailure(ex, "getPdfById");
            }
        }
        return Optional.ofNullable(localCache.get(id));
    }

    public ImportantPdf createPdf(ImportantPdfRequest request) {
        ImportantPdf pdf = new ImportantPdf();
        pdf.setId(UUID.randomUUID().toString());
        pdf.setTitle(request.getTitle() != null ? request.getTitle().trim() : "Untitled Notice");
        pdf.setDate(request.getDate() != null && !request.getDate().trim().isEmpty() ? request.getDate().trim() : LocalDate.now().toString());
        pdf.setPdfUrl(request.getPdfUrl() != null ? request.getPdfUrl().trim() : "");
        pdf.setFileName(request.getFileName() != null ? request.getFileName().trim() : "");
        pdf.setFileSize(request.getFileSize() != null && !request.getFileSize().trim().isEmpty() ? request.getFileSize().trim() : "1.00 MB");
        pdf.setImageKitFileId(request.getImageKitFileId() != null ? request.getImageKitFileId().trim() : null);
        pdf.setIsNew(request.getIsNew() != null ? request.getIsNew() : true);
        pdf.setCreatedAt(Instant.now());
        pdf.setUpdatedAt(Instant.now());

        localCache.put(pdf.getId(), pdf);

        if (shouldAttemptMongo()) {
            try {
                ImportantPdf saved = repository.save(pdf);
                localCache.put(saved.getId(), saved);
                persistCacheAsync();
                return saved;
            } catch (Exception ex) {
                recordMongoFailure(ex, "createPdf");
            }
        }

        persistCacheAsync();
        return pdf;
    }

    public ImportantPdf createPdfMultipart(String title, String date, Boolean isNew, String pdfUrl, MultipartFile file) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        ImportantPdfRequest request = new ImportantPdfRequest();
        request.setTitle(title.trim());
        request.setDate(date != null && !date.trim().isEmpty() ? date.trim() : LocalDate.now().toString());
        request.setIsNew(isNew != null ? isNew : true);

        if (file != null && !file.isEmpty()) {
            String originalName = file.getOriginalFilename();
            if (originalName == null || !originalName.toLowerCase().endsWith(".pdf")) {
                throw new IllegalArgumentException("Only PDF files (.pdf) are allowed");
            }
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                try {
                    fileResponse = imageKitService.uploadFile(file, "/univ-geeks/important-pdfs");
                } catch (Exception e) {
                    log.warn("ImageKit upload failed for Important PDF '{}': {}. Falling back to local storage.", file.getOriginalFilename(), e.getMessage());
                    fileResponse = fileStorageService.storeFile(file);
                }
            } else {
                log.warn("ImageKit cloud storage is not configured! Important PDF '{}' stored locally.", file.getOriginalFilename());
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setPdfUrl(fileResponse.getUrl());
            request.setFileName(fileResponse.getFileName());
            request.setImageKitFileId(fileResponse.getFileId());
            request.setFileSize(formatFileSize(file.getSize()));
        } else if (pdfUrl != null && !pdfUrl.trim().isEmpty()) {
            request.setPdfUrl(pdfUrl.trim());
            request.setFileSize("1.00 MB");
        } else {
            throw new IllegalArgumentException("PDF file or URL is required");
        }

        return createPdf(request);
    }

    public ImportantPdf updatePdf(String id, ImportantPdfRequest request) {
        ImportantPdf pdf = localCache.get(id);
        if (shouldAttemptMongo()) {
            try {
                Optional<ImportantPdf> opt = repository.findById(id);
                if (opt.isPresent()) pdf = opt.get();
            } catch (Exception ignored) {}
        }

        if (pdf == null) {
            throw new IllegalArgumentException("Important PDF not found with id: " + id);
        }

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            pdf.setTitle(request.getTitle().trim());
        }
        if (request.getDate() != null && !request.getDate().trim().isEmpty()) {
            pdf.setDate(request.getDate().trim());
        }
        if (request.getPdfUrl() != null && !request.getPdfUrl().trim().isEmpty()) {
            pdf.setPdfUrl(request.getPdfUrl().trim());
        }
        if (request.getFileName() != null) {
            pdf.setFileName(request.getFileName().trim());
        }
        if (request.getFileSize() != null && !request.getFileSize().trim().isEmpty()) {
            pdf.setFileSize(request.getFileSize().trim());
        }
        if (request.getImageKitFileId() != null) {
            pdf.setImageKitFileId(request.getImageKitFileId().trim());
        }
        if (request.getIsNew() != null) {
            pdf.setIsNew(request.getIsNew());
        }
        pdf.setUpdatedAt(Instant.now());

        localCache.put(id, pdf);
        persistCacheToFile();

        if (shouldAttemptMongo()) {
            try {
                return repository.save(pdf);
            } catch (Exception ex) {
                recordMongoFailure(ex, "updatePdf");
            }
        }

        return pdf;
    }

    public ImportantPdf updatePdfMultipart(String id, String title, String date, Boolean isNew, String pdfUrl, MultipartFile file) {
        ImportantPdf existing = getPdfById(id).orElseThrow(() -> new IllegalArgumentException("Important PDF not found with id: " + id));

        ImportantPdfRequest request = new ImportantPdfRequest();
        if (title != null && !title.trim().isEmpty()) request.setTitle(title.trim());
        if (date != null && !date.trim().isEmpty()) request.setDate(date.trim());
        if (isNew != null) request.setIsNew(isNew);

        if (file != null && !file.isEmpty()) {
            // Delete previous file if on ImageKit or local /api/files/
            cleanupFile(existing);

            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                try {
                    fileResponse = imageKitService.uploadFile(file, "/univ-geeks/important-pdfs");
                } catch (Exception e) {
                    log.warn("ImageKit upload failed for updated Important PDF '{}': {}. Falling back to local storage.", file.getOriginalFilename(), e.getMessage());
                    fileResponse = fileStorageService.storeFile(file);
                }
            } else {
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setPdfUrl(fileResponse.getUrl());
            request.setFileName(fileResponse.getFileName());
            request.setImageKitFileId(fileResponse.getFileId());
            request.setFileSize(formatFileSize(file.getSize()));
        } else if (pdfUrl != null && !pdfUrl.trim().isEmpty()) {
            request.setPdfUrl(pdfUrl.trim());
        }

        return updatePdf(id, request);
    }

    public boolean deletePdf(String id) {
        ImportantPdf pdf = localCache.remove(id);
        boolean removedFromCache = pdf != null;

        if (pdf == null && shouldAttemptMongo()) {
            try {
                pdf = repository.findById(id).orElse(null);
            } catch (Exception ex) {
                recordMongoFailure(ex, "deletePdf.lookup");
            }
        }

        boolean deletedFromMongo = false;
        if (pdf != null && shouldAttemptMongo()) {
            try {
                repository.deleteById(id);
                deletedFromMongo = true;
            } catch (Exception ex) {
                recordMongoFailure(ex, "deletePdf");
            }
        }

        if (pdf != null) {
            final ImportantPdf toCleanup = pdf;
            java.util.concurrent.CompletableFuture.runAsync(() -> cleanupFile(toCleanup));
        }
        if (removedFromCache) {
            persistCacheAsync();
        }

        // Return true if removed from either cache or MongoDB
        return removedFromCache || deletedFromMongo;
    }

    public ImportantPdf toggleIsNew(String id) {
        ImportantPdf pdf = getPdfById(id).orElseThrow(() -> new IllegalArgumentException("Important PDF not found with id: " + id));
        pdf.setIsNew(!pdf.getIsNew());
        pdf.setUpdatedAt(Instant.now());

        localCache.put(id, pdf);
        persistCacheToFile();

        if (shouldAttemptMongo()) {
            try {
                return repository.save(pdf);
            } catch (Exception ex) {
                recordMongoFailure(ex, "toggleIsNew");
            }
        }

        return pdf;
    }

    public long getTotalCount() {
        return localCache.size();
    }

    private void cleanupFile(ImportantPdf pdf) {
        if (pdf.getImageKitFileId() != null && !pdf.getImageKitFileId().trim().isEmpty()) {
            try {
                imageKitService.deleteFile(pdf.getImageKitFileId().trim());
            } catch (Exception e) {
                log.warn("Could not delete ImageKit file for Important PDF {}: {}", pdf.getId(), e.getMessage());
            }
        } else if (pdf.getPdfUrl() != null && pdf.getPdfUrl().startsWith("/api/files/")) {
            String fileName = pdf.getPdfUrl().substring("/api/files/".length());
            fileStorageService.deleteFileIfExists(fileName);
        }
    }

    private String formatFileSize(long bytes) {
        if (bytes <= 0) return "0 B";
        final String[] units = new String[] { "B", "KB", "MB", "GB", "TB" };
        int digitGroups = (int) (Math.log10(bytes) / Math.log10(1024));
        digitGroups = Math.min(digitGroups, units.length - 1);
        double size = bytes / Math.pow(1024, digitGroups);
        DecimalFormat df = new DecimalFormat("#.##");
        return df.format(size) + " " + units[digitGroups];
    }
}
