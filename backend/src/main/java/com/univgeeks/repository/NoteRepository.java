package com.univgeeks.repository;

import com.univgeeks.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByStatusIgnoreCase(String status);
    List<Note> findByClassLevelAndStatusIgnoreCase(String classLevel, String status);
    List<Note> findByClassLevelAndStreamIgnoreCaseAndStatusIgnoreCase(String classLevel, String stream, String status);
    List<Note> findByClassLevelAndStreamIgnoreCaseAndSubjectIgnoreCaseAndStatusIgnoreCase(String classLevel, String stream, String subject, String status);
    List<Note> findBySubjectIgnoreCaseAndStatusIgnoreCase(String subject, String status);
    List<Note> findAllByOrderByUpdatedAtDesc();
    long countByStatusIgnoreCase(String status);
}
