package com.univgeeks.service;

import com.univgeeks.dto.FileUploadResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "pdf", "png", "jpg", "jpeg", "webp", "svg"
    );

    private static final long MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private Path uploadPath;

    @PostConstruct
    public void init() {
        try {
            this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(this.uploadPath);
            log.info("File upload storage initialized at: {}", this.uploadPath);
        } catch (IOException e) {
            log.error("Could not create upload directory at {}: {}", uploadDir, e.getMessage());
            throw new RuntimeException("Could not initialize upload storage location", e);
        }
    }

    public FileUploadResponse storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds 50MB limit");
        }

        String originalFilename = StringUtils.cleanPath(Objects.requireNonNullElse(file.getOriginalFilename(), "file"));
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Unsupported file format: ." + extension + ". Allowed formats: " + ALLOWED_EXTENSIONS);
        }

        // Sanitize filename
        String sanitizedBase = originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");
        String uniqueFileName = UUID.randomUUID().toString().substring(0, 8) + "_" + sanitizedBase;

        try {
            Path targetLocation = this.uploadPath.resolve(uniqueFileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            double sizeMb = Math.round((file.getSize() / (1024.0 * 1024.0)) * 100.0) / 100.0;
            String fileUrl = "/api/files/" + uniqueFileName;
            String contentType = determineContentType(extension);

            return new FileUploadResponse(fileUrl, uniqueFileName, sizeMb, contentType);
        } catch (IOException ex) {
            log.error("Failed to store file {}: {}", originalFilename, ex.getMessage());
            throw new RuntimeException("Failed to store file: " + originalFilename, ex);
        }
    }

    public Path resolveFilePath(String fileName) {
        if (fileName == null || fileName.isBlank()) return null;
        try {
            String decoded = fileName.trim();
            try {
                decoded = java.net.URLDecoder.decode(fileName, java.nio.charset.StandardCharsets.UTF_8).trim();
            } catch (Exception ignored) {}

            String sanitized = StringUtils.cleanPath(decoded);
            if (sanitized.contains("..")) return null;

            Path filePath = this.uploadPath.resolve(sanitized).normalize();
            if (Files.exists(filePath)) {
                return filePath;
            }

            // Also check with raw fileName
            String rawSanitized = StringUtils.cleanPath(fileName.trim());
            if (!rawSanitized.contains("..")) {
                Path rawPath = this.uploadPath.resolve(rawSanitized).normalize();
                if (Files.exists(rawPath)) {
                    return rawPath;
                }
            }

            // Fallback: check files in upload directory by suffix or normalized base
            String targetLower = sanitized.toLowerCase();
            String targetUnderscore = sanitized.replaceAll("[^a-zA-Z0-9.-]", "_").toLowerCase();

            try (var stream = Files.list(this.uploadPath)) {
                return stream.filter(p -> {
                    String fn = p.getFileName().toString();
                    String fnLower = fn.toLowerCase();
                    String fnClean = fnLower.replaceAll("[^a-zA-Z0-9.-]", "_");

                    return fnLower.equals(targetLower)
                            || fnLower.endsWith("_" + targetLower)
                            || fnLower.equals(targetUnderscore)
                            || fnLower.endsWith("_" + targetUnderscore)
                            || fnClean.equals(targetUnderscore)
                            || fnClean.endsWith("_" + targetUnderscore);
                }).findFirst().orElse(null);
            }
        } catch (Exception e) {
            return null;
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = resolveFilePath(fileName);
            if (filePath != null && Files.exists(filePath)) {
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists() && resource.isReadable()) {
                    return resource;
                }
            }
            throw new IllegalArgumentException("File not found or not readable: " + fileName);
        } catch (MalformedURLException ex) {
            throw new IllegalArgumentException("File path invalid: " + fileName, ex);
        }
    }

    public boolean fileExists(String fileName) {
        Path path = resolveFilePath(fileName);
        return path != null && Files.exists(path);
    }

    public boolean deleteFileIfExists(String fileName) {
        try {
            String sanitized = StringUtils.cleanPath(fileName);
            if (sanitized.contains("..")) return false;
            Path filePath = this.uploadPath.resolve(sanitized).normalize();
            boolean deleted = Files.deleteIfExists(filePath);
            if (deleted) {
                log.info("Deleted local file: {}", sanitized);
            }
            return deleted;
        } catch (Exception e) {
            log.warn("Could not delete local file {}: {}", fileName, e.getMessage());
            return false;
        }
    }

    public MediaType getMediaTypeForFileName(String fileName) {
        String ext = getFileExtension(fileName).toLowerCase();
        return switch (ext) {
            case "pdf" -> MediaType.APPLICATION_PDF;
            case "png" -> MediaType.IMAGE_PNG;
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "webp" -> MediaType.parseMediaType("image/webp");
            case "svg" -> MediaType.parseMediaType("image/svg+xml");
            default -> MediaType.APPLICATION_OCTET_STREAM;
        };
    }

    private String determineContentType(String extension) {
        return switch (extension) {
            case "pdf" -> "application/pdf";
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            case "webp" -> "image/webp";
            case "svg" -> "image/svg+xml";
            default -> "application/octet-stream";
        };
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1);
    }
}
