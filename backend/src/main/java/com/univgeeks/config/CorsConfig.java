package com.univgeeks.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:https://univsvh.in,https://www.univsvh.in,https://univgeeks.in,https://www.univgeeks.in,https://univgeeks.com,https://www.univgeeks.com,http://localhost:3000,http://127.0.0.1:3000}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                java.util.Set<String> originSet = new java.util.LinkedHashSet<>(com.univgeeks.security.SecurityConfig.GUARANTEED_ORIGINS);
                if (allowedOrigins != null && !allowedOrigins.isBlank()) {
                    Arrays.stream(allowedOrigins.split(","))
                            .map(String::trim)
                            .map(s -> s.endsWith("/") ? s.substring(0, s.length() - 1) : s)
                            .filter(s -> !s.isEmpty())
                            .forEach(originSet::add);
                }

                registry.addMapping("/**")
                        .allowedOrigins(originSet.toArray(String[]::new))
                        .allowedOriginPatterns(
                                "https://univsvh.in",
                                "https://*.univsvh.in",
                                "https://univgeeks.in",
                                "https://*.univgeeks.in",
                                "https://univgeeks.com",
                                "https://*.univgeeks.com",
                                "http://localhost:*",
                                "http://127.0.0.1:*"
                        )
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
