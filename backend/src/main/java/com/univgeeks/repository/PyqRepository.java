package com.univgeeks.repository;

import com.univgeeks.model.Pyq;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PyqRepository extends MongoRepository<Pyq, String> {
    List<Pyq> findByPublishedTrue();
    List<Pyq> findByPublishedTrueOrderByUploadedAtDesc();
    List<Pyq> findBySubjectIgnoreCaseAndPublishedTrue(String subject);
    List<Pyq> findByClassLevelAndPublishedTrue(String classLevel);
    List<Pyq> findByClassLevelAndSubjectIgnoreCaseAndPublishedTrue(String classLevel, String subject);
    List<Pyq> findByClassLevelAndSubjectIgnoreCaseAndYearAndPublishedTrue(String classLevel, String subject, String year);
    List<Pyq> findAllByOrderByUploadedAtDesc();
    long countByPublishedTrue();
}
