package com.univgeeks.service;

import com.univgeeks.dto.FileUploadResponse;
import io.imagekit.client.ImageKitClient;
import io.imagekit.client.okhttp.ImageKitOkHttpClient;
import io.imagekit.models.files.FileUploadParams;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class ImageKitServiceImpl implements ImageKitService {

    private static final Logger log = LoggerFactory.getLogger(ImageKitServiceImpl.class);

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "pdf", "png", "jpg", "jpeg", "webp", "svg"
    );

    private static final long MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

    @Value("${imagekit.public-key:${IMAGEKIT_PUBLIC_KEY:}}")
    private String publicKey;

    @Value("${imagekit.private-key:${IMAGEKIT_PRIVATE_KEY:}}")
    private String privateKey;

    @Value("${imagekit.url-endpoint:${IMAGEKIT_URL_ENDPOINT:https://ik.imagekit.io/eguapakpx}}")
    private String urlEndpoint;

    private ImageKitClient client;

    public ImageKitServiceImpl() {
    }

    // Constructor for testing / injection
    public ImageKitServiceImpl(String publicKey, String privateKey, String urlEndpoint) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.urlEndpoint = urlEndpoint;
    }

    @Override
    public boolean isConfigured() {
        return publicKey != null && !publicKey.trim().isEmpty() &&
               privateKey != null && !privateKey.trim().isEmpty();
    }

    @Override
    public String getUrlEndpoint() {
        return (urlEndpoint != null && !urlEndpoint.trim().isEmpty())
                ? urlEndpoint.trim()
                : "https://ik.imagekit.io/eguapakpx";
    }

    private synchronized ImageKitClient getClient() {
        if (!isConfigured()) {
            throw new IllegalStateException(
                    "ImageKit is not configured. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in backend/.env to enable cloud uploads."
            );
        }
        if (this.client == null) {
            this.client = ImageKitOkHttpClient.builder()
                    .privateKey(this.privateKey.trim())
                    .build();
            log.info("ImageKit client initialized successfully for endpoint: {}", getUrlEndpoint());
        }
        return this.client;
    }

    @Override
    public FileUploadResponse uploadFile(MultipartFile file, String folder) {
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

        try (InputStream inputStream = file.getInputStream()) {
            return performUpload(inputStream, originalFilename, extension, folder, file.getSize());
        } catch (IOException e) {
            log.error("Failed to read file input stream for: {}", originalFilename);
            throw new RuntimeException("Failed to read file for upload: " + originalFilename, e);
        }
    }

    @Override
    public FileUploadResponse uploadFile(byte[] bytes, String fileName, String folder, String contentType) {
        if (bytes == null || bytes.length == 0) {
            throw new IllegalArgumentException("Cannot upload empty byte array");
        }
        if (bytes.length > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds 50MB limit");
        }

        String sanitizedName = StringUtils.cleanPath(Objects.requireNonNullElse(fileName, "file"));
        String extension = getFileExtension(sanitizedName).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Unsupported file format: ." + extension + ". Allowed formats: " + ALLOWED_EXTENSIONS);
        }

        try (ByteArrayInputStream stream = new ByteArrayInputStream(bytes)) {
            return performUpload(stream, sanitizedName, extension, folder, bytes.length);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload bytes: " + sanitizedName, e);
        }
    }

    private FileUploadResponse performUpload(InputStream stream, String originalFilename, String extension, String folder, long originalSize) {
        String sanitizedBase = originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");
        String cleanFolder = (folder != null && !folder.trim().isEmpty()) ? folder.trim() : "/univ-geeks/uploads";
        if (!cleanFolder.startsWith("/")) {
            cleanFolder = "/" + cleanFolder;
        }

        try {
            FileUploadParams params = FileUploadParams.builder()
                    .file(stream)
                    .fileName(sanitizedBase)
                    .folder(cleanFolder)
                    .useUniqueFileName(true)
                    .build();

            io.imagekit.models.files.FileUploadResponse sdkResponse = getClient().files().upload(params);

            String url = sdkResponse.url().orElse("");
            String name = sdkResponse.name().orElse(sanitizedBase);
            String fileId = sdkResponse.fileId().orElse("");
            long sizeBytes = sdkResponse.size().map(Double::longValue).orElse(originalSize);
            double sizeMb = Math.round((sizeBytes / (1024.0 * 1024.0)) * 100.0) / 100.0;
            String contentType = determineContentType(extension);

            log.info("File successfully uploaded to ImageKit. Folder: {}, FileId: {}, URL: {}",
                    cleanFolder, fileId, url);

            return new FileUploadResponse(url, name, sizeMb, contentType, fileId);
        } catch (IllegalStateException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("ImageKit upload error for {}: {}", originalFilename, ex.getMessage());
            throw new RuntimeException("ImageKit upload failed: " + ex.getMessage(), ex);
        }
    }

    @Override
    public boolean deleteFile(String fileId) {
        if (fileId == null || fileId.trim().isEmpty()) {
            return false;
        }

        if (!isConfigured()) {
            log.warn("Cannot delete ImageKit file {}: ImageKit is not configured", fileId);
            return false;
        }

        try {
            getClient().files().delete(fileId.trim());
            log.info("Deleted ImageKit file with ID: {}", fileId);
            return true;
        } catch (Exception ex) {
            log.warn("Failed to delete file from ImageKit (ID: {}): {}", fileId, ex.getMessage());
            return false;
        }
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

    @PreDestroy
    public void cleanup() {
        if (this.client != null) {
            try {
                this.client.close();
            } catch (Exception ignored) {
            }
        }
    }
}
