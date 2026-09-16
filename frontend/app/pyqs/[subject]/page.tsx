import Link from "next/link";

const subjectData: Record<
  string,
  {
    name: string;
    chapters: string[];
    accent: string;
    bookImage: string;
  }
> = {
  physics: {
    name: "Physics",
    accent: "cyan",
    bookImage: "/physics-thumbnail.png",
    chapters: [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics",
    ],
  },

  chemistry: {
    name: "Chemistry",
    accent: "purple",
    bookImage: "/chemistry-thumbnail.png",
    chapters: [
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "d and f Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
      "Polymers",
      "Chemistry in Everyday Life",
    ],
  },

  mathematics: {
    name: "Mathematics",
    accent: "blue",
    bookImage: "/mathematics-thumbnail.png",
    chapters: [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ],
  },
};

const years = "2013 – 2025";

export default async function SubjectPYQPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const data = subjectData[subject.toLowerCase()];

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Subject Not Found
          </h1>

          <p className="mt-3 text-slate-600">
            The requested subject does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Go Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6faff] text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo_UnivGeeks.png"
              alt="UnivGeeks Logo"
              className="h-11 w-11 rounded-full object-contain"
            />

            <span className="text-xl font-extrabold tracking-tight">
              Univ<span className="text-600">Geeks</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/" className="hover:text-blue-600">
              Courses
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-600"
            >
              PYQs
            </Link>

            <Link href="/" className="hover:text-blue-600">
              Notes
            </Link>

            <Link href="/" className="hover:text-blue-600">
              About
            </Link>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-400">
              🔍 Search anything...
            </div>

            <Link
              href="/"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Login
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1500px] px-5 pt-5 text-sm text-slate-500 lg:px-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/" className="hover:text-blue-600">
          PYQs
        </Link>
        <span className="mx-2">›</span>
        <span>Class 12</span>
        <span className="mx-2">›</span>
        <span className="font-semibold text-slate-900">{data.name}</span>
      </div>

      {/* Hero */}
      <section className="mx-auto mt-3 max-w-[1500px] px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061c35] via-[#0a3153] to-[#071526] px-7 py-8 text-white shadow-lg md:px-9 md:py-10">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-cyan-300/70 px-4 py-1 text-xs font-semibold text-cyan-100">
              RBSE | Previous Year Papers
            </div>

            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Class 12
              <br />
              <span className="text-cyan-300">{data.name}</span> PYQs
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 md:text-base">
              Chapter-wise previous year question papers from 2013 – 2025.
              Practice smarter. Score higher.
            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-xs font-semibold text-slate-100 md:text-sm">
              <span>📄 13 Years</span>
              <span>📚 Chapter-wise</span>
              <span>🟢 Verified Content</span>
              <span>⚡ Exam Ready</span>
            </div>
          </div>

          <div className="absolute bottom-7 right-7 hidden max-w-[190px] rounded-2xl border border-white/25 bg-white/5 p-5 backdrop-blur md:block">
            <p className="text-lg font-bold leading-7">
              “Same
              <br />
              Questions.
              <br />
              Better
              <br />
              Preparation.”
            </p>

            <div className="mt-4 h-0.5 w-14 bg-cyan-300" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto grid max-w-[1500px] gap-4 px-5 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          ["📖", "Chapter-wise PDFs", "Well organised content"],
          ["🗓️", "2013 – 2025", "13 Years of PYQs"],
          ["🛡️", "Free + Premium", "High quality PDFs"],
          ["⚡", "Just ₹1", "Affordable for everyone"],
        ].map(([icon, title, subtitle]) => (
          <div
            key={title}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              {icon}
            </div>

            <div>
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Main Layout */}
      <section className="mx-auto grid max-w-[1500px] gap-5 px-5 pb-8 lg:grid-cols-[1fr_330px] lg:px-8">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Book Details */}
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="mx-auto w-40 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 md:mx-0">
                <img
                  src={data.bookImage}
                  alt={`${data.name} Class 12 PYQs`}
                  className="h-56 w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-2xl font-extrabold leading-tight text-[#071b48]">
                    RBSE Class 12 {data.name} Chapterwise PYQs
                    <br />
                    ({years})
                  </h2>

                  <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                    ₹1 Only
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Get chapter-wise previous year question papers for RBSE Class
                  12 {data.name}. Covers 13 years with solutions-ready PDFs.
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["📅", "13 Years", "2013 – 2025"],
                    ["📚", `${data.chapters.length} Chapters`, "Complete Coverage"],
                    ["📖", "Hindi + English", "Bilingual PDFs"],
                    ["⬇️", "Instant Download", "Access Anytime"],
                  ].map(([icon, title, subtitle]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-blue-100 bg-blue-50/40 p-3"
                    >
                      <div className="text-lg">{icon}</div>
                      <p className="mt-1 text-xs font-bold text-slate-900">
                        {title}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {subtitle}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#chapters"
                    className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                  >
                    🛒 Buy Full Book for ₹1
                  </Link>

                  <Link
                    href="#chapters"
                    className="flex-1 rounded-xl border border-blue-200 px-5 py-3 text-center text-sm font-bold text-slate-700 hover:bg-blue-50"
                  >
                    👁 View Free Sample
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters */}
          <section
            id="chapters"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
              <h2 className="text-xl font-extrabold text-[#071b48]">
                📘 Chapter-wise {data.name} PYQs
              </h2>

              <div className="flex gap-2 text-xs font-semibold">
                <span className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  All
                </span>
                <span className="rounded-lg border border-slate-200 px-4 py-2">
                  Free
                </span>
                <span className="rounded-lg border border-slate-200 px-4 py-2">
                  Premium
                </span>
              </div>
            </div>

            <div>
              {data.chapters.slice(0, 5).map((chapter, index) => (
                <div
                  key={chapter}
                  className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 last:border-0 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-bold text-blue-700">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {chapter}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {120 - index * 6} Questions
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-14 md:pl-0">
                    <span
                      className={`rounded-lg px-4 py-2 text-xs font-bold ${
                        index < 2
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {index < 2 ? "Free" : "₹1"}
                    </span>

                    <Link
                      href="#chapters"
                      className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600"
                    >
                      👁 Preview
                    </Link>

                    <Link
                      href="#chapters"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      ⬇ Download
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5">
              <Link
                href="#all-chapters"
                className="block rounded-xl border border-blue-200 bg-blue-50/40 px-5 py-3 text-center text-sm font-bold text-blue-600 hover:bg-blue-100"
              >
                Load More Chapters ({Math.max(data.chapters.length - 5, 0)}{" "}
                remaining) ↓
              </Link>
            </div>
          </section>

          {/* Related Subjects */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#071b48]">
              🔗 Related Subjects
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                ["🧪", "Chemistry", "chemistry"],
                ["🧮", "Mathematics", "mathematics"],
                ["🌿", "Biology", "biology"],
                ["📘", "English", "english"],
                ["अ", "Hindi", "hindi"],
              ].map(([icon, name, slug]) => (
                <Link
                  key={name}
                  href={`/pyqs/${slug}`}
                  className="rounded-xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="text-2xl">{icon}</div>
                  <h3 className="mt-2 text-sm font-bold">{name}</h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Class 12 PYQs
                  </p>
                  <p className="mt-5 text-xs font-bold text-blue-600">
                    View →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-5">
          {/* Table of Contents */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-[#071b48]">
              📑 Table of Contents
            </h2>

            <div className="mt-5 space-y-1">
              {[
                "Overview",
                "Chapter-wise PYQs",
                "About this Book",
                "What's Inside",
                "Related Subjects",
                "FAQs",
              ].map((item, index) => (
                <Link
                  key={item}
                  href={index === 1 ? "#chapters" : "#"}
                  className={`block rounded-lg px-4 py-3 text-sm ${
                    index === 0
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-[#071b48]">
              🎧 Need Help?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Have questions? We're here to help.
            </p>

            <Link
              href="/"
              className="mt-5 block rounded-xl border border-blue-300 px-4 py-3 text-center text-sm font-bold text-blue-600 hover:bg-blue-50"
            >
              Contact Us
            </Link>
          </div>

          {/* Why UnivGeeks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-[#071b48]">
              ⭐ Why Choose UnivGeeks?
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Authentic PYQs from official sources",
                "Bilingual PDFs (Hindi + English)",
                "Clean and student-friendly format",
                "Affordable pricing (Just ₹1)",
                "Instant download, no waiting",
                "Regular updates with latest papers",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm text-slate-600">
                  <span className="text-blue-600">☑</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-[#071b48]">
              ❓ Frequently Asked Questions
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="border-b border-slate-100 pb-3">
                Are these original RBSE question papers?⌄
              </p>

              <p className="border-b border-slate-100 pb-3">
                Will I get solutions along with the papers?⌄
              </p>

              <p className="border-b border-slate-100 pb-3">
                In which language are the PDFs available?⌄
              </p>

              <p className="border-b border-slate-100 pb-3">
                How will I receive the PDFs after purchase?⌄
              </p>

              <p>Can I get a refund if I face any issue?⌄</p>
            </div>
          </div>
        </aside>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo_UnivGeeks.png"
                alt="UnivGeeks"
                className="h-12 w-12 rounded-full"
              />

              <div>
                <h2 className="text-xl font-extrabold">UnivGeeks</h2>
                <p className="text-xs text-slate-500">
                  Learn. Practice. Score. Grow.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <p>Home</p>
              <p>Courses</p>
              <p>PYQs</p>
              <p>Notes</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Support</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <p>Contact Us</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Refund Policy</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Connect</h3>
            <p className="mt-3 text-sm text-slate-500">
              YouTube · Instagram · LinkedIn
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4 text-center text-xs text-slate-500">
          © 2026 UnivGeeks. All rights reserved.
        </div>
      </footer>
    </main>
  );
}