package com.univgeeks.service;

import com.univgeeks.dto.FileUploadResponse;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

public class ImageKitServiceTest {

    @Test
    public void testIsConfigured_WhenMissingKeys_ReturnsFalse() {
        ImageKitService service1 = new ImageKitServiceImpl("", "", "https://ik.imagekit.io/eguapakpx");
        assertFalse(service1.isConfigured());

        ImageKitService service2 = new ImageKitServiceImpl("pub_key", null, "https://ik.imagekit.io/eguapakpx");
        assertFalse(service2.isConfigured());

        ImageKitService service3 = new ImageKitServiceImpl(null, "priv_key", "https://ik.imagekit.io/eguapakpx");
        assertFalse(service3.isConfigured());
    }

    @Test
    public void testIsConfigured_WhenConfigured_ReturnsTrue() {
        ImageKitService service = new ImageKitServiceImpl("public_test_key", "private_test_key", "https://ik.imagekit.io/eguapakpx");
        assertTrue(service.isConfigured());
        assertEquals("https://ik.imagekit.io/eguapakpx", service.getUrlEndpoint());
    }

    @Test
    public void testUploadFile_WhenNotConfigured_ThrowsIllegalStateException() {
        ImageKitService unconfigured = new ImageKitServiceImpl("", "", "https://ik.imagekit.io/eguapakpx");
        MockMultipartFile file = new MockMultipartFile(
                "file", "paper.pdf", "application/pdf", "%PDF-1.4 test".getBytes(StandardCharsets.UTF_8)
        );

        IllegalStateException ex = assertThrows(IllegalStateException.class, () ->
                unconfigured.uploadFile(file, "/univ-geeks/pyqs")
        );
        assertTrue(ex.getMessage().contains("ImageKit is not configured"));
    }

    @Test
    public void testUploadFile_EmptyFile_ThrowsIllegalArgumentException() {
        ImageKitService service = new ImageKitServiceImpl("pub_key", "priv_key", "https://ik.imagekit.io/eguapakpx");
        MockMultipartFile emptyFile = new MockMultipartFile("file", "test.pdf", "application/pdf", new byte[0]);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                service.uploadFile(emptyFile, "/univ-geeks/pyqs")
        );
        assertTrue(ex.getMessage().contains("Cannot upload an empty file"));
    }

    @Test
    public void testUploadFile_UnsupportedExtension_ThrowsIllegalArgumentException() {
        ImageKitService service = new ImageKitServiceImpl("pub_key", "priv_key", "https://ik.imagekit.io/eguapakpx");
        MockMultipartFile invalidFile = new MockMultipartFile(
                "file", "script.exe", "application/octet-stream", "malicious_bytes".getBytes(StandardCharsets.UTF_8)
        );

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                service.uploadFile(invalidFile, "/univ-geeks/pyqs")
        );
        assertTrue(ex.getMessage().contains("Unsupported file format"));
    }

    @Test
    public void testDeleteFile_WhenMissingFileId_ReturnsFalse() {
        ImageKitService service = new ImageKitServiceImpl("pub_key", "priv_key", "https://ik.imagekit.io/eguapakpx");
        assertFalse(service.deleteFile(null));
        assertFalse(service.deleteFile("   "));
    }

    @Test
    public void testDeleteFile_WhenNotConfigured_ReturnsFalse() {
        ImageKitService unconfigured = new ImageKitServiceImpl("", "", "https://ik.imagekit.io/eguapakpx");
        assertFalse(unconfigured.deleteFile("file_id_12345"));
    }
}
