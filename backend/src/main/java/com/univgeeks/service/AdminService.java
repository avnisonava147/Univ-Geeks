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

import java.util.List;
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

    private volatile boolean mongoAvailable = true;
    private volatile long lastMongoFailure = 0;

    private boolean shouldAttemptMongo() {
        if (!mongoAvailable && (System.currentTimeMillis() - lastMongoFailure < 30000)) {
            return false;
        }
        return true;
    }

    private void recordMongoFailure(Exception ex, String operation) {
        mongoAvailable = false;
        lastMongoFailure = System.currentTimeMillis();
        log.warn("MongoDB unavailable in {}, using environment fallback: {}", operation, ex.getMessage());
    }

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

            Optional<Admin> existing = adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(targetUsername, targetEmail);
            if (existing.isEmpty()) {
                List<Admin> allAdmins = adminRepository.findAll();
                if (!allAdmins.isEmpty()) {
                    existing = Optional.of(allAdmins.get(0));
                }
            }

            if (existing.isEmpty()) {
                String hashedPassword = passwordEncoder.encode(initialAdminPassword.trim());
                Admin newAdmin = new Admin(targetUsername, targetEmail, hashedPassword, "ROLE_ADMIN");
                adminRepository.save(newAdmin);
                log.info("Initial admin account created successfully for username '{}'", targetUsername);
            } else {
                Admin admin = existing.get();
                boolean updated = false;

                if (targetUsername != null && !targetUsername.equalsIgnoreCase(admin.getUsername())) {
                    admin.setUsername(targetUsername);
                    updated = true;
                }
                if (targetEmail != null && !targetEmail.equalsIgnoreCase(admin.getEmail())) {
                    admin.setEmail(targetEmail);
                    updated = true;
                }
                if (initialAdminPassword != null && !initialAdminPassword.trim().isEmpty() &&
                        !passwordEncoder.matches(initialAdminPassword.trim(), admin.getPasswordHash())) {
                    admin.setPasswordHash(passwordEncoder.encode(initialAdminPassword.trim()));
                    updated = true;
                    log.info("Admin password hash updated from latest environment configuration.");
                }

                if (updated) {
                    adminRepository.save(admin);
                    log.info("Admin account '{}' ({}) synchronized with latest environment configuration.", admin.getUsername(), admin.getEmail());
                } else {
                    log.info("Admin account '{}' ({}) already up to date in database.", admin.getUsername(), admin.getEmail());
                }
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

        // 1. Look up admin in database (case-insensitive by username or email)
        Optional<Admin> adminOpt = Optional.empty();
        boolean dbAvailable = shouldAttemptMongo();
        if (dbAvailable) {
            try {
                adminOpt = adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(identifier, identifier);

                // If not found directly, check standard admin aliases
                if (adminOpt.isEmpty()) {
                    boolean isStandardAdmin = identifier.equalsIgnoreCase("admin") ||
                            identifier.equalsIgnoreCase("admin@univgeeks.in") ||
                            identifier.equalsIgnoreCase("admin@univgeeks.com") ||
                            (initialAdminUsername != null && identifier.equalsIgnoreCase(initialAdminUsername)) ||
                            (initialAdminEmail != null && identifier.equalsIgnoreCase(initialAdminEmail));

                    if (isStandardAdmin) {
                        if (initialAdminUsername != null) {
                            adminOpt = adminRepository.findByUsernameIgnoreCase(initialAdminUsername);
                        }
                        if (adminOpt.isEmpty() && initialAdminEmail != null) {
                            adminOpt = adminRepository.findByEmailIgnoreCase(initialAdminEmail);
                        }
                        if (adminOpt.isEmpty()) {
                            List<Admin> all = adminRepository.findAll();
                            if (!all.isEmpty()) {
                                adminOpt = Optional.of(all.get(0));
                            }
                        }
                    }
                }
            } catch (Exception e) {
                dbAvailable = false;
                recordMongoFailure(e, "admin lookup");
            }
        }

        // 2. If no admin record exists in DB, fallback to environment credentials
        if (adminOpt.isEmpty()) {
            if (initialAdminPassword != null && !initialAdminPassword.trim().isEmpty()) {
                boolean matchesUser = identifier.equalsIgnoreCase(initialAdminUsername) ||
                        identifier.equalsIgnoreCase("admin");
                boolean matchesEmail = identifier.equalsIgnoreCase(initialAdminEmail) ||
                        identifier.equalsIgnoreCase("admin@univgeeks.in") ||
                        identifier.equalsIgnoreCase("admin@univgeeks.com");

                if ((matchesUser || matchesEmail) && initialAdminPassword.trim().equals(password.trim())) {
                    String activeUser = (initialAdminUsername != null && !initialAdminUsername.isBlank()) ? initialAdminUsername : "admin";
                    String activeEmail = (initialAdminEmail != null && !initialAdminEmail.isBlank()) ? initialAdminEmail : "admin@univgeeks.in";
                    String hashedPassword = passwordEncoder.encode(initialAdminPassword.trim());
                    Admin created = new Admin(activeUser, activeEmail, hashedPassword, "ROLE_ADMIN");
                    if (dbAvailable) {
                        try {
                            adminRepository.save(created);
                        } catch (Exception ex) {
                            log.warn("Could not persist admin to DB: {}", ex.getMessage());
                        }
                    }
                    String token = tokenProvider.generateToken(activeUser, activeEmail, "ROLE_ADMIN");
                    return new LoginResponse(token, activeUser, activeEmail);
                }
            }
            throw new BadCredentialsException("Invalid username or password");
        }

        Admin admin = adminOpt.get();

        // 3. Verify BCrypt password hash
        boolean matches = passwordEncoder.matches(password.trim(), admin.getPasswordHash());

        // If stored hash doesn't match, check if password matches latest initialAdminPassword from environment
        // and if so, update the stored hash in MongoDB Atlas!
        if (!matches && initialAdminPassword != null && !initialAdminPassword.trim().isEmpty()) {
            if (password.trim().equals(initialAdminPassword.trim())) {
                admin.setPasswordHash(passwordEncoder.encode(initialAdminPassword.trim()));
                if (initialAdminEmail != null && !initialAdminEmail.trim().isEmpty()) {
                    admin.setEmail(initialAdminEmail.trim());
                }
                if (dbAvailable) {
                    try {
                        adminRepository.save(admin);
                        log.info("Updated admin credentials in MongoDB Atlas upon matching latest environment password.");
                    } catch (Exception ex) {
                        log.warn("Could not update admin password in DB: {}", ex.getMessage());
                    }
                }
                matches = true;
            }
        }

        if (!matches) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = tokenProvider.generateToken(admin.getUsername(), admin.getEmail(), admin.getRole());
        return new LoginResponse(token, admin.getUsername(), admin.getEmail());
    }

    public AdminUserDto getAdminProfile(String username) {
        if (shouldAttemptMongo()) {
            try {
                Optional<Admin> adminOpt = adminRepository.findByUsernameIgnoreCase(username);
                if (adminOpt.isPresent()) {
                    Admin admin = adminOpt.get();
                    return new AdminUserDto(admin.getUsername(), admin.getEmail(), admin.getRole());
                }
            } catch (Exception e) {
                recordMongoFailure(e, "admin profile lookup");
            }
        }

        return new AdminUserDto("admin", "admin@univgeeks.in", "ROLE_ADMIN");
    }
}
