package com.univgeeks.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret:UnivGeeksSecretKeyForJwtAuthenticationTokensMustBeAtLeast32BytesLong!}")
    private String secret;

    @Value("${jwt.expiration-hours:24}")
    private long expirationHours;

    private static final String HMAC_ALGO = "HmacSHA256";

    public String generateToken(String username, String email, String role) {
        long now = Instant.now().getEpochSecond();
        long exp = now + (expirationHours * 3600);

        String headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payloadJson = String.format(
                "{\"sub\":\"%s\",\"email\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                escapeJson(username),
                escapeJson(email != null ? email : ""),
                escapeJson(role != null ? role : "ROLE_ADMIN"),
                now,
                exp
        );

        String encodedHeader = base64UrlEncode(headerJson.getBytes(StandardCharsets.UTF_8));
        String encodedPayload = base64UrlEncode(payloadJson.getBytes(StandardCharsets.UTF_8));
        String content = encodedHeader + "." + encodedPayload;
        String signature = sign(content, secret);

        return content + "." + signature;
    }

    public boolean validateToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            return false;
        }
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return false;
        }

        String content = parts[0] + "." + parts[1];
        String expectedSignature = sign(content, secret);
        if (!expectedSignature.equals(parts[2])) {
            log.warn("Invalid JWT signature");
            return false;
        }

        try {
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            long exp = extractLongClaim(payloadJson, "exp");
            long now = Instant.now().getEpochSecond();
            if (now > exp) {
                log.warn("JWT token expired (exp: {}, now: {})", exp, now);
                return false;
            }
            return true;
        } catch (Exception e) {
            log.warn("Failed to parse JWT payload: {}", e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length >= 2) {
                String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
                return extractStringClaim(payloadJson, "sub");
            }
        } catch (Exception e) {
            log.error("Could not extract username from token", e);
        }
        return null;
    }

    public String getEmailFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length >= 2) {
                String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
                return extractStringClaim(payloadJson, "email");
            }
        } catch (Exception e) {
            log.error("Could not extract email from token", e);
        }
        return null;
    }

    public String resolveToken(HttpServletRequest request) {
        // 1. Check Authorization header
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            String token = bearer.substring(7).trim();
            if (!token.isEmpty()) {
                return token;
            }
        }

        // 2. Check HttpOnly cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("admin_token".equals(cookie.getName()) && cookie.getValue() != null && !cookie.getValue().isEmpty()) {
                    return cookie.getValue().trim();
                }
            }
        }

        return null;
    }

    private String sign(String data, String secretKey) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGO);
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGO);
            mac.init(keySpec);
            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return base64UrlEncode(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }

    private String base64UrlEncode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String escapeJson(String s) {
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private String extractStringClaim(String json, String claim) {
        String pattern = "\"" + claim + "\":\"";
        int idx = json.indexOf(pattern);
        if (idx != -1) {
            int start = idx + pattern.length();
            int end = json.indexOf("\"", start);
            if (end != -1) {
                return json.substring(start, end);
            }
        }
        return null;
    }

    private long extractLongClaim(String json, String claim) {
        String pattern = "\"" + claim + "\":";
        int idx = json.indexOf(pattern);
        if (idx != -1) {
            int start = idx + pattern.length();
            int end = start;
            while (end < json.length() && (Character.isDigit(json.charAt(end)) || json.charAt(end) == '-')) {
                end++;
            }
            return Long.parseLong(json.substring(start, end).trim());
        }
        return 0L;
    }
}
