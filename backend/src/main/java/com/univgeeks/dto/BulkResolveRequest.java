package com.univgeeks.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class BulkResolveRequest {

    @NotEmpty(message = "IDs list cannot be empty")
    private List<String> ids;

    public BulkResolveRequest() {
    }

    public BulkResolveRequest(List<String> ids) {
        this.ids = ids;
    }

    public List<String> getIds() {
        return ids;
    }

    public void setIds(List<String> ids) {
        this.ids = ids;
    }
}
