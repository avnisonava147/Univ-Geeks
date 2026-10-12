package com.univgeeks.controller;

import com.univgeeks.model.Banner;
import com.univgeeks.model.Note;
import com.univgeeks.model.Pyq;
import com.univgeeks.service.BannerService;
import com.univgeeks.service.FileStorageService;
import com.univgeeks.service.NoteService;
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
    private final FileStorageService fileStorageService;

    public PublicResourceController(PyqService pyqService,
                                    NoteService noteService,
                                    BannerService bannerService,
                                    FileStorageService fileStorageService) {
        this.pyqService = pyqService;
        this.noteService = noteService;
        this.bannerService = bannerService;
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
            @RequestParam(required = false) String subject) {
        List<Note> notes = noteService.getPublishedNotes(classLevel, stream, subject);
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
    // Public Static Files Endpoint (PDFs / Images)
    // ==========================================
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<?> serveFile(@PathVariable String fileName) {
        if (fileStorageService.fileExists(fileName)) {
            Resource fileResource = fileStorageService.loadFileAsResource(fileName);
            MediaType mediaType = fileStorageService.getMediaTypeForFileName(fileName);

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileResource.getFilename() + "\"")
                    .body(fileResource);
        }

        // If not found locally on disk, check if a PYQ with this fileName exists and has an ImageKit cloud URL
        Optional<Pyq> pyq = pyqService.findByFileName(fileName);
        if (pyq.isPresent() && pyq.get().getFileUrl() != null && pyq.get().getFileUrl().startsWith("http")) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, pyq.get().getFileUrl())
                    .build();
        }

        return ResponseEntity.notFound().build();
    }
}
