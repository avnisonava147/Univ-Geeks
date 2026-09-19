import Link from "next/link";
import ChapterList from "../../../components/ChapterList";
type PageProps = {
  params: Promise<{
    subject: string;
  }>;
};

const subjectData: Record<
  string,
  {
    name: string;
    thumbnail: string;
    chapters: string[];
  }
> = {
  chemistry: {
    name: "Chemistry",
    thumbnail: "/chemistry-thumbnail.png",
    chapters: [
      "Solid State",
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
      "Chemistry in Everyday Life",
    ],
  },

  physics: {
    name: "Physics",
    thumbnail: "/physics-thumbnail.png",
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
    ],
  },

  mathematics: {
    name: "Mathematics",
    thumbnail: "/mathematics-thumbnail.png",
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

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;

  const data =
    subjectData[subject.toLowerCase()] || subjectData.chemistry;

  const subjectName = data.name;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#06233f] via-[#0a3558] to-[#061728] text-white">

        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">

          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-blue-200">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span>›</span>

            <Link href="/" className="transition hover:text-white">
              PYQs
            </Link>

            <span>›</span>

            <span>Class 12</span>

            <span>›</span>

            <span className="font-semibold text-white">
              {subjectName}
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">

            {/* Hero Content */}
            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                📚 Class 12 Resources
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                RBSE Class 12{" "}
                <span className="text-cyan-300">
                  {subjectName}
                </span>{" "}
                PYQs
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-blue-100 sm:text-lg">
                Chapter-wise previous year question papers from
                2013 – 2025. Download, practice and prepare smarter
                with UnivGeeks.
              </p>

              {/* Hero Stats */}
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold">

                <div className="flex items-center gap-2">
                  <span>📄</span>
                  <span>13 Years</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>📚</span>
                  <span>Chapter-wise</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>🟢</span>
                  <span>Verified Content</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Exam Ready</span>
                </div>

              </div>
            </div>

            {/* Hero Side Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="flex h-60 w-80 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur-sm">

                <div>
                  <div className="text-7xl">
                    {subjectName === "Chemistry"
                      ? "🧪"
                      : subjectName === "Physics"
                      ? "⚛️"
                      : "📐"}
                  </div>

                  <p className="mt-4 text-lg font-bold text-cyan-200">
                    Better Preparation.
                  </p>

                  <p className="text-sm text-blue-200">
                    Brighter Tomorrow.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}
      <section className="mx-auto max-w-[1400px] px-5 py-5 sm:px-8 lg:px-10">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon="📖"
            title="Chapter-wise PDFs"
            description="Well organised content"
          />

          <FeatureCard
            icon="🗓️"
            title="2013 – 2025"
            description="13 Years of PYQs"
          />

          <FeatureCard
            icon="🛡️"
            title="Free + Premium"
            description="High quality PDFs"
          />

          <FeatureCard
            icon="⚡"
            title="Just ₹1"
            description="Affordable for everyone"
          />

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-[1400px] px-5 pb-14 sm:px-8 lg:px-10">

        <div className="grid gap-5 lg:grid-cols-[1fr_350px]">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            {/* Book Card */}
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">

              <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[170px_1fr]">

                {/* Thumbnail */}
                <div className="flex items-center justify-center rounded-xl bg-slate-100 p-3">
                  <img
                    src={data.thumbnail}
                    alt={`${subjectName} PYQ`}
                    className="h-60 w-full rounded-lg object-contain"
                  />
                </div>


                {/* Details */}
                <div>

                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div>
                      <h2 className="text-2xl font-extrabold leading-tight text-[#092653] sm:text-3xl">
                        RBSE Class 12 {subjectName}{" "}
                        Chapterwise PYQs
                        <span className="block">
                          (2013 – 2025)
                        </span>
                      </h2>
                    </div>

                    <span className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                      ₹1 Only
                    </span>

                  </div>


                  <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                    Get chapter-wise previous year question papers
                    for RBSE Class 12 {subjectName}. Covers 13 years
                    with solutions-ready PDFs.
                  </p>


                  {/* Metadata */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    <InfoBox
                      icon="🗓️"
                      title="13 Years"
                      subtitle="2013 – 2025"
                    />

                    <InfoBox
                      icon="📚"
                      title={`${data.chapters.length} Chapters`}
                      subtitle="Complete Coverage"
                    />

                    <InfoBox
                      icon="📖"
                      title="Hindi + English"
                      subtitle="Bilingual PDFs"
                    />

                    <InfoBox
                      icon="⬇️"
                      title="Instant Download"
                      subtitle="Access Anytime"
                    />

                  </div>


                  {/* Buttons */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">

                    <Link
                      href={`/pyqs/${subject}/2025`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700"
                    >
                      🛒 Buy Full Book for ₹1
                    </Link>

                    <Link
                      href={`/pyqs/${subject}/2025`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3.5 font-bold text-slate-800 transition hover:bg-blue-50"
                    >
                      👁️ View Free Sample
                    </Link>

                  </div>

                </div>
              </div>
            </div>


            {/* Chapter Section */}
<ChapterList
  subject={subjectName}
  chapters={data.chapters}
/>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}
          <aside className="space-y-5">

            {/* Table of Contents */}
            <SidebarCard title="📖 Table of Contents">

              <div className="space-y-1">

                <TOCItem active>
                  Overview
                </TOCItem>

                <TOCItem>
                  Chapter-wise PYQs
                </TOCItem>

                <TOCItem>
                  About this Book
                </TOCItem>

                <TOCItem>
                  What's Inside
                </TOCItem>

                <TOCItem>
                  Related Subjects
                </TOCItem>

                <TOCItem>
                  FAQs
                </TOCItem>

              </div>

            </SidebarCard>


            {/* Help */}
            <SidebarCard title="🎧 Need Help?">

              <p className="text-sm leading-6 text-slate-500">
                Have questions? Our support team is here to help
                you with your PYQ purchase and downloads.
              </p>

              <Link
                href="/contact"
                className="mt-4 block rounded-xl border border-blue-500 px-4 py-3 text-center font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Contact Support
              </Link>

            </SidebarCard>


            {/* Related Subjects */}
            <SidebarCard title="📚 Related Subjects">

              <div className="divide-y divide-slate-100">

                <RelatedSubject
                  name="Physics"
                  href="/pyqs/physics"
                  icon="⚛️"
                />

                <RelatedSubject
                  name="Mathematics"
                  href="/pyqs/mathematics"
                  icon="📐"
                />

                <RelatedSubject
                  name="Biology"
                  href="/pyqs/biology"
                  icon="🧬"
                />

                <RelatedSubject
                  name="English"
                  href="/pyqs/english"
                  icon="📘"
                />

                <RelatedSubject
                  name="Hindi"
                  href="/pyqs/hindi"
                  icon="📕"
                />

              </div>

            </SidebarCard>

          </aside>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#12243a] text-white">

        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <img
                  src="/logo_UnivGeeks.png"
                  alt="UnivGeeks"
                  className="h-12 w-12 rounded-full"
                />

                <div>
                  <h3 className="text-lg font-extrabold">
                    UnivGeeks
                  </h3>

                  <p className="text-xs text-slate-300">
                    Learn. Prepare. Grow.
                  </p>
                </div>

              </div>

            </div>


            {/* Quick Links */}
            <div>
              <h4 className="font-bold">
                Quick Links
              </h4>

              <div className="mt-4 space-y-2 text-sm text-slate-300">

                <Link href="/" className="block hover:text-white">
                  Home
                </Link>

                <Link href="/" className="block hover:text-white">
                  Courses
                </Link>

                <Link href="/" className="block hover:text-white">
                  PYQs
                </Link>

                <Link href="/" className="block hover:text-white">
                  Notes
                </Link>

                <Link href="/" className="block hover:text-white">
                  About
                </Link>

              </div>
            </div>


            {/* Resources */}
            <div>
              <h4 className="font-bold">
                Resources
              </h4>

              <div className="mt-4 space-y-2 text-sm text-slate-300">

                <Link href="/" className="block hover:text-white">
                  Privacy Policy
                </Link>

                <Link href="/" className="block hover:text-white">
                  Terms of Service
                </Link>

                <Link href="/contact" className="block hover:text-white">
                  Contact Us
                </Link>

                <Link href="/contact" className="block hover:text-white">
                  Help & Support
                </Link>

              </div>
            </div>


            {/* Follow */}
            <div>

              <h4 className="font-bold">
                Follow Us
              </h4>

              <div className="mt-4 flex gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500">
                  ▶
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500">
                  ◎
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                  in
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
                  X
                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="border-t border-white/10">

          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

            <span>
              © 2025 UnivGeeks. All rights reserved.
            </span>

            <span>
              Made with ❤️ for students
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}


/* ============================================================
   COMPONENTS
============================================================ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {icon}
      </div>

      <div>
        <h3 className="font-extrabold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}


function InfoBox({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">

      <div className="text-lg">
        {icon}
      </div>

      <p className="mt-2 text-sm font-bold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}


function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <h2 className="text-xl font-extrabold text-[#092653]">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}


function TOCItem({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-blue-50 font-bold text-blue-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
      }`}
    >
      {children}
    </div>
  );
}


function RelatedSubject({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3 transition hover:text-blue-600"
    >

      <span className="flex items-center gap-3">

        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          {icon}
        </span>

        <span className="text-sm font-medium">
          {name}
        </span>

      </span>

      <span>›</span>

    </Link>
  );
}