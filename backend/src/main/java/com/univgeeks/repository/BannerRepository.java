package com.univgeeks.repository;

import com.univgeeks.model.Banner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends MongoRepository<Banner, String> {
    List<Banner> findByActiveTrueOrderByPriorityAsc();
    List<Banner> findAllByOrderByPriorityAsc();
    long countByActiveTrue();
}
