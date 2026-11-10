// app/admin/(protected)/notifications/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Bell,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Loader2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { apiRequest } from "../_lib/api";

type Audience = "all" | "students" | "premium";
type DeliveryStatus = "sent" | "scheduled" | "draft";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  audience: Audience;
  status: DeliveryStatus;
  linkUrl?: string | null;
  sentAt?: string | null;
  scheduledFor?: string | null;
  createdAt: string;
  updatedAt?: string;
}

const AUDIENCE_CONFIG: Record<Audience, { label: string; color: string }> = {
  all: { label: "All Users", color: "#1C2B3A" },
  students: { label: "Students", color: "#5B7A99" },
  premium: { label: "Premium", color: "#E8A33D" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [filterTab, setFilterTab] = useState<"all" | "sent" | "scheduled">("all");

  // Compose state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [audience, setAudience] = useState<Audience>("all");
  const [mode, setMode] = useState<"now" | "schedule">("now");
  const [scheduleTime, setScheduleTime] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadNotifications = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await apiRequest<NotificationItem[]>("/api/admin/notifications");
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load notifications from backend");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const filtered = useMemo(() => {
    if (filterTab === "all") return notifications;
    return notifications.filter((n) => n.status === filterTab);
  }, [notifications, filterTab]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      body: body.trim(),
      audience,
      status: mode === "now" ? "sent" : "scheduled",
      linkUrl: linkUrl.trim() || null,
      sentAt: mode === "now" ? "Just now" : undefined,
      scheduledFor: mode === "schedule" ? scheduleTime || "Upcoming" : undefined,
    };

    try {
      const created = await apiRequest<NotificationItem>("/api/admin/notifications", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setNotifications((prev) => [created, ...prev.filter((n) => n.id !== created.id)]);
      setTitle("");
      setBody("");
      setLinkUrl("");
      setScheduleTime("");
      setToastMessage(
        mode === "now"
          ? "Notification broadcast sent successfully and published to live website!"
          : "Notification scheduled successfully!"
      );

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch (err: any) {
      setError(err.message || "Failed to publish notification. Please verify backend connection.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (deletingId) return;
    setDeletingId(id);
    setError(null);

    try {
      await apiRequest(`/api/admin/notifications/${id}`, {
        method: "DELETE",
      });

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setToastMessage("Notification deleted successfully.");
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete notification.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Notifications</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Compose targeted announcements and broadcast live alerts to the public website.
          </p>
        </div>

        <button
          onClick={() => loadNotifications(true)}
          disabled={refreshing || loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1C2B3A] bg-white border border-[#E5E0D5] rounded-md hover:bg-[#FAF7F2] transition disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {toastMessage && (
        <div className="bg-[#6B8F71]/10 text-[#6B8F71] border border-[#6B8F71]/20 px-4 py-3 rounded-md text-sm flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#6B8F71] hover:text-[#1C2B3A] text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="bg-[#B0533E]/10 text-[#B0533E] border border-[#B0533E]/20 px-4 py-3 rounded-md text-sm flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-[#B0533E] hover:text-[#1C2B3A] text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main 2-Column Grid: Compose on left, History on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Compose Notification */}
        <div className="lg:col-span-5 bg-white rounded-md border border-[#E5E0D5]">
          <div className="px-5 py-4 border-b border-[#E5E0D5] flex items-center gap-2">
            <Bell size={16} className="text-[#E8A33D]" />
            <h2 className="text-sm font-semibold text-[#1C2B3A]">Compose Notification</h2>
          </div>

          <form onSubmit={handleSend} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">
                Notification Title <span className="text-[#B0533E]">*</span>
              </label>
              <input
                type="text"
                required
                disabled={submitting}
                placeholder="e.g. 📚 New Notes Added or 📝 PYQs Updated"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">
                Message Body <span className="text-[#B0533E]">*</span>
              </label>
              <textarea
                required
                rows={4}
                disabled={submitting}
                placeholder="Write message details clearly..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full resize-none disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">
                Action / Link URL <span className="text-xs text-[#9CA3AF] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                disabled={submitting}
                placeholder="e.g. /notes or /pyqs/class-12/physics/2025"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">
                Audience Segment
              </label>
              <select
                value={audience}
                disabled={submitting}
                onChange={(e) => setAudience(e.target.value as Audience)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full disabled:opacity-60"
              >
                <option value="all">All Registered Users</option>
                <option value="students">Students Only</option>
                <option value="premium">Premium Pass Holders</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">
                Dispatch Schedule
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setMode("now")}
                  className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1.5 ${
                    mode === "now"
                      ? "bg-[#1C2B3A] text-white border-[#1C2B3A]"
                      : "bg-white text-[#374151] border-[#E5E0D5] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Send size={13} />
                  Send Immediately
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setMode("schedule")}
                  className={`py-2 px-3 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1.5 ${
                    mode === "schedule"
                      ? "bg-[#1C2B3A] text-white border-[#1C2B3A]"
                      : "bg-white text-[#374151] border-[#E5E0D5] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Calendar size={13} />
                  Schedule Later
                </button>
              </div>
            </div>

            {mode === "schedule" && (
              <div className="pt-1">
                <label className="block text-xs font-medium text-[#6B7280] mb-1">
                  Select Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  required
                  disabled={submitting}
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full disabled:opacity-60"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1C2B3A] text-white text-sm px-4 py-2.5 rounded-md hover:bg-[#28394D] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : mode === "now" ? (
                  <>
                    <Send size={15} /> Broadcast Notification
                  </>
                ) : (
                  <>
                    <Calendar size={15} /> Confirm Scheduled Time
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sent & Scheduled Notifications List */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#E5E0D5] flex flex-col">
          <div className="px-5 py-4 border-b border-[#E5E0D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#1C2B3A]">Activity &amp; Queue</h2>
              <span className="bg-[#E8A33D] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {notifications.length}
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 rounded-md border border-[#E5E0D5]">
              {(["all", "sent", "scheduled"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1 text-xs rounded font-medium capitalize transition-colors ${
                    filterTab === tab
                      ? "bg-white text-[#1C2B3A] shadow-sm font-semibold"
                      : "text-[#6B7280] hover:text-[#1C2B3A]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#F0EDE5] max-h-[620px]">
            {loading ? (
              <div className="p-12 text-center text-[#9CA3AF]">
                <Loader2 size={28} className="animate-spin mx-auto mb-2 text-[#E8A33D]" />
                <p className="text-sm text-[#6B7280]">Loading notifications from database...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Bell size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                <p className="text-sm text-[#6B7280]">No notifications in this view.</p>
              </div>
            ) : (
              filtered.map((item) => {
                const aud = AUDIENCE_CONFIG[item.audience] || AUDIENCE_CONFIG.all;
                const isDeleting = deletingId === item.id;
                return (
                  <div key={item.id} className="p-5 hover:bg-[#FAF7F2]/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-[#1C2B3A]">
                            {item.title}
                          </h3>

                          {/* Status Badge */}
                          {item.status === "sent" ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#6B8F71]/15 text-[#6B8F71] flex items-center gap-1">
                              <CheckCircle2 size={11} /> Sent
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#5B7A99]/15 text-[#5B7A99] flex items-center gap-1">
                              <Clock size={11} /> Scheduled
                            </span>
                          )}

                          {item.linkUrl && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 flex items-center gap-0.5">
                              <ExternalLink size={10} /> Link
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-[#4B5563] leading-relaxed pt-0.5">
                          {item.body}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        className="text-[#9CA3AF] hover:text-[#B0533E] p-1 transition-colors disabled:opacity-40"
                        title="Delete notification"
                      >
                        {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F0EDE5] text-xs text-[#9CA3AF]">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: `${aud.color}15`,
                            color: aud.color,
                          }}
                        >
                          {aud.label}
                        </span>
                      </div>

                      <span>
                        {item.status === "sent"
                          ? `Delivered: ${item.sentAt || item.createdAt}`
                          : `Scheduled: ${item.scheduledFor}`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
