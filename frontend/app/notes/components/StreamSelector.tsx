"use client";

import type { Stream } from "../data/notesData";
import { streamInfo } from "../data/notesData";

type StreamSelectorProps = {
  selectedStream: Stream;
  onStreamChange: (stream: Stream) => void;
};

const streams: Stream[] = ["Science", "Commerce", "Arts"];

const streamColors: Record<Stream, string> = {
  Science: "#2F80ED",
  Commerce: "#27AE60",
  Arts: "#EB5757",
};

export default function StreamSelector({
  selectedStream,
  onStreamChange,
  sectionRef,
}: StreamSelectorProps & {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
   <section
  ref={sectionRef}
  className="border-b border-slate-200 bg-[#F8FAFF] px-6 py-14"
>
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
              <span className="font-serif italic text-[#2F5FDE]">
                2.
              </span>

              Select your stream
            </h2>

            <p className="mt-2 text-sm text-[#5B6478]">
              Choose your stream to explore subject-wise notes
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-[#5B6478]">
            Selected:{" "}
            <span className="font-semibold text-[#2F5FDE]">
              {selectedStream}
            </span>
          </div>
        </div>

        {/* Stream Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {streams.map((stream) => {
            const active = selectedStream === stream;
            const color = streamColors[stream];
            const info = streamInfo[stream];

            return (
              <button
                key={stream}
                type="button"
                onClick={() => onStreamChange(stream)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  borderTop: `4px solid ${color}`,
                }}
              >
                {/* Background glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                  style={{ backgroundColor: color }}
                />

                <div className="relative flex items-center justify-between">

                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: `${color}18`,
                      color,
                    }}
                  >
                    {info.icon}
                  </div>

                  {/* Arrow */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-lg transition-all duration-300 group-hover:translate-x-1"
                    style={
                      active
                        ? {
                            backgroundColor: color,
                            borderColor: color,
                            color: "white",
                          }
                        : {
                            color,
                          }
                    }
                  >
                    →
                  </div>
                </div>

                {/* Stream Name */}
                <h3 className="relative mt-6 text-xl font-semibold text-[#16213E]">
                  {stream}
                </h3>

                {/* Description */}
                <p className="relative mt-2 max-w-sm text-sm leading-6 text-[#5B6478]">
                  {info.description}
                </p>

                {/* Subjects preview */}
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {stream === "Science" && (
                    <>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        Physics
                      </span>
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-600">
                        Chemistry
                      </span>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                        Mathematics
                      </span>
                    </>
                  )}

                  {stream === "Commerce" && (
                    <>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        Accountancy
                      </span>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                        Business
                      </span>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                        Economics
                      </span>
                    </>
                  )}

                  {stream === "Arts" && (
                    <>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                        History
                      </span>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                        Political Science
                      </span>
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-600">
                        Geography
                      </span>
                    </>
                  )}
                </div>

                {/* Active bottom line */}
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