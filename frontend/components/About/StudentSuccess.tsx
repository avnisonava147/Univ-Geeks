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
    score: "95.00%",
    image: "/students/2.png",
  },
  {
    name: "Jyoti Shekhawat",
    score: "94.00%",
    image: "/students/3.png",
  },
];

export default function StudentSuccess() {
  return (
    <section className="soft-grid-50 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Student Achievements
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Celebrating Our Students
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every achievement represents dedication, consistency,
              and the effort students put into their learning journey.
            </p>
          </div>
        </Reveal>

        {/* Achievement Posters */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student, index) => (
            <Reveal key={student.name} delay={index * 100}>
              <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {/* Poster Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={student.image}
                    alt={`${student.name} achievement poster`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Student Details */}
                <div className="px-3 pb-3 pt-5 text-center">
                  <h3 className="text-xl font-bold text-slate-900">
                    {student.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    
                  </p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}