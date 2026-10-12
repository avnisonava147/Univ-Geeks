package com.univgeeks.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.util.concurrent.TimeUnit;

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

    @Bean
    public MongoClientSettingsBuilderCustomizer mongoTimeoutCustomizer() {
        return builder -> builder.applyToClusterSettings(
                settings -> settings.serverSelectionTimeout(2500, TimeUnit.MILLISECONDS)
        );
    }
}
