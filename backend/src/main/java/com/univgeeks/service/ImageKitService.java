package com.univgeeks.service;

import com.univgeeks.dto.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImageKitService {

    /**
     * Checks if ImageKit credentials (public key and private key) are properly configured.
     */
    boolean isConfigured();

    /**
     * Gets the configured ImageKit URL endpoint.
     */
    String getUrlEndpoint();

    /**
     * Uploads a multipart file to ImageKit in the specified folder.
     *
     * @param file   The multipart file to upload
     * @param folder The folder path (e.g. "/univ-geeks/pyqs")
     * @return FileUploadResponse containing url, fileName, sizeMb, contentType, and fileId
     */
    FileUploadResponse uploadFile(MultipartFile file, String folder);

    /**
     * Uploads raw byte content to ImageKit in the specified folder.
     */
    FileUploadResponse uploadFile(byte[] bytes, String fileName, String folder, String contentType);

    /**
     * Deletes a file remotely from ImageKit using its fileId.
     *
     * @param fileId The unique ImageKit file ID
     * @return true if deleted or already gone, false otherwise
     */
    boolean deleteFile(String fileId);
}
