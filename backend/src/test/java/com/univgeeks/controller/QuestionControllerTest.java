package com.univgeeks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.QuestionRequest;
import com.univgeeks.model.Question;
import com.univgeeks.security.JwtAuthenticationFilter;
import com.univgeeks.security.JwtTokenProvider;
import com.univgeeks.security.SecurityConfig;
import com.univgeeks.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class, JwtTokenProvider.class})
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private QuestionService questionService;

    @Test
    public void testPublicSubmission_Success() throws Exception {
        QuestionRequest request = new QuestionRequest("Sneha Patel", "sneha@gmail.com", "Chemistry", "How to balance redox reactions?");
        Question saved = new Question("Sneha Patel", "sneha@gmail.com", "Chemistry", "How to balance redox reactions?");
        saved.setId("q-test-101");

        when(questionService.createQuestion(any(QuestionRequest.class))).thenReturn(saved);

        mockMvc.perform(post("/api/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("q-test-101"))
                .andExpect(jsonPath("$.message").value("Your question has been submitted successfully!"));
    }

    @Test
    public void testPublicSubmission_ValidationError_MissingEmail() throws Exception {
        QuestionRequest request = new QuestionRequest("Sneha Patel", "", "Chemistry", "How to balance redox reactions?");

        mockMvc.perform(post("/api/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    public void testPublicSubmission_ValidationError_InvalidEmailFormat() throws Exception {
        QuestionRequest request = new QuestionRequest("Sneha Patel", "not-a-valid-email", "Chemistry", "How to balance redox reactions?");

        mockMvc.perform(post("/api/questions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }
}
