"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Founder from "@/components/About/Founder";
import StudentSuccess from "@/components/About/StudentSuccess";


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
          <div className="absolute inset-0 bg-linear-to-br from-[#010617] via-[#061735] to-[#0a3970]" />

          {/* Soft central glow */}
          <div className="absolute left-1/2 top-1/2 h-130 w-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[130px]" />

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
                    To make useful study resources easier to access and help students prepare with greater clarity and confidence.
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
                    <h2 className="text-2xl font-bold">Student First</h2>
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


      {/* =================================================
          2. WHO WE ARE
      ================================================= */}

      <section className="relative z-10 -mt-16 rounded-t-[3rem] sofy-grid-50 px-6 py-20 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />

<div className="pointer-events-none absolute bottom-10 left-10 h-32 w-32 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

          <Reveal>

            <div>

              <SectionLabel>
                Who We Are
              </SectionLabel>

              <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                Learning becomes easier
                <br />
                when resources are
                <span className="text-blue-600">
                  organized.
                </span>
              </h2>

              <div className="mt-6 h-1 w-16 rounded-full bg-blue-600" />

              <p className="mt-6 leading-8 text-slate-600">
                UNIV GEEKS is a student-focused learning
                platform created to make academic resources
                easier to discover and use.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                We bring together notes, previous year
                questions and other study materials to help
                students of Classes 10 to 12 prepare in a
                more organized way.
              </p>

            </div>

          </Reveal>


          <div className="grid gap-5 sm:grid-cols-2">

            {[
              {
                icon: "🎯",
                title: "Student Focused",
                text: "Resources designed around students' learning needs.",
              },
              {
                icon: "📚",
                title: "Organized Learning",
                text: "Find useful study material in one place.",
              },
              {
                icon: "🆓",
                title: "Accessible Resources",
                text: "Making learning resources easier to access.",
              },
              {
                icon: "💡",
                title: "Simple Experience",
                text: "A clean platform with fewer distractions.",
              },
            ].map((item, index) => (

              <Reveal key={item.title} delay={index * 100}>

                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          3. WHAT STUDENTS GET
      ================================================= */}

      <section className="soft-glow px-6 py-20 sm:py-24">

        <div className="mx-auto max-w-6xl">

          <Reveal>

            <div className="text-center">

              <SectionLabel>
                What Students Get
              </SectionLabel>

              <h2 className="mt-5 text-4xl font-bold text-slate-900 sm:text-5xl">
                Your study resources,
                <br />
                <span className="text-blue-600">
                  in one place.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                Explore resources that support regular
                practice, revision and exam preparation.
              </p>

            </div>

          </Reveal>


          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: "📝",
                title: "Previous Year Questions",
                text: "Practice questions organized by subject and year.",
              },
              {
                icon: "📚",
                title: "Chapter-wise Notes",
                text: "Review important concepts through organized notes.",
              },
              {
                icon: "🎓",
                title: "Multiple Boards",
                text: "Resources for students from different boards.",
              },
              {
                icon: "🆓",
                title: "Free Access",
                text: "Access useful learning resources with fewer barriers.",
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                text: "Study using your phone, tablet or laptop.",
              },
              {
                icon: "🔍",
                title: "Easy Navigation",
                text: "Find study material without unnecessary confusion.",
              },
            ].map((item, index) => (

              <Reveal key={item.title} delay={index * 80}>

                <div className="flex h-full gap-4 rounded-2xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                  <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </div>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          4. WHY CHOOSE US
      ================================================= */}

      <section className="bg-slate-900 px-6 py-20 text-white sm:py-24">

        <div className="mx-auto max-w-6xl">

          <Reveal>

            <div className="text-center">

              <SectionLabel>
                Why UNIV GEEKS
              </SectionLabel>

              <h2 className="mt-5 text-4xl font-bold">
                Built around your learning.
              </h2>

            </div>

          </Reveal>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {[
              {
                icon: "✓",
                title: "Organized Content",
                text: "Find resources arranged for easier revision.",
              },
              {
                icon: "↻",
                title: "Continuous Improvement",
                text: "We aim to improve the platform based on feedback.",
              },
              {
                icon: "⚡",
                title: "Simple Experience",
                text: "A clean interface helps you focus on learning.",
              },
            ].map((item, index) => (

              <Reveal key={item.title} delay={index * 100}>

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                    {item.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-300">
                    {item.text}
                  </p>

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      

      <StudentSuccess />


      {/* =================================================
          6. FOUNDER
      ================================================= */}
      {/* Founder Section */}
<section className="soft-glow-50 px-6 py-20 sm:py-24">
  <div className="mx-auto max-w-5xl">

    {/* Heading */}
    <Reveal>
      <div className="text-center">
        <SectionLabel>
          Founder
        </SectionLabel>

        <h2 className="mt-5 text-4xl font-bold text-slate-900">
          Built with a purpose.
        </h2>
      </div>
    </Reveal>

    {/* Founder Card */}
    <Reveal delay={150}>
      <div className="mt-12 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">

        {/* Founder Photo */}
        <div className="relative min-h-80 overflow-hidden bg-blue-50">
          <img
            src="/founder.jpg"
            alt="Founder of UNIV GEEKS"
            className="h-full min-h-80 w-full object-cover"
          />
        </div>

        {/* Founder Information */}
        <div className="flex flex-col justify-center p-8 sm:p-10">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Founder, UNIV GEEKS
          </p>

          <h3 className="mt-4 text-3xl font-bold text-slate-900">
            Himanshu Shekhawat
          </h3>

          <p className="mt-5 leading-8 text-slate-600">
           UNIV GEEKS was born from a simple idea: learning should be easier and study resources should be accessible to everyone. Our founder envisioned a platform where students can find organized notes, previous year questions, and useful academic resources in one place. With a student-first approach, UNIV GEEKS aims to make everyday learning more convenient and meaningful.
          </p>

          <p className="mt-4 text-sm text-slate-500">
           
          </p>

        </div>

      </div>
    </Reveal>

  </div>
</section>


      {/* =================================================
          7. ANIMATED STATISTICS
      ================================================= */}

      <section className="px-6 py-20 sm:py-24">

        <div className="mx-auto max-w-6xl">

          <Reveal>

            <div className="text-center">

              <SectionLabel>
                UNIV GEEKS In Numbers
              </SectionLabel>

              <h2 className="mt-5 text-4xl font-bold text-slate-900">
                Growing one step at a time.
              </h2>

            </div>

          </Reveal>


          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">

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

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

                  <Counter target={item.number} />

                  <p className="mt-3 text-sm text-slate-500">
                    {item.label}
                  </p>

                </div>

              </Reveal>

            ))}

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Replace these placeholder numbers with verified statistics.
          </p>

        </div>

      </section>


      {/* =================================================
          8. CONTACT
      ================================================= */}

      <section className="bg-blue-50/60 px-6 py-20 sm:py-24">

        <div className="mx-auto max-w-5xl">

          <Reveal>

            <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">

              <div>

                <SectionLabel>
                  Let's Connect
                </SectionLabel>

                <h2 className="mt-5 text-4xl font-bold text-slate-900">
                  Your feedback
                  <br />
                  <span className="text-blue-600">
                    matters to us.
                  </span>
                </h2>

              </div>

              <div>

                <p className="leading-8 text-slate-600">
                  Have suggestions or questions? Your feedback
                  helps us improve UNIV GEEKS and make the
                  platform more useful for students.
                </p>

                <a
                  href="mailto:contact@univ-geeks.com"
                  className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Contact Us →
                </a>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          9. FINAL CTA
      ================================================= */}

      <section className="px-6 py-20 sm:py-24">

        <div className="mx-auto max-w-6xl">

          <Reveal>

            <div className="rounded-3xl bg-blue-700 px-8 py-14 text-center text-white shadow-xl sm:px-12">

              <h2 className="text-4xl font-bold sm:text-5xl">
                Ready to start learning?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100">
                Explore notes, practice questions and take
                the next step in your preparation.
              </p>

              <Link
                href="/notes"
                className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
              >
                Get Started →
              </Link>

            </div>

          </Reveal>

        </div>

      </section>

    </main>
  );
}