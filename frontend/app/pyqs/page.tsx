"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PYQCard from "../../components/PYQCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


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

        <div className="relative mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_500px] xl:grid-cols-[minmax(0,1fr)_560px]">

            {/* =================================================
                LEFT SIDE
            ================================================== */}
            <div className="relative z-10">

              {/* Breadcrumb */}
              <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-cyan-200">
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
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                📚 Class 12 Resources
              </div>

              {/* Main Heading */}
              <h1
                key={bannerText}
                className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl animate-banner-text"
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
              <p className="mt-5 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base lg:text-lg">
                Practice with chapter-wise previous year question papers
                for Physics, Chemistry, Mathematics, Biology and more.
                Prepare smarter with previous years’ board questions.
              </p>

              {/* Feature Cards */}
              <div className="mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 xl:grid-cols-4">

                {/* Card 1 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-2xl">📄</div>

                  <h3 className="mt-2 font-bold">
                    Chapter-wise PDFs
                  </h3>

                  <p className="mt-1 text-sm text-blue-200">
                    Well Organized
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-2xl">🗓️</div>

                  <h3 className="mt-2 font-bold">
                    6+ Years of PYQs
                  </h3>

                  <p className="mt-1 text-sm text-blue-200">
                    2020 – 2025
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-2xl">⚡</div>

                  <h3 className="mt-2 font-bold">
                    Quick Revision
                  </h3>

                  <p className="mt-1 text-sm text-blue-200">
                    Study Smarter
                  </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-2xl">🎯</div>

                  <h3 className="mt-2 font-bold">
                    Exam Ready
                  </h3>

                  <p className="mt-1 text-sm text-blue-200">
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
                  href="/pyqs/biology"
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
                  href="/pyqs/mathematics"
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
                  href="/pyqs/chemistry"
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
                  href="/pyqs/physics"
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
              MOBILE SUBJECT STACK
          ================================================== */}
          <div className="mt-10 grid gap-3 lg:hidden">

            <div className="mb-1 flex items-center gap-2">
              <span className="h-px flex-1 bg-white/10" />

              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
                Explore Subjects
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <Link
              href="/pyqs/physics"
              className="mobile-subject-card"
            >
              <span className="text-2xl">⚛</span>

              <div className="flex-1">
                <h3>Physics</h3>
                <p>6+ years of PYQs</p>
              </div>

              <span>→</span>
            </Link>

            <Link
              href="/pyqs/chemistry"
              className="mobile-subject-card"
            >
              <span className="text-2xl">🧪</span>

              <div className="flex-1">
                <h3>Chemistry</h3>
                <p>6+ years of PYQs</p>
              </div>

              <span>→</span>
            </Link>

            <Link
              href="/pyqs/mathematics"
              className="mobile-subject-card"
            >
              <span className="text-2xl">🧮</span>

              <div className="flex-1">
                <h3>Mathematics</h3>
                <p>6+ years of PYQs</p>
              </div>

              <span>→</span>
            </Link>

            <Link
              href="/pyqs/biology"
              className="mobile-subject-card"
            >
              <span className="text-2xl">🧬</span>

              <div className="flex-1">
                <h3>Biology</h3>
                <p>6+ years of PYQs</p>
              </div>

              <span>→</span>
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          SUBJECT FILTERS + SEARCH
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-6 py-4">

          {/* Subject Buttons */}
          <div className="flex shrink-0 gap-3">

            {[
              { name: "All", label: "▦ All Subjects" },
              { name: "Physics", label: "⚛ Physics" },
              { name: "Chemistry", label: "🧪 Chemistry" },
              { name: "Mathematics", label: "▣ Mathematics" },
              { name: "Biology", label: "🧬 Biology" },
            ].map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedSubject(item.name)}
                className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition ${
                  selectedSubject === item.name
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>

          {/* Search */}
          <div className="ml-auto min-w-[220px] shrink-0 sm:min-w-[260px]">
            <div className="relative">

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
        <div className="mx-auto my-12 max-w-7xl px-6">

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <div className="text-4xl">
              🔍
            </div>

            <h3 className="mt-3 text-lg font-bold text-slate-900">
              No subject found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try searching for Physics, Chemistry, Mathematics or Biology.
            </p>

          </div>

        </div>
      )}

      {/* =====================================================
          PYQ CARDS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-6">

          <p className="text-sm font-medium text-slate-500">
            Showing {filteredPYQs.length} subjects
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Class 12 PYQs
          </h2>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

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