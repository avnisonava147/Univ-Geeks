
"use client";

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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue-900 px-6 py-24 text-center">

      {/* Blue background */}
      <div className="absolute inset-0 bg-blue-900" />

      {/* Soft blue gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/90 via-blue-900/80 to-blue-700/70" />

      {/* Decorative glow */}
      <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-white">

        {/* Founder image */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          <img
            src="/images/founder.jpg"
            alt="Founder of UNIV GEEKS"
            className="mx-auto h-40 w-40 object-contain sm:h-48 sm:w-48"
          />
        </div>

        {/* Small heading */}
        <p
          className={`text-sm font-semibold uppercase tracking-[0.25em] text-blue-100 transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {badge}
        </p>

        {/* Main title */}
        <h1
          className={`mt-5 text-4xl font-bold tracking-tight transition-all duration-1000 sm:text-5xl lg:text-6xl ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {title}
        </h1>

        {/* Tagline */}
        <p
          className={`mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-50 transition-all duration-1000 sm:text-xl ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {tagline}
        </p>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white">
        ↓
      </div>

    </section>
  );
}

