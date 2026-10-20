"use client";

import { useState } from "react";
import Link from "next/link";

type ChapterListProps = {
  subject: string;
  chapters: string[];
  classLevel?: "class-10" | "class-12";
};

export default function ChapterList({
  subject,
  chapters,
  classLevel = "class-12",
}: ChapterListProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleChapters = chapters.slice(0, visibleCount);

  const subjectSlug = subject.toLowerCase().replace(/\s+/g, "-");

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-slate-200 p-3.5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-base sm:text-2xl font-extrabold text-[#092653]">
              📘 Chapter-wise {subject} PYQs
            </h2>

            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
              Select a chapter to view previous year question papers
            </p>
          </div>
        </div>
      </div>

      {/* CHAPTER LIST */}
      <div className="space-y-2 sm:space-y-3 p-3 sm:p-5">
        {visibleChapters.map((chapter, index) => (
          <div
            key={chapter}
            className="group flex flex-row items-center gap-2.5 sm:gap-4 rounded-xl border border-slate-200 p-2.5 sm:p-4 transition hover:border-blue-200 hover:shadow-sm"
          >
            {/* NUMBER */}
            <div className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs sm:text-sm font-bold text-blue-600">
              {index + 1}
            </div>

            {/* CHAPTER */}
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-base font-bold text-slate-900 truncate sm:whitespace-normal">
                {chapter}
              </h3>

              <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500">
                2013 – 2026 Papers
              </p>
            </div>

            {/* YEARS */}
            <div className="hidden sm:inline-block rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 shrink-0">
              13 Years
            </div>

            {/* VIEW PAPERS */}
            <Link
              href={`/pyqs/${classLevel}/${subjectSlug}/2025?chapter=${encodeURIComponent(chapter)}`}
              className="flex shrink-0 items-center justify-center gap-1 rounded-lg border border-blue-200 px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              <span>Papers</span>
              <span>→</span>
            </Link>
          </div>
        ))}

        {/* NO RESULTS */}
        {visibleChapters.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            No chapters found.
          </div>
        )}

        {/* LOAD MORE */}
        {visibleCount < chapters.length && (
          <button
            onClick={handleLoadMore}
            className="mt-2 w-full rounded-xl bg-blue-50 px-5 py-3.5 font-bold text-blue-700 transition hover:bg-blue-100"
          >
            ↓ Load More Chapters
          </button>
        )}

        {/* ALL LOADED */}
        {visibleCount >= chapters.length && chapters.length > 5 && (
          <div className="pt-2 text-center text-sm font-medium text-slate-400">
            All chapters loaded
          </div>
        )}
      </div>
    </div>
  );
}