package com.univgeeks.config;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

public final class DotenvLoader {

    private DotenvLoader() {}

    public static void load() {
        File[] candidates = new File[] {
            new File(".env"),
            new File("backend/.env"),
            new File("../backend/.env")
        };

        for (File candidate : candidates) {
            if (candidate.exists() && candidate.isFile()) {
                try {
                    List<String> lines = Files.readAllLines(candidate.toPath());
                    for (String line : lines) {
                        line = line.trim();
                        if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
                            int idx = line.indexOf('=');
                            String key = line.substring(0, idx).trim();
                            String value = line.substring(idx + 1).trim();
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                            if ("MONGODB_URI".equals(key) || "MONGO_URI".equals(key)) {
                                if (System.getProperty("spring.data.mongodb.uri") == null && System.getenv("SPRING_DATA_MONGODB_URI") == null) {
                                    System.setProperty("spring.data.mongodb.uri", value);
                                }
                            }
                            if ("PORT".equals(key)) {
                                if (System.getProperty("server.port") == null && System.getenv("PORT") == null) {
                                    System.setProperty("server.port", value);
                                }
                            }
                            if ("CORS_ALLOWED_ORIGINS".equals(key)) {
                                if (System.getProperty("cors.allowed-origins") == null && System.getenv("CORS_ALLOWED_ORIGINS") == null) {
                                    System.setProperty("cors.allowed-origins", value);
                                }
                            }
                            if ("ADMIN_USERNAME".equals(key)) {
                                if (System.getProperty("admin.username") == null && System.getenv("ADMIN_USERNAME") == null) {
                                    System.setProperty("admin.username", value);
                                }
                            }
                            if ("ADMIN_PASSWORD".equals(key)) {
                                if (System.getProperty("admin.password") == null && System.getenv("ADMIN_PASSWORD") == null) {
                                    System.setProperty("admin.password", value);
                                }
                            }
                            if ("ADMIN_EMAIL".equals(key)) {
                                if (System.getProperty("admin.email") == null && System.getenv("ADMIN_EMAIL") == null) {
                                    System.setProperty("admin.email", value);
                                }
                            }
                            if ("JWT_SECRET".equals(key)) {
                                if (System.getProperty("jwt.secret") == null && System.getenv("JWT_SECRET") == null) {
                                    System.setProperty("jwt.secret", value);
                                }
                            }
                            if ("IMAGEKIT_PUBLIC_KEY".equals(key)) {
                                if (System.getProperty("imagekit.public-key") == null && System.getenv("IMAGEKIT_PUBLIC_KEY") == null) {
                                    System.setProperty("imagekit.public-key", value);
                                }
                            }
                            if ("IMAGEKIT_PRIVATE_KEY".equals(key)) {
                                if (System.getProperty("imagekit.private-key") == null && System.getenv("IMAGEKIT_PRIVATE_KEY") == null) {
                                    System.setProperty("imagekit.private-key", value);
                                }
                            }
                            if ("IMAGEKIT_URL_ENDPOINT".equals(key)) {
                                if (System.getProperty("imagekit.url-endpoint") == null && System.getenv("IMAGEKIT_URL_ENDPOINT") == null) {
                                    System.setProperty("imagekit.url-endpoint", value);
                                }
                            }
                        }
                    }
                    break;
                } catch (Exception ignored) {
                }
            }
        }
    }
}
