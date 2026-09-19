"use client";

import type {
  ClassName,
  Stream,
  Subject,
} from "../data/notesData";

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

function getSubjectColor(subject: string) {
  return subjectColors[subject] ?? "#2F5FDE";
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
              <span className="font-serif italic text-[#2F5FDE]">
                3.
              </span>

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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {subjects.map((subject) => {
            const active =
              selectedSubject === subject.name;

            const color =
              getSubjectColor(subject.name);

            return (
              <button
                key={subject.name}
                type="button"
                onClick={() => onSubjectChange(subject)}
                className="group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderColor: active
                    ? color
                    : "#E2E8F0",

                  boxShadow: active
                    ? `0 12px 30px ${color}20`
                    : undefined,
                }}
              >

                {/* Background glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(
                      circle at 90% 10%,
                      ${color}18,
                      transparent 55%
                    )`,
                  }}
                />

                {/* Top row */}
                <div className="relative flex items-center justify-between">

                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-semibold transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{
                      backgroundColor: `${color}12`,
                      color,
                    }}
                  >
                    {subject.icon}
                  </div>

                  {/* Arrow */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all duration-300 group-hover:translate-x-1"
                    style={{
                      borderColor: active
                        ? color
                        : "#E2E8F0",

                      backgroundColor: active
                        ? color
                        : "white",

                      color: active
                        ? "white"
                        : "#64748B",
                    }}
                  >
                    →
                  </div>
                </div>

                {/* Subject name */}
                <h3
                  className="relative mt-5 text-lg font-semibold transition-colors duration-300"
                  style={{
                    color: active
                      ? color
                      : "#16213E",
                  }}
                >
                  {subject.name}
                </h3>

                {/* Chapter count */}
                <p className="relative mt-1 text-sm text-[#64748B]">
                  {subject.chapters.length}{" "}
                  {subject.chapters.length === 1
                    ? "Chapter"
                    : "Chapters"}
                </p>

                {/* Explore */}
                <div className="relative mt-5 flex items-center justify-between">

                  <span className="text-xs font-medium text-[#94A3B8]">
                    View chapters
                  </span>

                  <span
                    className="text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                    style={{
                      color,
                    }}
                  >
                    Explore →
                  </span>

                </div>

                {/* Selected line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-full origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: color,

                    transform: active
                      ? "scaleX(1)"
                      : "scaleX(0)",
                  }}
                />

                {/* Selected badge */}
                {active && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    Selected
                  </div>
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
              borderColor: `${getSubjectColor(
                selectedSubject
              )}35`,

              boxShadow: `0 10px 30px ${getSubjectColor(
                selectedSubject
              )}10`,
            }}
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                  style={{
                    backgroundColor: `${getSubjectColor(
                      selectedSubject
                    )}12`,

                    color:
                      getSubjectColor(
                        selectedSubject
                      ),
                  }}
                >
                  {
                    subjects.find(
                      (subject) =>
                        subject.name ===
                        selectedSubject
                    )?.icon
                  }
                </div>

                <div>
                  <p className="text-sm text-[#64748B]">
                    You selected
                  </p>

                  <h3
                    className="text-2xl font-semibold"
                    style={{
                      color:
                        getSubjectColor(
                          selectedSubject
                        ),
                    }}
                  >
                    {selectedSubject}
                  </h3>
                </div>

              </div>

              <div className="rounded-full bg-[#F7F8FC] px-4 py-2 text-sm text-[#64748B]">
                {
                  subjects.find(
                    (subject) =>
                      subject.name ===
                      selectedSubject
                  )?.chapters.length ?? 0
                }{" "}
                chapters available
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}