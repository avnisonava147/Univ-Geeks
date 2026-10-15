
"use client";

import type { Stream } from "../data/notesData";

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

const streamBanners: Record<Stream, string> = {
  Science: "/class-12-science.jpeg",
  Commerce: "/class-12-commerce.jpeg",
  Arts: "/class-12-arts.jpeg",
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
            <h2 className="text-3xl font-semibold tracking-tight text-[#16213E]">
              Select your stream
            </h2>

            <p className="mt-2 text-sm text-[#5B6478]">
              Choose your stream to explore subject-wise notes
            </p>
          </div>

          {/* Current selection */}
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-[#5B6478]">
            Selected:{" "}
            <span className="font-semibold text-[#2F5FDE]">
              {selectedStream}
            </span>
          </div>
        </div>

        {/* Stream Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {streams.map((stream) => {
            const active = selectedStream === stream;
            const color = streamColors[stream];

            return (
              <button
                key={stream}
                type="button"
                onClick={() => onStreamChange(stream)}
                aria-pressed={active}
                className="group relative flex h-[326px] flex-col justify-end overflow-hidden rounded-2xl border bg-white p-0 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  borderColor: active ? color : "#E2E8F0",
                  borderLeftWidth: "4px",
                  boxShadow: active
                    ? `0 12px 30px ${color}20`
                    : undefined,
                }}
              >
                {/* Full-card banner image */}
                <img
                  src={streamBanners[stream]}
                  alt={`${stream} stream banner`}
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient behind the title */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Stream name */}
                <h3 className="pointer-events-none relative z-20 mb-5 ml-5 text-left text-2xl font-bold text-white drop-shadow-md">
                  {stream}
                </h3>

                {/* Active bottom line */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 z-30 h-1 w-full origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: color,
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

