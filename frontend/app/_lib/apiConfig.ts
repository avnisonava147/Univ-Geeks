export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return "https://univ-geeks.onrender.com";
    }
  }

  return "http://localhost:8080";
}

/**
 * Resolves a PDF URL or path to a valid, accessible target:
 * - Full HTTPS URLs (such as ImageKit) are returned as-is.
 * - Static frontend PDFs (/pdfs/...) are kept relative so they load from Hostinger/frontend.
 * - Backend file paths (/api/files/... or bare filenames) are prepended with the active API base URL.
 */
export function resolvePdfUrl(url?: string | null): string {
  if (!url) return "";
  let trimmed = url.trim();
  if (!trimmed || trimmed === "#") return "";

  const backendUrl = getApiBaseUrl();

  // If erroneously prefixed with backendUrl + /pdfs/, strip to local relative path
  if (backendUrl && trimmed.startsWith(`${backendUrl}/pdfs/`)) {
    trimmed = trimmed.substring(backendUrl.length);
  } else if (trimmed.startsWith("https://univ-geeks.onrender.com/pdfs/")) {
    trimmed = trimmed.replace("https://univ-geeks.onrender.com", "");
  }

  // 1. Full HTTP/HTTPS URLs (ImageKit, external CDN)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // 2. Static frontend assets bundled in public/ (e.g. /pdfs/...)
  if (trimmed.startsWith("/pdfs/")) {
    return trimmed;
  }

  // 3. Backend storage endpoints (e.g. /api/files/...)
  if (trimmed.startsWith("/api/")) {
    return backendUrl ? `${backendUrl}${trimmed}` : trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // 4. Bare filename uploaded to backend
  return backendUrl
    ? `${backendUrl}/api/files/${encodeURIComponent(trimmed)}`
    : `/api/files/${encodeURIComponent(trimmed)}`;
}
