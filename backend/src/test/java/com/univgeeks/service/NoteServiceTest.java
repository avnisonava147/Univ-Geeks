package com.univgeeks.service;

import com.univgeeks.dto.NoteRequest;
import com.univgeeks.model.Note;
import com.univgeeks.repository.NoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private ImageKitService imageKitService;

    @Mock
    private FileStorageService fileStorageService;

    private NoteService noteService;

    @BeforeEach
    public void setUp() throws Exception {
        java.nio.file.Path tempCache = java.nio.file.Files.createTempFile("test_notes_cache", ".json");
        tempCache.toFile().deleteOnExit();
        noteService = new NoteService(noteRepository, imageKitService, fileStorageService, tempCache);
    }

    @Test
    public void testNormalizeMedium() {
        assertEquals("ENGLISH", NoteService.normalizeMedium("ENGLISH"));
        assertEquals("ENGLISH", NoteService.normalizeMedium("English"));
        assertEquals("ENGLISH", NoteService.normalizeMedium("english medium"));
        assertEquals("HINDI", NoteService.normalizeMedium("HINDI"));
        assertEquals("HINDI", NoteService.normalizeMedium("Hindi"));
        assertEquals("HINDI", NoteService.normalizeMedium("hindi medium"));
        assertNull(NoteService.normalizeMedium(null));
        assertNull(NoteService.normalizeMedium(""));
        assertNull(NoteService.normalizeMedium("   "));
    }

    @Test
    public void testCreateEnglishAndHindiNotesForSameChapter() {
        when(noteRepository.save(any(Note.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Create English Note
        NoteRequest englishReq = new NoteRequest();
        englishReq.setTitle("Real Numbers - English");
        englishReq.setClassLevel("10");
        englishReq.setSubject("Mathematics");
        englishReq.setStream("Common");
        englishReq.setChapterNo(1);
        englishReq.setMedium("English Medium");
        englishReq.setPdfUrl("/pdfs/real-numbers-en.pdf");
        englishReq.setStatus("published");

        Note englishNote = noteService.createNote(englishReq);
        assertNotNull(englishNote.getId());
        assertEquals("ENGLISH", englishNote.getMedium());
        assertEquals(1, englishNote.getChapterNo());

        // Create Hindi Note for the SAME chapter and subject
        NoteRequest hindiReq = new NoteRequest();
        hindiReq.setTitle("Real Numbers - Hindi");
        hindiReq.setClassLevel("10");
        hindiReq.setSubject("Mathematics");
        hindiReq.setStream("Common");
        hindiReq.setChapterNo(1);
        hindiReq.setMedium("Hindi Medium");
        hindiReq.setPdfUrl("/pdfs/real-numbers-hi.pdf");
        hindiReq.setStatus("published");

        Note hindiNote = noteService.createNote(hindiReq);
        assertNotNull(hindiNote.getId());
        assertNotEquals(englishNote.getId(), hindiNote.getId(), "IDs must be unique so neither record overwrites the other");
        assertEquals("HINDI", hindiNote.getMedium());
        assertEquals(1, hindiNote.getChapterNo());

        // Verify public filtering by medium
        List<Note> englishOnly = noteService.getPublishedNotes("10", "Common", "Mathematics", "ENGLISH");
        assertEquals(1, englishOnly.size());
        assertEquals("ENGLISH", englishOnly.get(0).getMedium());
        assertEquals("/pdfs/real-numbers-en.pdf", englishOnly.get(0).getPdfUrl());

        List<Note> hindiOnly = noteService.getPublishedNotes("10", "Common", "Mathematics", "HINDI");
        assertEquals(1, hindiOnly.size());
        assertEquals("HINDI", hindiOnly.get(0).getMedium());
        assertEquals("/pdfs/real-numbers-hi.pdf", hindiOnly.get(0).getPdfUrl());

        List<Note> allPublished = noteService.getPublishedNotes("10", "Common", "Mathematics", null);
        assertEquals(2, allPublished.size());
    }

    @Test
    public void testLegacyNotesWithUnknownMediumBackwardCompatibility() {
        when(noteRepository.save(any(Note.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Create legacy note without medium
        NoteRequest legacyReq = new NoteRequest();
        legacyReq.setTitle("Polynomials");
        legacyReq.setClassLevel("10");
        legacyReq.setSubject("Mathematics");
        legacyReq.setChapterNo(2);
        legacyReq.setMedium(null); // Unknown / legacy
        legacyReq.setStatus("published");

        Note legacyNote = noteService.createNote(legacyReq);
        assertNull(legacyNote.getMedium(), "Old notes with unknown medium must safely remain null");

        // Legacy note without medium must remain visible under ENGLISH queries, not hidden
        List<Note> englishResults = noteService.getPublishedNotes("10", null, "Mathematics", "ENGLISH");
        assertEquals(1, englishResults.size(), "Legacy notes with missing medium must remain visible as English");

        // Should not match HINDI
        List<Note> hindiResults = noteService.getPublishedNotes("10", null, "Mathematics", "HINDI");
        assertEquals(0, hindiResults.size(), "Legacy notes must never show as Hindi");

        // Safe handling of explicitly unknown mediums: do not guess their language
        NoteRequest unknownReq = new NoteRequest();
        unknownReq.setTitle("Quadratic Equations");
        unknownReq.setClassLevel("10");
        unknownReq.setSubject("Mathematics");
        unknownReq.setChapterNo(4);
        unknownReq.setMedium("UNKNOWN_LANG");
        unknownReq.setStatus("published");
        noteService.createNote(unknownReq);

        List<Note> engCheck = noteService.getPublishedNotes("10", null, "Mathematics", "ENGLISH");
        assertTrue(engCheck.stream().noneMatch(n -> "Quadratic Equations".equals(n.getTitle())),
                "Unknown mediums must not be guessed as English");

        // Updating legacy note to explicitly assign medium
        when(noteRepository.findById(legacyNote.getId())).thenReturn(Optional.of(legacyNote));

        NoteRequest updateReq = new NoteRequest();
        updateReq.setMedium("English Medium");
        Note updated = noteService.updateNote(legacyNote.getId(), updateReq);

        assertEquals("ENGLISH", updated.getMedium());

        // Now matches English query with explicit tag
        List<Note> updatedEnglishResults = noteService.getPublishedNotes("10", null, "Mathematics", "ENGLISH");
        assertTrue(updatedEnglishResults.stream().anyMatch(n -> legacyNote.getId().equals(n.getId())));
    }
}
