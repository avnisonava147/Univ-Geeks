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

    private final org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    public HealthController(@org.springframework.beans.factory.annotation.Autowired(required = false) org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "Univ-Geeks Backend");
        response.put("version", "1.0.2-mongo-fix");

        if (mongoTemplate != null) {
            try {
                org.bson.Document ping = mongoTemplate.executeCommand(new org.bson.Document("ping", 1));
                response.put("database", "CONNECTED");
            } catch (Exception ex) {
                response.put("database", "DISCONNECTED: " + ex.getMessage());
            }
        } else {
            response.put("database", "STANDALONE_CACHE_MODE");
        }

        response.put("allowedOrigins", com.univgeeks.security.SecurityConfig.GUARANTEED_ORIGINS);
        response.put("configuredOrigins", configuredOrigins);
        response.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(response);
    }
}
