import Link from "next/link";

type SubjectHeroProps = {
  subject: string;
  chaptersCount: number;
  classLevel?: "class-10" | "class-12";
};

type SubjectConfig = {
  title: string;
  icon: string;
  theme: string;
  glow: string;
  pattern: string;
};

const subjectConfig: Record<string, SubjectConfig> = {
  Physics: {
    title: "Master Physics with Previous Year Questions",
    icon: "⚛",
    theme: "from-blue-950 via-indigo-900 to-slate-950",
    glow: "bg-cyan-400/20",
    pattern: "physics",
  },

  Chemistry: {
    title: "Master Chemistry with Previous Year Questions",
    icon: "🧪",
    theme: "from-emerald-950 via-teal-900 to-slate-950",
    glow: "bg-emerald-400/20",
    pattern: "chemistry",
  },

  Mathematics: {
    title: "Master Mathematics with Previous Year Questions",
    icon: "∑",
    theme: "from-violet-950 via-purple-900 to-slate-950",
    glow: "bg-purple-400/20",
    pattern: "mathematics",
  },

  Biology: {
    title: "Master Biology with Previous Year Questions",
    icon: "🧬",
    theme: "from-green-950 via-emerald-900 to-slate-950",
    glow: "bg-lime-400/20",
    pattern: "biology",
  },

  Science: {
    title: "Master Science with Previous Year Questions",
    icon: "🔬",
    theme: "from-blue-950 via-indigo-900 to-slate-950",
    glow: "bg-cyan-400/20",
    pattern: "science",
  },

  English: {
    title: "Master English with Previous Year Questions",
    icon: "📖",
    theme: "from-sky-950 via-blue-900 to-slate-950",
    glow: "bg-sky-400/20",
    pattern: "english",
  },

  Hindi: {
    title: "Master Hindi with Previous Year Questions",
    icon: "📚",
    theme: "from-orange-950 via-amber-900 to-slate-950",
    glow: "bg-amber-400/20",
    pattern: "hindi",
  },

  "Social Science": {
    title: "Master Social Science with Previous Year Questions",
    icon: "🌍",
    theme: "from-teal-950 via-cyan-900 to-slate-950",
    glow: "bg-teal-400/20",
    pattern: "social-science",
  },
};

export default function SubjectHero({
  subject,
  chaptersCount,
  classLevel = "class-12",
}: SubjectHeroProps) {
  const config = subjectConfig[subject] ?? {
    title: `Master ${subject} with Previous Year Questions`,
    icon: "📚",
    theme: "from-violet-950 via-purple-900 to-slate-950",
    glow: "bg-purple-400/20",
    pattern: "mathematics",
  };

  const classNumber = classLevel === "class-10" ? "10" : "12";

  const description =
    classNumber === "10"
      ? `Practice chapter-wise RBSE Class 10 ${subject} previous year questions and prepare smarter for your exams.`
      : `Practice chapter-wise RBSE Class 12 ${subject} previous year questions and prepare smarter for your exams.`;

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${config.theme} text-white`}
    >
      {/* Background glow */}
      <div
        className={`pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full ${config.glow} blur-3xl`}
      />

      <div
        className={`pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full ${config.glow} blur-3xl`}
      />

      {/* Decorative pattern */}
      <div
        className={`subject-pattern subject-pattern-${config.pattern}`}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_460px] lg:gap-10">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="mb-3 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Link
                href="/"
                className="text-blue-200 transition hover:text-white"
              >
                Home
              </Link>

              <span className="text-white/40">›</span>

              <Link
                href="/pyqs"
                className="text-blue-200 transition hover:text-white"
              >
                PYQs
              </Link>

              <span className="text-white/40">›</span>

              <Link
                href={`/pyqs/${classLevel}`}
                className="text-blue-200 transition hover:text-white"
              >
                Class {classNumber}
              </Link>

              <span className="text-white/40">›</span>

              <span className="font-semibold text-white">{subject}</span>
            </div>

            {/* Subject badge */}
            <div className="mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold shadow-sm backdrop-blur-md">
              <span className="text-sm sm:text-lg">{config.icon}</span>
              <span>{subject} • Class {classNumber} • RBSE</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-2xl font-black leading-tight sm:text-5xl lg:text-[52px]">
              {config.title}
            </h1>

            {/* Description */}
            <p className="mt-2.5 sm:mt-5 max-w-2xl text-xs sm:text-base leading-relaxed text-blue-100/90">
              {description}
            </p>

            {/* Stats - 3 columns compact on mobile */}
            <div className="mt-4 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-3">
              {/* Resources */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-2 sm:p-3 shadow-sm backdrop-blur-md transition hover:bg-white/[0.12]">
                <span className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-sm sm:text-lg">
                  📚
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] sm:text-xs font-medium text-blue-100/70">
                    Resources
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {chaptersCount} Ch.
                  </span>
                </div>
              </div>

              {/* PYQs */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-2 sm:p-3 shadow-sm backdrop-blur-md transition hover:bg-white/[0.12]">
                <span className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-sm sm:text-lg">
                  🗓️
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] sm:text-xs font-medium text-blue-100/70">
                    PYQs
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    13+ Years
                  </span>
                </div>
              </div>

              {/* Format */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-3 rounded-xl border border-white/15 bg-white/[0.08] p-2 sm:p-3 shadow-sm backdrop-blur-md transition hover:bg-white/[0.12]">
                <span className="flex h-7 w-7 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-sm sm:text-lg">
                  📄
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] sm:text-xs font-medium text-blue-100/70">
                    Format
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    PDF Solved
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 sm:mt-7 flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="#chapters"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm sm:px-5 sm:py-3 font-bold text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Explore Chapters
                <span>↓</span>
              </a>

              <Link
                href="/pyqs"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm sm:px-5 sm:py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                All Subjects
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative hidden min-h-[390px] items-center justify-center lg:flex">
            {/* Outer ring */}
            <div className="absolute h-[320px] w-[320px] rounded-full border border-white/10" />

            {/* Inner ring */}
            <div className="absolute h-[245px] w-[245px] rounded-full border border-white/10" />

            {/* Glow */}
            <div
              className={`absolute h-52 w-52 rounded-full ${config.glow} blur-3xl`}
            />

            {/* Floating mini labels */}
            <div className="subject-floating-label subject-floating-label-top">
              <span>RBSE</span>
              <span>Class {classNumber}</span>
            </div>

            <div className="subject-floating-label subject-floating-label-bottom">
              <span>PYQs</span>
              <span>Class {classNumber}</span>
            </div>

            {/* Main Icon Card */}
            <div className="subject-visual-card">
              <div className="subject-visual-shine" />

              <div className="subject-visual-icon">{config.icon}</div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Previous Year Questions
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">{subject}</h2>

              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />

                <span className="text-sm font-medium text-blue-100">
                  Chapter-wise preparation
                </span>
              </div>
            </div>

            {/* Decorative symbols */}
            <div className="subject-decoration subject-decoration-one">+</div>

            <div className="subject-decoration subject-decoration-two">✦</div>

            <div className="subject-decoration subject-decoration-three">•</div>
          </div>
        </div>
      </div>
    </section>
  );
}
