package com.univgeeks.repository;

import com.univgeeks.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findAllByOrderByCreatedAtDesc();
    List<Question> findByStatusIgnoreCaseOrderByCreatedAtDesc(String status);
    List<Question> findBySubjectIgnoreCaseOrderByCreatedAtDesc(String subject);
    List<Question> findBySubjectIgnoreCaseAndStatusIgnoreCaseOrderByCreatedAtDesc(String subject, String status);
    long countByStatusIgnoreCase(String status);
}
