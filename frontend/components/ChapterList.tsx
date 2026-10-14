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
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#092653] sm:text-2xl">
              📘 Chapter-wise {subject} PYQs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a chapter to view previous year question papers
            </p>
          </div>
        </div>
      </div>

      {/* CHAPTER LIST */}
      <div className="space-y-3 p-4 sm:p-5">
        {visibleChapters.map((chapter, index) => (
          <div
            key={chapter}
            className="group flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm sm:flex-row sm:items-center"
          >
            {/* NUMBER */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
              {index + 1}
            </div>

            {/* CHAPTER */}
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{chapter}</h3>

              <p className="mt-1 text-xs text-slate-500">
                Previous year papers from 2013 – 2026
              </p>
            </div>

            {/* YEARS */}
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
              13 Years
            </div>

            {/* VIEW PAPERS */}
            <Link
              href={`/pyqs/${classLevel}/${subjectSlug}/2025?chapter=${encodeURIComponent(chapter)}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View Papers →
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