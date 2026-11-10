package com.univgeeks.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class PdfRedirectController {

    private static final Logger log = LoggerFactory.getLogger(PdfRedirectController.class);

    @Value("${frontend.url:https://univsvh.in}")
    private String frontendUrl;

    @GetMapping("/pdfs/**")
    public ResponseEntity<Void> redirectPdf(HttpServletRequest request) {
        String path = request.getRequestURI();
        String base = frontendUrl.replaceAll("/+$", "");
        String target = base + path;
        log.info("Redirecting backend PDF request from {} to frontend: {}", path, target);
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(target))
                .build();
    }
}
