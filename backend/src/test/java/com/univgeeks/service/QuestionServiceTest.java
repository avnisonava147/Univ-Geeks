package com.univgeeks.service;

import com.univgeeks.dto.QuestionRequest;
import com.univgeeks.model.Question;
import com.univgeeks.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    private QuestionService questionService;

    @BeforeEach
    public void setUp() {
        questionService = new QuestionService(questionRepository);
    }

    @Test
    public void testCreateQuestion_Success() {
        QuestionRequest request = new QuestionRequest("Rahul Sharma", "rahul@example.com", "Physics", "Can you explain lens maker formula?");
        
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> {
            Question q = invocation.getArgument(0);
            q.setId("q-123");
            return q;
        });

        Question created = questionService.createQuestion(request);

        assertNotNull(created);
        assertEquals("q-123", created.getId());
        assertEquals("Rahul Sharma", created.getName());
        assertEquals("rahul@example.com", created.getEmail());
        assertEquals("Physics", created.getSubject());
        assertEquals("Can you explain lens maker formula?", created.getMessage());
        assertEquals("open", created.getStatus());
        assertNotNull(created.getCreatedAt());
        verify(questionRepository, times(1)).save(any(Question.class));
    }

    @Test
    public void testCreateQuestion_ValidationFailures() {
        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(null));
        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(new QuestionRequest("", "test@example.com", "Subj", "Msg")));
        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(new QuestionRequest("Name", "", "Subj", "Msg")));
        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(new QuestionRequest("Name", "test@example.com", "", "Msg")));
        assertThrows(IllegalArgumentException.class, () -> questionService.createQuestion(new QuestionRequest("Name", "test@example.com", "Subj", "")));
    }

    @Test
    public void testUpdateStatus_Success() {
        Question q = new Question("Aman", "aman@example.com", "Math", "Integration question");
        q.setId("q-1");
        q.setStatus("open");

        when(questionRepository.findById("q-1")).thenReturn(Optional.of(q));
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Question updated = questionService.updateStatus("q-1", "resolved");
        assertEquals("resolved", updated.getStatus());

        Question reopened = questionService.updateStatus("q-1", "open");
        assertEquals("open", reopened.getStatus());
    }

    @Test
    public void testReplyToQuestion_Success() {
        Question q = new Question("Neha", "neha@example.com", "Chemistry", "Organic chemistry doubt");
        q.setId("q-2");
        q.setStatus("open");

        when(questionRepository.findById("q-2")).thenReturn(Optional.of(q));
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Question answered = questionService.replyToQuestion("q-2", "Here is the reaction mechanism...", "resolved");
        assertEquals("resolved", answered.getStatus());
        assertEquals("Here is the reaction mechanism...", answered.getReply());
        assertNotNull(answered.getRepliedAt());
    }

    @Test
    public void testBulkResolve_Success() {
        Question q1 = new Question("User 1", "u1@example.com", "Physics", "Question 1");
        q1.setId("q-1");
        Question q2 = new Question("User 2", "u2@example.com", "Physics", "Question 2");
        q2.setId("q-2");

        when(questionRepository.findById("q-1")).thenReturn(Optional.of(q1));
        when(questionRepository.findById("q-2")).thenReturn(Optional.of(q2));

        int count = questionService.bulkResolve(List.of("q-1", "q-2"));
        assertEquals(2, count);
        verify(questionRepository, times(1)).saveAll(anyList());
    }

    @Test
    public void testGetAllQuestions_WithFilters() {
        Question q1 = new Question("Ankit", "ankit@test.com", "Mathematics", "Calculus doubt");
        q1.setStatus("open");
        Question q2 = new Question("Pooja", "pooja@test.com", "Physics", "Electromagnetism");
        q2.setStatus("resolved");

        when(questionRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(q1, q2));

        List<Question> all = questionService.getAllQuestions(null, null, null);
        assertEquals(2, all.size());

        List<Question> openOnly = questionService.getAllQuestions(null, "open", null);
        assertEquals(1, openOnly.size());
        assertEquals("Ankit", openOnly.get(0).getName());

        List<Question> physicsOnly = questionService.getAllQuestions(null, null, "Physics");
        assertEquals(1, physicsOnly.size());
        assertEquals("Pooja", physicsOnly.get(0).getName());

        List<Question> searchResults = questionService.getAllQuestions("calculus", null, null);
        assertEquals(1, searchResults.size());
        assertEquals("Ankit", searchResults.get(0).getName());
    }
}
