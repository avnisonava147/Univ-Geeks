package com.univgeeks.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NotificationRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Body is required")
    @Size(max = 2000, message = "Body must not exceed 2000 characters")
    private String body;

    private String audience = "all";
    private String status = "sent";
    private String linkUrl;
    private String sentAt;
    private String scheduledFor;

    public NotificationRequest() {
    }

    public NotificationRequest(String title, String body, String audience, String status, String linkUrl, String sentAt, String scheduledFor) {
        this.title = title;
        this.body = body;
        this.audience = audience != null ? audience : "all";
        this.status = status != null ? status : "sent";
        this.linkUrl = linkUrl;
        this.sentAt = sentAt;
        this.scheduledFor = scheduledFor;
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
}
