package com.univgeeks.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String title;
    private String body;
    private String audience = "all"; // "all", "students", "premium"
    private String status = "sent";   // "sent", "scheduled", "draft"
    private String linkUrl;          // optional action link e.g. "/notes", "/pyqs"
    private String sentAt;           // e.g. "Today, 11:30 AM" or relative time
    private String scheduledFor;     // e.g. "2026-09-15 17:00"
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public Notification() {
    }

    public Notification(String id, String title, String body, String audience, String status, String sentAt, Instant createdAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.audience = audience != null ? audience : "all";
        this.status = status != null ? status : "sent";
        this.sentAt = sentAt;
        this.createdAt = createdAt != null ? createdAt : Instant.now();
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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public String getSentAt() {
        return sentAt;
    }

    public void setSentAt(String sentAt) {
        this.sentAt = sentAt;
    }

    public String getScheduledFor() {
        return scheduledFor;
    }

    public void setScheduledFor(String scheduledFor) {
        this.scheduledFor = scheduledFor;
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
