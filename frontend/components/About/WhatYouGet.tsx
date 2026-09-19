"use client";

import Reveal from "./Reveal";

const features = [
  {
    icon: "📚",
    title: "Chapter-wise Notes",
    description: "Easy-to-understand notes organized chapter by chapter.",
  },
  {
    icon: "📝",
    title: "Previous Year Questions",
    description: "Practice PYQs to understand exam patterns better.",
  },
  {
    icon: "🎯",
    title: "Multiple Boards",
    description: "Study resources for CBSE, ICSE, and state boards.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Access your study material anytime, anywhere.",
  },
  {
    icon: "🆓",
    title: "Free Access",
    description: "Quality educational resources without unnecessary barriers.",
  },
  {
    icon: "✅",
    title: "Organized Learning",
    description: "Find the right subject, chapter, and resource easily.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
              WHAT STUDENTS GET
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Everything you need to learn better.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              From notes to previous year questions, UNIV GEEKS brings
              essential study resources together in one place.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}