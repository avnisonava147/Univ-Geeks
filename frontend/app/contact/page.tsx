"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
// CONTACT PAGE
// =====================================================

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <Navbar />

      {/* =================================================
          1. HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#061A40] px-6 py-16 text-white sm:py-20 md:px-12 lg:px-20">

        {/* Background Glows */}

        <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Decorative Rings */}

        <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -right-2 top-20 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-4xl text-center">

          <Reveal>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300 sm:text-sm">
              Get in Touch
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s
              <span className="text-blue-300"> Connect.</span>
            </h1>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-400" />

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Have a question, suggestion, or idea for UNIV GEEKS?
              We&apos;d love to hear from you and learn how we can make
              the platform better for students.
            </p>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          2. CONTACT OPTIONS
      ================================================= */}

      <section className="relative overflow-hidden bg-white px-6 py-9 sm:py-11 md:px-12 lg:px-20">

        {/* Soft Background Glows */}

        <div className="pointer-events-none absolute -left-24 top-16 h-48 w-48 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-8 h-56 w-56 rounded-full bg-cyan-100/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          {/* Heading */}

          <Reveal>

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                Reach Out
              </p>

              <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                We&apos;re always happy to
                <span className="text-blue-600"> hear from you.</span>
              </h2>

              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-blue-600" />

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Whether you found an issue, have a suggestion, or simply
                want to connect with us, choose the option that works for you.
              </p>

            </div>

          </Reveal>


          {/* Contact Cards */}

          <div className="mt-7 grid gap-4 md:grid-cols-3">

            {/* Instagram */}

            <Reveal delay={100}>

              <a
                href="https://www.instagram.com/univ_geeks?stkn=bGV3c3RoaDBoZjQ1"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition duration-300 group-hover:bg-blue-100">
                  ◎
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  Instagram
                </h3>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  Follow UNIV GEEKS for updates, resources and new content.
                </p>

                <p className="mt-3 text-sm font-semibold text-blue-600">
                  Visit Instagram →
                </p>

              </a>

            </Reveal>


            {/* YouTube */}

            <Reveal delay={200}>

              <a
                href="https://youtube.com/@himanshubhaiya8?si=jWUdkE3rArBumNwT"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition duration-300 group-hover:bg-blue-100">
                  ▶
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  YouTube
                </h3>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  Explore videos and useful learning content from UNIV GEEKS.
                </p>

                <p className="mt-3 text-sm font-semibold text-blue-600">
                  Visit YouTube →
                </p>

              </a>

            </Reveal>


            {/* General Queries */}

            <Reveal delay={300}>

              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl transition duration-300 group-hover:bg-blue-100">
                  💬
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  General Queries
                </h3>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  Have a question or idea? Send us a message using the form below.
                </p>

                <a
                  href="#contact-form"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Send a message ↓
                </a>

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* =================================================
          3. CONTACT FORM
      ================================================= */}

      <section
  id="contact-form"
  className="relative overflow-hidden bg-slate-50 px-6 py-9 sm:py-11 md:px-12 lg:px-20"
>

        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">

          <Reveal>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">

              {/* Form Heading */}

              <div className="text-center">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                  Send a Message
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Tell us what&apos;s on your mind.
                </h2>

                <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-blue-600" />

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Share your question, feedback, suggestion, or anything
                  else you&apos;d like us to know.
                </p>

              </div>


              {/* Success Message */}

              {submitted && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center">

                  <p className="text-sm font-semibold text-green-700">
                    Message submitted successfully!
                  </p>

                  <p className="mt-1 text-xs text-green-600">
                    Thanks for reaching out to UNIV GEEKS.
                  </p>

                </div>
              )}


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >

                {/* Name + Email */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>


                  <div>

                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>


                {/* Subject */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to talk about?"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                {/* Message */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                {/* Submit Button */}

                <div className="flex justify-center pt-1">

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#061A40] px-7 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
                  >
                    Send Message

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>

                  </button>

                </div>

              </form>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          4. FINAL CTA
      ================================================= */}

      <section className="relative overflow-hidden bg-white px-6 py-9 sm:py-11 md:px-12 lg:px-20">

        <div className="relative mx-auto max-w-4xl">

          <Reveal>

            <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-cyan-50 px-6 py-7 text-center shadow-sm sm:px-10">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                ✦
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                Have an idea for
                <span className="text-blue-600"> UNIV GEEKS?</span>
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                We&apos;re building UNIV GEEKS for students, and your
                feedback can help us make it more useful.
              </p>

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Learn. Share. Improve. Together.
              </p>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =================================================
          5. FOOTER
      ================================================= */}
      <Footer />
    </main>
  );
}