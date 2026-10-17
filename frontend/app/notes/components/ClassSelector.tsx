
"use client";

import type { ClassName } from "../data/notesData";
import { classInfo } from "../data/notesData";

type ClassSelectorProps = {
  selectedClass: ClassName;
  onClassChange: (className: ClassName) => void;
  onClass11Click?: () => void;
};

const classColors: Record<ClassName, string> = {
  "10": "#F2A63D",
  "11": "#7B5CE8",
  "12": "#E8604C",
};

const classBanners: Record<ClassName, string> = {
  "10": "/class-10-banner.jpeg",
  "11": "/class-11-banners.png",
  "12": "/class-12-banners.png",
};

export default function ClassSelector({
  selectedClass,
  onClassChange,
  onClass11Click,
}: ClassSelectorProps) {
  return (
    <section
      id="choose-class-section"
      className="border-b border-slate-200 bg-white px-6 py-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
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

        {/* Class cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {(Object.keys(classInfo) as ClassName[]).map((className) => {
            const active = selectedClass === className;
            const color = classColors[className];

            return (
              <button
                key={className}
                type="button"
                onClick={() => {
                  if (className === "11") {
                    onClass11Click?.();
                    return;
                  }

                  onClassChange(className);
                }}
                aria-label={`Select Class ${className}`}
                aria-pressed={className === "11" ? false : active}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 border-l-4 bg-white p-0 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  borderLeftColor: color,
                }}
              >
                {/* Hover background effect */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                  style={{ backgroundColor: color }}
                />

                {/* Class banner */}
                <img
                  src={classBanners[className]}
                  alt={`Class ${className} study banner`}
                  className="block h-[260px] w-full object-cover"
                />

                {/* Selected class indicator */}
                {active && className !== "11" && (
                  <div
                    className="absolute bottom-0 left-0 z-20 h-1 w-full"
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


