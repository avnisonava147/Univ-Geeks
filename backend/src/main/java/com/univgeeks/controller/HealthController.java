package com.univgeeks.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @org.springframework.beans.factory.annotation.Value("${cors.allowed-origins:default}")
    private String configuredOrigins;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "Univ-Geeks Backend");
        response.put("version", "1.0.1-cors-fix");
        response.put("allowedOrigins", com.univgeeks.security.SecurityConfig.GUARANTEED_ORIGINS);
        response.put("configuredOrigins", configuredOrigins);
        response.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(response);
    }
}
