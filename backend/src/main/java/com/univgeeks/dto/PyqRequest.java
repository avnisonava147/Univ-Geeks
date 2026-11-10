package com.univgeeks.dto;

import jakarta.validation.constraints.NotBlank;

public class PyqRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Class level is required")
    private String classLevel;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Exam name is required")
    private String exam;

    @NotBlank(message = "Year is required")
    private String year;

    private String chapter;
    private String medium;
    private String fileUrl;
    private String fileName;
    private String imageKitFileId;
    private double fileSizeMb = 1.0;
    private boolean published = true;

    public PyqRequest() {
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

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
}
