"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, Loader2, RefreshCw, CheckCheck, ExternalLink } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { getApiBaseUrl } from "@/app/_lib/apiConfig";

const navItems = [
  { label: "Home", href: "/" },
  { label: "PYQs", href: "/pyqs" },
  { label: "Notes", href: "/notes" },
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
];

const READ_STORAGE_KEY = "univgeeks_read_notifications";

interface PublicNotification {
  id: string;
  title: string;
  body: string;
  audience?: string;
  status?: string;
  linkUrl?: string | null;
  sentAt?: string | null;
  createdAt?: string;
}

function formatNotificationTime(sentAt?: string | null, createdAt?: string | null): string {
  if (sentAt && sentAt !== "Just now" && !sentAt.includes("T")) {
    return sentAt;
  }
  const dateStr = createdAt || sentAt;
  if (!dateStr) return "Recently";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return sentAt || "Recently";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0 || diffMs < 60000) return "Just now";
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return sentAt || "Recently";
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Real backend notifications state
  const [notifications, setNotifications] = useState<PublicNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize read notifications from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(READ_STORAGE_KEY);
      if (stored) {
        setReadIds(new Set(JSON.parse(stored)));
      }
    } catch {}
  }, []);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    const backendUrl = getApiBaseUrl();
    try {
      let res: Response;
      try {
        res = await fetch(`${backendUrl}/api/notifications`);
      } catch (networkErr: any) {
        if (backendUrl !== "https://univ-geeks.onrender.com") {
          res = await fetch("https://univ-geeks.onrender.com/api/notifications");
        } else {
          throw networkErr;
        }
      }

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const markAsRead = (id: string) => {
    setReadIds((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      try {
        localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
  };

  const markAllAsRead = () => {
    const allIds = new Set(notifications.map((n) => n.id));
    setReadIds(allIds);
    try {
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(Array.from(allIds)));
    } catch {}
  };

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`sticky top-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${
        isScrolled ? "pt-3 px-4 sm:px-8" : "pt-0 px-0"
      }`}
    >
      <header
        className={`w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-6xl rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            : "max-w-full rounded-none border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
            isScrolled ? "px-4 py-2.5 sm:px-6" : "px-4 py-3.5 sm:px-6"
          }`}
        >

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="UnivGeeks Logo"
              className={`rounded-full border border-slate-200 shadow-xs transition-all duration-300 ${
                isScrolled ? "h-10 w-10" : "h-11 w-11"
              }`}
            />

            <div>
              <div className="text-lg font-black leading-none text-slate-900 tracking-tight">
                UNIV
              </div>
              <div className="text-lg font-black leading-none text-cyan-600 tracking-tight">
                GEEKS
              </div>
            </div>
          </Link>

          {/* Navigation with Active State Indicator */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-3.5 py-1.5 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "text-blue-600 bg-blue-50/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  )}
                </Link>
              );
            })}
          </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                if (!notificationOpen && notifications.length === 0 && !loading) {
                  fetchNotifications();
                }
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              <Bell size={19} />

              {/* Dynamic Notification Count */}
              {unreadCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-xs">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-88 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">

                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Notifications
                    </h3>

                    {unreadCount > 0 ? (
                      <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                        {unreadCount} New
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        All read
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition"
                      title="Mark all notifications as read"
                    >
                      <CheckCheck size={13} />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* Dropdown Body: Loading / Error / Empty / Real Items */}
                <div className="max-h-80 overflow-y-auto space-y-1.5 pr-0.5">
                  {loading && notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                      <Loader2 size={20} className="animate-spin text-blue-600 mb-2" />
                      <p className="text-xs font-medium">Checking updates...</p>
                    </div>
                  ) : error ? (
                    <div className="py-6 px-3 text-center">
                      <p className="text-xs text-red-600 font-medium">{error}</p>
                      <button
                        type="button"
                        onClick={fetchNotifications}
                        className="mt-2.5 inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline"
                      >
                        <RefreshCw size={12} />
                        <span>Retry</span>
                      </button>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-400">
                      <Bell size={24} className="mx-auto text-slate-300 mb-1.5" />
                      <p className="text-xs font-medium text-slate-600">No notifications yet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        New announcements and releases will appear here.
                      </p>
                    </div>
                  ) : (
                    notifications.map((n) => {
                      const isUnread = !readIds.has(n.id);
                      const relativeTime = formatNotificationTime(n.sentAt, n.createdAt);
                      const validUrl = typeof n.linkUrl === "string" ? n.linkUrl.trim() : "";
                      const hasValidUrl = validUrl.length > 0;
                      const isExternal = hasValidUrl && (validUrl.startsWith("http://") || validUrl.startsWith("https://"));

                      const CardContent = (
                        <div
                          className={`rounded-xl p-2.5 transition flex items-start justify-between gap-2 ${
                            isUnread
                              ? "bg-blue-50/50 hover:bg-blue-50/80 border border-blue-100/60"
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              {isUnread && (
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              )}
                              <p className={`text-xs truncate ${isUnread ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                                {n.title}
                              </p>
                            </div>

                            <p className="mt-0.5 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                              {n.body}
                            </p>

                            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                              <span>{relativeTime}</span>
                              {hasValidUrl && (
                                <span className="inline-flex items-center gap-0.5 text-blue-600 font-medium hover:underline">
                                  <span>View</span>
                                  <ExternalLink size={10} />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );

                      if (hasValidUrl) {
                        return (
                          <Link
                            key={n.id}
                            href={validUrl}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              markAsRead(n.id);
                              setNotificationOpen(false);
                            }}
                            className="block"
                          >
                            {CardContent}
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className="cursor-pointer"
                        >
                          {CardContent}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Explore Notes / Donate Button (Desktop) */}
          <Link
            href="/donate"
            className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:brightness-105 active:scale-95"
          >
            Donate Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="relative z-20 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 md:hidden hover:bg-slate-100 active:scale-95 touch-manipulation cursor-pointer select-none"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <X size={19} className="pointer-events-none" />
            ) : (
              <Menu size={19} className="pointer-events-none" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-slate-100 bg-white/98 md:hidden rounded-b-2xl">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 space-y-1">

            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/notes"
              className="mt-2 block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Explore Notes
            </Link>

            <Link
              href="/donate"
              className="mt-1 block rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-center text-sm font-bold text-blue-700 transition hover:bg-blue-100"
              onClick={() => setIsOpen(false)}
            >
              Donate Us
            </Link>

          </div>
        </nav>
      )}
    </header>
  </div>
  );
}