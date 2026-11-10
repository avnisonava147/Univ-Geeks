package com.univgeeks.repository;

import com.univgeeks.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findAllByOrderByCreatedAtDesc();
    List<Notification> findByStatusOrderByCreatedAtDesc(String status);
}
