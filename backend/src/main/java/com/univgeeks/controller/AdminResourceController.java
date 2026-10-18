package com.univgeeks.controller;

import com.univgeeks.dto.*;
import com.univgeeks.model.Banner;
import com.univgeeks.model.Note;
import com.univgeeks.model.Pyq;
import com.univgeeks.service.BannerService;
import com.univgeeks.service.DashboardService;
import com.univgeeks.service.FileStorageService;
import com.univgeeks.service.ImageKitService;
import com.univgeeks.service.NoteService;
import com.univgeeks.service.PyqService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminResourceController {

    private final PyqService pyqService;
    private final NoteService noteService;
    private final BannerService bannerService;
    private final DashboardService dashboardService;
    private final FileStorageService fileStorageService;
    private final ImageKitService imageKitService;

    public AdminResourceController(PyqService pyqService,
                                   NoteService noteService,
                                   BannerService bannerService,
                                   DashboardService dashboardService,
                                   FileStorageService fileStorageService,
                                   ImageKitService imageKitService) {
        this.pyqService = pyqService;
        this.noteService = noteService;
        this.bannerService = bannerService;
        this.dashboardService = dashboardService;
        this.fileStorageService = fileStorageService;
        this.imageKitService = imageKitService;
    }

    // ==========================================
    // Dashboard Stats
    // ==========================================
    @GetMapping("/admin/dashboard/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    // ==========================================
    // File Upload (Admin Only)
    // ==========================================
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", required = false, defaultValue = "/univ-geeks/uploads") String folder
    ) {
        if (!imageKitService.isConfigured()) {
            throw new IllegalStateException(
                    "ImageKit cloud storage is not configured. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in backend/.env to enable cloud uploads."
            );
        }
        FileUploadResponse response = imageKitService.uploadFile(file, folder);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ==========================================
    // Admin PYQ Management
    // ==========================================
    @GetMapping("/admin/pyqs")
    public ResponseEntity<List<Pyq>> getAllPyqs() {
        return ResponseEntity.ok(pyqService.getAllPyqs());
    }

    @PostMapping(value = "/admin/pyqs", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Pyq> createPyq(@Valid @RequestBody PyqRequest request) {
        Pyq created = pyqService.createPyq(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping(value = "/admin/pyqs", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Pyq> createPyqMultipart(
            @RequestParam("title") String title,
            @RequestParam("classLevel") String classLevel,
            @RequestParam("subject") String subject,
            @RequestParam("exam") String exam,
            @RequestParam("year") String year,
            @RequestParam(value = "chapter", required = false) String chapter,
            @RequestParam(value = "published", required = false, defaultValue = "true") boolean published,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (classLevel == null || classLevel.trim().isEmpty()) {
            throw new IllegalArgumentException("Class level is required");
        }
        if (subject == null || subject.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }
        if (exam == null || exam.trim().isEmpty()) {
            throw new IllegalArgumentException("Exam is required");
        }
        if (year == null || year.trim().isEmpty()) {
            throw new IllegalArgumentException("Year is required");
        }

        PyqRequest request = new PyqRequest();
        request.setTitle(title.trim());
        request.setClassLevel(classLevel.trim());
        request.setSubject(subject.trim());
        request.setExam(exam.trim());
        request.setYear(year.trim());
        request.setChapter(chapter != null ? chapter.trim() : null);
        request.setPublished(published);

        if (file != null && !file.isEmpty()) {
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                fileResponse = imageKitService.uploadFile(file, "/univ-geeks/pyqs");
            } else {
                throw new IllegalStateException(
                        "ImageKit cloud storage is not configured. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in backend/.env to enable cloud uploads."
                );
            }
            request.setFileUrl(fileResponse.getUrl());
            request.setFileName(fileResponse.getFileName());
            request.setFileSizeMb(fileResponse.getSizeMb());
            request.setImageKitFileId(fileResponse.getFileId());
        }

        Pyq created = pyqService.createPyq(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/admin/pyqs/{id}")
    public ResponseEntity<Pyq> updatePyq(@PathVariable String id, @Valid @RequestBody PyqRequest request) {
        Pyq updated = pyqService.updatePyq(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/admin/pyqs/{id}")
    public ResponseEntity<Map<String, String>> deletePyq(@PathVariable String id) {
        boolean deleted = pyqService.deletePyq(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "PYQ deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/admin/pyqs/{id}/publish")
    public ResponseEntity<Pyq> togglePublishPyq(@PathVariable String id) {
        Pyq updated = pyqService.togglePublish(id);
        return ResponseEntity.ok(updated);
    }

    // ==========================================
    // Admin Note Management
    // ==========================================
    @GetMapping("/admin/notes")
    public ResponseEntity<List<Note>> getAllNotes() {
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @PostMapping(value = "/admin/notes", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> createNote(@Valid @RequestBody NoteRequest request) {
        Note created = noteService.createNote(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping(value = "/admin/notes", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Note> createNoteMultipart(
            @RequestParam("title") String title,
            @RequestParam("classLevel") String classLevel,
            @RequestParam("subject") String subject,
            @RequestParam(value = "stream", required = false) String stream,
            @RequestParam(value = "chapterNo", required = false, defaultValue = "1") int chapterNo,
            @RequestParam(value = "pages", required = false, defaultValue = "1") int pages,
            @RequestParam(value = "sizeMb", required = false, defaultValue = "1.0") double sizeMb,
            @RequestParam(value = "status", required = false, defaultValue = "published") String status,
            @RequestParam(value = "uploadedBy", required = false, defaultValue = "Admin") String uploadedBy,
            @RequestParam(value = "pdfUrl", required = false) String pdfUrl,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (classLevel == null || classLevel.trim().isEmpty()) {
            throw new IllegalArgumentException("Class level is required");
        }
        if (subject == null || subject.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }

        NoteRequest request = new NoteRequest();
        request.setTitle(title.trim());
        request.setClassLevel(classLevel.trim());
        request.setSubject(subject.trim());
        request.setStream(stream != null ? stream.trim() : null);
        request.setChapterNo(chapterNo);
        request.setPages(pages);
        request.setSizeMb(sizeMb);
        request.setStatus(status != null ? status.trim() : "published");
        request.setUploadedBy(uploadedBy != null ? uploadedBy.trim() : "Admin");

        if (file != null && !file.isEmpty()) {
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                fileResponse = imageKitService.uploadFile(file, "/univ-geeks/notes");
            } else {
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setPdfUrl(fileResponse.getUrl());
            request.setFileName(fileResponse.getFileName());
            request.setSizeMb(fileResponse.getSizeMb());
            request.setImageKitFileId(fileResponse.getFileId());
        } else if (pdfUrl != null && !pdfUrl.trim().isEmpty()) {
            request.setPdfUrl(pdfUrl.trim());
        }

        Note created = noteService.createNote(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping(value = "/admin/notes/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> updateNote(@PathVariable String id, @Valid @RequestBody NoteRequest request) {
        Note updated = noteService.updateNote(id, request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping(value = "/admin/notes/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Note> updateNoteMultipart(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("classLevel") String classLevel,
            @RequestParam("subject") String subject,
            @RequestParam(value = "stream", required = false) String stream,
            @RequestParam(value = "chapterNo", required = false, defaultValue = "1") int chapterNo,
            @RequestParam(value = "pages", required = false, defaultValue = "1") int pages,
            @RequestParam(value = "sizeMb", required = false, defaultValue = "1.0") double sizeMb,
            @RequestParam(value = "status", required = false, defaultValue = "published") String status,
            @RequestParam(value = "pdfUrl", required = false) String pdfUrl,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        NoteRequest request = new NoteRequest();
        request.setTitle(title.trim());
        request.setClassLevel(classLevel.trim());
        request.setSubject(subject.trim());
        request.setStream(stream != null ? stream.trim() : null);
        request.setChapterNo(chapterNo);
        request.setPages(pages);
        request.setSizeMb(sizeMb);
        request.setStatus(status != null ? status.trim() : "published");

        if (file != null && !file.isEmpty()) {
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                fileResponse = imageKitService.uploadFile(file, "/univ-geeks/notes");
            } else {
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setPdfUrl(fileResponse.getUrl());
            request.setFileName(fileResponse.getFileName());
            request.setSizeMb(fileResponse.getSizeMb());
            request.setImageKitFileId(fileResponse.getFileId());
        } else if (pdfUrl != null && !pdfUrl.trim().isEmpty()) {
            request.setPdfUrl(pdfUrl.trim());
        }

        Note updated = noteService.updateNote(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/admin/notes/{id}")
    public ResponseEntity<Map<String, String>> deleteNote(@PathVariable String id) {
        boolean deleted = noteService.deleteNote(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Note deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/admin/notes/{id}/status")
    public ResponseEntity<Note> toggleNoteStatus(@PathVariable String id) {
        Note updated = noteService.toggleStatus(id);
        return ResponseEntity.ok(updated);
    }

    // ==========================================
    // Admin Banner Management
    // ==========================================
    @GetMapping("/admin/banners")
    public ResponseEntity<List<Banner>> getAllBanners() {
        return ResponseEntity.ok(bannerService.getAllBanners());
    }

    @PostMapping(value = "/admin/banners", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Banner> createBanner(@Valid @RequestBody BannerRequest request) {
        Banner created = bannerService.createBanner(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping(value = "/admin/banners", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Banner> createBannerMultipart(
            @RequestParam("title") String title,
            @RequestParam(value = "subtitle", required = false) String subtitle,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "linkUrl", required = false) String linkUrl,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "imageColor", required = false, defaultValue = "#E8A33D") String imageColor,
            @RequestParam(value = "priority", required = false, defaultValue = "1") int priority,
            @RequestParam(value = "active", required = false, defaultValue = "true") boolean active,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "targetPage", required = false, defaultValue = "all") String targetPage,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        BannerRequest request = new BannerRequest();
        request.setTitle(title.trim());
        request.setSubtitle(subtitle != null ? subtitle.trim() : null);
        request.setDescription(description != null ? description.trim() : null);
        request.setLinkUrl(linkUrl != null ? linkUrl.trim() : "");
        request.setImageUrl(imageUrl != null ? imageUrl.trim() : null);
        request.setImageColor(imageColor != null ? imageColor.trim() : "#E8A33D");
        request.setPriority(priority > 0 ? priority : 1);
        request.setActive(active);
        request.setStartDate(startDate != null ? startDate.trim() : null);
        request.setEndDate(endDate != null ? endDate.trim() : null);
        request.setTargetPage(targetPage != null ? targetPage.trim() : "all");

        if (file != null && !file.isEmpty()) {
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                fileResponse = imageKitService.uploadFile(file, "/univ-geeks/banners");
            } else {
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setImageUrl(fileResponse.getUrl());
            request.setImageKitFileId(fileResponse.getFileId());
        }

        Banner created = bannerService.createBanner(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping(value = "/admin/banners/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Banner> updateBanner(@PathVariable String id, @Valid @RequestBody BannerRequest request) {
        Banner updated = bannerService.updateBanner(id, request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping(value = "/admin/banners/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Banner> updateBannerMultipart(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam(value = "subtitle", required = false) String subtitle,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "linkUrl", required = false) String linkUrl,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "imageColor", required = false, defaultValue = "#E8A33D") String imageColor,
            @RequestParam(value = "priority", required = false, defaultValue = "1") int priority,
            @RequestParam(value = "active", required = false, defaultValue = "true") boolean active,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "targetPage", required = false, defaultValue = "all") String targetPage,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        BannerRequest request = new BannerRequest();
        request.setTitle(title.trim());
        request.setSubtitle(subtitle != null ? subtitle.trim() : null);
        request.setDescription(description != null ? description.trim() : null);
        request.setLinkUrl(linkUrl != null ? linkUrl.trim() : "");
        request.setImageUrl(imageUrl != null ? imageUrl.trim() : null);
        request.setImageColor(imageColor != null ? imageColor.trim() : "#E8A33D");
        request.setPriority(priority > 0 ? priority : 1);
        request.setActive(active);
        request.setStartDate(startDate != null ? startDate.trim() : null);
        request.setEndDate(endDate != null ? endDate.trim() : null);
        request.setTargetPage(targetPage != null ? targetPage.trim() : "all");

        if (file != null && !file.isEmpty()) {
            FileUploadResponse fileResponse;
            if (imageKitService.isConfigured()) {
                fileResponse = imageKitService.uploadFile(file, "/univ-geeks/banners");
            } else {
                fileResponse = fileStorageService.storeFile(file);
            }
            request.setImageUrl(fileResponse.getUrl());
            request.setImageKitFileId(fileResponse.getFileId());
        }

        Banner updated = bannerService.updateBanner(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/admin/banners/{id}")
    public ResponseEntity<Map<String, String>> deleteBanner(@PathVariable String id) {
        boolean deleted = bannerService.deleteBanner(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Banner deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/admin/banners/{id}/status")
    public ResponseEntity<Banner> toggleBannerStatus(@PathVariable String id) {
        Banner updated = bannerService.toggleStatus(id);
        return ResponseEntity.ok(updated);
    }
}
