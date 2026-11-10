package com.univgeeks.config;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import jakarta.annotation.PostConstruct;
import java.util.concurrent.TimeUnit;

@Configuration
public class MongoConfig {

    private static final Logger log = LoggerFactory.getLogger(MongoConfig.class);

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @PostConstruct
    public void init() {
        // Safe non-sensitive masked logging (never logs username/password)
        String maskedUri = mongoUri.replaceAll("(?<=://)[^/]+@", "****:****@");
        log.info("MongoDB configured with target URI: {}", maskedUri);
    }

    @Bean
    public MongoClientSettingsBuilderCustomizer mongoClientCustomizer() {
        return builder -> {
            builder.applyToClusterSettings(
                    settings -> settings.serverSelectionTimeout(15000, TimeUnit.MILLISECONDS)
            );
            builder.applyToSocketSettings(
                    socket -> socket.connectTimeout(15000, TimeUnit.MILLISECONDS)
            );
            builder.applyToSslSettings(ssl -> {
                ssl.enabled(true);
                ssl.invalidHostNameAllowed(false);
            });
        };
    }

    @Bean
    public ApplicationRunner mongoStartupDiagnostic(
            @Autowired(required = false) MongoTemplate mongoTemplate) {
        return args -> {
            if (mongoTemplate == null) {
                log.warn("[MongoDB Diagnostic] MongoTemplate is not available.");
                return;
            }

            try {
                Document ping = mongoTemplate.executeCommand(new Document("ping", 1));
                String dbName = mongoTemplate.getDb().getName();
                log.info("==================================================================");
                log.info("[MongoDB Diagnostic] MongoDB Atlas connection: SUCCESSFUL");
                log.info("[MongoDB Diagnostic] Connected Database: {}", dbName);
                log.info("[MongoDB Diagnostic] Ping Response: ok={}", ping.get("ok"));
                log.info("==================================================================");
            } catch (Exception ex) {
                log.error("==================================================================");
                log.error("[MongoDB Diagnostic] MongoDB Atlas connection: FAILED ({})", ex.getMessage());
                log.error("[MongoDB Diagnostic] Backend will operate using local cache fallback.");
                log.error("==================================================================");
            }
        };
    }
}
