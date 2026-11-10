"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PYQCard from "../../../components/PYQCard";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const pyqs = [
  {
    subject: "Physics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/physics-thumbnail.png",
    icon: "⚛",
    accent: "physics",
  },
  {
    subject: "Chemistry",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/chemistry-thumbnail.png",
    icon: "🧪",
    accent: "chemistry",
  },
  {
    subject: "Mathematics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ],
    thumbnail: "/mathematics-thumbnail.png",
    icon: "▣",
    accent: "mathematics",
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
    icon: "🧬",
    accent: "biology",
  },
  {
    subject: "Hindi",
    className: "Class 12",
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013],
    thumbnail: "/hindi-thumbnail.png",
    icon: "📚",
    accent: "hindi",
  },
  {
    subject: "English",
    className: "Class 12",
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013],
    thumbnail: "/english-thumbnail.png",
    icon: "📖",
    accent: "english",
  },
];

const bannerMessages = [
  "Practice Previous Year Questions",
  "Prepare Smarter with UnivGeeks",
  "Master Your Class 12 Exams",
];

export default function PYQsPage() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [bannerText, setBannerText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerText((prev) => (prev + 1) % bannerMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const filteredPYQs = useMemo(() => {
    return pyqs.filter((pyq) => {
      const matchesSubject =
        selectedSubject === "All" ||
        pyq.subject === selectedSubject;

      const matchesSearch = pyq.subject
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =====================================================
          HERO BANNER
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061c35] via-[#0a3153] to-[#071526] text-white">

        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Small background dots */}
        <div className="hero-dots pointer-events-none absolute left-0 top-0 h-40 w-40 opacity-40" />
        <div className="hero-dots pointer-events-none absolute bottom-0 right-0 h-40 w-40 opacity-30" />

        <div className="relative mx-auto max-w-[1500px] px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_500px] xl:grid-cols-[minmax(0,1fr)_560px]">

            {/* =================================================
                LEFT SIDE
            ================================================== */}
            <div className="relative z-10">

              {/* Breadcrumb */}
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-cyan-200">
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>

                <span>›</span>

                <span className="text-cyan-200">
                  PYQs
                </span>

                <span>›</span>

                <span className="font-semibold text-white">
                  Class 12
                </span>
              </div>

              {/* Resource Badge */}
              <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm">
                📚 Class 12 Resources
              </div>

              {/* Main Heading */}
              <h1
                key={bannerText}
                className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl animate-banner-text"
              >
                {bannerText === 0 ? (
                  <>
                    Practice Previous Year{" "}
                    <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                      Questions
                    </span>
                  </>
                ) : bannerText === 1 ? (
                  <>
                    Prepare Smarter with{" "}
                    <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                      UnivGeeks
                    </span>
                  </>
                ) : (
                  <>
                    Master Your{" "}
                    <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                      Class 12 Exams
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-5 max-w-3xl text-xs sm:text-base leading-relaxed text-blue-100 lg:text-lg">
                Practice with chapter-wise previous year question papers
                for Physics, Chemistry, Mathematics, Biology and more.
                Prepare smarter with previous years’ board questions.
              </p>

              {/* Feature Cards */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">

                {/* Card 1 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-xl sm:text-2xl">📄</div>

                  <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold">
                    Chapter-wise PDFs
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-blue-200">
                    Well Organized
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-xl sm:text-2xl">🗓️</div>

                  <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold">
                    6+ Years of PYQs
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-blue-200">
                    2020 – 2026
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-xl sm:text-2xl">⚡</div>

                  <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold">
                    Quick Revision
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-blue-200">
                    Study Smarter
                  </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-xl sm:text-2xl">🎯</div>

                  <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-base font-bold">
                    Exam Ready
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-blue-200">
                    Score Higher
                  </p>
                </div>

              </div>
            </div>

            {/* =================================================
                RIGHT SIDE — FLOATING CARD STACK
            ================================================== */}
            <div className="relative hidden min-h-[500px] lg:block">

              {/* Decorative orbit */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/5" />

              {/* Small decorative elements */}
              <div className="floating-spark absolute right-6 top-12 text-2xl text-cyan-200">
                ✦
              </div>

              <div className="floating-spark absolute bottom-16 left-8 text-xl text-blue-200">
                ✧
              </div>

              <div className="pointer-events-none absolute right-2 top-24 text-5xl opacity-20">
                📖
              </div>

              {/* Card Stack */}
              <div className="absolute inset-0 flex items-center justify-center">

                {/* Biology */}
                <Link
                  href="/pyqs/class-12/biology"
                  className="subject-stack-card subject-card-biology group"
                >
                  <div className="subject-card-icon">
                    🧬
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3>
                      Biology
                    </h3>

                    <p>
                      6+ years of PYQs
                    </p>
                  </div>

                  <span className="subject-card-arrow">
                    →
                  </span>
                </Link>

                {/* Mathematics */}
                <Link
                  href="/pyqs/class-12/mathematics"
                  className="subject-stack-card subject-card-mathematics group"
                >
                  <div className="subject-card-icon">
                    🧮
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3>
                      Mathematics
                    </h3>

                    <p>
                      6+ years of PYQs
                    </p>
                  </div>

                  <span className="subject-card-arrow">
                    →
                  </span>
                </Link>

                {/* Chemistry */}
                <Link
                  href="/pyqs/class-12/chemistry"
                  className="subject-stack-card subject-card-chemistry group"
                >
                  <div className="subject-card-icon">
                    🧪
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3>
                      Chemistry
                    </h3>

                    <p>
                      6+ years of PYQs
                    </p>
                  </div>

                  <span className="subject-card-arrow">
                    →
                  </span>
                </Link>

                {/* Physics */}
                <Link
                  href="/pyqs/class-12/physics"
                  className="subject-stack-card subject-card-physics group"
                >
                  <div className="subject-card-icon">
                    ⚛
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3>
                      Physics
                    </h3>

                    <p>
                      6+ years of PYQs
                    </p>
                  </div>

                  <span className="subject-card-arrow">
                    →
                  </span>
                </Link>

              </div>
            </div>

          </div>

          {/* =================================================
              MOBILE SUBJECT CARDS (UPDATED SPACING & PADDING)
          ================================================== */}
          <div className="mt-10 sm:mt-12 lg:hidden pt-4 border-t border-white/10">
            <div className="mb-5 flex items-center gap-3 px-1">
              <span className="h-px flex-1 bg-white/20" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                Choose Subject
              </span>
              <span className="h-px flex-1 bg-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {[
                { name: "Physics", icon: "⚛", href: "/pyqs/class-12/physics", papers: "13 Years PYQs" },
                { name: "Chemistry", icon: "🧪", href: "/pyqs/class-12/chemistry", papers: "13 Years PYQs" },
                { name: "Mathematics", icon: "🧮", href: "/pyqs/class-12/mathematics", papers: "13 Years PYQs" },
                { name: "Biology", icon: "🧬", href: "/pyqs/class-12/biology", papers: "13 Years PYQs" },
                { name: "Hindi", icon: "📚", href: "/pyqs/class-12/hindi", papers: "13 Years PYQs" },
                { name: "English", icon: "📖", href: "/pyqs/class-12/english", papers: "13 Years PYQs" },
              ].map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:bg-white/15 shadow-sm active:scale-95"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl shadow-inner transition-transform group-hover:scale-110">
                      {sub.icon}
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white group-hover:text-cyan-300">
                      {sub.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-blue-200/80">
                      {sub.papers}
                    </p>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs font-bold text-cyan-300">
                    <span>Papers</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          SUBJECT FILTERS + SEARCH
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-stretch sm:items-center gap-4 px-4 py-4 sm:px-6">

          {/* Subject Buttons */}
          <div className="flex shrink-0 gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">

            {[
              { name: "All", label: "▦ All Subjects" },
              { name: "Physics", label: "⚛ Physics" },
              { name: "Chemistry", label: "🧪 Chemistry" },
              { name: "Mathematics", label: "▣ Mathematics" },
              { name: "Biology", label: "🧬 Biology" },
              { name: "Hindi", label: "📚 Hindi" },
              { name: "English", label: "📖 English" },

            ].map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedSubject(item.name)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${selectedSubject === item.name
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {item.label}
              </button>
            ))}

          </div>

          {/* Search */}
          <div className="w-full sm:ml-auto sm:w-auto min-w-[200px] sm:min-w-[260px] shrink-0">
            <div className="relative">

              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search subject..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          NO RESULTS
      ====================================================== */}
      {filteredPYQs.length === 0 && (
        <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6">

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 sm:p-10 text-center">

            <div className="text-4xl">
              🔍
            </div>

            <h3 className="mt-3 text-lg font-bold text-slate-900">
              No subject found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try searching for Physics, Chemistry, Mathematics, Biology, Hindi or English.

            </p>

          </div>

        </div>
      )}

      {/* =====================================================
          PYQ CARDS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        <div className="mb-6">

          <p className="text-sm font-medium text-slate-500">
            Showing {filteredPYQs.length} subjects
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Class 12 PYQs
          </h2>

        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {filteredPYQs.map((pyq) => (
            <PYQCard
              key={`${pyq.className}-${pyq.subject}`}
              subject={pyq.subject}
              className={pyq.className}
              years={pyq.years}
              thumbnail={pyq.thumbnail}
            />
          ))}

        </div>

      </section>

      <Footer />
    </main>
  );
}