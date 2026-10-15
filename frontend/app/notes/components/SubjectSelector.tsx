

"use client";

import type {
  ClassName,
  Stream,
  Subject,
} from "../data/notesData";

import {
  SquareRadical,
  FlaskConical,
  Atom,
  Dna,
  Globe2,
  BookOpen,
  Languages,
  Monitor,
  Calculator,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Landmark,
  Users,
  UsersRound,
} from "lucide-react";

type SubjectSelectorProps = {
  selectedClass: ClassName;
  selectedStream: Stream;
  subjects: Subject[];
  selectedSubject: string | null;
  onSubjectChange: (subject: Subject) => void;
};

const subjectColors: Record<string, string> = {
  Mathematics: "#2F80ED",
  Science: "#06B6D4",
  Physics: "#7B5CE8",
  Chemistry: "#06B6D4",
  Biology: "#22A06B",
  "Social Science": "#F2A63D",
  English: "#8B5CF6",
  Hindi: "#EC4899",
  "Computer Applications": "#3B82F6",
  Accountancy: "#2563EB",
  "Business Studies": "#6366F1",
  Economics: "#22A06B",
  History: "#F97316",
  "Political Science": "#E8604C",
  Geography: "#06B6D4",
  Sociology: "#EC4899",
};

const class10SubjectBanners: Record<string, string> = {
  Mathematics: "/class-10-matematicss.png",
  Science: "/class-10-sciences.png",
  "Social Science": "/class-10-socialstudies.png",
  English: "/class-10-englishs.png",
  Hindi: "/class-10-hindis.png",
  "Class 10 Syllabus": "/class-10-syllabus.png",
};

const class12ScienceBanners: Record<string, string> = {
  Physics: "/class-12-physics.png",
  Chemistry: "/class-12-chemistry.png",
  Mathematics: "/class-10-matematicss.png",
  Biology: "/class-12-biology.png",
  English: "/class-10-englishs.png",
  Hindi: "/class-10-hindis.png",
  "Class 12 Syllabus": "/class-10-syllabus.png",
};

const class12CommerceBanners: Record<string, string> = {
  Accountancy: "/class-12-accountancy.jpeg",
  "Business Studies": "/class-12-business-studies.jpeg",
  Economics: "/class-12-economics.jpeg",
  "Class 12 Syllabus": "/class-10-syllabus.png",
};

const class12ArtsBanners: Record<string, string> = {
  History: "/class-12-history.jpeg",
  "Political Science": "/class-12-political-science.jpeg",
  Geography: "/class-12-geography.jpeg",
  Sociology: "/class-12-sociology.jpeg",
  "Class 12 Syllabus": "/class-10-syllabus.png",
};

function getSubjectColor(subject: string) {
  return subjectColors[subject] ?? "#2F5FDE";
}

function getSubjectIcon(subject: string) {
  switch (subject) {
    case "Mathematics":
      return <SquareRadical size={26} strokeWidth={2} />;

    case "Science":
      return <FlaskConical size={26} strokeWidth={2} />;

    case "Physics":
      return <Atom size={26} strokeWidth={2} />;

    case "Chemistry":
      return <FlaskConical size={26} strokeWidth={2} />;

    case "Biology":
      return <Dna size={26} strokeWidth={2} />;

    case "Social Science":
      return <Globe2 size={26} strokeWidth={2} />;

    case "English":
      return <BookOpen size={26} strokeWidth={2} />;

    case "Hindi":
      return <Languages size={26} strokeWidth={2} />;

    case "Class 10 Syllabus":
    case "Class 12 Syllabus":
      return <Monitor size={26} strokeWidth={2} />;

    case "Accountancy":
      return <Calculator size={26} strokeWidth={2} />;

    case "Business Studies":
      return <BriefcaseBusiness size={26} strokeWidth={2} />;

    case "Economics":
      return <ChartNoAxesCombined size={26} strokeWidth={2} />;

    case "History":
      return <Landmark size={26} strokeWidth={2} />;

    case "Political Science":
      return <Users size={26} strokeWidth={2} />;

    case "Geography":
      return <Globe2 size={26} strokeWidth={2} />;

    case "Sociology":
      return <UsersRound size={26} strokeWidth={2} />;

    default:
      return <BookOpen size={26} strokeWidth={2} />;
  }
}

export default function SubjectSelector({
  selectedClass,
  selectedStream,
  subjects,
  selectedSubject,
  onSubjectChange,
  sectionRef,
}: SubjectSelectorProps & {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      className="border-b border-slate-200 bg-white px-6 py-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
              Select your subject
            </h2>

            <p className="mt-2 text-sm text-[#5B6478]">
              Choose a subject to explore chapter-wise notes
            </p>
          </div>

          {/* Current selection */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-[#F7F8FC] px-4 py-2 text-sm text-[#64748B]">
              Class{" "}
              <span className="font-semibold text-[#16213E]">
                {selectedClass}
              </span>
            </span>

            {selectedClass !== "10" && (
              <span className="rounded-full border border-slate-200 bg-[#F7F8FC] px-4 py-2 text-sm text-[#64748B]">
                {selectedStream}
              </span>
            )}
          </div>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => {
            const active = selectedSubject === subject.name;
            const color = getSubjectColor(subject.name);

            // Choose banners for the selected class and stream.
            let banner: string | undefined;

            if (selectedClass === "10") {
              banner = class10SubjectBanners[subject.name];
            } else if (
              selectedClass === "12" &&
              selectedStream === "Science"
            ) {
              banner = class12ScienceBanners[subject.name];
            } else if (
              selectedClass === "12" &&
              selectedStream === "Commerce"
            ) {
              banner = class12CommerceBanners[subject.name];
            } else if (
              selectedClass === "12" &&
              selectedStream === "Arts"
            ) {
              banner = class12ArtsBanners[subject.name];
            }

            return (
              <button
                key={subject.name}
                type="button"
                onClick={() => onSubjectChange(subject)}
                aria-pressed={active}
                className="group relative h-[260px] w-full overflow-hidden rounded-2xl border-l-4 bg-white p-0 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  borderLeftColor: color,
                  borderTopColor: "#E2E8F0",
                  borderRightColor: "#E2E8F0",
                  borderBottomColor: color,
                  boxShadow: active
                    ? `0 12px 30px ${color}25`
                    : undefined,
                }}
              >
                {/* Full-card banner or fallback gradient */}
                {banner ? (
                  <img
                    src={banner}
                    alt={`${subject.name} banner`}
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      background: `linear-gradient(135deg, ${color}18, white 75%)`,
                    }}
                  />
                )}

                {/* Gradient behind subject name */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Subject name */}
                <h3 className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 text-left text-2xl font-bold text-white drop-shadow-md">
                  {subject.name}
                </h3>

                {/* Active selection border */}
                {active && (
                  <div
                    className="pointer-events-none absolute inset-0 z-30 rounded-2xl border-2"
                    style={{ borderColor: color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected subject information */}
        {selectedSubject && (
          <div
            className="mt-8 rounded-2xl border bg-white p-6 transition-all duration-500"
            style={{
              borderColor: `${getSubjectColor(selectedSubject)}35`,
              boxShadow: `0 10px 30px ${getSubjectColor(selectedSubject)}10`,
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                  style={{
                    backgroundColor: `${getSubjectColor(selectedSubject)}12`,
                    color: getSubjectColor(selectedSubject),
                  }}
                >
                  {getSubjectIcon(selectedSubject)}
                </div>

                <div>
                  <p className="text-sm text-[#64748B]">
                    You selected
                  </p>

                  <h3
                    className="text-2xl font-semibold"
                    style={{
                      color: getSubjectColor(selectedSubject),
                    }}
                  >
                    {selectedSubject}
                  </h3>
                </div>
              </div>

              <div className="rounded-full bg-[#F7F8FC] px-4 py-2 text-sm text-[#64748B]">
                {subjects.find(
                  (subject) => subject.name === selectedSubject
                )?.chapters.length ?? 0}{" "}
                chapters available
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
