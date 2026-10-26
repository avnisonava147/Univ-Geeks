import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChapterList from "../../../../components/ChapterList";
import SubjectHero from "../../../../components/SubjectHero";

type PageProps = {
  params: Promise<{
    subject: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(subjectData).map((subject) => ({ subject }));
}

const subjectData: Record<
  string,
  {
    name: string;
    thumbnail: string;
    theme: string;
    chapters: string[];
  }
> = {
  mathematics: {
    name: "Mathematics",
    thumbnail: "/class-10-mathematics.png",
    theme: "mathematics",
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability",
    ],
  },

  science: {
    name: "Science",
    thumbnail: "/class-10-science.png",
    theme: "science",
    chapters: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Co-ordination",
      "How do Organisms Reproduce?",
      "Heredity",
      "Light: Reflection and Refraction",
      "Human Eye and Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
    ],
  },

  english: {
    name: "English",
    thumbnail: "/class-10-english.png",
    theme: "english",
    chapters: [
      "First Flight (Prose): A Letter to God",
      "First Flight (Prose): Nelson Mandela: Long Walk to Freedom",
      "First Flight (Prose): Two Stories About Flying",
      "First Flight (Prose): From the Diary of Anne Frank",
      "First Flight (Prose): Glimpses of India",
      "First Flight (Prose): Mijbil the Otter",
      "First Flight (Prose): Madam Rides the Bus",
      "First Flight (Prose): The Sermon at Benares",
      "First Flight (Prose): The Proposal",
      "First Flight (Poem): Dust of Snow",
      "First Flight (Poem): Fire and Ice",
      "First Flight (Poem): A Tiger in the Zoo",
      "First Flight (Poem): How to Tell Wild Animals",
      "First Flight (Poem): The Ball Poem",
      "First Flight (Poem): Amanda!",
      "First Flight (Poem): The Trees",
      "First Flight (Poem): Fog",
      "First Flight (Poem): The Tale of Custard the Dragon",
      "First Flight (Poem): For Anne Gregory",
      "Footprints Without Feet: A Triumph of Surgery",
      "Footprints Without Feet: The Thief's Story",
      "Footprints Without Feet: The Midnight Visitor",
      "Footprints Without Feet: A Question of Trust",
      "Footprints Without Feet: Footprints Without Feet",
      "Footprints Without Feet: The Making of a Scientist",
      "Footprints Without Feet: The Necklace",
      "Footprints Without Feet: Bholi",
      "Footprints Without Feet: The Book That Saved the Earth",
    ],
  },

  hindi: {
    name: "Hindi",
    thumbnail: "/class-10-hindi.png",
    theme: "hindi",
    chapters: [
      "क्षितिज (काव्य): पद",
      "क्षितिज (काव्य): राम-लक्ष्मण-परशुराम संवाद",
      "क्षितिज (काव्य): आत्मकथ्य",
      "क्षितिज (काव्य): उत्साह और अट नहीं रही है",
      "क्षितिज (काव्य): यह दंतुरित मुस्कान और फसल",
      "क्षितिज (काव्य): संगतकार",
      "क्षितिज (गद्य): नेताजी का चश्मा",
      "क्षितिज (गद्य): बालगोबिन भगत",
      "क्षितिज (गद्य): लखनवी अंदाज़",
      "क्षितिज (गद्य): एक कहानी यह भी",
      "क्षितिज (गद्य): नौबतखाने में इबादत",
      "क्षितिज (गद्य): संस्कृति",
      "कृतिका: माता का अँचल",
      "कृतिका: साना-साना हाथ जोड़ि...",
      "कृतिका: मैं क्यों लिखता हूँ?",
    ],
  },

  "social-science": {
    name: "Social Science",
    thumbnail: "/class-10-social-science.png",
    theme: "social-science",
    chapters: [
      "History – The Rise of Nationalism in Europe",
      "History – Nationalism in India",
      "History – The Making of a Global World",
      "History – The Age of Industrialisation",
      "History – Print Culture and the Modern World",
      "Geography – Resources and Development",
      "Geography – Forest and Wildlife Resources",
      "Geography – Water Resources",
      "Geography – Agriculture",
      "Geography – Minerals and Energy Resources",
      "Geography – Manufacturing Industries",
      "Geography – Lifelines of National Economy",
      "Political Science – Power Sharing",
      "Political Science – Federalism",
      "Political Science – Gender, Religion and Caste",
      "Political Science – Political Parties",
      "Political Science – Outcomes of Democracy",
      "Economics – Development",
      "Economics – Sectors of the Indian Economy",
      "Economics – Money and Credit",
      "Economics – Globalisation and the Indian Economy",
      "Economics – Consumer Rights",
      "History: The Rise of Nationalism in Europe",
      "History: Nationalism in India",
      "History: The Making of a Global World",
      "History: The Age of Industrialisation",
      "History: Print Culture and the Modern World",
      "Geography: Resources and Development",
      "Geography: Forest and Wildlife Resources",
      "Geography: Water Resources",
      "Geography: Agriculture",
      "Geography: Minerals and Energy Resources",
      "Geography: Manufacturing Industries",
      "Geography: Lifelines of National Economy",
      "Political Science: Power Sharing",
      "Political Science: Federalism",
      "Political Science: Gender, Religion and Caste",
      "Political Science: Political Parties",
      "Political Science: Outcomes of Democracy",
      "Economics: Development",
      "Economics: Sectors of the Indian Economy",
      "Economics: Money and Credit",
      "Economics: Globalisation and the Indian Economy",
      "Economics: Consumer Rights",
    ],
  },

  sanskrit: {
    name: "Sanskrit",
    thumbnail: "/class-10-sanskrit.png",
    theme: "sanskrit",
    chapters: [
      "शुचिपर्यावरणम्",
      "बुद्धिर्बलवती सदा",
      "शिशुलालनम्",
      "जननी तुल्यवत्सला",
      "सुभाषितानि",
      "सौहार्दं प्रकृतेः शोभा",
      "विचित्रः साक्षी",
      "सूक्तयः",
      "भूकम्पविभीषिका",
      "अन्योक्तयः",
    ],
  },
};

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;

  const decoded = decodeURIComponent(subject).toLowerCase().trim();
  const normalizedSlug = decoded.replace(/\s+/g, "-");
  const data =
    subjectData[normalizedSlug] ||
    subjectData[decoded] ||
    subjectData[subject.toLowerCase()] ||
    (normalizedSlug === "sst" ? subjectData["social-science"] : undefined) ||
    (normalizedSlug === "maths" || normalizedSlug === "math" ? subjectData["mathematics"] : undefined);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <span className="text-4xl">🔍</span>
            <h1 className="mt-4 text-2xl font-bold text-[#092653]">
              Subject Not Found
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              The subject &ldquo;{subject}&rdquo; is not available for Class 10.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {Object.keys(subjectData).map((slug) => (
                <Link
                  key={slug}
                  href={`/pyqs/class-10/${slug}`}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                >
                  {subjectData[slug].name}
                </Link>
              ))}
            </div>
            <Link
              href="/pyqs/class-10"
              className="mt-6 inline-block text-sm font-semibold text-blue-600 underline"
            >
              ← Back to Class 10 PYQs
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
        classLevel="class-10"
      />

      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 py-3 sm:px-8 sm:py-5 lg:px-10">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="📖"
            title="Chapter-wise PYQs"
            description="Subject-wise chapter practice"
          />

          <FeatureCard
            icon="🗓️"
            title="Previous Year Papers"
            description="Explore available paper years"
          />

          <FeatureCard
            icon="📚"
            title="5 Subjects"
            description="Maths, Science, English, Hindi & SST"
          />

          <FeatureCard
            icon="⚡"
            title="Easy Access"
            description="Find papers in a few clicks"
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
                        RBSE Class 10 {subjectName}
                        <span className="block text-base sm:text-2xl font-bold text-blue-600">Chapter-wise PYQs</span>
                      </h2>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-base leading-relaxed text-slate-600">
                    Explore chapter-wise previous year question papers for RBSE
                    Class 10 {subjectName}. Select a chapter below to find the
                    available papers and practice for your exams.
                  </p>

                  {/* Metadata */}
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
                    <InfoBox
                      icon="🗓️"
                      title="6+ Years"
                      subtitle="2020 – 2026"
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
                  <div className="mt-4 sm:mt-6 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                    <Link
                      href={`/pyqs/class-10/${normalizedSlug}/2025`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-base font-bold text-white transition hover:bg-blue-700 active:scale-98"
                    >
                      📚 Explore Question Papers
                    </Link>

                    <Link
                      href={`/pyqs/class-10/${normalizedSlug}/2025`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 sm:px-5 sm:py-3.5 text-sm sm:text-base font-bold text-slate-800 transition hover:bg-blue-50 active:scale-98"
                    >
                      👁️ View Sample
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
              classLevel="class-10"
            />
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-5">
            {/* Table of Contents */}
            <SidebarCard title="📖 Table of Contents">
              <div className="space-y-1">
                <TOCItem active>Overview</TOCItem>

                <TOCItem>Chapter-wise PYQs</TOCItem>

                <TOCItem>About this Book</TOCItem>

                <TOCItem>What's Inside</TOCItem>

                <TOCItem>Related Subjects</TOCItem>

                <TOCItem>FAQs</TOCItem>
              </div>
            </SidebarCard>

            {/* Help */}
            <SidebarCard title="🎧 Need Help?">
              <p className="text-sm leading-6 text-slate-500">
                Have questions? Our support team is here to help you with your
                PYQ purchase and downloads.
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
                  name="Mathematics"
                  href="/pyqs/class-10/mathematics"
                  icon="📐"
                />

                <RelatedSubject
                  name="Science"
                  href="/pyqs/class-10/science"
                  icon="🔬"
                />

                <RelatedSubject
                  name="English"
                  href="/pyqs/class-10/english"
                  icon="📖"
                />

                <RelatedSubject
                  name="Hindi"
                  href="/pyqs/class-10/hindi"
                  icon="📚"
                />

                <RelatedSubject
                  name="Social Science"
                  href="/pyqs/class-10/social-science"
                  icon="🌍"
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
      <div className="text-base sm:text-lg">{icon}</div>

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
      <h2 className="text-xl font-extrabold text-[#092653]">{title}</h2>

      <div className="mt-5">{children}</div>
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

        <span className="text-sm font-medium">{name}</span>
      </span>

      <span>›</span>
    </Link>
  );
}
