"use client";

import type { Chapter } from "../data/notesData";

type ChapterSelectorProps = {
  chapters: Chapter[];
  selectedChapter: string | null;
  onChapterChange: (chapter: Chapter) => void;
};

export default function ChapterSelector({
  chapters,
  selectedChapter,
  onChapterChange,
}: ChapterSelectorProps) {
  return (
    <section className="border-b border-slate-200 bg-[#F8FAFF] px-6 py-14">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
              <span className="font-serif italic text-[#2F5FDE]">
                4.
              </span>

              Select your chapter
            </h2>

            <p className="mt-2 text-sm text-[#5B6478]">
              Choose a chapter to view your notes and study material
            </p>
          </div>

          {/* Chapter count */}
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-[#5B6478]">
            <span className="font-semibold text-[#2F5FDE]">
              {chapters.length}
            </span>{" "}
            {chapters.length === 1 ? "Chapter" : "Chapters"} available
          </div>

        </div>

        {/* No chapters message */}
        {chapters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              📚
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#16213E]">
              Chapters coming soon
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
              Notes for this subject are being prepared. Please check back soon.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {chapters.map((chapter, index) => {
              const active = selectedChapter === chapter.id;

              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => onChapterChange(chapter)}
                  className="group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderColor: active
                      ? "#2F5FDE"
                      : "#E2E8F0",

                    boxShadow: active
                      ? "0 10px 25px rgba(47, 95, 222, 0.12)"
                      : undefined,
                  }}
                >

                  {/* Background glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 90% 10%, rgba(47, 95, 222, 0.08), transparent 55%)",
                    }}
                  />

                  <div className="relative flex items-center gap-4">

                    {/* Chapter number */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: active
                          ? "#2F5FDE"
                          : "#EEF4FF",

                        color: active
                          ? "white"
                          : "#2F5FDE",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Chapter information */}
                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                        Chapter {index + 1}
                      </p>

                      <h3
                        className="mt-1 text-base font-semibold leading-6 transition-colors duration-300"
                        style={{
                          color: active
                            ? "#2F5FDE"
                            : "#16213E",
                        }}
                      >
                        {chapter.name}
                      </h3>

                    </div>

                    {/* Arrow */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        borderColor: active
                          ? "#2F5FDE"
                          : "#E2E8F0",

                        backgroundColor: active
                          ? "#2F5FDE"
                          : "white",

                        color: active
                          ? "white"
                          : "#64748B",
                      }}
                    >
                      →
                    </div>

                  </div>

                  {/* Selected line */}
                  <div
                    className="absolute bottom-0 left-0 h-1 w-full origin-left transition-transform duration-300"
                    style={{
                      backgroundColor: "#2F5FDE",

                      transform: active
                        ? "scaleX(1)"
                        : "scaleX(0)",
                    }}
                  />

                  {/* Selected badge */}
                  {active && (
                    <div className="absolute right-5 top-4 rounded-full bg-[#2F5FDE] px-2.5 py-1 text-[10px] font-semibold text-white">
                      Selected
                    </div>
                  )}

                </button>
              );
            })}

          </div>
        )}

        {/* Selected chapter information */}
        {selectedChapter && (
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  📄
                </div>

                <div>
                  <p className="text-sm text-[#64748B]">
                    You selected
                  </p>

                  <h3 className="text-xl font-semibold text-[#2F5FDE]">
                    {
                      chapters.find(
                        (chapter) =>
                          chapter.id === selectedChapter
                      )?.name
                    }
                  </h3>
                </div>

              </div>

              <div className="rounded-full bg-[#F7F8FC] px-4 py-2 text-sm text-[#64748B]">
                Notes available
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}