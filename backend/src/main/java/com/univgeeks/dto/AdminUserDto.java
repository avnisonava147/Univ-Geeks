package com.univgeeks.dto;

public class AdminUserDto {
    private String username;
    private String email;
    private String role;
    private boolean authenticated;

    public AdminUserDto() {
    }

    public AdminUserDto(String username, String email, String role) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.authenticated = true;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
