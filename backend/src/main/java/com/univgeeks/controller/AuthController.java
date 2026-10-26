package com.univgeeks.controller;

import com.univgeeks.dto.AdminUserDto;
import com.univgeeks.dto.LoginRequest;
import com.univgeeks.dto.LoginResponse;
import com.univgeeks.service.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminService adminService;

    public AuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request,
                                               jakarta.servlet.http.HttpServletRequest httpRequest,
                                               HttpServletResponse response) {
        LoginResponse loginResponse = adminService.authenticate(request.getUsername(), request.getPassword());

        // Set HttpOnly cookie for secure session retention
        boolean isHttps = httpRequest.isSecure() || "https".equalsIgnoreCase(httpRequest.getHeader("X-Forwarded-Proto"));
        ResponseCookie cookie = ResponseCookie.from("admin_token", loginResponse.getToken())
                .httpOnly(true)
                .secure(isHttps)
                .path("/")
                .maxAge(86400) // 24 hours
                .sameSite(isHttps ? "None" : "Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(jakarta.servlet.http.HttpServletRequest httpRequest,
                                                      HttpServletResponse response) {
        // Clear cookie
        boolean isHttps = httpRequest.isSecure() || "https".equalsIgnoreCase(httpRequest.getHeader("X-Forwarded-Proto"));
        ResponseCookie cookie = ResponseCookie.from("admin_token", "")
                .httpOnly(true)
                .secure(isHttps)
                .path("/")
                .maxAge(0)
                .sameSite(isHttps ? "None" : "Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<AdminUserDto> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(401).build();
        }

        String username = auth.getName();
        AdminUserDto profile = adminService.getAdminProfile(username);
        return ResponseEntity.ok(profile);
    }
}
