package com.univgeeks.service;

import com.univgeeks.dto.DashboardStatsDto;
import com.univgeeks.model.Note;
import com.univgeeks.model.Pyq;
import com.univgeeks.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final NoteService noteService;
    private final PyqService pyqService;
    private final BannerService bannerService;
    private final AdminRepository adminRepository;

    public DashboardService(NoteService noteService,
                            PyqService pyqService,
                            BannerService bannerService,
                            AdminRepository adminRepository) {
        this.noteService = noteService;
        this.pyqService = pyqService;
        this.bannerService = bannerService;
        this.adminRepository = adminRepository;
    }

    public DashboardStatsDto getDashboardStats() {
        long totalNotes = 0;
        long totalPyqs = 0;
        long totalBanners = 0;
        long totalUsers = 1;
        long totalDownloads = 0;
        List<Map<String, Object>> activities = new ArrayList<>();

        try {
            List<Note> notes = noteService.getAllNotes();
            totalNotes = notes.size();
            for (Note n : notes) {
                totalDownloads += n.getDownloads();
            }

            List<Pyq> pyqs = pyqService.getAllPyqs();
            totalPyqs = pyqs.size();
            for (Pyq p : pyqs) {
                totalDownloads += p.getDownloads();
            }

            totalBanners = bannerService.getAllBanners().size();

            try {
                long userCount = adminRepository.count();
                if (userCount > 0) totalUsers = userCount;
            } catch (Exception ignored) {}

            // Recent activity from latest notes and pyqs
            for (int i = 0; i < Math.min(3, notes.size()); i++) {
                Note n = notes.get(i);
                Map<String, Object> act = new LinkedHashMap<>();
                act.put("text", "Note: " + n.getTitle() + " (" + n.getSubject() + " Class " + n.getClassLevel() + ")");
                act.put("time", n.getUpdatedAt() != null ? n.getUpdatedAt().toString() : "Recently");
                act.put("color", "#E8A33D");
                activities.add(act);
            }

            for (int i = 0; i < Math.min(3, pyqs.size()); i++) {
                Pyq p = pyqs.get(i);
                Map<String, Object> act = new LinkedHashMap<>();
                act.put("text", "PYQ: " + p.getTitle() + " (" + p.getSubject() + " " + p.getYear() + ")");
                act.put("time", p.getUploadedAt() != null ? p.getUploadedAt().toString() : "Recently");
                act.put("color", "#6B8F71");
                activities.add(act);
            }
        } catch (Exception ignored) {}

        return new DashboardStatsDto(totalNotes, totalPyqs, totalBanners, totalUsers, totalDownloads, activities);
    }
}
