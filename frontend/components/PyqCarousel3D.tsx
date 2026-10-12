"use client";

import React from "react";

// =====================================================
// 3D ROTATING BOARD-PAPER CAROUSEL
// Replaces the old static "question papers" table in the
// Master Board Patterns section. Same playful energy as the
// floating formula book at the top of the homepage.
// =====================================================

interface PaperStyle {
  year: string;
  subject: string;
  accent: string;
  chip: string;
}

const papers: PaperStyle[] = [
  { year: "2025", subject: "Physics", accent: "#2563eb", chip: "Solved" },
  { year: "2024", subject: "Chemistry", accent: "#7c3aed", chip: "Solved" },
  { year: "2023", subject: "Mathematics", accent: "#d97706", chip: "Solved" },
  { year: "2022", subject: "Biology", accent: "#059669", chip: "Solved" },
  { year: "2018", subject: "Physics", accent: "#0891b2", chip: "Verified" },
  { year: "2013", subject: "Chemistry", accent: "#db2777", chip: "Archive" },
];

const step = 360 / papers.length;

export default function PyqCarousel3D() {
  return (
    <div className="relative mx-auto flex w-full max-w-[540px] flex-col items-center">
      <style jsx>{`
        .pyq-stage {
          position: relative;
          width: 100%;
          height: 440px;
          perspective: 1100px;
        }
        .pyq-tilt {
          position: absolute;
          inset: 0;
          transform: rotateX(9deg);
          transform-style: preserve-3d;
        }
        .pyq-ring {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: pyqSpin 30s linear infinite;
        }
        .pyq-stage:hover .pyq-ring {
          animation-play-state: paused;
        }
        .pyq-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 184px;
          height: 250px;
          margin: -125px 0 0 -92px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .pyq-card-float {
          animation: pyqBob 5s ease-in-out infinite;
        }
        @keyframes pyqSpin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        @keyframes pyqBob {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -10px;
          }
        }
        @keyframes pyqSparkle {
          0%,
          100% {
            transform: scale(0.6) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes pyqDrift {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.55;
          }
          50% {
            transform: translateY(-16px) rotate(12deg);
            opacity: 1;
          }
        }
        .pyq-spark {
          animation: pyqSparkle 2.4s ease-in-out infinite;
        }
        .pyq-glyph {
          animation: pyqDrift 7s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .pyq-stage {
            height: 380px;
          }
          .pyq-tilt {
            transform: rotateX(9deg) scale(0.8);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pyq-ring,
          .pyq-card-float,
          .pyq-spark,
          .pyq-glyph {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Ambient nebula glow (matches hero formula book) ── */}
      <div className="pointer-events-none absolute -inset-10 z-0 flex items-center justify-center overflow-visible">
        <div
          className="absolute h-[340px] w-[440px] rounded-full blur-[70px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.32) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute h-[220px] w-[300px] rounded-full blur-[45px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.42) 0%, rgba(34, 211, 238, 0.3) 55%, transparent 80%)",
          }}
        />
        <div
          className="absolute h-[440px] w-[560px] rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 55%, transparent 78%)",
          }}
        />

        {/* Drifting subject glyphs */}
        <span
          className="pyq-glyph absolute left-2 top-8 text-xl font-bold text-cyan-500/70"
          style={{ animationDelay: "0s" }}
        >
          Σ
        </span>
        <span
          className="pyq-glyph absolute right-6 top-12 text-lg text-indigo-500/70"
          style={{ animationDelay: "1.4s" }}
        >
          ∫
        </span>
        <span
          className="pyq-glyph absolute bottom-16 left-8 text-lg text-amber-500/70"
          style={{ animationDelay: "2.6s" }}
        >
          π
        </span>

        {/* Sparkles */}
        <span
          className="pyq-spark absolute right-10 top-6 text-base text-cyan-400"
          style={{ textShadow: "0 0 12px #22d3ee", animationDelay: "0.3s" }}
        >
          ✦
        </span>
        <span
          className="pyq-spark absolute bottom-12 right-4 text-sm text-fuchsia-400"
          style={{ textShadow: "0 0 12px #e879f9", animationDelay: "1.1s" }}
        >
          ✧
        </span>
        <span
          className="pyq-spark absolute bottom-24 left-2 text-sm text-indigo-400"
          style={{ textShadow: "0 0 12px #818cf8", animationDelay: "1.9s" }}
        >
          ✦
        </span>
      </div>

      {/* ── 3D Ring Stage ── */}
      <div className="pyq-stage relative z-10">
        <div className="pyq-tilt">
          <div className="pyq-ring">
            {papers.map((paper, i) => (
              <div
                key={paper.year + paper.subject}
                className="pyq-card"
                style={{ transform: `rotateY(${i * step}deg) translateZ(215px)` }}
              >
                <div
                  className="pyq-card-float h-full rounded-2xl border border-white/70 bg-white p-3.5 shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                  style={{
                    animationDelay: `${i * 0.45}s`,
                    background:
                      "linear-gradient(150deg, #ffffff 0%, #f8fafc 70%, #f1f5f9 100%)",
                  }}
                >
                  {/* Paper header */}
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow-xs"
                      style={{ backgroundColor: paper.accent }}
                    >
                      {paper.subject}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">
                      RBSE • Cl 12
                    </span>
                  </div>

                  {/* Year block */}
                  <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Board Paper
                  </p>
                  <p
                    className="-mt-0.5 text-4xl font-black tracking-tight text-slate-900"
                    style={{ color: paper.accent }}
                  >
                    {paper.year}
                  </p>

                  {/* Fake question lines */}
                  <div className="mt-2.5 space-y-1.5">
                    <span className="block h-1.5 w-full rounded-full bg-slate-200" />
                    <span className="block h-1.5 w-11/12 rounded-full bg-slate-200" />
                    <span className="block h-1.5 w-4/5 rounded-full bg-slate-200" />
                    <span className="block h-1.5 w-10/12 rounded-full bg-slate-200" />
                    <span className="block h-1.5 w-3/5 rounded-full bg-slate-100" />
                  </div>

                  {/* Chapter tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">
                      Ch 1
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">
                      Ch 2
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">
                      +11
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-[9px] font-bold text-slate-400">
                      UNIVGEEKS
                    </span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[8px] font-black"
                      style={{
                        backgroundColor: `${paper.accent}18`,
                        color: paper.accent,
                      }}
                    >
                      ✓ {paper.chip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating front badge (stays fixed while ring spins) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-1 z-20 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-black text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.15)] backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
              ✓
            </span>
            Har saal ka paper — solved
          </span>
        </div>
      </div>

      {/* ── HUD strip (mirrors the hero formula book controls) ── */}
      <div className="relative z-10 mt-3 flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-sm text-white shadow-md shadow-blue-500/25">
            📄
          </span>
          <div>
            <p className="text-xs font-black text-slate-900">
              13 Years Archive
            </p>
            <p className="text-[11px] font-semibold text-slate-500">
              2013 → 2025 • 4 Subjects
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {papers.map((paper, i) => (
            <span
              key={paper.year}
              className="h-1.5 rounded-full bg-slate-300"
              style={{
                width: i === 0 ? 20 : 6,
                backgroundColor: i === 0 ? "#0891b2" : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
