package com.univgeeks.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class QuestionReplyRequest {

    @NotBlank(message = "Reply message is required")
    @Size(max = 5000, message = "Reply must not exceed 5000 characters")
    private String reply;

    private String status = "resolved";

    public QuestionReplyRequest() {
    }

    public QuestionReplyRequest(String reply, String status) {
        this.reply = reply;
        this.status = status;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
