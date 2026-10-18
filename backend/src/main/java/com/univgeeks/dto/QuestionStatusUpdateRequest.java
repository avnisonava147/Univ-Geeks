package com.univgeeks.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionStatusUpdateRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public QuestionStatusUpdateRequest() {
    }

    public QuestionStatusUpdateRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
