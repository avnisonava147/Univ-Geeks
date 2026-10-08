"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ThreeCanvas from "../components/ThreeCanvas";

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
          1. HERO SECTION
          WHITE BACKGROUND + SAME THREE.JS 3D ANIMATION
      ====================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-white px-5 py-16 sm:px-8 lg:py-24">

        {/* SAME 3D ANIMATION - DO NOT CHANGE */}
        <ThreeCanvas />

        {/* Ambient atmospheric lighting */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-full max-w-4xl -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-50 px-5 py-2 text-xs font-medium text-cyan-700 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.15)] sm:text-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Next-Gen RBSE & Board Preparation Portal</span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Empower Your Mind.{" "}
            <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ace Your Board Exams.
            </span>
          </h1>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/notes"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(6,182,212,0.35)] active:scale-95 sm:w-auto"
            >
              <span className="text-lg">📖</span>

              <span>Explore Chapter Notes</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/pyqs"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50 sm:w-auto"
            >
              <span className="text-lg">📝</span>

              <span>13+ Years PYQs (2013-2025)</span>
            </Link>

          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">

            <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20">

              <span className="pl-4 text-lg text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search subject, chapter or keyword..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
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

            {/* Popular */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">

              <span className="font-semibold text-slate-600">
                Popular:
              </span>

              {popularSearches.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 shadow-sm transition hover:border-cyan-400/50 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  {chip.label}
                </Link>
              ))}

            </div>
          </div>

          {/* Metrics */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-slate-200 pt-10 sm:grid-cols-4">

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-3xl font-extrabold text-cyan-600">
                13+
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Years of PYQs (2013-2025)
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-3xl font-extrabold text-blue-600">
                100%
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Free PDF Study Notes
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-3xl font-extrabold text-indigo-600">
                Class 10-12
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Science, Commerce, Arts
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-3xl font-extrabold text-amber-500">
                Chapter-Wise
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Sorted For Revision
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          2. CLASS & SUBJECT
          WHITE BACKGROUND
      ====================================================== */}
      <section className="relative border-t border-slate-200 bg-white px-5 py-20 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

            <div>

              <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                Explore Curriculum
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Choose Your Class & Subject
              </h2>

              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Access tailored chapter notes and board exam question papers.
              </p>

            </div>

            {/* Class Tabs */}
            <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5">

              {(["12", "11", "10"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveClassTab(c)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    activeClassTab === c
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Class {c}
                </button>
              ))}

            </div>

          </div>


          {/* Cards */}
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

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {sub.description}
                  </p>

                </div>


                {/* Links */}
                <div className="mt-8 flex gap-2 border-t border-slate-200 pt-4">

                  <Link
                    href={sub.notesHref}
                    className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white transition hover:bg-cyan-500 hover:text-white"
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
          3. PYQ ARCHIVE
          WHITE BACKGROUND
      ====================================================== */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-white px-5 py-24 sm:px-8">

        <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-100/60 blur-[130px]" />

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <div className="inline-flex rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700">
                13+ Years Comprehensive Archive
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Master Board Patterns With{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Chapter-Wise PYQs.
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                Why solve random question papers when you can target exact
                chapters? UnivGeeks breaks down 13 consecutive years
                (2013 through 2025) into neat chapter-level collections for
                Physics, Chemistry, and Mathematics.
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
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >

                    <span className="text-xl">
                      {feature.icon}
                    </span>

                    <div>

                      <h4 className="font-bold text-slate-900">
                        {feature.title}
                      </h4>

                      <p className="mt-0.5 text-sm text-slate-600">
                        {feature.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              <div className="mt-10">

                <Link
                  href="/pyqs"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/30"
                >
                  <span>Explore Class 12 PYQ Repository</span>
                  <span>→</span>
                </Link>

              </div>

            </div>


            {/* PYQ Visual */}
            <div className="relative">

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-200 pb-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      📄
                    </div>

                    <div>

                      <div className="text-sm font-bold text-slate-900">
                        RBSE Class 12 PYQ Archive
                      </div>

                      <div className="text-xs text-slate-500">
                        Physics • Chemistry • Mathematics
                      </div>

                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Live 2025
                  </span>

                </div>


                <div className="mt-6 space-y-3">

                  {[
                    {
                      year: "2025 Board Paper",
                      status: "Latest Solution Added",
                      badge: "Solved",
                    },
                    {
                      year: "2024 Board Paper",
                      status: "Chapter Segregated",
                      badge: "Verified",
                    },
                    {
                      year: "2023 Board Paper",
                      status: "Full Question Set",
                      badge: "PDF",
                    },
                    {
                      year: "2013 – 2022 Archive",
                      status: "10 Years Consolidated",
                      badge: "Archive",
                    },
                  ].map((item) => (

                    <div
                      key={item.year}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition hover:border-cyan-300 hover:bg-cyan-50"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-cyan-600">
                          🗓️
                        </span>

                        <div>

                          <div className="text-sm font-bold text-slate-900">
                            {item.year}
                          </div>

                          <div className="text-xs text-slate-500">
                            {item.status}
                          </div>

                        </div>

                      </div>

                      <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm">
                        {item.badge}
                      </span>

                    </div>

                  ))}

                </div>


                <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-center">

                  <p className="text-xs text-cyan-800">
                    💡 Pro Tip: Practicing 5 years of chapter-wise questions
                    can help you identify recurring board-question patterns.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          4. NOTES
          WHITE BACKGROUND
      ====================================================== */}
      <section className="relative border-t border-slate-200 bg-white px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <div className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
              Exam-Ready Concept Summaries
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-5xl">
              Clean, Concise Chapter Notes.
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Stop drowning in 800-page textbooks right before exams. Our
              chapter notes distill the essential definitions, formula
              derivations, and diagrams.
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
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                  {card.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>

              </div>

            ))}

          </div>


          <div className="mt-12 text-center">

            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-300 bg-purple-50 px-8 py-4 font-bold text-purple-700 transition hover:bg-purple-600 hover:text-white"
            >
              <span>Go to Notes Portal</span>
              <span>→</span>
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          5. CTA
          WHITE BACKGROUND
      ====================================================== */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-white px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white p-8 text-center shadow-xl sm:p-14">

            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl" />

            <div className="relative z-10">

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                ✨ Ready to boost your preparation?
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Start Your Board Exam Preparation With Confidence Today.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
                Get clear notes, previous year question papers, and useful
                learning resources for your board preparation.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/notes"
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-400/25 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Explore Free Notes
                </Link>

                <Link
                  href="/pyqs"
                  className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-bold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Browse Class 12 PYQs
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          6. FOOTER
          WHITE BACKGROUND
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-white text-slate-600">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-sm">
                  <img
                    src="/logo_UnivGeeks.png"
                    alt="UnivGeeks Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900">
                    UnivGeeks
                  </h3>

                  <p className="text-xs text-cyan-600">
                    Learn • Prepare • Grow
                  </p>

                </div>

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Empowering RBSE and board students with structured study notes,
                chapter-wise previous year question papers, and reliable
                learning tools.
              </p>

            </div>


            {/* Navigation */}
            <div>

              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Navigation
              </h4>

              <div className="mt-4 space-y-2.5 text-sm">

                <Link
                  href="/"
                  className="block transition hover:text-cyan-600"
                >
                  Home
                </Link>

                <Link
                  href="/notes"
                  className="block transition hover:text-cyan-600"
                >
                  Notes Portal
                </Link>

                <Link
                  href="/pyqs"
                  className="block transition hover:text-cyan-600"
                >
                  Previous Year Questions (PYQs)
                </Link>

                <Link
                  href="/about"
                  className="block transition hover:text-cyan-600"
                >
                  About UnivGeeks
                </Link>

              </div>

            </div>


            {/* Resources */}
            <div>

              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Resources
              </h4>

              <div className="mt-4 space-y-2.5 text-sm">

                <Link
                  href="/pyqs/physics"
                  className="block transition hover:text-cyan-600"
                >
                  Class 12 Physics PYQs
                </Link>

                <Link
                  href="/pyqs/chemistry"
                  className="block transition hover:text-cyan-600"
                >
                  Class 12 Chemistry PYQs
                </Link>

                <Link
                  href="/pyqs/mathematics"
                  className="block transition hover:text-cyan-600"
                >
                  Class 12 Mathematics PYQs
                </Link>

                <Link
                  href="/notes"
                  className="block transition hover:text-cyan-600"
                >
                  Class 10 Science Notes
                </Link>

              </div>

            </div>


            {/* Contact */}
            <div>

              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Connect
              </h4>

              <p className="mt-4 text-sm text-slate-600">
                Have questions or need help with study material?
              </p>

              <a
                href="mailto:contact@univ-geeks.com"
                className="mt-3 inline-block rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                contact@univ-geeks.com
              </a>

            </div>

          </div>


          {/* Bottom */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">

            <span>
              © {new Date().getFullYear()} UnivGeeks. All rights reserved.
            </span>

            <span>
              Dedicated with ❤️ for student success.
            </span>

          </div>

        </div>
      </footer>

    </main>
  );
}