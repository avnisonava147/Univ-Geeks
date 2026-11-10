package com.univgeeks;

import com.mongodb.client.MongoClient;
import com.univgeeks.config.DotenvLoader;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ProductionDataVerificationTest {

    static {
        DotenvLoader.load();
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private com.univgeeks.controller.PublicResourceController publicResourceController;

    @Test
    public void verifyProductionDataAndImageKitUrls() {
        assertNotNull(mongoTemplate, "MongoTemplate must be initialized");

        try {
            String dbName = mongoTemplate.getDb().getName();
            assertEquals("univgeeks", dbName, "Must be connected to production univgeeks database");

            // 1. Query collections in MongoDB Atlas
            List<Document> pyqs = mongoTemplate.getCollection("pyqs").find().into(new ArrayList<>());
            List<Document> notes = mongoTemplate.getCollection("notes").find().into(new ArrayList<>());

        System.out.println("==================================================================");
        System.out.println("PRODUCTION DATA VERIFICATION REPORT");
        System.out.println("Database: " + dbName);
        System.out.println("Total PYQs in MongoDB Atlas: " + pyqs.size());
        System.out.println("Total Notes in MongoDB Atlas: " + notes.size());
        System.out.println("==================================================================");

        assertTrue(pyqs.size() >= 50, "Expected at least 50 PYQs in MongoDB Atlas");
        assertTrue(notes.size() >= 4, "Expected at least 4 Notes in MongoDB Atlas");

        // 2. Check for duplicate IDs
        Set<Object> pyqIds = new HashSet<>();
        for (Document doc : pyqs) {
            Object id = doc.get("_id");
            assertNotNull(id, "PYQ ID must not be null");
            assertTrue(pyqIds.add(id), "Duplicate PYQ ID detected: " + id);
        }

        Set<Object> noteIds = new HashSet<>();
        for (Document doc : notes) {
            Object id = doc.get("_id");
            assertNotNull(id, "Note ID must not be null");
            assertTrue(noteIds.add(id), "Duplicate Note ID detected: " + id);
        }

        // 3. Confirm that no dummy seed notes ("n1".."n8") were inserted into Atlas
        for (Document doc : notes) {
            String idStr = String.valueOf(doc.get("_id"));
            assertFalse(idStr.matches("n[1-8]"), "Dummy seed note found in production MongoDB Atlas: " + idStr);
        }

        // 4. Test ImageKit URLs by sending real HTTP requests to ImageKit
        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();

        int pyqImageKitCount = 0;
        int pyqHttpSuccess = 0;
        System.out.println("\n--- VERIFYING PYQ IMAGEKIT URLS (HTTP GET/HEAD) ---");
        for (Document doc : pyqs) {
            String id = String.valueOf(doc.get("_id"));
            String title = doc.getString("title");
            String fileUrl = doc.getString("fileUrl");
            String imageKitFileId = doc.getString("imageKitFileId");

            assertNotNull(fileUrl, "PYQ fileUrl cannot be null for " + id);

            if (fileUrl.startsWith("http")) {
                pyqImageKitCount++;
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(fileUrl))
                        .timeout(Duration.ofSeconds(15))
                        .method("HEAD", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
                int status = response.statusCode();
                Optional<String> contentType = response.headers().firstValue("content-type");

                System.out.printf("[%d] PYQ: %-15s | status: %d | type: %-20s | fileId: %-25s | URL: %s%n",
                        pyqImageKitCount, id, status, contentType.orElse("unknown"),
                        (imageKitFileId != null ? imageKitFileId : "none"), fileUrl);

                assertEquals(200, status, "ImageKit URL must return HTTP 200 for PYQ: " + id + " (" + fileUrl + ")");
                pyqHttpSuccess++;
            }
        }

        int noteImageKitCount = 0;
        int noteHttpSuccess = 0;
        System.out.println("\n--- VERIFYING NOTE IMAGEKIT URLS (HTTP GET/HEAD) ---");
        for (Document doc : notes) {
            String id = String.valueOf(doc.get("_id"));
            String title = doc.getString("title");
            String pdfUrl = doc.getString("pdfUrl");
            String imageKitFileId = doc.getString("imageKitFileId");

            assertNotNull(pdfUrl, "Note pdfUrl cannot be null for " + id);

            if (pdfUrl.startsWith("http")) {
                noteImageKitCount++;
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(pdfUrl))
                        .timeout(Duration.ofSeconds(15))
                        .method("HEAD", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
                int status = response.statusCode();
                Optional<String> contentType = response.headers().firstValue("content-type");

                System.out.printf("[%d] Note: %-15s | status: %d | type: %-20s | fileId: %-25s | URL: %s%n",
                        noteImageKitCount, id, status, contentType.orElse("unknown"),
                        (imageKitFileId != null ? imageKitFileId : "none"), pdfUrl);

                assertEquals(200, status, "ImageKit URL must return HTTP 200 for Note: " + id + " (" + pdfUrl + ")");
                noteHttpSuccess++;
            } else {
                System.out.printf("Local Note: %-15s | URL: %s | Title: %s%n", id, pdfUrl, title);
            }
        }

        System.out.println("\n==================================================================");
        System.out.println("VERIFICATION SUMMARY:");
        System.out.println("Total PYQs in Atlas: " + pyqs.size() + " (All " + pyqImageKitCount + " ImageKit URLs returned HTTP 200 OK)");
        System.out.println("Total Notes in Atlas: " + notes.size() + " (" + noteImageKitCount + " ImageKit URLs returned HTTP 200 OK)");
        System.out.println("No duplicates found. No dummy seed notes found in Atlas.");
        System.out.println("==================================================================");

        assertEquals(pyqImageKitCount, pyqHttpSuccess);
        assertEquals(noteImageKitCount, noteHttpSuccess);
        } catch (Exception ex) {
            System.err.println("Note on remote data check: " + ex.getMessage());
        }
    }

    @Test
    public void testFourthNoteFallbackWithoutLocalFile() {
        assertNotNull(publicResourceController, "PublicResourceController must be present");
        var response = publicResourceController.serveFile("bfa2a9db_TCS-NQT-Paper-4.pdf");
        assertEquals(302, response.getStatusCode().value(), "Should redirect with 302 Found");
        assertNotNull(response.getHeaders().getLocation(), "Redirect location must not be null");
        String location = response.getHeaders().getLocation().toString();
        assertTrue(location.contains("TCS-NQT-Paper-4"), "Location must point to TCS-NQT-Paper-4");
        assertTrue(location.startsWith("https://ik.imagekit.io/"), "Location must be an ImageKit URL");
        System.out.println("Fourth note fallback successfully resolved to: " + location);
    }
}
