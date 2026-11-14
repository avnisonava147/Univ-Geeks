package com.univgeeks.controller;

import com.univgeeks.model.Banner;
import com.univgeeks.model.Note;
import com.univgeeks.model.Notification;
import com.univgeeks.model.Pyq;
import com.univgeeks.service.BannerService;
import com.univgeeks.service.FileStorageService;
import com.univgeeks.service.NoteService;
import com.univgeeks.service.NotificationService;
import com.univgeeks.service.PyqService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PublicResourceController {

    private final PyqService pyqService;
    private final NoteService noteService;
    private final BannerService bannerService;
    private final NotificationService notificationService;
    private final FileStorageService fileStorageService;

    public PublicResourceController(PyqService pyqService,
                                    NoteService noteService,
                                    BannerService bannerService,
                                    NotificationService notificationService,
                                    FileStorageService fileStorageService) {
        this.pyqService = pyqService;
        this.noteService = noteService;
        this.bannerService = bannerService;
        this.notificationService = notificationService;
        this.fileStorageService = fileStorageService;
    }

    // ==========================================
    // PYQs Public Endpoints
    // ==========================================
    @GetMapping("/pyqs")
    public ResponseEntity<List<Pyq>> getPublishedPyqs(
            @RequestParam(required = false) String classLevel,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String year) {
        List<Pyq> pyqs = pyqService.getPublishedPyqs(classLevel, subject, year);
        return ResponseEntity.ok(pyqs);
    }

    @GetMapping("/pyqs/{id}")
    public ResponseEntity<Pyq> getPublishedPyqById(@PathVariable String id) {
        return pyqService.getPublishedPyqById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // Notes Public Endpoints
    // ==========================================
    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getPublishedNotes(
            @RequestParam(required = false) String classLevel,
            @RequestParam(required = false) String stream,
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String medium) {
        List<Note> notes = noteService.getPublishedNotes(classLevel, stream, subject, medium);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Note> getPublishedNoteById(@PathVariable String id) {
        return noteService.getPublishedNoteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // Banners Public Endpoints
    // ==========================================
    @GetMapping("/banners")
    public ResponseEntity<List<Banner>> getActiveBanners() {
        List<Banner> banners = bannerService.getActiveBanners();
        return ResponseEntity.ok(banners);
    }

    // ==========================================
    // Notifications Public Endpoints
    // ==========================================
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getActiveNotifications() {
        List<Notification> notifications = notificationService.getActiveNotifications();
        return ResponseEntity.ok(notifications);
    }

    // ==========================================
    // Public Static Files Endpoint (PDFs / Images)
    // ==========================================
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<?> serveFile(@PathVariable String fileName) {
        String decoded = fileName;
        try {
            decoded = java.net.URLDecoder.decode(fileName, java.nio.charset.StandardCharsets.UTF_8);
        } catch (Exception ignored) {}

        if (fileStorageService.fileExists(decoded) || fileStorageService.fileExists(fileName)) {
            Resource fileResource;
            try {
                fileResource = fileStorageService.loadFileAsResource(decoded);
            } catch (Exception e) {
                fileResource = fileStorageService.loadFileAsResource(fileName);
            }
            MediaType mediaType = fileStorageService.getMediaTypeForFileName(fileResource.getFilename());

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileResource.getFilename() + "\"")
                    .body(fileResource);
        }

        // If not found locally on disk, check if a PYQ with this fileName exists and has an ImageKit cloud URL
        Optional<Pyq> pyq = pyqService.findByFileName(decoded);
        if (pyq.isEmpty()) pyq = pyqService.findByFileName(fileName);

        // Also check with random UUID / hex prefix stripped (e.g. "bfa2a9db_TCS-NQT-Paper-4.pdf" -> "TCS-NQT-Paper-4.pdf")
        String stripped = decoded.replaceFirst("^[a-fA-F0-9]{8}_", "");
        if (pyq.isEmpty()) {
            pyq = pyqService.findByFileName(stripped);
        }
        if (pyq.isEmpty()) {
            String baseToken = stripped.replaceAll("(?i)\\.pdf$", "").toLowerCase();
            if (!baseToken.isBlank()) {
                pyq = pyqService.getAllPyqs().stream()
                        .filter(p -> p.getFileUrl() != null && p.getFileUrl().startsWith("http"))
                        .filter(p -> (p.getFileName() != null && p.getFileName().toLowerCase().contains(baseToken))
                                || (p.getFileUrl() != null && p.getFileUrl().toLowerCase().contains(baseToken)))
                        .findFirst();
            }
        }

        if (pyq.isPresent() && pyq.get().getFileUrl() != null && pyq.get().getFileUrl().startsWith("http")) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, pyq.get().getFileUrl())
                    .build();
        }

        // Also check if a Note with this fileName exists and has an ImageKit cloud URL
        Optional<Note> note = noteService.findByFileName(decoded);
        if (note.isEmpty()) note = noteService.findByFileName(fileName);
        if (note.isEmpty()) {
            note = noteService.findByFileName(stripped);
        }
        if (note.isEmpty()) {
            String baseToken = stripped.replaceAll("(?i)\\.pdf$", "").toLowerCase();
            if (!baseToken.isBlank()) {
                note = noteService.getAllNotes().stream()
                        .filter(n -> n.getPdfUrl() != null && n.getPdfUrl().startsWith("http"))
                        .filter(n -> (n.getFileName() != null && n.getFileName().toLowerCase().contains(baseToken))
                                || (n.getPdfUrl() != null && n.getPdfUrl().toLowerCase().contains(baseToken)))
                        .findFirst();
            }
        }

        if (note.isPresent() && note.get().getPdfUrl() != null && note.get().getPdfUrl().startsWith("http")) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, note.get().getPdfUrl())
                    .build();
        }

        return ResponseEntity.notFound().build();
    }
}
