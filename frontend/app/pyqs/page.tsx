"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const classes = [
  {
    id: "10",
    title: "Class 10",
    subtitle: "Prepare confidently for your board exams.",
    description: "Build strong foundations with previous year papers.",
    banner: "/class-10-banner.png",
    theme: "from-blue-100 via-sky-50 to-white",
    accent: "text-blue-700",
    button: "Coming Soon",
    available: false,
  },
  {
    id: "11",
    title: "Class 11",
    subtitle: "Build strong concepts for the next level.",
    description: "Practice important questions and strengthen concepts.",
    banner: "/class-11-banner.png",
    theme: "from-cyan-100 via-sky-50 to-white",
    accent: "text-cyan-800",
    button: "Coming Soon",
    available: false,
  },
  {
    id: "12",
    title: "Class 12",
    subtitle: "Revise smarter with exam-focused resources.",
    description: "Explore subject-wise previous year question papers.",
    banner: "/class-12-banner.png",
    theme: "from-indigo-100 via-blue-50 to-white",
    accent: "text-indigo-700",
    button: "Explore PYQs",
    available: true,
  },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-50">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            Learn · Prepare · Grow
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your Exam Preparation
            <span className="mt-2 block bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Choose your class and explore previous year question papers
            designed to help you prepare smarter and perform better.
          </p>
        </div>
      </section>

      {/* Class Selection */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-9 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Choose Your Class
          </p>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Find the right resources for you
          </h2>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Select a class to get started with your preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((item) => {
            const cardContent = (
              <>
                {/* Banner */}
                <div
                  className={`relative h-48 overflow-hidden bg-gradient-to-br ${item.theme}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`select-none text-8xl font-black opacity-10 ${item.accent}`}
                    >
                      {item.id}
                    </span>
                  </div>

                  <Image
                    src={item.banner}
                    alt={`${item.title} education banner`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                    {item.available ? "PYQs Available" : "Coming Soon"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        className={`text-2xl font-extrabold ${item.accent}`}
                      >
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {item.subtitle}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-700">
                      →
                    </span>
                  </div>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div
                    className={`mt-6 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition ${
                      item.available
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm group-hover:shadow-md"
                        : "border border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {item.button}
                    {item.available && (
                      <span className="ml-2">↗</span>
                    )}
                  </div>
                </div>
              </>
            );

            return item.available ? (
  <Link
    key={item.id}
    href="/pyqs/class-12"
                className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {cardContent}
              </Link>
            ) : (
              <article
                key={item.id}
                aria-disabled="true"
                className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white opacity-90 shadow-sm"
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Information */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="rounded-3xl border border-blue-100 bg-white p-6 text-center shadow-sm sm:p-9">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Prepare Better with UnivGeeks
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Practice with previous year papers, revise important topics,
            and build confidence for your examinations.
          </p>
        </div>
      </section>
    </main>
  );
}






