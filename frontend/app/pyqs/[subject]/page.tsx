import Link from "next/link";
import ChapterList from "../../../components/ChapterList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectHero from "../../../components/SubjectHero";

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
    theme: string;
    chapters: string[];
  }
> = {
  chemistry: {
    name: "Chemistry",
    thumbnail: "/chemistry-thumbnail.png",
    theme: "chemistry",
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
    theme: "physics",
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
    theme: "mathematics",
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

  biology: {
    name: "Biology",
    thumbnail: "/biology-thumbnail.png",
    theme: "biology",
    chapters: [
      "Sexual Reproduction in Flowering Plants",
      "Human Reproduction",
      "Reproductive Health",
      "Principles of Inheritance and Variation",
      "Molecular Basis of Inheritance",
      "Evolution",
      "Human Health and Disease",
      "Microbes in Human Welfare",
      "Biotechnology: Principles and Processes",
      "Biotechnology and its Applications",
      "Organisms and Populations",
      "Ecosystem",
      "Biodiversity and Conservation",
    ],
  },
};

export default async function SubjectPage({
  params,
}: PageProps) {
  const { subject } = await params;

  const data =
    subjectData[subject.toLowerCase()] ||
    subjectData.chemistry;

  const subjectName = data.name;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* =====================================================
          SUBJECT HERO
      ====================================================== */}

      <SubjectHero
        subject={subjectName}
        chaptersCount={data.chapters.length}
      />

      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 py-3 sm:px-8 sm:py-5 lg:px-10">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="📖"
            title="Chapter-wise PDFs"
            description="Well organised content"
          />

          <FeatureCard
            icon="🗓️"
            title="2020 – 2025"
            description="6+ Years of PYQs"
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

      <section
        id="chapters"
        className="mx-auto max-w-[1400px] px-4 pb-14 sm:px-8 lg:px-10"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">

          {/* LEFT COLUMN */}
          <div className="space-y-4 sm:space-y-5 min-w-0">

            {/* =================================================
                BOOK CARD
            ================================================== */}

            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">

              <div className="grid gap-4 sm:gap-6 p-4 sm:p-6 md:grid-cols-[170px_1fr]">

                {/* Thumbnail */}
                <div className="flex items-center justify-center rounded-xl bg-slate-100 p-2 sm:p-3">
                  <img
                    src={data.thumbnail}
                    alt={`${subjectName} PYQ`}
                    className="h-32 sm:h-60 w-auto sm:w-full rounded-lg object-contain"
                  />
                </div>

                {/* Details */}
                <div className="min-w-0">

                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold leading-tight text-[#092653] sm:text-3xl">
                        RBSE Class 12 {subjectName}
                        <span className="block text-base sm:text-2xl font-bold text-blue-600">Chapterwise PYQs (2020 – 2025)</span>
                      </h2>
                    </div>

                    <span className="rounded-full bg-blue-600 px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold text-white">
                      ₹1 Only
                    </span>
                  </div>

                  <p className="mt-2 sm:mt-4 max-w-3xl text-xs sm:text-base leading-relaxed text-slate-600">
                    Get chapter-wise previous year question papers
                    for RBSE Class 12 {subjectName}. Covers 6+ Years
                    with solutions-ready PDFs.
                  </p>

                  {/* Metadata - 2x2 grid on mobile */}
                  <div className="mt-3.5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
                    <InfoBox
                      icon="🗓️"
                      title="6+ Years"
                      subtitle="2020 – 2025"
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
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                    <Link
                      href={`/pyqs/${subject}/2025`}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-base font-bold text-white transition hover:bg-blue-700 text-center"
                    >
                      🛒 Buy for ₹1
                    </Link>

                    <Link
                      href={`/pyqs/${subject}/2025`}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-2.5 sm:px-5 sm:py-3.5 text-xs sm:text-base font-bold text-slate-800 transition hover:bg-blue-50 text-center"
                    >
                      👁️ Free Sample
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                CHAPTER SECTION
            ================================================== */}

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
                  name="Chemistry"
                  href="/pyqs/chemistry"
                  icon="🧪"
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

              </div>

            </SidebarCard>

          </aside>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />
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
    <div className="flex items-center gap-2.5 sm:gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-lg sm:text-2xl">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-xs sm:text-base font-extrabold text-slate-900 truncate">
          {title}
        </h3>

        <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-slate-500 truncate sm:whitespace-normal">
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
    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-2.5 sm:p-4">
      <div className="text-base sm:text-lg">
        {icon}
      </div>

      <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold text-slate-900 truncate">
        {title}
      </p>

      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-500 truncate">
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