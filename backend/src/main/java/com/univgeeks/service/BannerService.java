package com.univgeeks.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.univgeeks.dto.BannerRequest;
import com.univgeeks.model.Banner;
import com.univgeeks.repository.BannerRepository;
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
public class BannerService {

    private static final Logger log = LoggerFactory.getLogger(BannerService.class);

    private final BannerRepository bannerRepository;
    private final ImageKitService imageKitService;
    private final ObjectMapper objectMapper;
    private final Map<String, Banner> localCache = new ConcurrentHashMap<>();
    private final Path cacheFilePath = Paths.get("uploads", "banners_cache.json");

    public BannerService(BannerRepository bannerRepository,
                         ImageKitService imageKitService) {
        this.bannerRepository = bannerRepository;
        this.imageKitService = imageKitService;
        this.objectMapper = new ObjectMapper().findAndRegisterModules();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            if (Files.exists(cacheFilePath)) {
                List<Banner> cachedList = objectMapper.readValue(cacheFilePath.toFile(), new TypeReference<List<Banner>>() {});
                for (Banner b : cachedList) {
                    if (b.getId() != null) {
                        localCache.put(b.getId(), b);
                    }
                }
                log.info("Loaded {} banners from local persistent cache", localCache.size());
            }

            if (localCache.isEmpty()) {
                seedInitialBanners();
            }
        } catch (Exception ex) {
            log.warn("Could not initialize local Banners cache: {}", ex.getMessage());
        }
    }

    private void seedInitialBanners() {
        addSeedBanner("b1", "Summer Crash Course 2026", "https://univgeeks.in/courses/summer-crash", "#E8A33D", 1, true, "2026-06-01", "2026-07-31");
        addSeedBanner("b2", "JEE Advanced Mock Test Series", "https://univgeeks.in/mocks/jee-advanced", "#5B7A99", 2, true, "2026-08-01", "2026-09-30");
        addSeedBanner("b3", "NEET PYQ Mega Bundle", "https://univgeeks.in/bundles/neet-pyq", "#6B8F71", 3, true, "2026-07-15", "2026-10-15");
        persistCacheToFile();
    }

    private void addSeedBanner(String id, String title, String linkUrl, String imageColor, int priority, boolean active, String start, String end) {
        Banner b = new Banner();
        b.setId(id);
        b.setTitle(title);
        b.setLinkUrl(linkUrl);
        b.setImageColor(imageColor);
        b.setPriority(priority);
        b.setActive(active);
        b.setStartDate(start);
        b.setEndDate(end);
        b.setCreatedAt(Instant.now());
        b.setUpdatedAt(Instant.now());
        localCache.put(id, b);
    }

    private synchronized void persistCacheToFile() {
        try {
            Files.createDirectories(cacheFilePath.getParent());
            objectMapper.writeValue(cacheFilePath.toFile(), new ArrayList<>(localCache.values()));
        } catch (Exception ex) {
            log.warn("Could not save Banners cache file: {}", ex.getMessage());
        }
    }

    public List<Banner> getActiveBanners() {
        try {
            return bannerRepository.findByActiveTrueOrderByPriorityAsc();
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getActiveBanners, using local cache: {}", ex.getMessage());
            return localCache.values().stream()
                    .filter(Banner::isActive)
                    .sorted(Comparator.comparingInt(Banner::getPriority))
                    .collect(Collectors.toList());
        }
    }

    public List<Banner> getAllBanners() {
        try {
            List<Banner> fromDb = bannerRepository.findAllByOrderByPriorityAsc();
            if (fromDb != null && !fromDb.isEmpty()) {
                for (Banner b : fromDb) {
                    if (b.getId() != null) {
                        localCache.put(b.getId(), b);
                    }
                }
                persistCacheToFile();
                return fromDb;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable in getAllBanners, using local cache: {}", ex.getMessage());
        }

        return localCache.values().stream()
                .sorted(Comparator.comparingInt(Banner::getPriority))
                .collect(Collectors.toList());
    }

    public Optional<Banner> getBannerById(String id) {
        try {
            return bannerRepository.findById(id);
        } catch (Exception ex) {
            return Optional.ofNullable(localCache.get(id));
        }
    }

    public Banner createBanner(BannerRequest request) {
        Banner banner = new Banner();
        banner.setId("banner-" + UUID.randomUUID().toString().substring(0, 8));
        banner.setTitle(request.getTitle().trim());
        banner.setSubtitle(request.getSubtitle() != null ? request.getSubtitle().trim() : null);
        banner.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        banner.setLinkUrl(request.getLinkUrl() != null ? request.getLinkUrl().trim() : "");
        banner.setImageUrl(request.getImageUrl() != null ? request.getImageUrl().trim() : null);
        banner.setImageKitFileId(request.getImageKitFileId() != null ? request.getImageKitFileId().trim() : null);
        banner.setImageColor(request.getImageColor() != null ? request.getImageColor().trim() : "#E8A33D");
        banner.setPriority(request.getPriority() > 0 ? request.getPriority() : 1);
        banner.setActive(request.isActive());
        banner.setStartDate(request.getStartDate() != null ? request.getStartDate().trim() : null);
        banner.setEndDate(request.getEndDate() != null ? request.getEndDate().trim() : null);
        banner.setTargetPage(request.getTargetPage() != null ? request.getTargetPage().trim() : "all");
        banner.setCreatedAt(Instant.now());
        banner.setUpdatedAt(Instant.now());

        localCache.put(banner.getId(), banner);
        persistCacheToFile();

        try {
            Banner saved = bannerRepository.save(banner);
            if (saved != null) {
                localCache.remove(banner.getId());
                localCache.put(saved.getId(), saved);
                persistCacheToFile();
                return saved;
            }
        } catch (Exception ex) {
            log.warn("MongoDB Atlas unavailable during banner save ({}), saved locally: {}", ex.getMessage(), banner.getTitle());
        }

        return banner;
    }

    public Banner updateBanner(String id, BannerRequest request) {
        Banner banner = localCache.get(id);
        try {
            Optional<Banner> opt = bannerRepository.findById(id);
            if (opt.isPresent()) banner = opt.get();
        } catch (Exception ignored) {}

        if (banner == null) {
            throw new IllegalArgumentException("Banner not found with id: " + id);
        }

        banner.setTitle(request.getTitle().trim());
        banner.setSubtitle(request.getSubtitle() != null ? request.getSubtitle().trim() : null);
        banner.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        banner.setLinkUrl(request.getLinkUrl() != null ? request.getLinkUrl().trim() : "");
        if (request.getImageUrl() != null) banner.setImageUrl(request.getImageUrl().trim());
        if (request.getImageKitFileId() != null) banner.setImageKitFileId(request.getImageKitFileId().trim());
        if (request.getImageColor() != null) banner.setImageColor(request.getImageColor().trim());
        if (request.getPriority() > 0) banner.setPriority(request.getPriority());
        banner.setActive(request.isActive());
        if (request.getStartDate() != null) banner.setStartDate(request.getStartDate().trim());
        if (request.getEndDate() != null) banner.setEndDate(request.getEndDate().trim());
        if (request.getTargetPage() != null) banner.setTargetPage(request.getTargetPage().trim());
        banner.setUpdatedAt(Instant.now());

        localCache.put(id, banner);
        persistCacheToFile();

        try {
            return bannerRepository.save(banner);
        } catch (Exception ex) {
            return banner;
        }
    }

    public boolean deleteBanner(String id) {
        Banner banner = localCache.get(id);
        if (banner == null) {
            try {
                banner = bannerRepository.findById(id).orElse(null);
            } catch (Exception ignored) {}
        }

        if (banner != null && banner.getImageKitFileId() != null && !banner.getImageKitFileId().trim().isEmpty()) {
            try {
                imageKitService.deleteFile(banner.getImageKitFileId().trim());
            } catch (Exception e) {
                log.warn("Could not delete ImageKit file for Banner {}: {}", id, e.getMessage());
            }
        }

        boolean removed = localCache.remove(id) != null;
        persistCacheToFile();

        try {
            if (bannerRepository.existsById(id)) {
                bannerRepository.deleteById(id);
                return true;
            }
        } catch (Exception ex) {
            log.warn("MongoDB unavailable during banner delete: {}", ex.getMessage());
        }

        return removed;
    }

    public Banner toggleStatus(String id) {
        Banner banner = localCache.get(id);
        try {
            Optional<Banner> opt = bannerRepository.findById(id);
            if (opt.isPresent()) banner = opt.get();
        } catch (Exception ignored) {}

        if (banner == null) {
            throw new IllegalArgumentException("Banner not found with id: " + id);
        }

        banner.setActive(!banner.isActive());
        banner.setUpdatedAt(Instant.now());
        localCache.put(id, banner);
        persistCacheToFile();

        try {
            return bannerRepository.save(banner);
        } catch (Exception ex) {
            return banner;
        }
    }
}
