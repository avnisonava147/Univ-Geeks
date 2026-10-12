"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import StudentSuccess from "@/components/About/StudentSuccess";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


// =====================================================
// REVEAL ANIMATION
// =====================================================

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}


// =====================================================
// SECTION LABEL
// =====================================================

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
      {children}
    </span>
  );
}


// =====================================================
// ANIMATED COUNTER
// =====================================================

function Counter({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let current = 0;
    const duration = 1500;
    const intervalTime = 20;
    const increment = target / (duration / intervalTime);

    const interval = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [started, target]);

  return (
    <div
      ref={ref}
      className="text-4xl font-bold text-blue-600 sm:text-5xl"
    >
      {count}
      {suffix}
    </div>
  );
}


// =====================================================
// ABOUT PAGE
// =====================================================

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking for shrinking hero
  useEffect(() => {
    let animationFrame: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const progress = Math.min(
          window.scrollY / (window.innerHeight * 0.8),
          1
        );

        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <Navbar />

      {/* =================================================
          1. HERO - ABOUT UNIV GEEKS
      ================================================= */}

      <div className="relative h-screen">
        <section
          className="sticky top-0 z-20 flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 text-center text-white"
          style={{
            transform: `translateY(${-scrollProgress * 30}px) scale(${1 - scrollProgress * 0.06})`,
            borderRadius: `${scrollProgress * 24}px`,
            transformOrigin: "top center",
          }}
        >
          {/* Dark blue gradient background */}
          {/* About Hero Background */}
<div className="absolute inset-0 bg-[#061A40]" />

{/* Background Glows */}
<div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
<div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

{/* Subtle Decorative Rings */}
<div className="absolute -right-20 top-10 h-72 w-72 rounded-full border border-white/10" />
<div className="absolute -right-8 top-24 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 mx-auto grid w-full max-w-375 items-center gap-5 lg:grid-cols-[1fr_360px_1fr]">
                        {/* =================================================
                CONNECTION LINES
            ================================================= */}

            <svg
              className="hero-connection-lines pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 1500 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Mission → Logo */}
              <path
                d="M 390 175 C 500 175, 535 270, 620 315"
                className="hero-connection-line hero-connection-line-1"
              />

              {/* Resources → Logo */}
              <path
                d="M 390 525 C 500 525, 535 430, 620 385"
                className="hero-connection-line hero-connection-line-2"
              />

              {/* Student First → Logo */}
              <path
                d="M 1110 175 C 1000 175, 965 270, 880 315"
                className="hero-connection-line hero-connection-line-3"
              />

              {/* Vision → Logo */}
              <path
                d="M 1110 525 C 1000 525, 965 430, 880 385"
                className="hero-connection-line hero-connection-line-4"
              />

              {/* Central connection points */}
              <circle cx="620" cy="315" r="3" className="hero-connection-dot" />
              <circle cx="620" cy="385" r="3" className="hero-connection-dot" />
              <circle cx="880" cy="315" r="3" className="hero-connection-dot" />
              <circle cx="880" cy="385" r="3" className="hero-connection-dot" />
            </svg>

            {/* LEFT CARDS */}
            <div className="hidden space-y-5 lg:block">
              <Reveal delay={150}>
                <div className="hero-popup rounded-3xl border border-white/10 bg-slate-950/45 p-7 text-left backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-2xl">🎯</div>
                    <h2 className="text-2xl font-bold">Mission</h2>
                  </div>
                  <p className="mt-5 leading-7 text-slate-300">
                    Making useful study resources easier to access, so students can prepare with greater clarity and confidence.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="hero-popup rounded-3xl border border-white/10 bg-slate-950/45 p-7 text-left backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-2xl">✦</div>
                    <h2 className="text-2xl font-bold">Resources</h2>
                  </div>
                                  <p className="mt-5 leading-7 text-slate-300">
                  Organized notes, previous year questions, and study
                  material designed to make preparation easier.
                </p>
                </div>
              </Reveal>
            </div>

            {/* CENTER LOGO */}
            <div className="flex flex-col items-center justify-center">
              <p className="mb-5 text-base font-semibold uppercase tracking-[0.3em] text-blue-100 sm:text-lg md:text-xl">
                ABOUT UNIV GEEKS
              </p>

              <div className="relative flex items-center justify-center">
                <div className="absolute h-72 w-72 rounded-full bg-blue-500/20 blur-[90px]" />
                <div className="relative h-56 w-56 overflow-hidden rounded-full border border-white/15 bg-black shadow-2xl sm:h-64 sm:w-64">
                  <img
                    src="/logo_UnivGeeks.png"
                    alt="UNIV GEEKS"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Making learning
                <span className="block text-blue-400">simpler for students.</span>
              </h1>
            </div>

            {/* RIGHT CARDS */}
            <div className="hidden space-y-5 lg:block">
              <Reveal delay={450}>
                <div className="hero-popup rounded-3xl border border-white/10 bg-slate-950/45 p-7 text-left backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-2xl">🎓</div>
                    <h2 className="text-2xl font-bold">Student-First</h2>
                  </div>
                  <p className="mt-5 leading-7 text-slate-300">
                      Everything is designed around what students actually
                      need for their everyday preparation.
                    </p>
                </div>
              </Reveal>

              <Reveal delay={600}>
                <div className="hero-popup rounded-3xl border border-white/10 bg-slate-950/45 p-7 text-left backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-2xl">💡</div>
                    <h2 className="text-2xl font-bold">Vision</h2>
                  </div>
                  <p className="mt-5 leading-7 text-slate-300">
                    To create a dependable learning platform where students can discover useful study material without unnecessary searching.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Mobile Mission / Vision */}
          <div className="absolute bottom-10 left-1/2 flex w-[92%] -translate-x-1/2 gap-3 lg:hidden">
            <Reveal delay={150}>
              <div className="hero-popup rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left backdrop-blur-md">
                <p className="text-sm font-bold">🎯 Mission</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">Making useful study resources easier to access.</p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="hero-popup rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left backdrop-blur-md">
                <p className="text-sm font-bold">💡 Vision</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">A dependable platform for student learning.</p>
              </div>
            </Reveal>
          </div>

          <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-lg text-white/40" style={{ opacity: 1 - scrollProgress * 3 }}>↓</div>
        </section>
        
      </div>


      ```tsx
{/* =================================================
      2. WHAT IS UNIV GEEKS?
  ================================================= */}

<section className="relative z-10 -mt-16 rounded-t-[3rem] bg-white px-6 py-10 md:px-12 lg:px-20">

  {/* Soft background glow */}
  <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />
  <div className="pointer-events-none absolute bottom-10 left-10 h-32 w-32 rounded-full bg-indigo-100/30 blur-3xl" />

  <div className="relative mx-auto max-w-5xl text-center">

    <Reveal>

      <SectionLabel>
        What is UNIV GEEKS?
      </SectionLabel>

      <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
        Everything students need,
        <span className="text-blue-600"> in one place.</span>
      </h2>

      <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-blue-600" />

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
        UNIV GEEKS is a student-focused learning platform that brings
        useful study resources together in one organized space.
      </p>

      <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
        From chapter-wise notes to previous year questions, our goal is
        to make it easier for students of Classes 10 to 12 to find what
        they need and focus on learning.
      </p>

    </Reveal>


    {/* Resource Highlights */}

    <div className="mt-6 grid gap-4 sm:grid-cols-3">

      {[
        {
          icon: "📚",
          title: "Chapter-wise Notes",
          text: "Study material organized by subject and chapter.",
        },
        {
          icon: "📝",
          title: "Previous Year Questions",
          text: "Practice with questions from previous examinations.",
        },
        {
          icon: "🎓",
          title: "Student Resources",
          text: "Useful academic resources gathered in one place.",
        },
      ].map((item, index) => (

        <Reveal key={item.title} delay={index * 100}>

          <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-cyan-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-2xl shadow-sm">
              {item.icon}
            </div>

            <h3 className="mt-3 text-base font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-1.5 text-sm leading-5 text-slate-600">
              {item.text}
            </p>

          </div>

        </Reveal>

      ))}

    </div>

  </div>

</section>
```



 {/* =================================================
      3. STUDENT ACHIEVEMENTS
  ================================================= */}

<section className="relative z-10">
  <StudentSuccess />
</section>

{/* =================================================
      4. UNIV GEEKS IN NUMBERS
  ================================================= */}

<section className="relative overflow-hidden bg-slate-50 px-6 py-9 sm:py-10 md:px-12 lg:px-20">

  {/* Soft Background Glows */}
  <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

  <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">

    {/* Heading */}
    <Reveal>

      <div className="mx-auto max-w-3xl text-center">

        <SectionLabel>
          UNIV GEEKS In Numbers
        </SectionLabel>

        <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          The numbers behind our
          <span className="text-blue-600"> growing community.</span>
        </h2>

        <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-blue-600" />

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          From study resources to students and boards, these numbers
          reflect the growing reach of UNIV GEEKS.
        </p>

      </div>

    </Reveal>


    {/* Statistics */}
    <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">

      {[
        {
          number: 10,
          label: "Subjects",
        },
        {
          number: 500,
          label: "Study Resources",
        },
        {
          number: 1000,
          label: "Students",
        },
        {
          number: 5,
          label: "Boards",
        },
      ].map((item, index) => (

        <Reveal key={item.label} delay={index * 100}>

          <div className="group h-full rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6">

            {/* Number */}
            <div className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
              <Counter target={item.number} />
            </div>

            {/* Label */}
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
              {item.label}
            </p>

          </div>

        </Reveal>

      ))}

    </div>


    {/* Bottom Highlight */}
    <Reveal delay={500}>

      <div className="mx-auto mt-5 max-w-3xl text-center">

        <p className="text-sm font-medium leading-6 text-slate-500">
          Built to bring useful learning resources together for students
          across different boards and subjects.
        </p>

      </div>

    </Reveal>

  </div>

</section>




     {/* =================================================
      5. WHY STUDENTS USE UNIV GEEKS
  ================================================= */}

<section className="relative overflow-hidden bg-slate-50 px-6 py-10 sm:py-11 md:px-12 lg:px-20">

  {/* Soft Background Glows */}
  <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

  <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">

    {/* Section Heading */}
    <Reveal>

      <div className="mx-auto max-w-3xl text-center">

        <SectionLabel>
          Why Students Use UNIV GEEKS
        </SectionLabel>

        <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Built around what
          <span className="text-blue-600"> students need.</span>
        </h2>

        <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-blue-600" />

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Studying is already challenging enough. UNIV GEEKS is designed
          to keep finding and using study resources simple, organized
          and focused.
        </p>

      </div>

    </Reveal>


    {/* Benefits */}
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Organized */}
      <Reveal delay={100}>

        <div className="group h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:bg-blue-100">
            🗂️
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Organized
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Resources are arranged clearly so students can find
            what they need without unnecessary searching.
          </p>

        </div>

      </Reveal>


      {/* Student-Focused */}
      <Reveal delay={200}>

        <div className="group h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:bg-blue-100">
            🎓
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Student-Focused
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The platform is built around the everyday study needs
            of students.
          </p>

        </div>

      </Reveal>


      {/* Simple */}
      <Reveal delay={300}>

        <div className="group h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:bg-blue-100">
            ✨
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Easy to Use
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            A clean and simple experience helps students focus
            on learning instead of navigating through clutter.
          </p>

        </div>

      </Reveal>


      {/* Accessible */}
      <Reveal delay={400}>

        <div className="group h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl transition duration-300 group-hover:bg-blue-100">
            🌐
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            In One Place
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Useful academic resources are brought together so
            students can access them more conveniently.
          </p>

        </div>

      </Reveal>

    </div>


    {/* Bottom Highlight */}
    <Reveal delay={500}>

      <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 via-white to-cyan-50 px-6 py-5 text-center shadow-sm">

        <p className="text-sm font-semibold leading-6 text-slate-700 sm:text-base">
          Less time searching.
          <span className="text-blue-600"> More time learning.</span>
        </p>

      </div>

    </Reveal>

  </div>

</section>
      

      {/* =================================================
      6. MEET THE FOUNDER
  ================================================= */}

<section className="relative overflow-hidden bg-white px-6 py-8 sm:py-10 md:px-12 lg:px-20">

  {/* Soft Background Glows */}
  <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

  <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-cyan-100/30 blur-3xl" />

  <div className="relative mx-auto max-w-5xl">

    {/* Heading */}
    <Reveal>

      <div className="text-center">

        <SectionLabel>
          Meet the Founder
        </SectionLabel>

        <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          Built with a
          <span className="text-blue-600"> purpose.</span>
        </h2>

        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-blue-600" />

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Behind UNIV GEEKS is a simple idea — make learning resources
          easier for students to find, understand and use.
        </p>

      </div>

    </Reveal>


    {/* Founder Card */}
    <Reveal delay={150}>

      <div className="mt-7 grid overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-cyan-50 shadow-sm md:grid-cols-[0.85fr_1.15fr]">

        {/* Founder Photo */}
<div className="relative h-[390px] overflow-hidden bg-blue-50 sm:h-[450px] md:h-[500px]">

  <img
    src="/founder.jpg"
    alt="Himanshu Shekhawat, Founder of UNIV GEEKS"
    className="h-full w-full object-cover object-[center_65%]"
  />

</div>


        {/* Founder Information */}
        <div className="flex flex-col justify-center px-7 py-7 sm:px-9 sm:py-8">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 sm:text-sm">
            Founder, UNIV GEEKS
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Himanshu Shekhawat
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            UNIV GEEKS was born from a simple idea: learning should be
            easier and useful study resources should be accessible to
            students.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            The platform brings organized notes, previous year questions
            and other academic resources together in one place, with a
            student-first approach to everyday learning.
          </p>


          {/* Highlight */}
          <div className="mt-5 flex items-center gap-3">

            <div className="h-9 w-1 rounded-full bg-blue-600" />

            <p className="text-sm font-semibold leading-5 text-slate-700">
              Making learning resources
              <span className="text-blue-600">
                {" "}simpler and easier to access.
              </span>
            </p>

          </div>

        </div>

      </div>

    </Reveal>

  </div>

</section>


      

{/* =================================================
      7. FINAL CTA
  ================================================= */}

<section className="relative overflow-hidden bg-[#061A40] px-6 py-10 text-white sm:py-12 md:px-12 lg:px-20">

  {/* Background Glows */}
  <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

  <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

  {/* Decorative Rings */}
  <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/10" />

  <div className="pointer-events-none absolute -right-5 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/10" />

  <div className="relative mx-auto max-w-4xl text-center">

    <Reveal>

      {/* Small Label */}
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
        Start Learning
      </p>

      {/* Heading */}
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Your preparation,
        <span className="block text-blue-300">
          starts here.
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
        Explore notes, previous year questions and useful study
        resources designed to make your learning journey simpler.
      </p>

      {/* CTA Button */}
      <div className="mt-7 flex justify-center">

        <a
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#061A40] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          Explore Resources

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

      </div>

    </Reveal>

  </div>

</section>
      {/* =================================================
      8. LET'S CONNECT
  ================================================= */}

<section className="relative overflow-hidden bg-white px-6 py-8 sm:py-10 md:px-12 lg:px-20">

  {/* Soft Background Glows */}
  <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

  <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-cyan-100/30 blur-3xl" />

  <div className="relative mx-auto max-w-5xl">

    <Reveal>

      <div className="overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-cyan-50 shadow-sm">

        <div className="px-7 py-8 sm:px-10 sm:py-9 md:px-12">

{/* Main Content */}
<div className="text-center">

  <SectionLabel>
    Let&apos;s Connect
  </SectionLabel>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Let's Connect
            </p>

            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Your feedback
              <span className="text-blue-600"> matters to us.</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Have a suggestion, question or idea for UNIV GEEKS?
              We'd love to hear from you. Your feedback helps us
              improve the platform for students.
            </p>

            {/* Contact Button */}
            <div className="mt-5">

              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#061A40] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
              >
                Contact Us

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>

          </div>


          {/* Divider */}
          <div className="my-7 h-px bg-blue-100" />


          {/* Social Links */}
          <div className="text-center">

            <p className="text-sm font-semibold text-slate-700">
              Follow UNIV GEEKS
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Stay connected for updates, resources and new content.
            </p>


            <div className="mt-4 flex justify-center gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/univ_geeks?stkn=bGV3c3RoaDBoZjQ1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
              >
                <span className="text-lg">◎</span>
                Instagram
              </a>


              {/* YouTube */}
              <a
                href="https://youtube.com/@himanshubhaiya8?si=jWUdkE3rArBumNwT"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
              >
                <span className="text-lg">▶</span>
                YouTube
              </a>

            </div>

          </div>

        </div>

      </div>

    </Reveal>

  </div>

</section>

      <Footer />
    </main>
  );
}