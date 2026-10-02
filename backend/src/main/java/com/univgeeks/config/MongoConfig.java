package com.univgeeks.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class MongoConfig {

    private static final Logger log = LoggerFactory.getLogger(MongoConfig.class);

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @PostConstruct
    public void init() {
        // Mask credentials if present for secure logging
        String maskedUri = mongoUri.replaceAll("://[^@]+@", "://****:****@");
        log.info("MongoDB configured with connection URI: {}", maskedUri);
    }
}
