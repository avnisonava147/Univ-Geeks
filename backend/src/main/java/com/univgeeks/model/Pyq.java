package com.univgeeks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "pyqs")
public class Pyq {

    @Id
    private String id;

    private String title;
    private String classLevel; // e.g. "Class 10", "Class 12"
    private String subject;    // e.g. "Physics", "Chemistry", "Mathematics", "Biology", "Science"
    private String exam;       // e.g. "RBSE", "CBSE", "JEE Mains", "NEET"
    private String year;       // e.g. "2025", "2024"
    private String chapter;    // optional chapter name
    private String medium;     // "Hindi Medium", "English Medium"
    private String fileUrl;    // accessible PDF url or path
    private String fileName;   // uploaded original filename
    private String imageKitFileId; // ImageKit remote file ID
    private double fileSizeMb;
    private int downloads = 0;
    private boolean published = true;
    private Instant uploadedAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public Pyq() {
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

    public String getClassLevel() {
        return classLevel;
    }

    public void setClassLevel(String classLevel) {
        this.classLevel = classLevel;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
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

    public double getFileSizeMb() {
        return fileSizeMb;
    }

    public void setFileSizeMb(double fileSizeMb) {
        this.fileSizeMb = fileSizeMb;
    }

    public int getDownloads() {
        return downloads;
    }

    public void setDownloads(int downloads) {
        this.downloads = downloads;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public Instant getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(Instant uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
