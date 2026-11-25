package com.univgeeks.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "important_pdfs")
public class ImportantPdf {

    @Id
    private String id;

    private String title;
    private String date; // "YYYY-MM-DD"
    private String fileSize; // e.g. "288.26 KB" or "2.26 MB"
    private String pdfUrl;
    private String fileName;
    private String imageKitFileId;

    @JsonProperty("isNew")
    private boolean isNew = true;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public ImportantPdf() {
    }

    public ImportantPdf(String id, String title, String date, String fileSize, String pdfUrl, boolean isNew) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.fileSize = fileSize;
        this.pdfUrl = pdfUrl;
        this.isNew = isNew;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getImageKitFileId() {
        return imageKitFileId;
    }

    public void setImageKitFileId(String imageKitFileId) {
        this.imageKitFileId = imageKitFileId;
    }

    // Annotated with @JsonIgnore to prevent Jackson from serializing as "new".
    // The field itself has @JsonProperty("isNew") which serializes it correctly.
    @com.fasterxml.jackson.annotation.JsonIgnore
    public boolean isNew() {
        return isNew;
    }

    @JsonProperty("isNew")
    public boolean getIsNew() {
        return isNew;
    }

    @com.fasterxml.jackson.annotation.JsonIgnore
    public void setNew(boolean isNew) {
        this.isNew = isNew;
    }

    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
