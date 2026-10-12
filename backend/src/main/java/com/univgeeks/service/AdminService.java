package com.univgeeks.service;

import com.univgeeks.dto.AdminUserDto;
import com.univgeeks.dto.LoginResponse;
import com.univgeeks.model.Admin;
import com.univgeeks.repository.AdminRepository;
import com.univgeeks.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private static final Logger log = LoggerFactory.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Value("${admin.username:admin}")
    private String initialAdminUsername;

    @Value("${admin.password:}")
    private String initialAdminPassword;

    @Value("${admin.email:admin@univgeeks.in}")
    private String initialAdminEmail;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder,
                        JwtTokenProvider tokenProvider) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void bootstrapInitialAdmin() {
        try {
            if (initialAdminPassword == null || initialAdminPassword.trim().isEmpty()) {
                log.info("No ADMIN_PASSWORD provided in environment. Skipping initial admin bootstrap.");
                return;
            }

            String targetUsername = (initialAdminUsername != null && !initialAdminUsername.trim().isEmpty())
                    ? initialAdminUsername.trim() : "admin";
            String targetEmail = (initialAdminEmail != null && !initialAdminEmail.trim().isEmpty())
                    ? initialAdminEmail.trim() : "admin@univgeeks.in";

            Optional<Admin> existing = adminRepository.findByUsername(targetUsername);
            if (existing.isEmpty()) {
                String hashedPassword = passwordEncoder.encode(initialAdminPassword.trim());
                Admin newAdmin = new Admin(targetUsername, targetEmail, hashedPassword, "ROLE_ADMIN");
                adminRepository.save(newAdmin);
                log.info("Initial admin account created successfully for username '{}'", targetUsername);
            } else {
                log.info("Admin account '{}' already exists in database.", targetUsername);
            }
        } catch (Exception ex) {
            log.error("Could not bootstrap admin account: {}", ex.getMessage());
        }
    }

    public LoginResponse authenticate(String usernameOrEmail, String password) {
        if (usernameOrEmail == null || usernameOrEmail.trim().isEmpty() ||
                password == null || password.trim().isEmpty()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String identifier = usernameOrEmail.trim();

        // Check in database
        Optional<Admin> adminOpt;
        try {
            adminOpt = adminRepository.findByUsernameOrEmail(identifier, identifier);
        } catch (Exception e) {
            log.error("Database error looking up admin: {}", e.getMessage());
            // Check against configured environment credentials as fallback if DB connectivity is failing
            if (initialAdminPassword != null && !initialAdminPassword.trim().isEmpty()) {
                boolean matchesUsername = identifier.equalsIgnoreCase(initialAdminUsername);
                boolean matchesEmail = identifier.equalsIgnoreCase(initialAdminEmail);
                if ((matchesUsername || matchesEmail) && initialAdminPassword.trim().equals(password.trim())) {
                    String token = tokenProvider.generateToken(initialAdminUsername, initialAdminEmail, "ROLE_ADMIN");
                    return new LoginResponse(token, initialAdminUsername, initialAdminEmail);
                }
            }
            throw new BadCredentialsException("Invalid username or password");
        }

        if (adminOpt.isEmpty()) {
            // Also check if matches environment configured credentials
            if (initialAdminPassword != null && !initialAdminPassword.trim().isEmpty()) {
                boolean matchesUsername = identifier.equalsIgnoreCase(initialAdminUsername);
                boolean matchesEmail = identifier.equalsIgnoreCase(initialAdminEmail);
                if ((matchesUsername || matchesEmail) && initialAdminPassword.trim().equals(password.trim())) {
                    String token = tokenProvider.generateToken(initialAdminUsername, initialAdminEmail, "ROLE_ADMIN");
                    return new LoginResponse(token, initialAdminUsername, initialAdminEmail);
                }
            }
            throw new BadCredentialsException("Invalid username or password");
        }

        Admin admin = adminOpt.get();
        if (!passwordEncoder.matches(password.trim(), admin.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = tokenProvider.generateToken(admin.getUsername(), admin.getEmail(), admin.getRole());
        return new LoginResponse(token, admin.getUsername(), admin.getEmail());
    }

    public AdminUserDto getAdminProfile(String username) {
        try {
            Optional<Admin> adminOpt = adminRepository.findByUsername(username);
            if (adminOpt.isPresent()) {
                Admin admin = adminOpt.get();
                return new AdminUserDto(admin.getUsername(), admin.getEmail(), admin.getRole());
            }
        } catch (Exception e) {
            log.warn("Database lookup failed for admin profile: {}", e.getMessage());
        }

        // Return fallback profile for valid token username
        return new AdminUserDto(username, initialAdminEmail, "ROLE_ADMIN");
    }
}
