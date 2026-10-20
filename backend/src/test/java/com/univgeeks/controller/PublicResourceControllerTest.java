package com.univgeeks.controller;

import com.univgeeks.model.Banner;
import com.univgeeks.model.Note;
import com.univgeeks.model.Pyq;
import com.univgeeks.security.JwtAuthenticationFilter;
import com.univgeeks.security.JwtTokenProvider;
import com.univgeeks.security.SecurityConfig;
import com.univgeeks.service.BannerService;
import com.univgeeks.service.FileStorageService;
import com.univgeeks.service.NoteService;
import com.univgeeks.service.PyqService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PublicResourceController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class})
public class PublicResourceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PyqService pyqService;

    @MockBean
    private NoteService noteService;

    @MockBean
    private BannerService bannerService;

    @MockBean
    private FileStorageService fileStorageService;

    @Test
    public void testPublicVisitors_CanReadPublishedPyqsWithoutAuth() throws Exception {
        Pyq p = new Pyq();
        p.setId("pyq-1");
        p.setTitle("Class 12 Physics 2025");
        p.setSubject("Physics");
        p.setPublished(true);

        when(pyqService.getPublishedPyqs(null, null, null)).thenReturn(List.of(p));

        mockMvc.perform(get("/api/pyqs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("pyq-1"))
                .andExpect(jsonPath("$[0].title").value("Class 12 Physics 2025"));
    }

    @Test
    public void testPublicVisitors_CanReadPublishedNotesWithoutAuth() throws Exception {
        Note n = new Note();
        n.setId("note-1");
        n.setTitle("Real Numbers");
        n.setSubject("Mathematics");
        n.setStatus("published");

        when(noteService.getPublishedNotes(null, null, null)).thenReturn(List.of(n));

        mockMvc.perform(get("/api/notes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("note-1"))
                .andExpect(jsonPath("$[0].title").value("Real Numbers"));
    }

    @Test
    public void testPublicVisitors_CanReadActiveBannersWithoutAuth() throws Exception {
        Banner b = new Banner();
        b.setId("ban-1");
        b.setTitle("Summer Crash Course 2026");
        b.setActive(true);

        when(bannerService.getActiveBanners()).thenReturn(List.of(b));

        mockMvc.perform(get("/api/banners"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("ban-1"))
                .andExpect(jsonPath("$[0].title").value("Summer Crash Course 2026"));
    }

    @Test
    public void testPublicVisitors_CanServeLocalFile_WhenExists() throws Exception {
        when(fileStorageService.fileExists("local_paper.pdf")).thenReturn(true);
        when(fileStorageService.loadFileAsResource("local_paper.pdf"))
                .thenReturn(new org.springframework.core.io.ByteArrayResource("%PDF-1.4 sample".getBytes()) {
                    @Override
                    public String getFilename() {
                        return "local_paper.pdf";
                    }
                });
        when(fileStorageService.getMediaTypeForFileName("local_paper.pdf"))
                .thenReturn(org.springframework.http.MediaType.APPLICATION_PDF);

        mockMvc.perform(get("/api/files/local_paper.pdf"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Type", "application/pdf"));
    }

    @Test
    public void testPublicVisitors_RedirectsToImageKit_WhenNotLocalButImageKitUrlExists() throws Exception {
        when(fileStorageService.fileExists("cloud_paper.pdf")).thenReturn(false);

        Pyq pyq = new Pyq();
        pyq.setId("pyq-ik-1");
        pyq.setFileName("cloud_paper.pdf");
        pyq.setFileUrl("https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/cloud_paper.pdf");
        pyq.setImageKitFileId("ik_file_123");

        when(pyqService.findByFileName("cloud_paper.pdf")).thenReturn(java.util.Optional.of(pyq));

        mockMvc.perform(get("/api/files/cloud_paper.pdf"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", "https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/cloud_paper.pdf"));
    }

    @Test
    public void testPublicVisitors_RedirectsToImageKit_WhenHexPrefixedFileRequested() throws Exception {
        when(fileStorageService.fileExists("bfa2a9db_TCS-NQT-Paper-4.pdf")).thenReturn(false);

        Pyq pyq = new Pyq();
        pyq.setId("pyq-4436a43d");
        pyq.setFileName("TCS-NQT-Paper-4_Ww2ob21PR.pdf");
        pyq.setFileUrl("https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/TCS-NQT-Paper-4_Ww2ob21PR.pdf");

        when(pyqService.findByFileName("bfa2a9db_TCS-NQT-Paper-4.pdf")).thenReturn(java.util.Optional.empty());
        when(pyqService.getAllPyqs()).thenReturn(List.of(pyq));

        mockMvc.perform(get("/api/files/bfa2a9db_TCS-NQT-Paper-4.pdf"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", "https://ik.imagekit.io/eguapakpx/univ-geeks/pyqs/TCS-NQT-Paper-4_Ww2ob21PR.pdf"));
    }

    @Test
    public void testPublicVisitors_Returns404_WhenFileNotFound() throws Exception {
        when(fileStorageService.fileExists("non_existent.pdf")).thenReturn(false);
        when(pyqService.findByFileName("non_existent.pdf")).thenReturn(java.util.Optional.empty());

        mockMvc.perform(get("/api/files/non_existent.pdf"))
                .andExpect(status().isNotFound());
    }
}
