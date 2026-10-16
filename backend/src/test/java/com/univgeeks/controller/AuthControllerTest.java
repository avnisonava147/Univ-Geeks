package com.univgeeks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.AdminUserDto;
import com.univgeeks.dto.LoginRequest;
import com.univgeeks.dto.LoginResponse;
import com.univgeeks.security.JwtAuthenticationFilter;
import com.univgeeks.security.JwtTokenProvider;
import com.univgeeks.security.SecurityConfig;
import com.univgeeks.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @MockBean
    private AdminService adminService;

    private String validToken;

    @BeforeEach
    void setUp() {
        validToken = tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN");
    }

    @Test
    public void testLogin_Success() throws Exception {
        LoginResponse response = new LoginResponse(validToken, "admin", "admin@univgeeks.in");
        when(adminService.authenticate(eq("admin"), eq("ValidPassword123!"))).thenReturn(response);

        LoginRequest request = new LoginRequest("admin", "ValidPassword123!");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(validToken))
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.email").value("admin@univgeeks.in"))
                .andExpect(header().exists("Set-Cookie"));
    }

    @Test
    public void testLogin_WithEmailField_Success() throws Exception {
        LoginResponse response = new LoginResponse(validToken, "admin", "admin@univgeeks.in");
        when(adminService.authenticate(eq("admin@univgeeks.in"), eq("ValidPassword123!"))).thenReturn(response);

        String jsonPayload = "{\"email\":\"admin@univgeeks.in\",\"password\":\"ValidPassword123!\"}";

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(validToken))
                .andExpect(jsonPath("$.username").value("admin"));
    }

    @Test
    public void testLogin_IncorrectPassword_Fails() throws Exception {
        when(adminService.authenticate(eq("admin"), eq("WrongPassword")))
                .thenThrow(new BadCredentialsException("Invalid username or password"));

        LoginRequest request = new LoginRequest("admin", "WrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    public void testLogin_ArbitraryCredentials_Fails() throws Exception {
        when(adminService.authenticate(anyString(), anyString()))
                .thenThrow(new BadCredentialsException("Invalid username or password"));

        LoginRequest request = new LoginRequest("random_hacker", "any_secret");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    public void testLogin_EmptyCredentials_Rejected() throws Exception {
        LoginRequest request = new LoginRequest("", "");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogout_Success() throws Exception {
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out successfully"))
                .andExpect(header().exists("Set-Cookie"));
    }

    @Test
    public void testMe_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testMe_AuthenticatedWithValidToken_Returns200() throws Exception {
        when(adminService.getAdminProfile("admin"))
                .thenReturn(new AdminUserDto("admin", "admin@univgeeks.in", "ROLE_ADMIN"));

        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.email").value("admin@univgeeks.in"));
    }
}
