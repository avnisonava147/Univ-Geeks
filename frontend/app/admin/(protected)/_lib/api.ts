import { getAdminSession } from "./session";
import { getApiBaseUrl } from "@/app/_lib/apiConfig";

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

  // Include credentials for cookies (admin_token)
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

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
}
