package com.univgeeks.controller;

import com.univgeeks.dto.QuestionRequest;
import com.univgeeks.model.Question;
import com.univgeeks.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<?> submitQuestion(@Valid @RequestBody QuestionRequest request) {
        Question created = questionService.createQuestion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Your question has been submitted successfully!",
                "id", created.getId(),
                "status", created.getStatus(),
                "createdAt", created.getCreatedAt()
        ));
    }
}
