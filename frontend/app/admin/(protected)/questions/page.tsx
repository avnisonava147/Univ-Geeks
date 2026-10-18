// app/admin/(protected)/questions/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  MessageCircleQuestion,
  Search,
  CheckCircle2,
  X,
  Send,
  Clock,
  Mail,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { apiRequest } from "@/app/admin/(protected)/_lib/api";

type QuestionStatus = "open" | "resolved";

interface QuestionItem {
  id: string;
  student: string;
  email: string;
  avatar: string;
  subject: string;
  question: string;
  askedAt: string;
  status: QuestionStatus;
  reply: string | null;
  repliedAt?: string | null;
  createdAt?: string;
}

const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#5B7A99",
  Chemistry: "#6B8F71",
  Mathematics: "#E8A33D",
  Biology: "#B0533E",
  Science: "#8D6FA3",
  General: "#8C7B6E",
};

function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return "Recently";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "Just now";
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
    if (diffHours >= 1) {
      return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    }
    if (diffMin >= 1) {
      return `${diffMin} min ago`;
    }
    return "Just now";
  } catch {
    return "Recently";
  }
}

function getInitials(name?: string): string {
  if (!name) return "ST";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | QuestionStatus>("All");
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const loadQuestions = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await apiRequest<any[]>("/api/admin/questions");
      const mapped: QuestionItem[] = (Array.isArray(data) ? data : []).map((q) => {
        const studentName = q.name || q.student || "Anonymous Student";
        const rawStatus = (q.status || "open").toLowerCase();
        const normStatus: QuestionStatus = rawStatus === "resolved" ? "resolved" : "open";
        return {
          id: q.id,
          student: studentName,
          email: q.email || "",
          avatar: getInitials(studentName),
          subject: q.subject || "General",
          question: q.message || q.question || "",
          askedAt: formatRelativeTime(q.createdAt),
          status: normStatus,
          reply: q.reply || null,
          repliedAt: q.repliedAt ? formatRelativeTime(q.repliedAt) : null,
          createdAt: q.createdAt,
        };
      });
      setQuestions(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to load questions from backend");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const subjects = useMemo(() => {
    const defaultList = ["All", "Physics", "Chemistry", "Mathematics", "Biology", "Science", "General"];
    const fromQuestions = Array.from(new Set(questions.map((q) => q.subject).filter(Boolean)));
    const merged = Array.from(new Set([...defaultList, ...fromQuestions]));
    return merged;
  }, [questions]);

  const openCount = useMemo(() => questions.filter((q) => q.status === "open").length, [questions]);
  const resolvedCount = useMemo(() => questions.filter((q) => q.status === "resolved").length, [questions]);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch =
        q.student.toLowerCase().includes(search.toLowerCase()) ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.email.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subjectFilter === "All" || q.subject === subjectFilter;
      const matchStatus = statusFilter === "All" || q.status === statusFilter;
      return matchSearch && matchSubject && matchStatus;
    });
  }, [questions, search, subjectFilter, statusFilter]);

  function handleOpenDrawer(q: QuestionItem) {
    setSelectedQuestion(q);
    setReplyText(q.reply || "");
  }

  async function handleSendReply() {
    if (!selectedQuestion || !replyText.trim()) return;
    const qId = selectedQuestion.id;
    const text = replyText.trim();

    try {
      await apiRequest(`/api/admin/questions/${qId}/reply`, {
        method: "POST",
        body: JSON.stringify({ reply: text, status: "resolved" }),
      });

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === qId
            ? { ...item, reply: text, status: "resolved", repliedAt: "Just now" }
            : item
        )
      );

      setSelectedQuestion((prev) =>
        prev ? { ...prev, reply: text, status: "resolved", repliedAt: "Just now" } : null
      );
    } catch (err: any) {
      alert("Failed to send reply: " + err.message);
    }
  }

  async function handleToggleResolved(id: string) {
    const current = questions.find((item) => item.id === id);
    if (!current) return;
    const nextStatus: QuestionStatus = current.status === "open" ? "resolved" : "open";

    // Optimistic UI update
    setQuestions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );

    if (selectedQuestion && selectedQuestion.id === id) {
      setSelectedQuestion((prev) =>
        prev ? { ...prev, status: nextStatus } : null
      );
    }

    try {
      await apiRequest(`/api/admin/questions/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (err: any) {
      // Revert on error
      setQuestions((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, status: current.status };
          }
          return item;
        })
      );
      if (selectedQuestion && selectedQuestion.id === id) {
        setSelectedQuestion((prev) =>
          prev ? { ...prev, status: current.status } : null
        );
      }
      alert("Failed to update status: " + err.message);
    }
  }

  async function handleBulkResolve() {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);

    try {
      await apiRequest("/api/admin/questions/bulk-resolve", {
        method: "POST",
        body: JSON.stringify({ ids }),
      });

      setQuestions((prev) =>
        prev.map((item) =>
          selectedIds.has(item.id) ? { ...item, status: "resolved" } : item
        )
      );
      setSelectedIds(new Set());
    } catch (err: any) {
      alert("Failed to resolve selected questions: " + err.message);
    }
  }

  function toggleSelect(id: string, e: React.SyntheticEvent) {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Questions (Q&amp;A)</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Review, answer, and manage student questions submitted via Contact Us.
          </p>
        </div>
        <button
          onClick={() => loadQuestions(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E0D5] rounded-md bg-white text-[#1C2B3A] hover:bg-[#FAF7F2] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between">
          <p>{error}</p>
          <button
            onClick={() => loadQuestions(true)}
            className="text-xs font-semibold underline hover:no-underline ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary Stat Chips */}
      <div className="flex flex-wrap gap-2.5">
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3.5 py-1 text-xs text-[#6B7280] flex items-center gap-1.5 shadow-sm">
          <span>Total:</span>
          <span className="font-semibold text-[#1C2B3A]">{questions.length}</span>
        </div>
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3.5 py-1 text-xs text-[#6B7280] flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
          <span>Open:</span>
          <span className="font-semibold text-[#1C2B3A]">{openCount}</span>
        </div>
        <div className="bg-white border border-[#E5E0D5] rounded-full px-3.5 py-1 text-xs text-[#6B7280] flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#6B8F71]" />
          <span>Resolved:</span>
          <span className="font-semibold text-[#1C2B3A]">{resolvedCount}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search student, email, or question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full pl-9"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Subjects" : s}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | QuestionStatus)}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          <option value="All">All Statuses</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
        </select>

        {selectedIds.size > 0 && (
          <button
            onClick={handleBulkResolve}
            className="text-sm bg-[#6B8F71]/10 text-[#6B8F71] border border-[#6B8F71]/30 hover:bg-[#6B8F71]/20 px-3 py-2 rounded-md transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 size={14} />
            Resolve {selectedIds.size} Selected
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 size={32} className="text-[#E8A33D] animate-spin mb-3" />
            <p className="text-sm text-[#6B7280] font-medium">Loading questions from MongoDB...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageCircleQuestion size={36} className="text-[#9CA3AF] mb-3" />
            <p className="text-sm text-[#6B7280] font-medium">No questions found.</p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              {questions.length === 0
                ? "Questions submitted via the Contact Us form will appear here."
                : "Try clearing search keywords or filters."}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B7280] border-b border-[#E5E0D5] bg-[#FAF7F2]/40">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={() => {
                      if (selectedIds.size === filtered.length) {
                        setSelectedIds(new Set());
                      } else {
                        setSelectedIds(new Set(filtered.map((q) => q.id)));
                      }
                    }}
                    className="accent-[#1C2B3A] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Question</th>
                <th className="px-4 py-3 font-medium">Asked</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const subColor = SUBJECT_COLORS[item.subject] || "#8C7B6E";
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenDrawer(item)}
                    className="border-b border-[#F0EDE5] last:border-0 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.id)}
                        onChange={(e) => toggleSelect(item.id, e)}
                        className="accent-[#1C2B3A] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                          style={{
                            backgroundColor: `${subColor}20`,
                            color: subColor,
                          }}
                        >
                          {item.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-[#1C2B3A]">{item.student}</p>
                          {item.email && (
                            <p className="text-[11px] text-[#9CA3AF]">{item.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${subColor}1A`,
                          color: subColor,
                        }}
                      >
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-md">
                      <p className="text-[#374151] line-clamp-1">{item.question}</p>
                      {item.reply && (
                        <p className="text-xs text-[#6B8F71] mt-0.5 flex items-center gap-1">
                          <CheckCircle2 size={11} /> Replied
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#9CA3AF] whitespace-nowrap text-xs">
                      {item.askedAt}
                    </td>
                    <td className="px-4 py-3">
                      {item.status === "open" ? (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "#E8A33D1A", color: "#E8A33D" }}
                        >
                          Open
                        </span>
                      ) : (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "#6B8F711A", color: "#6B8F71" }}
                        >
                          Resolved
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleResolved(item.id)}
                        className="text-xs text-[#5B7A99] hover:underline font-medium"
                      >
                        {item.status === "open" ? "Mark resolved" : "Reopen"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-out Drawer & Overlay */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/25 transition-opacity"
            onClick={() => setSelectedQuestion(null)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-lg bg-white border-l border-[#E5E0D5] shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center justify-between bg-[#FAF7F2]/60">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${SUBJECT_COLORS[selectedQuestion.subject] || "#8C7B6E"}20`,
                    color: SUBJECT_COLORS[selectedQuestion.subject] || "#8C7B6E",
                  }}
                >
                  {selectedQuestion.subject}
                </span>
                <span className="text-sm font-semibold text-[#1C2B3A]">
                  Question Details
                </span>
              </div>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Student Metadata */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE5]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: `${SUBJECT_COLORS[selectedQuestion.subject] || "#8C7B6E"}20`,
                      color: SUBJECT_COLORS[selectedQuestion.subject] || "#8C7B6E",
                    }}
                  >
                    {selectedQuestion.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1C2B3A]">
                      {selectedQuestion.student}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> Asked {selectedQuestion.askedAt}
                    </p>
                    {selectedQuestion.email && (
                      <p className="text-xs text-[#5B7A99] flex items-center gap-1 mt-1">
                        <Mail size={12} />
                        <a
                          href={`mailto:${selectedQuestion.email}`}
                          className="hover:underline"
                        >
                          {selectedQuestion.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  {selectedQuestion.status === "open" ? (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#E8A33D1A", color: "#E8A33D" }}
                    >
                      Open
                    </span>
                  ) : (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#6B8F711A", color: "#6B8F71" }}
                    >
                      Resolved
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-2">
                  Student&apos;s Query
                </label>
                <div className="bg-[#FAF7F2] rounded-md p-4 text-sm text-[#1C2B3A] border border-[#E5E0D5] leading-relaxed whitespace-pre-wrap">
                  {selectedQuestion.question}
                </div>
              </div>

              {/* Existing Reply if any */}
              {selectedQuestion.reply && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6B8F71]">
                      Previous Answer / Resolution
                    </label>
                    {selectedQuestion.repliedAt && (
                      <span className="text-xs text-[#9CA3AF]">
                        {selectedQuestion.repliedAt}
                      </span>
                    )}
                  </div>
                  <div className="bg-[#6B8F71]/5 border border-[#6B8F71]/20 rounded-md p-4 text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">
                    {selectedQuestion.reply}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer & Reply Composer */}
            <div className="border-t border-[#E5E0D5] p-5 space-y-3 bg-[#FAF7F2]/40">
              <label className="block text-xs font-medium text-[#374151]">
                {selectedQuestion.reply ? "Update Response" : "Respond to Student"}
              </label>
              <textarea
                rows={3}
                placeholder="Write an educational explanation or resolution..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="border border-[#E5E0D5] rounded-md p-3 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => handleToggleResolved(selectedQuestion.id)}
                  className="text-xs font-medium text-[#6B7280] hover:text-[#1C2B3A] transition-colors"
                >
                  {selectedQuestion.status === "open"
                    ? "Mark as Resolved"
                    : "Mark as Open"}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedQuestion(null)}
                    className="text-sm text-[#6B7280] hover:text-[#1C2B3A] px-3 py-1.5 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    Send &amp; Resolve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
