"use client";

import type { ClassName } from "../data/notesData";
import { BookOpen, GraduationCap, ScrollText } from "lucide-react";
import { classInfo } from "../data/notesData";

type ClassSelectorProps = {
  selectedClass: ClassName;
  onClassChange: (className: ClassName) => void;
};

const classSubjects: Record<ClassName, string[]> = {
  "10": ["Science", "Maths", "SST", "English"],
  "11": ["Science", "Commerce", "Arts"],
  "12": ["Science", "Commerce", "Arts"],
};

const classColors: Record<ClassName, string> = {
  "10": "#F2A63D",
  "11": "#7B5CE8",
  "12": "#E8604C",
};

export default function ClassSelector({
  selectedClass,
  onClassChange,
}: ClassSelectorProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-14">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
              <span className="font-serif italic text-[#2F5FDE]">
                1.
              </span>

              Choose your class
            </h2>

            <p className="mt-2 text-sm text-[#5B6478]">
              Select your class to view the available notes
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-[#F7F8FC] px-4 py-2 text-sm text-[#5B6478]">
            Selected:{" "}
            <span className="font-semibold text-[#2F5FDE]">
              Class {selectedClass}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {(Object.keys(classInfo) as ClassName[]).map((className) => {
            const active = selectedClass === className;
            const color = classColors[className];

            return (
              <button
                key={className}
                type="button"
                onClick={() => onClassChange(className)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 border-l-4 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={
                  {
                    borderLeftColor: color,
                  } as React.CSSProperties
                }
              >
                {/* Background glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                  style={{ backgroundColor: color }}
                />

                {/* Top */}
                <div className="relative flex items-center justify-between">

                  {/* Book */}
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{
                      backgroundColor: `${color}20`,
                      color,
                    }}
                  >
                      {className === "10" ? (
    <BookOpen size={22} strokeWidth={2} />
  ) : className === "11" ? (
    <GraduationCap size={22} strokeWidth={2} />
  ) : (
    <ScrollText size={22} strokeWidth={2} />
  )}
  
                  </div>

                  {/* Arrow */}
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xl text-[#5B6478] transition-all duration-300 group-hover:translate-x-1"
                    style={
                      active
                        ? {
                            backgroundColor: color,
                            borderColor: color,
                            color: "white",
                          }
                        : undefined
                    }
                  >
                    →
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative mt-5 text-xl font-semibold text-[#16213E]">
                  Class {className}
                </h3>

                {/* Description */}
                <p className="relative mt-1 text-sm text-[#5B6478]">
                  {classInfo[className].description}
                </p>

                {/* Subjects */}
                <div
                  className={`relative flex flex-wrap gap-2 overflow-hidden transition-all duration-300 ${
                    active
                      ? "mt-4 max-h-20 opacity-100"
                      : "mt-0 max-h-0 opacity-0 group-hover:mt-4 group-hover:max-h-20 group-hover:opacity-100"
                  }`}
                >
                  {classSubjects[className].map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border border-slate-200 bg-[#F7F8FC] px-3 py-1 text-xs font-medium text-[#5B6478]"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* Selected line */}
                {active && (
                  <div
                    className="absolute bottom-0 left-0 h-1 w-full"
                    style={{ backgroundColor: color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}