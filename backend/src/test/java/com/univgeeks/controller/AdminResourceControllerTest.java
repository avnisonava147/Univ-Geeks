package com.univgeeks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.BannerRequest;
import com.univgeeks.dto.NoteRequest;
import com.univgeeks.dto.PyqRequest;
import com.univgeeks.model.Banner;
import com.univgeeks.model.Note;
import com.univgeeks.model.Pyq;
import com.univgeeks.security.JwtAuthenticationFilter;
import com.univgeeks.security.JwtTokenProvider;
import com.univgeeks.security.SecurityConfig;
import com.univgeeks.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdminResourceController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class})
public class AdminResourceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @MockBean
    private PyqService pyqService;

    @MockBean
    private NoteService noteService;

    @MockBean
    private BannerService bannerService;

    @MockBean
    private NotificationService notificationService;

    @MockBean
    private DashboardService dashboardService;

    @MockBean
    private FileStorageService fileStorageService;

    @MockBean
    private ImageKitService imageKitService;

    private String validToken;

    @BeforeEach
    void setUp() {
        validToken = tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN");
    }

    // ==========================================
    // Authentication Protection Tests
    // ==========================================

    @Test
    public void testUnauthenticatedAccess_Pyqs_RejectedWith401() throws Exception {
        mockMvc.perform(get("/api/admin/pyqs"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUnauthenticatedAccess_Notes_RejectedWith401() throws Exception {
        mockMvc.perform(get("/api/admin/notes"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUnauthenticatedAccess_Banners_RejectedWith401() throws Exception {
        mockMvc.perform(get("/api/admin/banners"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUnauthenticatedCreatePyq_RejectedWith401() throws Exception {
        PyqRequest request = new PyqRequest();
        request.setTitle("Physics 2025");
        request.setClassLevel("Class 12");
        request.setSubject("Physics");
        request.setExam("RBSE");
        request.setYear("2025");

        mockMvc.perform(post("/api/admin/pyqs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    // ==========================================
    // Authenticated Admin Operations Tests
    // ==========================================

    @Test
    public void testAuthenticatedAdmin_CreatePyq_Succeeds() throws Exception {
        PyqRequest request = new PyqRequest();
        request.setTitle("Physics 2025 Board Paper");
        request.setClassLevel("Class 12");
        request.setSubject("Physics");
        request.setExam("RBSE");
        request.setYear("2025");
        request.setFileUrl("/files/test.pdf");

        Pyq saved = new Pyq();
        saved.setId("pyq-101");
        saved.setTitle("Physics 2025 Board Paper");
        saved.setClassLevel("Class 12");
        saved.setSubject("Physics");
        saved.setExam("RBSE");
        saved.setYear("2025");
        saved.setFileUrl("/files/test.pdf");
        saved.setPublished(true);

        when(pyqService.createPyq(any(PyqRequest.class))).thenReturn(saved);

        mockMvc.perform(post("/api/admin/pyqs")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("pyq-101"))
                .andExpect(jsonPath("$.title").value("Physics 2025 Board Paper"));
    }

    @Test
    public void testAuthenticatedAdmin_UploadFileToImageKit_Success() throws Exception {
        org.springframework.mock.web.MockMultipartFile file = new org.springframework.mock.web.MockMultipartFile(
                "file", "paper.pdf", "application/pdf", "%PDF-1.4 sample".getBytes()
        );

        when(imageKitService.isConfigured()).thenReturn(true);
        when(imageKitService.uploadFile(any(), eq("/univ-geeks/pyqs")))
                .thenReturn(new com.univgeeks.dto.FileUploadResponse(
                        "https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/paper_123.pdf",
                        "paper_123.pdf", 0.5, "application/pdf", "ik_file_999"
                ));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("folder", "/univ-geeks/pyqs")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.url").value("https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/paper_123.pdf"))
                .andExpect(jsonPath("$.fileId").value("ik_file_999"));
    }

    @Test
    public void testAuthenticatedAdmin_UploadWhenImageKitNotConfigured_ReturnsServiceUnavailable() throws Exception {
        org.springframework.mock.web.MockMultipartFile file = new org.springframework.mock.web.MockMultipartFile(
                "file", "paper.pdf", "application/pdf", "%PDF-1.4 sample".getBytes()
        );

        when(imageKitService.isConfigured()).thenReturn(false);

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.error").value("Service Configuration Error"))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("ImageKit cloud storage is not configured")));
    }

    @Test
    public void testAuthenticatedAdmin_DeletePyq_Succeeds() throws Exception {
        when(pyqService.deletePyq(eq("pyq-101"))).thenReturn(true);

        mockMvc.perform(delete("/api/admin/pyqs/pyq-101")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("PYQ deleted successfully"));
    }

    @Test
    public void testAuthenticatedAdmin_CreateNote_Succeeds() throws Exception {
        NoteRequest request = new NoteRequest();
        request.setTitle("Electric Charges and Fields");
        request.setClassLevel("12");
        request.setSubject("Physics");
        request.setStream("Science");
        request.setChapterNo(1);
        request.setMedium("ENGLISH");
        request.setPdfUrl("/files/note1.pdf");

        Note saved = new Note();
        saved.setId("note-201");
        saved.setTitle("Electric Charges and Fields");
        saved.setClassLevel("12");
        saved.setSubject("Physics");
        saved.setStream("Science");
        saved.setChapterNo(1);
        saved.setMedium("ENGLISH");
        saved.setStatus("published");

        when(noteService.createNote(any(NoteRequest.class))).thenReturn(saved);

        mockMvc.perform(post("/api/admin/notes")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("note-201"))
                .andExpect(jsonPath("$.medium").value("ENGLISH"))
                .andExpect(jsonPath("$.title").value("Electric Charges and Fields"));
    }

    @Test
    public void testAuthenticatedAdmin_CreateBanner_Succeeds() throws Exception {
        BannerRequest request = new BannerRequest();
        request.setTitle("Board Exam Booster 2026");
        request.setImageColor("#E8A33D");
        request.setPriority(1);
        request.setActive(true);

        Banner saved = new Banner();
        saved.setId("ban-301");
        saved.setTitle("Board Exam Booster 2026");
        saved.setActive(true);

        when(bannerService.createBanner(any(BannerRequest.class))).thenReturn(saved);

        mockMvc.perform(post("/api/admin/banners")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("ban-301"))
                .andExpect(jsonPath("$.title").value("Board Exam Booster 2026"));
    }
}
