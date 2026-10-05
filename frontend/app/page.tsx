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
      2019, 2018, 2017, 2016, 2015, 2014, 2013
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
    thumbnail:
      "/physics-thumbnail.png",
  },

  {
    subject: "Chemistry",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013
    ],
    thumbnail:
      "/chemistry-thumbnail.png",
  },

  {
    subject: "Mathematics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020,
      2019, 2018, 2017, 2016, 2015, 2014, 2013
    ],
    thumbnail:
      "/mathematics-thumbnail.png",
  },
{
  subject: "Biology",
  className: "Class 12",
  years: [
    2025, 2024, 2023, 2022, 2021, 2020,
    2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ],
  thumbnail: "/biology-thumbnail.png",
},
];


export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState("All");
const [search, setSearch] = useState("");
const [bannerText, setBannerText] = useState(0);

const bannerMessages = [
  "Practice Previous Year Questions",
  "Prepare Smarter with UnivGeeks",
  "Master Your Class 12 Exams",
];

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
      
      {/* Header */}
   
<header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

    {/* Logo */}
    <Link href="/" className="flex items-center gap-3">
    
      <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden">
  <img
    src="/logo_UnivGeeks.png"
    alt="UnivGeeks Logo"
    className="h-full w-full object-contain"
  />
</div>

      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          UnivGeeks
        </h1>
        
      </div>
   </Link>

    {/* Navigation */}
    <nav className="hidden items-center gap-8 md:flex">

   <Link
  href="/"
  className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
>
  Home
</Link>

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Courses
      </a>

   <Link
  href="/"
  className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
>
  PYQs
</Link>
      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        Notes
      </a>

      <a
        href="#"
        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
      >
        About
      </a>

    </nav>

    {/* Right side */}
    <div className="flex items-center gap-3">

      <button className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 sm:block">
        Login
      </button>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
        Get Started
      </button>

    </div>

  </div>
</header>

      {/* Hero */}
{/* PYQ HERO BANNER */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#061c35] via-[#0a3153] to-[#071526] text-white">
  <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-14">
    <div className="relative max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-cyan-200">
        <span>Home</span>
        <span>›</span>
        <span>PYQs</span>
        <span>›</span>
        <span className="font-semibold text-white">Class 12</span>
      </div>

      {/* Label */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
        📚 Class 12 Resources
      </div>

      {/* Heading */}
     <h1
  key={bannerText}
  className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl animate-banner-text"
>
  {bannerMessages[bannerText]}
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

        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl">🗓️</div>
          <h3 className="mt-2 font-bold">6+ Years of PYQs</h3>
          <p className="mt-1 text-sm text-blue-200">2020 – 2025</p>
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
{/* Subject Filters */}
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


{filteredPYQs.length === 0 && (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
    <div className="text-4xl">🔍</div>

    <h3 className="mt-3 text-lg font-bold text-slate-900">
      No subject found
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      Try searching for Physics, Chemistry or Mathematics.
    </p>
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




