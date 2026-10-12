package com.univgeeks.dto;

import java.util.List;
import java.util.Map;

public class DashboardStatsDto {
    private long totalNotes;
    private long totalPyqs;
    private long totalBanners;
    private long totalUsers;
    private long totalDownloads;
    private List<Map<String, Object>> recentActivity;

    public DashboardStatsDto() {
    }

    public DashboardStatsDto(long totalNotes, long totalPyqs, long totalBanners, long totalUsers, long totalDownloads, List<Map<String, Object>> recentActivity) {
        this.totalNotes = totalNotes;
        this.totalPyqs = totalPyqs;
        this.totalBanners = totalBanners;
        this.totalUsers = totalUsers;
        this.totalDownloads = totalDownloads;
        this.recentActivity = recentActivity;
    }

    public long getTotalNotes() {
        return totalNotes;
    }

    public void setTotalNotes(long totalNotes) {
        this.totalNotes = totalNotes;
    }

    public long getTotalPyqs() {
        return totalPyqs;
    }

    public void setTotalPyqs(long totalPyqs) {
        this.totalPyqs = totalPyqs;
    }

    public long getTotalBanners() {
        return totalBanners;
    }

    public void setTotalBanners(long totalBanners) {
        this.totalBanners = totalBanners;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalDownloads() {
        return totalDownloads;
    }

    public void setTotalDownloads(long totalDownloads) {
        this.totalDownloads = totalDownloads;
    }

    public List<Map<String, Object>> getRecentActivity() {
        return recentActivity;
    }

    public void setRecentActivity(List<Map<String, Object>> recentActivity) {
        this.recentActivity = recentActivity;
    }
}
