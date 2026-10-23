package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.NotificationRequest;
import com.univgeeks.model.Notification;
import com.univgeeks.repository.NotificationRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;
    private final ObjectMapper objectMapper;
    private final Map<String, Notification> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "notifications_cache.json");

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<Notification> cachedList = objectMapper.readValue(
                        cacheFilePath.toFile(),
                        new TypeReference<List<Notification>>() {}
                );
                for (Notification n : cachedList) {
                    if (n.getId() != null) {
                        localCache.put(n.getId(), n);
                    }
                }
                log.info("Loaded {} notifications from local persistent cache", localCache.size());
            }

            // Sync with MongoDB Atlas: load from DB first to preserve production truth
            try {
                List<Notification> dbList = notificationRepository.findAllByOrderByCreatedAtDesc();
                if (dbList != null && !dbList.isEmpty()) {
                    for (Notification n : dbList) {
                        if (n.getId() != null) {
                            localCache.put(n.getId(), n);
                        }
                    }
                    log.info("Synchronized {} notifications from MongoDB Atlas", dbList.size());
                }

                // If local cache contains notifications not yet in Atlas, persist them safely
                if (!localCache.isEmpty()) {
                    int syncedToDb = 0;
                    for (Notification n : localCache.values()) {
                        if (n.getId() != null && !notificationRepository.existsById(n.getId())) {
                            try {
                                notificationRepository.save(n);
                                syncedToDb++;
                            } catch (Exception ex) {
                                log.warn("Could not sync cached notification '{}' to MongoDB: {}", n.getTitle(), ex.getMessage());
                            }
                        }
                    }
                    if (syncedToDb > 0) {
                        log.info("Persisted {} previously uncommitted notifications from cache into MongoDB Atlas", syncedToDb);
                    }
                    persistCacheToFile();
                } else {
                    seedInitialNotifications();
                }
            } catch (Exception ex) {
                log.warn("Could not query MongoDB for notifications on startup (using cache fallback): {}", ex.getMessage());
                if (localCache.isEmpty()) {
                    seedInitialNotifications();
                }
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local Notifications cache: {}", ex.getMessage());
        }
    }

    private void seedInitialNotifications() {
        addSeedNotification("n-1", "New PYQ Papers Released for 2025-26", "Class 10 and 12 board preparation past papers are now available for Physics and Chemistry.", "all", "sent", "Today, 11:30 AM", "/pyqs");
        addSeedNotification("n-2", "Weekly Live Doubt Session this Saturday", "Join our master faculty at 5:00 PM IST for complete mechanics revision & mock solutions.", "students", "scheduled", "Upcoming", null);
        addSeedNotification("n-3", "Class 12 Study Notes Updated", "Comprehensive chapter notes and formula summaries are now available in the Notes section.", "all", "sent", "Yesterday, 3:15 PM", "/notes");
        persistCacheToFile();
    }

    private void addSeedNotification(String id, String title, String body, String audience, String status, String sentAt, String linkUrl) {
        Notification n = new Notification();
        n.setId(id);
        n.setTitle(title);
        n.setBody(body);
        n.setAudience(audience != null ? audience : "all");
        n.setStatus(status != null ? status : "sent");
        n.setSentAt(sentAt);
        n.setLinkUrl(linkUrl);
        n.setCreatedAt(Instant.now());
        n.setUpdatedAt(Instant.now());

        localCache.put(id, n);
        try {
            notificationRepository.save(n);
        } catch (Exception ignored) {}
    }

    private synchronized void persistCacheToFile() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            objectMapper.writeValue(cacheFilePath.toFile(), new ArrayList<>(localCache.values()));
        } catch (Exception ex) {
            log.warn("Could not save Notifications cache file: {}", ex.getMessage());
        }
    }

    public List<Notification> getActiveNotifications() {
        try {
            List<Notification> list = notificationRepository.findByStatusOrderByCreatedAtDesc("sent");
            if (list != null && !list.isEmpty()) {
                return list;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getActiveNotifications, using local cache: {}", ex.getMessage());
        }

        return localCache.values().stream()
                .filter(n -> "sent".equalsIgnoreCase(n.getStatus()))
                .sorted((a, b) -> {
                    if (a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return 0;
                })
                .collect(Collectors.toList());
    }

    public List<Notification> getAllNotifications() {
        try {
            List<Notification> fromDb = notificationRepository.findAllByOrderByCreatedAtDesc();
            if (fromDb != null && !fromDb.isEmpty()) {
                for (Notification n : fromDb) {
                    if (n.getId() != null) {
                        localCache.put(n.getId(), n);
                    }
                }
                persistCacheToFile();
                return fromDb;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getAllNotifications, using local cache: {}", ex.getMessage());
        }

        return localCache.values().stream()
                .sorted((a, b) -> {
                    if (a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return 0;
                })
                .collect(Collectors.toList());
    }

    public Optional<Notification> getNotificationById(String id) {
        try {
            return notificationRepository.findById(id);
        } catch (Exception ex) {
            return Optional.ofNullable(localCache.get(id));
        }
    }

    public Notification createNotification(NotificationRequest request) {
        if (request == null || request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Notification title is required");
        }
        if (request.getBody() == null || request.getBody().trim().isEmpty()) {
            throw new IllegalArgumentException("Notification body is required");
        }

        Notification notification = new Notification();
        notification.setId("notif-" + UUID.randomUUID().toString().substring(0, 8));
        notification.setTitle(request.getTitle().trim());
        notification.setBody(request.getBody().trim());
        notification.setAudience(request.getAudience() != null ? request.getAudience().trim() : "all");
        notification.setStatus(request.getStatus() != null ? request.getStatus().trim() : "sent");
        notification.setLinkUrl(request.getLinkUrl() != null && !request.getLinkUrl().trim().isEmpty() ? request.getLinkUrl().trim() : null);
        notification.setSentAt(request.getSentAt() != null ? request.getSentAt().trim() : "Just now");
        notification.setScheduledFor(request.getScheduledFor() != null ? request.getScheduledFor().trim() : null);
        notification.setCreatedAt(Instant.now());
        notification.setUpdatedAt(Instant.now());

        localCache.put(notification.getId(), notification);
        persistCacheToFile();

        try {
            Notification saved = notificationRepository.save(notification);
            if (saved != null) {
                localCache.remove(notification.getId());
                localCache.put(saved.getId(), saved);
                persistCacheToFile();
                log.info("Successfully persisted notification '{}' into MongoDB Atlas with ID: {}", saved.getTitle(), saved.getId());
                return saved;
            }
        } catch (Exception ex) {
            log.warn("MongoDB Atlas unavailable during notification save ({}), saved to local cache: {}", ex.getMessage(), notification.getTitle());
        }

        return notification;
    }

    public Notification updateNotification(String id, NotificationRequest request) {
        Notification notification = localCache.get(id);
        try {
            Optional<Notification> opt = notificationRepository.findById(id);
            if (opt.isPresent()) notification = opt.get();
        } catch (Exception ignored) {}

        if (notification == null) {
            throw new IllegalArgumentException("Notification not found with id: " + id);
        }

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            notification.setTitle(request.getTitle().trim());
        }
        if (request.getBody() != null && !request.getBody().trim().isEmpty()) {
            notification.setBody(request.getBody().trim());
        }
        if (request.getAudience() != null) {
            notification.setAudience(request.getAudience().trim());
        }
        if (request.getStatus() != null) {
            notification.setStatus(request.getStatus().trim());
        }
        if (request.getLinkUrl() != null) {
            notification.setLinkUrl(request.getLinkUrl().trim().isEmpty() ? null : request.getLinkUrl().trim());
        }
        if (request.getSentAt() != null) {
            notification.setSentAt(request.getSentAt().trim());
        }
        if (request.getScheduledFor() != null) {
            notification.setScheduledFor(request.getScheduledFor().trim());
        }
        notification.setUpdatedAt(Instant.now());

        localCache.put(id, notification);
        persistCacheToFile();

        try {
            return notificationRepository.save(notification);
        } catch (Exception ex) {
            log.warn("MongoDB Atlas unavailable during notification update, updated locally: {}", ex.getMessage());
            return notification;
        }
    }

    public boolean deleteNotification(String id) {
        boolean removed = localCache.remove(id) != null;
        persistCacheToFile();

        try {
            if (notificationRepository.existsById(id)) {
                notificationRepository.deleteById(id);
                return true;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable during notification delete: {}", ex.getMessage());
        }

        return removed;
    }

    public Notification toggleStatus(String id) {
        Notification notification = localCache.get(id);
        try {
            Optional<Notification> opt = notificationRepository.findById(id);
            if (opt.isPresent()) notification = opt.get();
        } catch (Exception ignored) {}

        if (notification == null) {
            throw new IllegalArgumentException("Notification not found with id: " + id);
        }

        if ("sent".equalsIgnoreCase(notification.getStatus())) {
            notification.setStatus("draft");
        } else {
            notification.setStatus("sent");
            notification.setSentAt("Just now");
        }
        notification.setUpdatedAt(Instant.now());

        localCache.put(id, notification);
        persistCacheToFile();

        try {
            return notificationRepository.save(notification);
        } catch (Exception ex) {
            return notification;
        }
    }
}
