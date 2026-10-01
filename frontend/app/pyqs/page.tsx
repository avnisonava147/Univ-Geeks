"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PYQCard from "../../components/PYQCard";
import Navbar from "../../components/Navbar";

const pyqs = [
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
];

export default function PYQsPage() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPYQs = useMemo(() => {
    return pyqs.filter((pyq) => {
      const matchesSubject =
        selectedSubject === "All" || pyq.subject === selectedSubject;

      const matchesSearch = pyq.subject
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Unified Glassy Navbar */}
      <Navbar />

      {/* PYQ HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061c35] via-[#0a3153] to-[#071526] text-white">
        <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-14">
          <div className="relative max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-cyan-200">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>›</span>
              <span className="font-semibold text-white">PYQs</span>
              <span>›</span>
              <span className="font-semibold text-white">Class 12</span>
            </div>

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              📚 Class 12 Resources
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Chapter-Wise RBSE
              <span className="block text-cyan-300">Class 12</span>
              <span className="block">Previous Year Question Papers</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
              Practice with chapter-wise previous year question papers for Physics,
              Chemistry, Mathematics, Biology and more. Prepare smarter with
              previous years’ board questions.
            </p>

            {/* Feature Cards */}
            <div className="mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl">📄</div>
                <h3 className="mt-2 font-bold">Chapter-wise PDFs</h3>
                <p className="mt-1 text-sm text-blue-200">Well Organized</p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl">🗓️</div>
                <h3 className="mt-2 font-bold">13+ Years of PYQs</h3>
                <p className="mt-1 text-sm text-blue-200">2013 – 2025</p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl">⚡</div>
                <h3 className="mt-2 font-bold">Quick Revision</h3>
                <p className="mt-1 text-sm text-blue-200">Study Smarter</p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-2xl">🎯</div>
                <h3 className="mt-2 font-bold">Exam Ready</h3>
                <p className="mt-1 text-sm text-blue-200">Score Higher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-4">
          {[
            { name: "All", label: "▦ All Subjects" },
            { name: "Physics", label: "⚛ Physics" },
            { name: "Chemistry", label: "🧪 Chemistry" },
            { name: "Mathematics", label: "▣ Mathematics" },
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
      </section>

      {filteredPYQs.length === 0 && (
        <div className="mx-auto my-12 max-w-7xl px-6">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-4xl">🔍</div>
            <h3 className="mt-3 text-lg font-bold text-slate-900">
              No subject found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try searching for Physics, Chemistry or Mathematics.
            </p>
          </div>
        </div>
      )}

      {/* PYQ Cards */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Showing {filteredPYQs.length} subjects
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Class 12 PYQs
            </h2>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subject..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-64"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>
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
    </main>
  );
}
