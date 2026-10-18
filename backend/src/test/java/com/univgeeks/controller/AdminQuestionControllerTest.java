package com.univgeeks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.BulkResolveRequest;
import com.univgeeks.dto.QuestionReplyRequest;
import com.univgeeks.dto.QuestionStatusUpdateRequest;
import com.univgeeks.model.Question;
import com.univgeeks.security.JwtAuthenticationFilter;
import com.univgeeks.security.JwtTokenProvider;
import com.univgeeks.security.SecurityConfig;
import com.univgeeks.service.QuestionService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminQuestionController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class})
public class AdminQuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @MockBean
    private QuestionService questionService;

    private String validToken;

    @BeforeEach
    void setUp() {
        validToken = tokenProvider.generateToken("admin", "admin@univgeeks.in", "ROLE_ADMIN");
    }

    @Test
    public void testGetQuestions_Unauthenticated_Returns401() throws Exception {
        mockMvc.perform(get("/api/admin/questions"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testGetQuestions_Authenticated_ReturnsList() throws Exception {
        Question q = new Question("Harsh", "harsh@test.com", "Mathematics", "Calculus question");
        q.setId("q-1");

        when(questionService.getAllQuestions(null, null, null)).thenReturn(List.of(q));

        mockMvc.perform(get("/api/admin/questions")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("q-1"))
                .andExpect(jsonPath("$[0].name").value("Harsh"))
                .andExpect(jsonPath("$[0].email").value("harsh@test.com"));
    }

    @Test
    public void testUpdateStatus_Authenticated_Success() throws Exception {
        Question q = new Question("Harsh", "harsh@test.com", "Mathematics", "Calculus question");
        q.setId("q-1");
        q.setStatus("resolved");

        when(questionService.updateStatus(eq("q-1"), eq("resolved"))).thenReturn(q);

        QuestionStatusUpdateRequest request = new QuestionStatusUpdateRequest("resolved");

        mockMvc.perform(patch("/api/admin/questions/q-1/status")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("resolved"));
    }

    @Test
    public void testReply_Authenticated_Success() throws Exception {
        Question q = new Question("Harsh", "harsh@test.com", "Mathematics", "Calculus question");
        q.setId("q-1");
        q.setReply("Here is the answer");
        q.setStatus("resolved");

        when(questionService.replyToQuestion(eq("q-1"), eq("Here is the answer"), eq("resolved"))).thenReturn(q);

        QuestionReplyRequest request = new QuestionReplyRequest("Here is the answer", "resolved");

        mockMvc.perform(post("/api/admin/questions/q-1/reply")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.reply").value("Here is the answer"))
                .andExpect(jsonPath("$.status").value("resolved"));
    }

    @Test
    public void testBulkResolve_Authenticated_Success() throws Exception {
        when(questionService.bulkResolve(any())).thenReturn(2);

        BulkResolveRequest request = new BulkResolveRequest(List.of("q-1", "q-2"));

        mockMvc.perform(post("/api/admin/questions/bulk-resolve")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resolvedCount").value(2));
    }
}
