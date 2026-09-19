"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroProps {
  title: string;
  tagline: string;
  badge: string;
}

export default function Hero({
  title,
  tagline,
  badge,
}: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/about-hero.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-blue-950/75" />

      {/* Decorative blue gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/80 via-blue-900/40 to-blue-600/40" />

      {/* Main content */}
      <div
        className={`relative z-10 mx-auto max-w-5xl text-white transition-all duration-1000 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >

        <span className="inline-flex rounded-full border border-blue-200/40 bg-white/10 px-5 py-2 text-sm font-medium text-blue-100 backdrop-blur-sm">
          {badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
          {title}
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-blue-50 sm:text-xl lg:text-2xl">
          {tagline}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/notes"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
          >
            Explore Notes
          </Link>

          <Link
            href="/pyqs"
            className="rounded-xl border border-white/70 px-8 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-blue-700"
          >
            Practice PYQs
          </Link>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white">
        ↓
      </div>

    </section>
  );
}