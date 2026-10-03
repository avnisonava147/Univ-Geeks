"use client";

import Image from "next/image";
import Reveal from "./Reveal";


const students = [
  {
    name: "Shruti Ranawat",
    score: "98.00%",
    image: "/students/1.png",
  },
  {
    name: "Nupur Rathore",
    score: "97.80%",
    image: "/students/2.png",
  },
  {
    name: "Jyoti Shekhawat",
    score: "97.40%",
    image: "/students/3.png",
  },
];

export default function StudentSuccess() {
  return (
    <section className="relative overflow-hidden bg-[#061A40] px-6 py-14 text-white sm:py-16">

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Decorative Rings */}
      <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-8 top-24 h-48 w-48 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -left-20 bottom-8 h-48 w-48 rounded-full border border-blue-300/10" />

      {/* Decorative Stars */}
      <div className="pointer-events-none absolute left-[8%] top-[25%] text-2xl text-blue-200/40">
        ✦
      </div>

      <div className="pointer-events-none absolute left-[14%] bottom-[20%] text-lg text-cyan-200/30">
        ✧
      </div>

      <div className="pointer-events-none absolute right-[12%] top-[25%] text-3xl text-blue-200/40">
        ✦
      </div>

      <div className="pointer-events-none absolute right-[8%] bottom-[18%] text-xl text-cyan-200/30">
        ✧
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Student Achievements
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Celebrating our
            <span className="text-blue-300"> students.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Recognizing the effort, dedication and achievements
            of students in their learning journey.
          </p>

        </div>

        {/* Achievement Content */}
        <div className="mt-9 grid items-center gap-8 lg:grid-cols-[0.8fr_1.5fr]">

          {/* Left Information */}
          <div className="text-center lg:text-left">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
              Recent Highlights
            </p>

            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Effort that deserves
              <span className="text-blue-300"> recognition.</span>
            </h3>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Every result represents consistent preparation,
              practice and the determination to keep learning.
            </p>

            {/* Stats */}
            <div className="mt-7 flex justify-center gap-6 lg:justify-start">

              <div>
                <p className="text-2xl font-bold text-blue-300">
                  {students.length}
                </p>

                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Featured Students
                </p>
              </div>

              <div className="border-l border-white/15 pl-6">
                <p className="text-2xl font-bold text-blue-300">
                  {students[0].score}
                </p>

                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Top Result
                </p>
              </div>

              <div className="border-l border-white/15 pl-6">
                <p className="text-2xl font-bold text-blue-300">
                  2026
                </p>

                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Results
                </p>
              </div>

            </div>

          </div>

          {/* Student Cards */}
          <div className="grid gap-4 sm:grid-cols-3">

            {students.map((student) => (

              <div
                key={student.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-300/30 hover:bg-white/10"
              >

                <div className="overflow-hidden bg-white/5">
                  <Image
                    src={student.image}
                    alt={`${student.name} achievement`}
                    width={500}
                    height={500}
                    className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="px-4 py-3 text-center">

                  <h3 className="text-sm font-bold text-white">
                    {student.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-blue-300">
                    {student.score}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mt-9 text-center">

          <a
            href="/achievements"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-blue-300/40 hover:bg-white/10"
          >
            View All Achievements
            <span>→</span>
          </a>

        </div>

      </div>

    </section>
  );
}

