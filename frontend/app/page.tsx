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
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
      2013,
    ],
    thumbnail: "/physics-thumbnail.png",
  },
  {
    subject: "Chemistry",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
      2013,
    ],
    thumbnail: "/chemistry-thumbnail.png",
  },
  {
    subject: "Mathematics",
    className: "Class 12",
    years: [
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
      2013,
    ],
    thumbnail: "/mathematics-thumbnail.png",
  },
  {
    subject: "Biology",
    className: "Class 12",
    years: [
      2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
      2025,
    ],
    thumbnail: "/biology-thumbnail.png",
  },
];

const studentReviews = [
  {
    name: "Shruti Ranawat",
    role: "RBSE Class 12 • Science (PCM)",
    location: "Sikar, Rajasthan",
    badge: "98.0% District Topper",
    rating: 5,
    avatarGradient: "from-amber-500 to-orange-500",
    initials: "SR",
    review:
      "UnivGeeks ne Class 12 board ki preparation mein meri kaafi help ki. Chapter-wise PYQs (2013–2025) se mujhe samajh aa gaya ki kaunse questions baar-baar pooche jaate hain. Formula sheets ki wajah se exam se pehle sirf 2 ghante mein poori Physics revise kar paayi.",
    tag: "Physics & Chemistry",
  },
  {
    name: "Rahul Choudhary",
    role: "RBSE Class 12 • Science (PCB)",
    location: "Kota, Rajasthan",
    badge: "96.4% in Board Exams",
    rating: 5,
    avatarGradient: "from-blue-500 to-indigo-500",
    initials: "RC",
    review:
      "Handwritten notes aur diagrams kaafi clear aur to-the-point hain. Koi extra confusing explanation nahi hai. In notes se Chemistry mein 98 score karne mein help mili aur basics bhi achhe se clear ho gaye. Ab Padhega Rajasthan!",
    tag: "Chemistry & Handwritten Notes",
  },
  {
    name: "Jyoti Shekhawat",
    role: "RBSE Class 12 • Science",
    location: "Jaipur, Rajasthan",
    badge: "97.4% State Rank",
    rating: 5,
    avatarGradient: "from-pink-500 to-rose-500",
    initials: "JS",
    review:
      "Rajasthan Board ke genuine previous-year questions aur unke step-by-step solutions dhoondhna pehle kaafi mushkil tha. UnivGeeks par ye sab ek hi jagah mil gaya. Rajasthan ke RBSE students ke liye ye platform kaafi useful hai.",
    tag: "PYQs & Solutions",
  },
  {
    name: "Manvendra Singh",
    role: "RBSE Class 10 • All Subjects",
    location: "Jodhpur, Rajasthan",
    badge: "95.8% in Class 10",
    rating: 5,
    avatarGradient: "from-emerald-500 to-teal-500",
    initials: "MS",
    review:
      "Class 10 Science aur Maths ke chapter summaries kaafi useful hain. School ke pre-board paas aa rahe the, toh maine mainly inhi revision notes se preparation ki aur saare core subjects mein 95+ score kiya.",
    tag: "Science & Mathematics",
  },
  {
    name: "Ananya Rathore",
    role: "RBSE Class 11 • Science Stream",
    location: "Udaipur, Rajasthan",
    badge: "Foundation Top Rank",
    rating: 5,
    avatarGradient: "from-violet-500 to-purple-500",
    initials: "AR",
    review:
      "Class 10 se 11 mein aane ke baad syllabus thoda tough laga, lekin interactive formula sheets aur properly arranged PDFs se derivations samajhna easy ho gaya. Website bhi fast chalti hai aur saara content free hai.",
    tag: "Formula Sheets & Derivations",
  },
  {
    name: "Harsh Vardhan",
    role: "RBSE Class 12 • Mathematics",
    location: "Bikaner, Rajasthan",
    badge: "99/100 in Maths",
    rating: 5,
    avatarGradient: "from-cyan-500 to-blue-500",
    initials: "HV",
    review:
      "Chapter-wise 13 saal ke question papers online milna kaafi helpful hai. Maine yahin se Calculus aur Algebra ke saare PYQs practice kiye, jisse Maths mein 99 score karne mein help mili.",
    tag: "Mathematics & PYQs",
  },
];

const archiveCards = [
  {
    subject: "Physics",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    bgAlpha: "rgba(37, 99, 235, 0.094)",
    year: "2025",
    status: "✓ Solved",
    rotateY: 0,
    delay: "0s",
  },
  {
    subject: "Chemistry",
    color: "bg-purple-600",
    textColor: "text-purple-600",
    bgAlpha: "rgba(124, 58, 237, 0.094)",
    year: "2024",
    status: "✓ Solved",
    rotateY: 60,
    delay: "0.45s",
  },
  {
    subject: "Mathematics",
    color: "bg-amber-600",
    textColor: "text-amber-600",
    bgAlpha: "rgba(217, 119, 6, 0.094)",
    year: "2023",
    status: "✓ Solved",
    rotateY: 120,
    delay: "0.9s",
  },
  {
    subject: "Biology",
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
    bgAlpha: "rgba(5, 150, 105, 0.094)",
    year: "2022",
    status: "✓ Solved",
    rotateY: 180,
    delay: "1.35s",
  },
  {
    subject: "Physics",
    color: "bg-cyan-600",
    textColor: "text-cyan-600",
    bgAlpha: "rgba(8, 145, 178, 0.094)",
    year: "2018",
    status: "✓ Verified",
    rotateY: 240,
    delay: "1.8s",
  },
  {
    subject: "Chemistry",
    color: "bg-pink-600",
    textColor: "text-pink-600",
    bgAlpha: "rgba(219, 39, 119, 0.094)",
    year: "2013",
    status: "✓ Archive",
    rotateY: 300,
    delay: "2.25s",
  },
];

export default function HomePage() {
  const [activeClassTab, setActiveClassTab] = useState<"12" | "11" | "10">(
    "12",
  );

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
        pyqHref: "/pyqs/class-12/physics",
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
        pyqHref: "/pyqs/class-12/chemistry",
      },
      {
        name: "Mathematics",
        icon: "📐",
        tag: "13 Years PYQs",
        color: "from-amber-600/20 to-orange-500/10",
        chapters: "13 Chapters",
        description: "Calculus, Matrices, Determinants, Vectors & 3D Geometry.",
        notesHref: "/notes",
        pyqHref: "/pyqs/class-12/mathematics",
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
        pyqHref: "/pyqs/class-12/biology",
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
      s.description.toLowerCase().includes(quickSearch.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <Navbar />

      {/* =====================================================
          1. HERO SECTION WITH 3D FLOATING FORMULA BOOK
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 px-5 py-12 sm:px-8 lg:py-20">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-50 px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm sm:text-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span>UnivGeeks - Students ka Platform</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                AB PADHEGA{" "}
                <span className="block sm:inline bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  RAJASTHAN
                </span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Resources Kisi ki majboori nahi kisi ki padhai ki wajah banne
                chaiye
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/notes"
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_25px_rgba(244,63,94,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(251,146,60,0.45)] active:scale-95 sm:w-auto"
                >
                  <span className="text-lg">📝</span>
                  <span>Explore Notes</span>
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

              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-cyan-600">13+</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">
                    Years PYQs
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-blue-600">100%</div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">
                    Free Study Notes
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-indigo-600">
                    Class 10-12
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">
                    RBSE & State
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-center lg:text-left">
                  <div className="text-2xl font-black text-amber-500">
                    Chapter-Wise
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500 font-medium">
                    Organized
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden justify-center lg:flex lg:col-span-5">
              <FloatingFormulaBook />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. SUCCESS PANEL (TOPPERS & ACHIEVERS SECTION)
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061836] via-[#092248] to-[#061836] px-5 py-14 sm:py-20 text-white sm:px-8">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
              <span>🏆</span>
              <span>Hall of Fame & Board Toppers</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Celebrating Student Success
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
              Real hard work, real results. Meet our top-scoring students who
              transformed their board examination performance with UnivGeeks
              study material and PYQs.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="relative h-40 sm:h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 z-10 flex h-7 w-7 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-yellow-400 text-xs sm:text-lg font-black text-slate-950 shadow-lg">
                  ♛ 1
                </div>
                <img
                  src="/achievements/1.png"
                  alt="Shruti Ranawat - 98% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-2 sm:border-t-4 border-yellow-400 p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-4xl font-black text-yellow-400">
                  98.0%
                </span>
                <h3 className="mt-1 sm:mt-2 text-sm sm:text-xl font-bold text-white truncate">
                  Shruti Ranawat
                </h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-blue-200 truncate">
                  RBSE Class 12 • Science
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-300/50 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="relative h-40 sm:h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 z-10 flex h-7 w-7 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-slate-200 text-xs sm:text-base font-black text-slate-900 shadow-lg">
                  2
                </div>
                <img
                  src="/achievements/2.png"
                  alt="Nupur Rathor - 97.8% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-2 sm:border-t-4 border-slate-300 p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-4xl font-black text-slate-200">
                  97.8%
                </span>
                <h3 className="mt-1 sm:mt-2 text-sm sm:text-xl font-bold text-white truncate">
                  Nupur Rathor
                </h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-blue-200 truncate">
                  RBSE Class 12 • Science
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="relative h-40 sm:h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 z-10 flex h-7 w-7 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-amber-500 text-xs sm:text-base font-black text-white shadow-lg">
                  3
                </div>
                <img
                  src="/achievements/3.png"
                  alt="Jyoti Shekhawat - 97.4% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-2 sm:border-t-4 border-amber-500 p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-4xl font-black text-amber-400">
                  97.4%
                </span>
                <h3 className="mt-1 sm:mt-2 text-sm sm:text-xl font-bold text-white truncate">
                  Jyoti Shekhawat
                </h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-blue-200 truncate">
                  RBSE Class 12 • Science
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="relative h-40 sm:h-72 overflow-hidden bg-[#041a3d]">
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4 z-10 flex h-7 w-7 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-cyan-500 text-xs sm:text-base font-black text-white shadow-lg">
                  4
                </div>
                <img
                  src="/achievements/4.png"
                  alt="Maheep Bharadwaj - 97.4% RBSE Board"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t-2 sm:border-t-4 border-cyan-400 p-3 sm:p-6 text-center">
                <span className="text-xl sm:text-4xl font-black text-cyan-400">
                  97.4%
                </span>
                <h3 className="mt-1 sm:mt-2 text-sm sm:text-xl font-bold text-white truncate">
                  Maheep Bharadwaj
                </h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-blue-200 truncate">
                  RBSE Class 12 • Science
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/40 hover:brightness-110 active:scale-95"
            >
              <span>See All Toppers & Success Stories</span>
              <span className="text-lg">→</span>
            </Link>
            <p className="mt-3 text-xs text-blue-200/70">
              Browse complete scores, testimonials, and past board marks on our
              achievements page.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. CLASS & SUBJECT SELECTION
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

            <div
              ref={tabsContainerRef}
              className="relative flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5 shadow-sm"
            >
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
                  ref={(el) => {
                    tabButtonRefs.current[i] = el;
                  }}
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
          4. MASTER BOARD PATTERNS (RESPONSIVE)
      ====================================================== */}
      <section className="relative overflow-hidden border-y border-blue-100 bg-gradient-to-b from-[#f0f7ff] to-[#e8f3fe] px-4 py-12 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-sm backdrop-blur-sm">
                <span>📅</span>
                <span>13+ Years Archive • 2013–2026</span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold leading-[1.15] text-slate-900 sm:mt-5 sm:text-4xl lg:text-5xl">
                Master Board Patterns,
                <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ab bas ek click door.
                </span>
              </h2>

              <p className="mt-3 sm:mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-lg">
                <span className="font-semibold text-slate-800">
                  13 saal ke board papers, ek jagah.
                </span>{" "}
                Padho, pattern pehchano aur exam se pehle apni taiyari pakki
                karo — bina random PDFs dhoondhe.
              </p>

              <ul className="mt-5 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5">
                {[
                  "🗓️ 2013–2026 Solved",
                  "🎯 Chapter-wise sorted",
                  "🇮🇳 Hindi + English",
                ].map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center rounded-full border border-blue-200/70 bg-white/85 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm sm:text-sm"
                  >
                    {chip}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/pyqs"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/25"
                >
                  <span>Explore Class 12 PYQs</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <span className="text-xs font-semibold text-slate-500">
                  100% free — hamesha free. 🎓
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN CAROUSEL */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto flex w-full max-w-[540px] flex-col items-center">
                
                {/* Background Ambient Glow */}
                <div className="pointer-events-none absolute -inset-6 z-0 flex items-center justify-center overflow-visible">
                  <div
                    className="absolute h-[280px] w-[360px] sm:h-[340px] sm:w-[440px] rounded-full blur-[60px] sm:blur-[70px]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.32) 45%, transparent 75%)",
                    }}
                  />
                </div>

                {/* 3D CAROUSEL — same ring on mobile + desktop */}
                <style>{`
                  .mb-stage {
                    --mb-w: 150px;
                    --mb-h: 205px;
                    --mb-r: 140px;
                    position: relative;
                    width: 100%;
                    height: 270px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1000px;
                    -webkit-perspective: 1000px;
                    touch-action: pan-y; /* vertical page scroll still works on touch */
                  }
                  @media (min-width: 640px) {
                    .mb-stage { --mb-w: 190px; --mb-h: 215px; --mb-r: 200px; height: 330px; perspective: 1100px; -webkit-perspective: 1100px; }
                  }
                  @media (min-width: 1024px) {
                    .mb-stage { --mb-w: 205px; --mb-h: 220px; --mb-r: 215px; height: 380px; }
                  }

                  .mb-ring {
                    position: relative;
                    width: var(--mb-w);
                    height: var(--mb-h);
                    transform-style: preserve-3d;
                    -webkit-transform-style: preserve-3d;
                    will-change: transform;
                    animation: mb-spin 26s linear infinite;
                    -webkit-animation: mb-spin 26s linear infinite;
                  }
                  .mb-card {
                    position: absolute;
                    inset: 0;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                  }
                  .mb-card-float {
                    animation: mb-float 4.5s ease-in-out infinite;
                    -webkit-animation: mb-float 4.5s ease-in-out infinite;
                  }

                  /* translateZ(-r) keeps the front card on the focal plane so it never gets clipped */
                  @keyframes mb-spin {
                    from { transform: translateZ(calc(var(--mb-r) * -1)) rotateY(0deg); }
                    to   { transform: translateZ(calc(var(--mb-r) * -1)) rotateY(-360deg); }
                  }
                  @-webkit-keyframes mb-spin {
                    from { -webkit-transform: translateZ(calc(var(--mb-r) * -1)) rotateY(0deg); }
                    to   { -webkit-transform: translateZ(calc(var(--mb-r) * -1)) rotateY(-360deg); }
                  }
                  @keyframes mb-float {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-8px); }
                  }

                  /* pause on hover (mouse only) / while a finger is held down */
                  @media (hover: hover) {
                    .mb-stage:hover .mb-ring { animation-play-state: paused; }
                  }
                  .mb-stage:active .mb-ring { animation-play-state: paused; }

                  /* Android "Remove animations" / iOS "Reduce Motion" turn this on —
                     keep the ring turning, just much slower, and drop the bobbing */
                  @media (prefers-reduced-motion: reduce) {
                    .mb-ring { animation-duration: 80s; }
                    .mb-card-float { animation: none; }
                  }
                `}</style>

                <div className="relative z-10 w-full">
                  <div className="mb-stage">
                    <div className="mb-ring">
                      {archiveCards.map((card, idx) => (
                        <div
                          key={idx}
                          className="mb-card"
                          style={{
                            transform: `rotateY(${card.rotateY}deg) translateZ(var(--mb-r))`,
                            WebkitTransform: `rotateY(${card.rotateY}deg) translateZ(var(--mb-r))`,
                          }}
                        >
                          <div
                            className="mb-card-float h-full rounded-2xl border border-white/70 p-3 shadow-[0_14px_32px_rgba(15,23,42,0.18)] sm:p-3.5"
                            style={{
                              animationDelay: card.delay,
                              background:
                                "linear-gradient(150deg, rgb(255, 255, 255) 0%, rgb(248, 250, 252) 70%, rgb(241, 245, 249) 100%)",
                            }}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white ${card.color}`}
                              >
                                {card.subject}
                              </span>
                              <span className="whitespace-nowrap text-[9px] font-bold text-slate-400">
                                RBSE • Cl 12
                              </span>
                            </div>

                            <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              Board Paper
                            </p>
                            <p
                              className={`-mt-0.5 text-3xl font-black tracking-tight sm:text-4xl ${card.textColor}`}
                            >
                              {card.year}
                            </p>

                            <div className="mt-2.5 space-y-1.5">
                              <span className="block h-1.5 w-full rounded-full bg-slate-200" />
                              <span className="block h-1.5 w-11/12 rounded-full bg-slate-200" />
                              <span className="block h-1.5 w-4/5 rounded-full bg-slate-200" />
                              <span className="block h-1.5 w-10/12 rounded-full bg-slate-200" />
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                              <span className="text-[9px] font-bold text-slate-400">
                                UNIVGEEKS
                              </span>
                              <span
                                className={`rounded-full px-1.5 py-0.5 text-[8px] font-black ${card.textColor}`}
                                style={{ backgroundColor: card.bgAlpha }}
                              >
                                {card.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Badge Bar */}
                <div className="relative z-10 mt-4 flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-sm text-white shadow-md shadow-blue-500/25">
                      📄
                    </span>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        13 Years Archive
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500">
                        2013 → 2026 • All Subjects
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-5 rounded-full bg-cyan-600" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          5. STUDENTS REVIEWS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-amber-100/60 bg-gradient-to-b from-[#f8fafc] via-[#fffbf3] to-[#f8fafc] px-5 py-20 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>⭐ 4.9/5 Student Rating • 25,000+ Learners</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Students{" "}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Reviews
              </span>
            </h2>

            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              Hear directly from Class 10, 11 &amp; 12 board exam achievers
              across Rajasthan who transformed their scores with UnivGeeks
              notes, formula sheets, and solved PYQs.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900">
                <span>⭐</span> 4.9 / 5 Rating (1,250+ Reviews)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-900">
                <span>🎯</span> 96%+ Board Success Rate
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-900">
                <span>📍</span> 33 Districts in Rajasthan
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/80 px-3.5 py-1 text-xs font-semibold text-purple-900">
                <span>⚡</span> 100% Free Resources
              </span>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentReviews.map((review) => (
              <div
                key={review.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/10 blur-xl transition-all duration-300 group-hover:scale-125" />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-base font-black text-amber-400">
                      {"★".repeat(review.rating)}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                      🏆 {review.badge}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${review.avatarGradient} text-sm font-black text-white shadow-md`}
                  >
                    {review.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="truncate text-sm font-bold text-slate-900">
                        {review.name}
                      </h4>
                      <span
                        className="text-xs font-bold text-emerald-600"
                        title="Verified Student"
                      >
                        ✓
                      </span>
                    </div>
                    <p className="truncate text-xs text-slate-500">
                      {review.role}
                    </p>
                    <p className="text-[11px] font-semibold text-amber-700">
                      📍 {review.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-500 px-8 py-3.5 font-bold text-white shadow-md shadow-amber-500/25 transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/35"
            >
              <span>View All Student Success Stories</span>
              <span>→</span>
            </Link>

            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-3.5 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50/50 hover:text-cyan-700"
            >
              <span>Explore Free Notes &amp; PYQs</span>
              <span>📚</span>
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
                Join thousands of students using UnivGeeks for free structured
                notes, 13+ years of solved PYQs, and high-yield formula sheets.
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
          7. FOOTER
      ====================================================== */}
      <Footer />
    </main>
  );
}