package com.univgeeks.service;

import com.univgeeks.dto.LoginResponse;
import com.univgeeks.model.Admin;
import com.univgeeks.repository.AdminRepository;
import com.univgeeks.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private JwtTokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder;
    private AdminService adminService;

    @BeforeEach
    public void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        adminService = new AdminService(adminRepository, passwordEncoder, tokenProvider);

        ReflectionTestUtils.setField(adminService, "initialAdminUsername", "admin");
        ReflectionTestUtils.setField(adminService, "initialAdminPassword", "UnivGeeks@Admin2024");
        ReflectionTestUtils.setField(adminService, "initialAdminEmail", "admin@univgeeks.in");
    }

    @Test
    public void testAuthenticate_WithUsername_Success() {
        String hash = passwordEncoder.encode("UnivGeeks@Admin2024");
        Admin admin = new Admin("admin", "admin@univgeeks.in", hash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(eq("admin"), eq("admin")))
                .thenReturn(Optional.of(admin));
        when(tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN"))
                .thenReturn("mock_token_123");

        LoginResponse response = adminService.authenticate("admin", "UnivGeeks@Admin2024");

        assertNotNull(response);
        assertEquals("mock_token_123", response.getToken());
        assertEquals("admin", response.getUsername());
        assertEquals("admin@univgeeks.in", response.getEmail());
    }

    @Test
    public void testAuthenticate_WithEmail_Success() {
        String hash = passwordEncoder.encode("UnivGeeks@Admin2024");
        Admin admin = new Admin("admin", "admin@univgeeks.in", hash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(eq("admin@univgeeks.in"), eq("admin@univgeeks.in")))
                .thenReturn(Optional.of(admin));
        when(tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN"))
                .thenReturn("mock_token_456");

        LoginResponse response = adminService.authenticate("admin@univgeeks.in", "UnivGeeks@Admin2024");

        assertNotNull(response);
        assertEquals("mock_token_456", response.getToken());
    }

    @Test
    public void testAuthenticate_CaseInsensitiveUsername_Success() {
        String hash = passwordEncoder.encode("UnivGeeks@Admin2024");
        Admin admin = new Admin("admin", "admin@univgeeks.in", hash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(eq("ADMIN"), eq("ADMIN")))
                .thenReturn(Optional.of(admin));
        when(tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN"))
                .thenReturn("mock_token_789");

        LoginResponse response = adminService.authenticate("ADMIN", "UnivGeeks@Admin2024");

        assertNotNull(response);
        assertEquals("mock_token_789", response.getToken());
    }

    @Test
    public void testAuthenticate_WrongPassword_ThrowsException() {
        String hash = passwordEncoder.encode("UnivGeeks@Admin2024");
        Admin admin = new Admin("admin", "admin@univgeeks.in", hash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(eq("admin"), eq("admin")))
                .thenReturn(Optional.of(admin));

        assertThrows(BadCredentialsException.class, () -> {
            adminService.authenticate("admin", "WrongPassword999");
        });
    }

    @Test
    public void testAuthenticate_PasswordUpdateFromEnv_SynchronizesHash() {
        // Admin had an older password in MongoDB
        String oldHash = passwordEncoder.encode("OldPassword123");
        Admin admin = new Admin("admin", "admin@univgeeks.in", oldHash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase(eq("admin"), eq("admin")))
                .thenReturn(Optional.of(admin));
        when(tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN"))
                .thenReturn("mock_token_updated");

        // Logging in with the newly configured env password
        LoginResponse response = adminService.authenticate("admin", "UnivGeeks@Admin2024");

        assertNotNull(response);
        verify(adminRepository, times(1)).save(admin);
        assertTrue(passwordEncoder.matches("UnivGeeks@Admin2024", admin.getPasswordHash()));
    }

    @Test
    public void testBootstrap_ExistingAdmin_UpdatesWhenEnvDiffers() {
        String oldHash = passwordEncoder.encode("OldPassword123");
        Admin admin = new Admin("admin", "old@univgeeks.in", oldHash, "ROLE_ADMIN");

        when(adminRepository.findByUsernameIgnoreCaseOrEmailIgnoreCase("admin", "admin@univgeeks.in"))
                .thenReturn(Optional.of(admin));

        adminService.bootstrapInitialAdmin();

        assertEquals("admin@univgeeks.in", admin.getEmail());
        assertTrue(passwordEncoder.matches("UnivGeeks@Admin2024", admin.getPasswordHash()));
        verify(adminRepository, times(1)).save(admin);
    }
}
