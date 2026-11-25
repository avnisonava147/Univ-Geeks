"use client";

import { useState, useEffect } from "react";
import { pdfData, PDFItem } from "@/app/_lib/pdfData";
import { getApiBaseUrl, resolvePdfUrl } from "@/app/_lib/apiConfig";

export interface ImportantPdfItem {
  id: string | number;
  title: string;
  date: string;
  fileSize?: string;
  pdfUrl: string;
  isNew?: boolean;
}

const ITEMS_PER_PAGE = 6;
const PDF_CACHE_KEY = "univgeeks_important_pdfs_cache";

export default function ImportantPDFs() {
  const [items, setItems] = useState<ImportantPdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "view" | "download";
    url: string;
  } | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("pdfModalSeen");
      if (seen === "true") setHasSeenModal(true);
    }
  }, []);

  // Fetch dynamic notices from backend API (hydrate from sessionStorage first to avoid flash on refresh)
  useEffect(() => {
    let isMounted = true;
    let hasCached = false;

    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(PDF_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
            setLoading(false);
            hasCached = true;
          }
        }
      } catch {
        // ignore storage parse error
      }
    }

    async function fetchImportantPdfs() {
      try {
        const backendUrl = getApiBaseUrl();
        const res = await fetch(`${backendUrl}/api/important-pdfs`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setItems(data);
            if (typeof window !== "undefined") {
              try {
                sessionStorage.setItem(PDF_CACHE_KEY, JSON.stringify(data));
              } catch {
                // ignore quota errors
              }
            }
            return;
          }
        }
        if (isMounted && !hasCached) {
          setItems(pdfData);
        }
      } catch (err) {
        console.warn("Could not fetch important PDFs from backend, using default items:", err);
        if (isMounted && !hasCached) {
          setItems(pdfData);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchImportantPdfs();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle View / Download click
  const handlePdfAction = (type: "view" | "download", rawUrl: string) => {
    const url = resolvePdfUrl(rawUrl);
    if (!hasSeenModal) {
      setPendingAction({ type, url });
      setShowModal(true);
    } else {
      performAction(type, url);
    }
  };

  const performAction = (type: "view" | "download", url: string) => {
    if (type === "view") {
      window.open(url, "_blank");
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.click();
    }
  };

  const handleContinue = () => {
    setHasSeenModal(true);
    setShowModal(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pdfModalSeen", "true");
    }
    if (pendingAction) {
      performAction(pendingAction.type, pendingAction.url);
      setPendingAction(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return {
      month: months[date.getMonth()],
      day: date.getDate().toString(),
      year: date.getFullYear().toString(),
    };
  };

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* ===== POPUP MODAL ===== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-[92%] max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/20 p-7 sm:p-8 shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, #0c1a3a 0%, #0a1628 50%, #081020 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/15 hover:text-white transition-colors text-lg"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="text-center mt-1">
              <div className="inline-flex h-[84px] w-[84px] items-center justify-center rounded-full bg-black p-0.5 border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                <img
                  src="/logo.png"
                  alt="UnivGeeks Logo"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-center mt-5 text-2xl font-extrabold text-white leading-tight">
              Help Us Reach{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                More Students!
              </span>
            </h2>
            <p className="text-center mt-2.5 text-sm text-slate-400 leading-relaxed">
              Subscribe to our YouTube channel and follow us on Instagram for
              the latest notes, updates and study tips.
            </p>

            {/* Social Buttons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.youtube.com/@Himanshubhaiya8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 border border-red-500/40 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(239,68,68,0.3)] transition-all"
              >
                <span className="text-lg">▶️</span>
                <div className="text-left">
                  <div className="text-[11px] text-white/70 font-medium">
                    Subscribe on
                  </div>
                  <div className="text-base font-extrabold">YouTube ↗</div>
                </div>
              </a>
              <a
                href="https://www.instagram.com/univ_geeks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 border border-pink-500/40 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(236,72,153,0.3)] transition-all"
              >
                <span className="text-lg">📷</span>
                <div className="text-left">
                  <div className="text-[11px] text-white/70 font-medium">
                    Follow us on
                  </div>
                  <div className="text-base font-extrabold">Instagram ↗</div>
                </div>
              </a>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {[
                { icon: "📝", label: "New Notes", sub: "Regularly" },
                { icon: "💡", label: "Study Tips", sub: "& Tricks" },
                { icon: "🔔", label: "Exam Updates", sub: "& Alerts" },
                { icon: "👥", label: "Join Learners", sub: "Study together" },
              ].map((f) => (
                <div key={f.label} className="text-center py-3">
                  <div className="text-xl mb-1.5">{f.icon}</div>
                  <div className="text-[11px] font-bold text-slate-200">
                    {f.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{f.sub}</div>
                </div>
              ))}
            </div>

            {/* Community Banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/[0.08] to-indigo-500/[0.08] border border-cyan-400/15 text-center">
              <span className="text-sm font-semibold text-slate-300">
                Be a part of our growing{" "}
                <span className="text-pink-400 font-bold">
                  learning community
                </span>{" "}
                ❤️
              </span>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full mt-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] font-bold hover:bg-white/[0.12] transition-colors"
            >
              {pendingAction?.type === "download"
                ? "Continue to download →"
                : "Continue to your PDF →"}
            </button>

            <p className="text-center mt-3 text-xs text-slate-500">
              Your notes are here to help you learn. Thanks for supporting us!
            </p>
          </div>
        </div>
      )}

      {/* ===== NOTICE BOARD SECTION ===== */}
    <section className="w-full py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Important Documents
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Important PDFs &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Notices
            </span>
          </h2>
          <p className="text-slate-500 mt-2 text-base sm:text-lg">
            Latest circulars, results, and important documents for students
          </p>
        </div>

        {/* Notice Board Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
              📌 Notice Board
            </h3>
            <span className="text-sm text-slate-500">
              {items.length} Documents
            </span>
          </div>

          {/* Notice Items */}
          <div className="divide-y divide-slate-100">
            {loading && items.length === 0 ? (
              <div className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex items-center gap-4 sm:gap-6 px-5 sm:px-8 py-4 sm:py-5 animate-pulse">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : currentItems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No documents available at the moment.
              </div>
            ) : (
              currentItems.map((item) => {
                const { month, day, year } = formatDate(item.date);
                return (
                  <div
                    key={item.id}
                    className="flex items-start sm:items-center gap-4 sm:gap-6 px-5 sm:px-8 py-4 sm:py-5 hover:bg-blue-50/30 transition-colors group"
                  >
                  {/* Date Block */}
                  <div className="flex flex-col items-center min-w-[52px] text-center shrink-0">
                    {item.isNew && (
                      <span className="text-[10px] font-bold text-white bg-red-500 rounded-full px-2 py-0.5 mb-1 leading-none">
                        New
                      </span>
                    )}
                    <span className="text-xs text-slate-500 uppercase font-medium leading-none">
                      {month}
                    </span>
                    <span className="text-2xl font-bold text-slate-800 leading-tight">
                      {day}
                    </span>
                    <span className="text-xs text-slate-400 leading-none">
                      {year}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="flex-1 text-sm sm:text-[15px] text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* PDF Badge */}
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded hidden sm:inline">
                      PDF
                    </span>
                    {/* View Button */}
                    <button
                      onClick={() => handlePdfAction("view", item.pdfUrl)}
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                      title="View PDF"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    {/* Download Button */}
                    <button
                      onClick={() =>
                        handlePdfAction("download", item.pdfUrl)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs sm:text-sm font-medium hover:from-blue-700 hover:to-cyan-700 shadow-sm hover:shadow transition-all"
                      title="Download PDF"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              );
            }))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 px-5 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/30">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, idx) =>
                typeof page === "string" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}