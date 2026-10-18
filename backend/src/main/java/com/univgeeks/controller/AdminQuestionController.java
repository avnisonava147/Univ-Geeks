package com.univgeeks.controller;

import com.univgeeks.dto.BulkResolveRequest;
import com.univgeeks.dto.QuestionReplyRequest;
import com.univgeeks.dto.QuestionStatusUpdateRequest;
import com.univgeeks.model.Question;
import com.univgeeks.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/questions")
public class AdminQuestionController {

    private final QuestionService questionService;

    public AdminQuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "subject", required = false) String subject
    ) {
        List<Question> questions = questionService.getAllQuestions(search, status, subject);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        Question question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Question> updateQuestionStatus(
            @PathVariable String id,
            @Valid @RequestBody QuestionStatusUpdateRequest request
    ) {
        Question updated = questionService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Question> updateQuestionStatusPut(
            @PathVariable String id,
            @Valid @RequestBody QuestionStatusUpdateRequest request
    ) {
        Question updated = questionService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Question> replyToQuestion(
            @PathVariable String id,
            @Valid @RequestBody QuestionReplyRequest request
    ) {
        Question updated = questionService.replyToQuestion(id, request.getReply(), request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/bulk-resolve")
    public ResponseEntity<Map<String, Object>> bulkResolve(
            @Valid @RequestBody BulkResolveRequest request
    ) {
        int count = questionService.bulkResolve(request.getIds());
        return ResponseEntity.ok(Map.of(
                "message", "Successfully resolved " + count + " question(s)",
                "resolvedCount", count
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(Map.of("message", "Question deleted successfully"));
    }
}
