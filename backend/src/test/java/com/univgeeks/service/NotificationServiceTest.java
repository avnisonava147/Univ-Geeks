package com.univgeeks.service;

import com.univgeeks.dto.NotificationRequest;
import com.univgeeks.model.Notification;
import com.univgeeks.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    private NotificationService notificationService;

    @BeforeEach
    public void setUp() {
        notificationService = new NotificationService(notificationRepository);
    }

    @Test
    public void testCreateNotification_Success() {
        NotificationRequest request = new NotificationRequest(
                "New Class 12 PYQs Added",
                "2025 Board exam solved papers are now live for Chemistry and Physics.",
                "all",
                "sent",
                "/pyqs/class-12/physics/2025",
                "Just now",
                null
        );

        when(notificationRepository.save(any(Notification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Notification created = notificationService.createNotification(request);

        assertNotNull(created);
        assertNotNull(created.getId());
        assertEquals("New Class 12 PYQs Added", created.getTitle());
        assertEquals("2025 Board exam solved papers are now live for Chemistry and Physics.", created.getBody());
        assertEquals("all", created.getAudience());
        assertEquals("sent", created.getStatus());
        assertEquals("/pyqs/class-12/physics/2025", created.getLinkUrl());
        assertNotNull(created.getCreatedAt());
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    public void testCreateNotification_ValidationFailures() {
        assertThrows(IllegalArgumentException.class, () -> notificationService.createNotification(null));
        assertThrows(IllegalArgumentException.class, () -> notificationService.createNotification(new NotificationRequest("", "Body", "all", "sent", null, null, null)));
        assertThrows(IllegalArgumentException.class, () -> notificationService.createNotification(new NotificationRequest("Title", "", "all", "sent", null, null, null)));
    }

    @Test
    public void testGetActiveNotifications_ReturnsSentOnly() {
        Notification n1 = new Notification("n1", "Title 1", "Body 1", "all", "sent", "Today", Instant.now());
        Notification n2 = new Notification("n2", "Title 2", "Body 2", "all", "draft", null, Instant.now().minusSeconds(100));

        when(notificationRepository.findByStatusOrderByCreatedAtDesc("sent")).thenReturn(List.of(n1));

        List<Notification> active = notificationService.getActiveNotifications();
        assertEquals(1, active.size());
        assertEquals("Title 1", active.get(0).getTitle());
    }

    @Test
    public void testUpdateNotification_Success() {
        Notification existing = new Notification("notif-1", "Old Title", "Old Body", "all", "sent", "Yesterday", Instant.now());
        when(notificationRepository.findById("notif-1")).thenReturn(Optional.of(existing));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(inv -> inv.getArgument(0));

        NotificationRequest updateReq = new NotificationRequest("Updated Title", "Updated Body", "students", "sent", "/notes", "Today", null);
        Notification updated = notificationService.updateNotification("notif-1", updateReq);

        assertNotNull(updated);
        assertEquals("Updated Title", updated.getTitle());
        assertEquals("Updated Body", updated.getBody());
        assertEquals("students", updated.getAudience());
        assertEquals("/notes", updated.getLinkUrl());
    }

    @Test
    public void testDeleteNotification_Success() {
        when(notificationRepository.existsById("notif-1")).thenReturn(true);
        doNothing().when(notificationRepository).deleteById("notif-1");

        boolean deleted = notificationService.deleteNotification("notif-1");
        assertTrue(deleted);
        verify(notificationRepository, times(1)).deleteById("notif-1");
    }

    @Test
    public void testToggleStatus_Success() {
        Notification n = new Notification("notif-1", "Title", "Body", "all", "sent", "Now", Instant.now());
        when(notificationRepository.findById("notif-1")).thenReturn(Optional.of(n));
        when(notificationRepository.save(any(Notification.class))).thenAnswer(inv -> inv.getArgument(0));

        Notification toggled = notificationService.toggleStatus("notif-1");
        assertEquals("draft", toggled.getStatus());

        Notification toggledBack = notificationService.toggleStatus("notif-1");
        assertEquals("sent", toggledBack.getStatus());
    }
}
