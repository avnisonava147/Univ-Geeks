import { getAdminSession } from "./session";
import { getApiBaseUrl } from "@/app/_lib/apiConfig";

/** Default timeout for admin API requests (60 s for uploads, 30 s for everything else) */
const DEFAULT_TIMEOUT_MS = 30_000;
const UPLOAD_TIMEOUT_MS = 60_000; // PDF uploads may take longer via ImageKit

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const backendUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${backendUrl}${endpoint}`;

  const headers = new Headers(options.headers || {});

  // Add Authorization header from admin session if available
  const session = getAdminSession();
  if (session?.token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  // If body is NOT FormData and Content-Type is not explicitly set, set application/json
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Choose timeout: longer for multipart uploads
  const timeoutMs = options.body instanceof FormData ? UPLOAD_TIMEOUT_MS : DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Include credentials for cookies (admin_token)
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorDetail = `Request failed with status ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && (errJson.message || errJson.error)) {
          errorDetail = errJson.message || errJson.error;
        }
      } catch {
        // If response is not JSON
      }
      throw new Error(errorDetail);
    }

    // For 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text() as unknown as T;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      throw new Error(
        `Request timed out after ${timeoutMs / 1000}s. Please check that the backend server is running and try again.`
      );
    }
    throw err;
  }
}
