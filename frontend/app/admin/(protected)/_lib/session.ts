// app/admin/(protected)/_lib/session.ts
//
// Frontend-only admin session. No backend is wired up yet, so we keep a
// lightweight sessionStorage-backed store that the protected layout reads via
// useSyncExternalStore. Replace the persistence calls with real API calls when
// the backend auth endpoints are ready — the exported function names are
// designed to stay the same.

export const ADMIN_SESSION_KEY = "univgeeks-admin-session";

export type AdminSession = {
  email: string;
  loggedInAt: string;
};

type Listener = () => void;

const listeners = new Set<Listener>();
let snapshot: AdminSession | null = null;
let initialized = false;

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const raw = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) {
      snapshot = null;
      return;
    }
    const parsed = JSON.parse(raw) as AdminSession;
    snapshot =
      parsed && typeof parsed.email === "string" ? parsed : null;
  } catch {
    snapshot = null;
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

/** Stable snapshot getter for useSyncExternalStore (client). */
export function getAdminSession(): AdminSession | null {
  ensureInitialized();
  return snapshot;
}

/** Stable server snapshot — sessions never exist during SSR. */
export function getServerAdminSession(): AdminSession | null {
  return null;
}

/** Subscription for useSyncExternalStore. */
export function subscribeAdminSession(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function saveAdminSession(email: string): AdminSession {
  const session: AdminSession = {
    email,
    loggedInAt: new Date().toISOString(),
  };
  snapshot = session;
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  }
  notify();
  return session;
}

export function clearAdminSession(): void {
  snapshot = null;
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
  notify();
}
