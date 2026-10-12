import Link from "next/link";

type SubjectHeroProps = {
  subject: string;
  chaptersCount: number;
};

type SubjectConfig = {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  theme: string;
  glow: string;
  pattern: string;
};

const subjectConfig: Record<string, SubjectConfig> = {
  Physics: {
    eyebrow: "Physics • Class 12 • RBSE",
    title: "Master Physics with Previous Year Questions",
    description:
      "Practice chapter-wise RBSE Class 12 Physics previous year questions and prepare smarter for your exams.",
    icon: "⚛",
    theme: "from-blue-950 via-indigo-900 to-slate-950",
    glow: "bg-cyan-400/20",
    pattern: "physics",
  },

  Chemistry: {
    eyebrow: "Chemistry • Class 12 • RBSE",
    title: "Master Chemistry with Previous Year Questions",
    description:
      "Practice chapter-wise RBSE Class 12 Chemistry previous year questions and strengthen your exam preparation.",
    icon: "🧪",
    theme: "from-emerald-950 via-teal-900 to-slate-950",
    glow: "bg-emerald-400/20",
    pattern: "chemistry",
  },

  Mathematics: {
    eyebrow: "Mathematics • Class 12 • RBSE",
    title: "Master Mathematics with Previous Year Questions",
    description:
      "Practice chapter-wise RBSE Class 12 Mathematics previous year questions and improve your problem-solving skills.",
    icon: "∑",
    theme: "from-violet-950 via-purple-900 to-slate-950",
    glow: "bg-purple-400/20",
    pattern: "mathematics",
  },

  Biology: {
    eyebrow: "Biology • Class 12 • RBSE",
    title: "Master Biology with Previous Year Questions",
    description:
      "Practice chapter-wise RBSE Class 12 Biology previous year questions and prepare confidently for your exams.",
    icon: "🧬",
    theme: "from-green-950 via-emerald-900 to-slate-950",
    glow: "bg-lime-400/20",
    pattern: "biology",
  },
};

export default function SubjectHero({
  subject,
  chaptersCount,
}: SubjectHeroProps) {
  const config =
    subjectConfig[subject] ?? subjectConfig.Physics;

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

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_460px]">

          {/* LEFT CONTENT */}
          <div className="relative z-10">

            {/* Breadcrumb */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
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

              <span className="font-semibold text-white">
                {subject}
              </span>
            </div>

            {/* Subject badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-md">
              <span className="text-lg">
                {config.icon}
              </span>

              <span>
                {config.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
              {config.title}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              {config.description}
            </p>

            {/* Stats */}
            <div className="mt-7 flex flex-wrap gap-3">

              <div className="subject-stat">
                <span className="subject-stat-icon">
                  📚
                </span>

                <div>
                  <span className="subject-stat-label">
                    Resources
                  </span>

                  <span className="subject-stat-value">
                    {chaptersCount} Chapters
                  </span>
                </div>
              </div>

              <div className="subject-stat">
                <span className="subject-stat-icon">
                  🗓️
                </span>

                <div>
                  <span className="subject-stat-label">
                    PYQs
                  </span>

                  <span className="subject-stat-value">
                   6+ years
                  </span>
                </div>
              </div>

              <div className="subject-stat">
                <span className="subject-stat-icon">
                  📄
                </span>

                <div>
                  <span className="subject-stat-label">
                    Format
                  </span>

                  <span className="subject-stat-value">
                    Chapter-wise PDF
                  </span>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap gap-3">

              <a
                href="#chapters"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Explore Chapters
                <span>↓</span>
              </a>

              <Link
                href="/pyqs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
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
              <span>Class 12</span>
            </div>

            <div className="subject-floating-label subject-floating-label-bottom">
              <span>6+ years</span>
              <span>PYQs</span>
            </div>

            {/* Main Icon Card */}
            <div className="subject-visual-card">

              <div className="subject-visual-shine" />

              <div className="subject-visual-icon">
                {config.icon}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Previous Year Questions
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                {subject}
              </h2>

              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="text-sm font-medium text-blue-100">
                  Chapter-wise preparation
                </span>
              </div>

            </div>

            {/* Decorative symbol */}
            <div className="subject-decoration subject-decoration-one">
              +
            </div>

            <div className="subject-decoration subject-decoration-two">
              ✦
            </div>

            <div className="subject-decoration subject-decoration-three">
              •
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}