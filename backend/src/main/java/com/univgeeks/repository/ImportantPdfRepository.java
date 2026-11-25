package com.univgeeks.repository;

import com.univgeeks.model.ImportantPdf;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportantPdfRepository extends MongoRepository<ImportantPdf, String> {
    List<ImportantPdf> findAllByOrderByDateDesc();
}
