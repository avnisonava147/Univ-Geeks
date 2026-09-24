"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ThreeCanvas from "../components/ThreeCanvas";

export default function HomePage() {
  const [activeClassTab, setActiveClassTab] = useState<"12" | "11" | "10">("12");
  const [quickSearch, setQuickSearch] = useState("");

  const popularSearches = [
    { label: "Class 12 Physics PYQs", href: "/pyqs/physics" },
    { label: "Class 12 Chemistry Notes", href: "/notes" },
    { label: "Maths 13 Years PYQs", href: "/pyqs/mathematics" },
    { label: "Class 10 Science Notes", href: "/notes" },
  ];

  const subjectsByClass = {
    "12": [
      {
        name: "Physics",
        icon: "⚛️",
        tag: "High Yield",
        color: "from-blue-600/20 to-cyan-500/10",
        borderColor: "group-hover:border-cyan-400/50",
        chapters: "14 Chapters",
        description: "Electrostatics, Optics, Magnetism, Semiconductor & Modern Physics.",
        notesHref: "/notes",
        pyqHref: "/pyqs/physics",
      },
      {
        name: "Chemistry",
        icon: "🧪",
        tag: "Bilingual",
        color: "from-purple-600/20 to-pink-500/10",
        borderColor: "group-hover:border-purple-400/50",
        chapters: "12 Chapters",
        description: "Solutions, Electrochemistry, Organic Reactions & Coordination Compounds.",
        notesHref: "/notes",
        pyqHref: "/pyqs/chemistry",
      },
      {
        name: "Mathematics",
        icon: "📐",
        tag: "13 Years PYQs",
        color: "from-amber-600/20 to-orange-500/10",
        borderColor: "group-hover:border-amber-400/50",
        chapters: "13 Chapters",
        description: "Calculus, Matrices, Determinants, Vectors & 3D Geometry.",
        notesHref: "/notes",
        pyqHref: "/pyqs/mathematics",
      },
      {
        name: "Biology",
        icon: "🧬",
        tag: "Diagram Focused",
        color: "from-emerald-600/20 to-teal-500/10",
        borderColor: "group-hover:border-emerald-400/50",
        chapters: "13 Chapters",
        description: "Genetics, Reproduction, Biotechnology, Ecology & Human Physiology.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
    ],
    "11": [
      {
        name: "Physics",
        icon: "🔭",
        tag: "Foundation",
        color: "from-blue-600/20 to-cyan-500/10",
        borderColor: "group-hover:border-cyan-400/50",
        chapters: "14 Chapters",
        description: "Kinematics, Laws of Motion, Work Energy, Thermodynamics & Waves.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Chemistry",
        icon: "🔬",
        tag: "Concepts",
        color: "from-purple-600/20 to-pink-500/10",
        borderColor: "group-hover:border-purple-400/50",
        chapters: "13 Chapters",
        description: "Atomic Structure, Chemical Bonding, Equilibrium & Organic Chemistry.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Mathematics",
        icon: "📊",
        tag: "Core",
        color: "from-amber-600/20 to-orange-500/10",
        borderColor: "group-hover:border-amber-400/50",
        chapters: "14 Chapters",
        description: "Sets, Trigonometric Functions, Conic Sections, Limits & Derivatives.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Biology",
        icon: "🌱",
        tag: "Comprehensive",
        color: "from-emerald-600/20 to-teal-500/10",
        borderColor: "group-hover:border-emerald-400/50",
        chapters: "19 Chapters",
        description: "Cell Biology, Plant Physiology, Biomolecules & Human Anatomy.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
    ],
    "10": [
      {
        name: "Science",
        icon: "💡",
        tag: "Board Special",
        color: "from-blue-600/20 to-cyan-500/10",
        borderColor: "group-hover:border-cyan-400/50",
        chapters: "13 Chapters",
        description: "Chemical Reactions, Life Processes, Light, Electricity & Environment.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Mathematics",
        icon: "🔢",
        tag: "Solved Steps",
        color: "from-amber-600/20 to-orange-500/10",
        borderColor: "group-hover:border-amber-400/50",
        chapters: "14 Chapters",
        description: "Real Numbers, Polynomials, Quadratic Equations, Triangles & Statistics.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Social Science",
        icon: "🗺️",
        tag: "Key Points",
        color: "from-purple-600/20 to-pink-500/10",
        borderColor: "group-hover:border-purple-400/50",
        chapters: "History & Civics",
        description: "Nationalism, Resources, Democracy, Money & Credit simplified.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "English & Hindi",
        icon: "📚",
        tag: "Grammar & Lit",
        color: "from-emerald-600/20 to-teal-500/10",
        borderColor: "group-hover:border-emerald-400/50",
        chapters: "Language Notes",
        description: "Summary, Question-Answers, Grammar rules and writing formats.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
    ],
  };

  const currentSubjects = subjectsByClass[activeClassTab].filter(
    (s) =>
      quickSearch === "" ||
      s.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(quickSearch.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. GLASSY TOP NAVBAR */}
      <Navbar variant="dark" />

      {/* 2. HERO SECTION WITH 3D THREE.JS CANVAS */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
        {/* Three.js 3D Constellation and Geometric Elements */}
        <ThreeCanvas />

        {/* Ambient atmospheric lighting gradients */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-full max-w-4xl rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-5 py-2 text-xs sm:text-sm font-medium text-cyan-300 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Next-Gen RBSE & Board Preparation Portal</span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.12]">
            Empower Your Mind.{" "}
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Ace Your Board Exams.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
            UnivGeeks organizes everything you need for Classes 10 to 12. Dive into
            high-yield chapter notes, 13+ years of chapter-wise previous year
            question papers, and clear concept builders — always streamlined and free.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/notes"
              className="group relative flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 active:scale-95"
            >
              <span className="text-lg">📖</span>
              <span>Explore Chapter Notes</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/pyqs"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/10 hover:-translate-y-0.5"
            >
              <span className="text-lg">📝</span>
              <span>13+ Years PYQs (2013-2025)</span>
            </Link>
          </div>

          {/* Quick Search & Popular Chips */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative flex items-center rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-xl shadow-2xl transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <span className="pl-4 text-lg text-slate-400">🔍</span>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search subject, chapter or keyword (e.g. Physics, Electrochemistry)..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 outline-none"
              />
              {quickSearch && (
                <button
                  type="button"
                  onClick={() => setQuickSearch("")}
                  className="mr-2 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/20"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Popular:</span>
              {popularSearches.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-300"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Live Metric Badges */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-cyan-400">13+</div>
              <div className="mt-1 text-xs text-slate-400">Years of PYQs (2013-2025)</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-blue-400">100%</div>
              <div className="mt-1 text-xs text-slate-400">Free PDF Study Notes</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-indigo-400">Class 10-12</div>
              <div className="mt-1 text-xs text-slate-400">Science, Commerce, Arts</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-amber-400">Chapter-Wise</div>
              <div className="mt-1 text-xs text-slate-400">Sorted For Revision</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CLASS & SUBJECT EXPLORER */}
      <section className="relative border-t border-slate-800 bg-slate-900/60 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <div className="inline-flex rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                Explore Curriculum
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Choose Your Class & Subject
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Access tailored chapter notes and board exam question papers.
              </p>
            </div>

            {/* Class Switcher Tabs */}
            <div className="flex rounded-2xl border border-white/10 bg-slate-950 p-1.5 backdrop-blur-md">
              {(["12", "11", "10"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveClassTab(c)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    activeClassTab === c
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentSubjects.map((sub) => (
              <div
                key={sub.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Background glow highlight */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${sub.color} blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60`}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                      {sub.icon}
                    </div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-950/60 px-3 py-1 text-[11px] font-bold text-cyan-300">
                      {sub.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
                    {sub.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Class {activeClassTab} • {sub.chapters}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {sub.description}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="mt-8 flex gap-2 pt-4 border-t border-white/10">
                  <Link
                    href={sub.notesHref}
                    className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-xs font-bold text-white transition hover:bg-cyan-500 hover:text-slate-950"
                  >
                    Notes →
                  </Link>
                  <Link
                    href={sub.pyqHref}
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-center text-xs font-bold text-slate-200 transition hover:border-blue-400 hover:bg-white/10 hover:text-white"
                  >
                    PYQs 📄
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 13-YEAR PYQ ARCHIVE SPOTLIGHT */}
      <section className="relative overflow-hidden border-t border-slate-800 bg-slate-950 px-5 py-24 sm:px-8">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full bg-cyan-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                13+ Years Comprehensive Archive
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                Master Board Patterns With{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Chapter-Wise PYQs.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
                Why solve random question papers when you can target exact chapters?
                UnivGeeks breaks down 13 consecutive years (2013 through 2025) into
                neat chapter-level collections for Physics, Chemistry, and Mathematics.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: "✅",
                    title: "2013 to 2025 Papers Included",
                    desc: "Analyze repetitive board exam questions and high-weightage topics.",
                  },
                  {
                    icon: "📁",
                    title: "Chapter by Chapter Categorization",
                    desc: "Finish a chapter in school or tuition, then immediately test yourself on past board questions.",
                  },
                  {
                    icon: "🇮🇳",
                    title: "Bilingual: Hindi & English Medium",
                    desc: "Designed specifically to serve both mediums across Rajasthan & State boards.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="mt-0.5 text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/pyqs"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-cyan-500/30 hover:-translate-y-0.5"
                >
                  <span>Explore Class 12 PYQ Repository</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Interactive Visual Display */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                      📄
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">RBSE Class 12 PYQ Archive</div>
                      <div className="text-xs text-slate-400">Physics • Chemistry • Mathematics</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Live 2025
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { year: "2025 Board Paper", status: "Latest Solution Added", badge: "Solved" },
                    { year: "2024 Board Paper", status: "Chapter Segregated", badge: "Verified" },
                    { year: "2023 Board Paper", status: "Full Question Set", badge: "PDF" },
                    { year: "2013 – 2022 Archive", status: "10 Years Consolidated", badge: "Archive" },
                  ].map((item) => (
                    <div
                      key={item.year}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.04] p-3.5 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400">🗓️</span>
                        <div>
                          <div className="text-sm font-bold text-white">{item.year}</div>
                          <div className="text-xs text-slate-400">{item.status}</div>
                        </div>
                      </div>
                      <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-950/30 p-4 text-center">
                  <p className="text-xs text-cyan-200">
                    💡 Pro Tip: Practicing 5 years of chapter-wise questions covers over 75% of recurring board questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOTES ENGINE HIGHLIGHT */}
      <section className="relative border-t border-slate-800 bg-slate-900/40 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-300">
              Exam-Ready Concept Summaries
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Clean, Concise Chapter Notes.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Stop drowning in 800-page textbooks right before exams. Our chapter notes distill the essential definitions, formula derivations, and diagrams.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Fast 15-Minute Revision",
                description:
                  "Designed for the final days before exams. Revisit formulas, laws, and key definitions in a fraction of the time.",
              },
              {
                icon: "🎯",
                title: "Step-by-Step Selectors",
                description:
                  "Pick your class, stream, subject, and chapter using our intuitive multi-step filter to access exact PDFs instantly.",
              },
              {
                icon: "📥",
                title: "Direct Offline Downloads",
                description:
                  "Save PDFs to your smartphone or laptop to study anytime, anywhere without burning mobile internet data.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-3xl">
                  {card.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-400/40 bg-purple-950/40 px-8 py-4 font-bold text-purple-200 backdrop-blur-md transition hover:bg-purple-900/60 hover:text-white"
            >
              <span>Go to Notes Portal</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) HERO BANNER */}
      <section className="relative overflow-hidden border-t border-slate-800 bg-gradient-to-b from-slate-950 to-[#06182e] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-blue-900/50 via-slate-900/80 to-slate-950 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
                ✨ Ready to boost your percentages?
              </span>

              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl leading-tight">
                Start Your Board Exam Preparation With Confidence Today.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-300">
                Join thousands of students who rely on UnivGeeks for clear notes,
                complete previous year question papers, and stress-free board preparation.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/notes"
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:brightness-110 hover:-translate-y-0.5"
                >
                  Explore Free Notes
                </Link>

                <Link
                  href="/pyqs"
                  className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Browse Class 12 PYQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MODERN GLASSY FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5">
                  <img
                    src="/logo_UnivGeeks.png"
                    alt="UnivGeeks Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">UnivGeeks</h3>
                  <p className="text-xs text-cyan-400">Learn • Prepare • Grow</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Empowering RBSE and board students with structured study notes,
                chapter-wise previous year question papers, and reliable learning tools.
              </p>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Navigation
              </h4>
              <div className="mt-4 space-y-2.5 text-sm">
                <Link href="/" className="block transition hover:text-cyan-300">
                  Home
                </Link>
                <Link href="/notes" className="block transition hover:text-cyan-300">
                  Notes Portal
                </Link>
                <Link href="/pyqs" className="block transition hover:text-cyan-300">
                  Previous Year Questions (PYQs)
                </Link>
                <Link href="/about" className="block transition hover:text-cyan-300">
                  About UnivGeeks
                </Link>
              </div>
            </div>

            {/* Academic Resources */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Resources
              </h4>
              <div className="mt-4 space-y-2.5 text-sm">
                <Link href="/pyqs/physics" className="block transition hover:text-cyan-300">
                  Class 12 Physics PYQs
                </Link>
                <Link href="/pyqs/chemistry" className="block transition hover:text-cyan-300">
                  Class 12 Chemistry PYQs
                </Link>
                <Link href="/pyqs/mathematics" className="block transition hover:text-cyan-300">
                  Class 12 Mathematics PYQs
                </Link>
                <Link href="/notes" className="block transition hover:text-cyan-300">
                  Class 10 Science Notes
                </Link>
              </div>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Connect
              </h4>
              <p className="mt-4 text-sm text-slate-400">
                Have questions or need help with study material?
              </p>
              <a
                href="mailto:contact@univ-geeks.com"
                className="mt-3 inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-white/10"
              >
                contact@univ-geeks.com
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
            <span>© {new Date().getFullYear()} UnivGeeks. All rights reserved.</span>
            <span>Dedicated with ❤️ for student success.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
