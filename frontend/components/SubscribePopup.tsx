"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type SubscribePopupProps = {
  onClose: () => void;
  onContinue: () => void;
  youtubeUrl: string;
  instagramUrl: string;
};

export default function SubscribePopup({
  onClose,
  onContinue,
  youtubeUrl,
  instagramUrl,
}: SubscribePopupProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-title"
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-3xl border border-blue-400/60 bg-gradient-to-br from-[#071a36] via-[#020817] to-[#10102c] p-5 text-white shadow-[0_0_60px_rgba(0,153,255,0.25)] sm:max-h-[calc(100dvh-3rem)] sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-2xl text-white transition hover:bg-white/15 sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="relative z-10">
          <div className="mb-5 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-300 bg-black p-1 shadow-[0_0_28px_rgba(34,211,238,0.55)] sm:h-28 sm:w-28">
              <img
                src="/ug-logo.png"
                alt="UnivGeeks logo"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
          </div>

          <h2
            id="subscribe-title"
            className="text-center text-2xl font-extrabold leading-tight sm:text-4xl"
          >
            Help Us Reach{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              More Students!
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-slate-300 sm:text-base">
            Subscribe to our YouTube channel and follow us on Instagram
            for the latest notes, updates and study tips.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-red-300/70 bg-gradient-to-r from-red-600 to-rose-600 px-4 py-4 transition hover:-translate-y-1"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 fill-current" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-sm">Subscribe on</span>
                <span className="block text-lg font-bold">YouTube ↗</span>
              </span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-fuchsia-300/60 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-4 transition hover:-translate-y-1"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 fill-none stroke-current" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
              </svg>
              <span className="leading-tight">
                <span className="block text-sm">Follow us on</span>
                <span className="block text-lg font-bold">Instagram ↗</span>
              </span>
            </a>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-white/10 py-5 sm:grid-cols-4">
            {[
              { icon: "▤", title: "New Notes", detail: "Regularly", color: "text-cyan-300" },
              { icon: "♧", title: "Study Tips", detail: "& Tricks", color: "text-yellow-300" },
              { icon: "♧", title: "Exam Updates", detail: "& Alerts", color: "text-pink-400" },
              { icon: "♙", title: "Join Learners", detail: "Study together", color: "text-emerald-300" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className={`mb-2 text-3xl ${item.color}`} aria-hidden="true">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-blue-400/30 bg-blue-400/[0.07] p-4 text-center">
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              Be a part of our growing{" "}
              <span className="font-bold text-cyan-300">
                learning community ❤️
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-5 w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
          >
            Continue to your notes →
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Your notes are here to help you learn. Thanks for supporting us!
          </p>
        </div>
      </section>
    </div>,
    document.body
  );
}