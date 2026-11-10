package com.univgeeks.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.File;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        File[] candidates = new File[] {
            new File(".env"),
            new File("backend/.env"),
            new File("../backend/.env")
        };

        for (File candidate : candidates) {
            if (candidate.exists() && candidate.isFile()) {
                try {
                    Map<String, Object> props = new HashMap<>();
                    List<String> lines = Files.readAllLines(candidate.toPath());
                    for (String line : lines) {
                        line = line.trim();
                        if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
                            int idx = line.indexOf('=');
                            String key = line.substring(0, idx).trim();
                            String value = line.substring(idx + 1).trim();
                            props.put(key, value);
                        }
                    }

                    if (props.containsKey("MONGODB_URI")) {
                        props.put("spring.data.mongodb.uri", props.get("MONGODB_URI"));
                    } else if (props.containsKey("MONGO_URI")) {
                        props.put("spring.data.mongodb.uri", props.get("MONGO_URI"));
                    }
                    if (props.containsKey("PORT")) {
                        props.put("server.port", props.get("PORT"));
                    }
                    if (props.containsKey("CORS_ALLOWED_ORIGINS")) {
                        props.put("cors.allowed-origins", props.get("CORS_ALLOWED_ORIGINS"));
                    }
                    if (props.containsKey("ADMIN_USERNAME")) {
                        props.put("admin.username", props.get("ADMIN_USERNAME"));
                    }
                    if (props.containsKey("ADMIN_PASSWORD")) {
                        props.put("admin.password", props.get("ADMIN_PASSWORD"));
                    }
                    if (props.containsKey("ADMIN_EMAIL")) {
                        props.put("admin.email", props.get("ADMIN_EMAIL"));
                    }
                    if (props.containsKey("JWT_SECRET")) {
                        props.put("jwt.secret", props.get("JWT_SECRET"));
                    }
                    if (props.containsKey("IMAGEKIT_PUBLIC_KEY")) {
                        props.put("imagekit.public-key", props.get("IMAGEKIT_PUBLIC_KEY"));
                    }
                    if (props.containsKey("IMAGEKIT_PRIVATE_KEY")) {
                        props.put("imagekit.private-key", props.get("IMAGEKIT_PRIVATE_KEY"));
                    }
                    if (props.containsKey("IMAGEKIT_URL_ENDPOINT")) {
                        props.put("imagekit.url-endpoint", props.get("IMAGEKIT_URL_ENDPOINT"));
                    }

                    if (!props.isEmpty()) {
                        // Place before application.properties so that environment variables take precedence
                        environment.getPropertySources().addFirst(new MapPropertySource("dotenvProperties", props));
                    }
                    break;
                } catch (Exception ignored) {
                }
            }
        }
    }
}
