package com.univgeeks.dto;

public class FileUploadResponse {
    private String url;
    private String fileName;
    private double sizeMb;
    private String contentType;
    private String fileId;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String url, String fileName, double sizeMb, String contentType) {
        this(url, fileName, sizeMb, contentType, null);
    }

    public FileUploadResponse(String url, String fileName, double sizeMb, String contentType, String fileId) {
        this.url = url;
        this.fileName = fileName;
        this.sizeMb = sizeMb;
        this.contentType = contentType;
        this.fileId = fileId;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public double getSizeMb() {
        return sizeMb;
    }

    public void setSizeMb(double sizeMb) {
        this.sizeMb = sizeMb;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
