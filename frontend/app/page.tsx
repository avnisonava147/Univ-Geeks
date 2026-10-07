"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import FloatingFormulaBook from "../components/FloatingFormulaBook";
import Footer from "../components/Footer";

export const pyqs = [
  {
    subject: "Physics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/physics-thumbnail.png",
  },
  {
    subject: "Chemistry",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/chemistry-thumbnail.png",
  },
  {
    subject: "Mathematics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/mathematics-thumbnail.png",
  },
  {
    subject: "Biology",
    className: "Class 12",
    years: [
      2013, 2014, 2015, 2016, 2017,
      2018, 2019, 2020, 2021, 2022,
      2023, 2024, 2025,
    ],
    thumbnail: "/biology-thumbnail.png",
  },
];

export default function HomePage() {
  const [activeClassTab, setActiveClassTab] =
    useState<"12" | "11" | "10">("12");

  const [quickSearch, setQuickSearch] = useState("");

  // Animated sliding pill refs
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const classTabOrder = ["12", "11", "10"] as const;

  // Update pill position whenever active tab changes
  useEffect(() => {
    const idx = classTabOrder.indexOf(activeClassTab);
    const btn = tabButtonRefs.current[idx];
    const container = tabsContainerRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeClassTab]);

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
        chapters: "14 Chapters",
        description:
          "Electrostatics, Optics, Magnetism, Semiconductor & Modern Physics.",
        notesHref: "/notes",
        pyqHref: "/pyqs/physics",
      },
      {
        name: "Chemistry",
        icon: "🧪",
        tag: "Bilingual",
        color: "from-purple-600/20 to-pink-500/10",
        chapters: "12 Chapters",
        description:
          "Solutions, Electrochemistry, Organic Reactions & Coordination Compounds.",
        notesHref: "/notes",
        pyqHref: "/pyqs/chemistry",
      },
      {
        name: "Mathematics",
        icon: "📐",
        tag: "13 Years PYQs",
        color: "from-amber-600/20 to-orange-500/10",
        chapters: "13 Chapters",
        description:
          "Calculus, Matrices, Determinants, Vectors & 3D Geometry.",
        notesHref: "/notes",
        pyqHref: "/pyqs/mathematics",
      },
      {
        name: "Biology",
        icon: "🧬",
        tag: "Diagram Focused",
        color: "from-emerald-600/20 to-teal-500/10",
        chapters: "13 Chapters",
        description:
          "Genetics, Reproduction, Biotechnology, Ecology & Human Physiology.",
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
        chapters: "14 Chapters",
        description:
          "Kinematics, Laws of Motion, Work Energy, Thermodynamics & Waves.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Chemistry",
        icon: "🔬",
        tag: "Concepts",
        color: "from-purple-600/20 to-pink-500/10",
        chapters: "13 Chapters",
        description:
          "Atomic Structure, Chemical Bonding, Equilibrium & Organic Chemistry.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Mathematics",
        icon: "📊",
        tag: "Core",
        color: "from-amber-600/20 to-orange-500/10",
        chapters: "14 Chapters",
        description:
          "Sets, Trigonometric Functions, Conic Sections, Limits & Derivatives.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Biology",
        icon: "🌱",
        tag: "Comprehensive",
        color: "from-emerald-600/20 to-teal-500/10",
        chapters: "19 Chapters",
        description:
          "Cell Biology, Plant Physiology, Biomolecules & Human Anatomy.",
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
        chapters: "13 Chapters",
        description:
          "Chemical Reactions, Life Processes, Light, Electricity & Environment.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Mathematics",
        icon: "🔢",
        tag: "Solved Steps",
        color: "from-amber-600/20 to-orange-500/10",
        chapters: "14 Chapters",
        description:
          "Real Numbers, Polynomials, Quadratic Equations, Triangles & Statistics.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "Social Science",
        icon: "🗺️",
        tag: "Key Points",
        color: "from-purple-600/20 to-pink-500/10",
        chapters: "History & Civics",
        description:
          "Nationalism, Resources, Democracy, Money & Credit simplified.",
        notesHref: "/notes",
        pyqHref: "/pyqs",
      },
      {
        name: "English & Hindi",
        icon: "📚",
        tag: "Grammar & Lit",
        color: "from-emerald-600/20 to-teal-500/10",
        chapters: "Language Notes",
        description:
          "Summary, Question-Answers, Grammar rules and writing formats.",
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
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <Navbar />

      {/* =====================================================
          1. HERO SECTION WITH 3D FLOATING FORMULA BOOK
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 px-5 py-12 sm:px-8 lg:py-20">
        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Content Column (7 cols) */}
            <div className="text-center lg:col-span-7 lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm sm:text-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span>Next-Gen RBSE & Board Preparation Portal</span>
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Empower Your Mind.{" "}
                <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Ace Your Board Exams.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                High-yield chapter notes, 13+ years chapter-wise PYQs (2013–2025),
                and interactive formula sheets carefully structured for Class 10, 11 & 12 students.
              </p>

              {/* Action Buttons: Sign Up in place of Explore Chapter Notes */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/contact"
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(6,182,212,0.38)] active:scale-95 sm:w-auto"
                >
                  <span className="text-lg">✨</span>
                  <span>Sign Up Free</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/pyqs"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50/50 sm:w-auto"
                >
                  <span className="text-lg">📝</span>
                  <span>13+ Years PYQs</span>
                </Link>
              </div>

              {/* Quick Search Bar */}
              <div className="mt-8 max-w-xl">
                <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-md transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <span className="pl-3 text-lg text-slate-400">🔍</span>
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Search Physics, Chemistry, Maths, PYQs..."
                    className="w-full bg-transparent px-3 py-1.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  {quickSearch && (
                    <button
                      type="button"
                      onClick={() => setQuickSearch("")}
                      className="mr-2 rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Popular Search Chips */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 lg:justify-start">
                  <span className="font-semibold text-slate-600">Popular:</span>
                  {popularSearches.map((chip) => (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-cyan-600">13+</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">Years PYQs</div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-blue-600">100%</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">Free Study Notes</div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-indigo-600">Class 10-12</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">RBSE & State</div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-amber-500">Chapter-Wise</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">Organized</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Floating Formula Book (5 cols) */}
            <div className="relative flex justify-center lg:col-span-5">
              <FloatingFormulaBook />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. SUCCESS PANEL (TOPPERS & ACHIEVERS SECTION)
          DISTINCT DEEP NAVY PLANE BEFORE CLASS SELECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061836] via-[#092248] to-[#061836] px-5 py-20 text-white sm:px-8">
        {/* Ambient Decorative Lighting */}
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

        {/* Decorative Rings */}
        <div className="pointer-events-none absolute right-10 top-12 h-64 w-64 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute right-24 top-24 h-48 w-48 rounded-full border border-white/5" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
              <span>🏆</span>
              <span>Hall of Fame & Board Toppers</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Celebrating Student Success
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
              Real hard work, real results. Meet our top-scoring students who transformed their
              board examination performance with UnivGeeks study material and PYQs.
            </p>
          </div>

          {/* Student Cards Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Achiever 1 */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="relative h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-lg font-black text-slate-950 shadow-lg">
                  ♛ 1
                </div>
                <img
                  src="/achievements/1.png"
                  alt="Shruti Ranawat - 98% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-4 border-yellow-400 p-6 text-center">
                <span className="text-3xl font-black text-yellow-400 sm:text-4xl">
                  98.0%
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Shruti Ranawat
                </h3>
                <p className="mt-1 text-xs font-semibold text-blue-200">
                  RBSE Class 12 • Science Stream
                </p>
              </div>
            </div>

            {/* Achiever 2 */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-300/50 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="relative h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-base font-black text-slate-900 shadow-lg">
                  2
                </div>
                <img
                  src="/achievements/2.png"
                  alt="Nupur Rathor - 97.8% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-4 border-slate-300 p-6 text-center">
                <span className="text-3xl font-black text-slate-200 sm:text-4xl">
                  97.8%
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Nupur Rathor
                </h3>
                <p className="mt-1 text-xs font-semibold text-blue-200">
                  RBSE Class 12 • Science Stream
                </p>
              </div>
            </div>

            {/* Achiever 3 */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 sm:col-span-2 lg:col-span-1">
              <div className="relative h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-base font-black text-white shadow-lg">
                  3
                </div>
                <img
                  src="/achievements/3.png"
                  alt="Jyoti Shekhawat - 97.4% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-4 border-amber-500 p-6 text-center">
                <span className="text-3xl font-black text-amber-400 sm:text-4xl">
                  97.4%
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Jyoti Shekhawat
                </h3>
                <p className="mt-1 text-xs font-semibold text-blue-200">
                  RBSE Class 12 • Science Stream
                </p>
              </div>
            </div>
          </div>

          {/* Call to action redirecting to /achievements */}
          <div className="mt-12 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/40 hover:brightness-110 active:scale-95"
            >
              <span>See All Toppers & Success Stories</span>
              <span className="text-lg">→</span>
            </Link>
            <p className="mt-3 text-xs text-blue-200/70">
              Browse complete scores, testimonials, and past board marks on our achievements page.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. CLASS & SUBJECT SELECTION
          CLEAN LIGHT PLANE
      ====================================================== */}
      <section className="relative border-t border-slate-200 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                Curriculum Explorer
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Choose Your Class & Subject
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
                Instant access to chapter notes and board exam past papers.
              </p>
            </div>

            {/* Class Tabs — Animated Sliding Pill */}
            <div
              ref={tabsContainerRef}
              className="relative flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5 shadow-sm"
            >
              {/* Sliding background pill */}
              {pillStyle.width > 0 && (
                <span
                  className="pointer-events-none absolute inset-y-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-md shadow-blue-500/25 transition-all duration-300 ease-in-out"
                  style={{
                    left: pillStyle.left,
                    width: pillStyle.width,
                  }}
                />
              )}
              {classTabOrder.map((c, i) => (
                <button
                  key={c}
                  ref={(el) => { tabButtonRefs.current[i] = el; }}
                  type="button"
                  onClick={() => setActiveClassTab(c)}
                  className={`relative z-10 rounded-xl px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${
                    activeClassTab === c
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Class {c}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentSubjects.map((sub) => (
              <div
                key={sub.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${sub.color} opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-80`}
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                      {sub.icon}
                    </div>
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-700">
                      {sub.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900 transition-colors group-hover:text-cyan-600">
                    {sub.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Class {activeClassTab} • {sub.chapters}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {sub.description}
                  </p>
                </div>

                {/* Links */}
                <div className="mt-6 flex gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href={sub.notesHref}
                    className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white transition hover:bg-cyan-600"
                  >
                    Notes →
                  </Link>

                  <Link
                    href={sub.pyqHref}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-xs font-bold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                  >
                    PYQs 📄
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. MASTER BOARD PATTERNS (DECLUTTERED & STREAMLINED)
          FRESH SOFT ICE-BLUE PLANE
      ====================================================== */}
      <section className="relative overflow-hidden border-y border-blue-100 bg-gradient-to-b from-[#f0f7ff] to-[#e8f3fe] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Info Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
                13+ Years Archive (2013–2025)
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Master Board Patterns With{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Chapter-Wise PYQs.
                </span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Stop solving unorganized papers. UnivGeeks breaks down 13 consecutive years
                of board exams into clean, chapter-level collections for rapid targeted practice.
              </p>

              {/* 3 Lightweight, easily understandable feature cards */}
              <div className="mt-8 grid gap-3.5 sm:grid-cols-3">
                <div className="rounded-2xl border border-blue-200/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                  <div className="text-2xl">🗓️</div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    2013 – 2025 Solved
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    13 years of recurring questions & marking schemes.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                  <div className="text-2xl">🎯</div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    Chapter-Wise Focus
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Finish a chapter in tuition, test board questions instantly.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                  <div className="text-2xl">🇮🇳</div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    Bilingual Medium
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Curated in Hindi & English for Rajasthan & State Boards.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/pyqs"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/25"
                >
                  <span>Explore Class 12 PYQ Repository</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-blue-200/80 bg-white p-7 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg">
                      📄
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        RBSE Class 12 Question Papers
                      </h4>
                      <p className="text-xs text-slate-500">
                        Physics • Chemistry • Mathematics
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    2025 Solved
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { label: "2025 Board Paper", desc: "Latest solution with step marking", tag: "Solved" },
                    { label: "2024 Board Paper", desc: "Chapter-segregated questions", tag: "PDF" },
                    { label: "2023 Board Paper", desc: "Complete question set with key", tag: "Verified" },
                    { label: "2013-2022 Archive", desc: "10 Years topic-wise questions", tag: "Archive" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs transition hover:bg-cyan-50/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-cyan-600">⚡</span>
                        <div>
                          <p className="font-bold text-slate-900">{row.label}</p>
                          <p className="text-[11px] text-slate-500">{row.desc}</p>
                        </div>
                      </div>
                      <span className="rounded-md bg-white px-2 py-0.5 font-bold text-slate-600 shadow-xs border border-slate-200">
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-cyan-50/80 border border-cyan-100 p-3 text-center">
                  <p className="text-xs font-medium text-cyan-800">
                    💡 80% of board questions repeat concepts from past 5 years.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          5. CHAPTER NOTES PORTAL
          SOFT LIGHT PURPLE PLANE
      ====================================================== */}
      <section className="relative border-b border-slate-200 bg-gradient-to-b from-white via-purple-50/20 to-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
              Exam-Ready Summaries
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-5xl">
              Clean, Concise Chapter Notes.
            </h2>

            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              No need to reread 800-page textbooks right before exams. Our chapter notes distill
              the essential definitions, derivations, formulas, and diagrams.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "15-Minute Revision",
                description:
                  "Revisit laws, formulas, and definitions in minutes before your board exam.",
              },
              {
                icon: "🎯",
                title: "Intuitive Selectors",
                description:
                  "Pick class, stream, subject, and chapter to open the exact PDF instantly.",
              },
              {
                icon: "📥",
                title: "Offline PDF Downloads",
                description:
                  "Save PDFs to your phone or laptop to study anytime without wasting internet data.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
                  {card.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-300 bg-purple-50 px-8 py-3.5 font-bold text-purple-700 transition hover:bg-purple-600 hover:text-white"
            >
              <span>Go to Notes Portal</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          6. CALL TO ACTION BANNER
      ====================================================== */}
      <section className="relative px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-8 text-center text-white shadow-2xl sm:p-14">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-2xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
                ✨ Start Your Board Exam Preparation
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-5xl">
                Ready to Score 95%+ in Your Board Exams?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
                Join thousands of students using UnivGeeks for free structured notes,
                13+ years of solved PYQs, and high-yield formula sheets.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-white px-8 py-4 font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Sign Up Free
                </Link>

                <Link
                  href="/pyqs"
                  className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Browse Class 12 PYQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          7. UNIFIED CREATIVE FOOTER
      ====================================================== */}
      <Footer />
    </main>
  );
}