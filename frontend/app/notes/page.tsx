"use client";

import { useState } from "react";
import StreamSelector from "./components/StreamSelector";
import ClassSelector from "./components/ClassSelector";
import SubjectSelector from "./components/SubjectSelector";
import {
  getSubjects,
  type ClassName,
  type Stream,
} from "./data/notesData";

export default function NotesPage() {
  const [selectedClass, setSelectedClass] =
    useState<ClassName>("10");

  const [selectedStream, setSelectedStream] =
  useState<Stream>("Science");  

  const [selectedSubject, setSelectedSubject] =
  useState<string | null>(null);

  const subjects = getSubjects(
  selectedClass,
  selectedStream
);

  return (
    <main className="min-h-screen bg-white">
      
      {/* Page Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg">
              🎓
            </div>

            <span className="font-serif text-xl font-semibold text-[#16213E]">
              Univ-Geeks
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5B6478] md:flex">
            <a
              href="/"
              className="transition-colors hover:text-[#2F5FDE]"
            >
              Home
            </a>

            <a
              href="/notes"
              className="font-semibold text-[#2F5FDE]"
            >
              Notes
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#2F5FDE]"
            >
              PYQs
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#2F5FDE]"
            >
              Books
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#2F5FDE]"
            >
              Quiz
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-50"
              aria-label="Search"
            >
              🔍
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              👤
            </div>

            <span className="hidden text-sm text-[#5B6478] sm:block">
              Hello, Student
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-purple-100/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_.9fr]">
          
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#5B6478]">
              LEARN · PREPARE · GROW
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-[#16213E] sm:text-6xl">
              Study notes for{" "}
              <span className="relative whitespace-nowrap text-[#2F5FDE]">
                classes 10 to 12

                {/* Underline */}
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2,10 C60,2 140,2 198,9"
                    fill="none"
                    stroke="#F2A63D"
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5B6478] sm:text-lg">
              Chapter-wise notes curated for your board exams —
              simple, reliable, and always free to download.
            </p>

            {/* Search */}
            <div className="mt-8 flex max-w-2xl items-center rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <span className="ml-4 text-lg text-[#5B6478]">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search for class, subject or chapter..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              />

              <button
                type="button"
                className="rounded-full bg-[#16213E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2F5FDE]"
              >
                Search
              </button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden h-72 lg:block">
            
            <div className="absolute right-8 top-2 rotate-3 rounded-sm border border-[#EFD98C] bg-[#FFF4CF] px-5 py-4 font-serif text-sm leading-6 text-[#5B4B12] shadow-lg">
              Small steps.
              <br />
              Big results.
            </div>

            <div className="absolute left-4 top-5 -rotate-3 text-right font-serif text-lg italic leading-6 text-[#5B6478]">
              Better notes,
              <br />
              brighter future
            </div>

            {/* Books */}
            <div className="absolute bottom-4 right-10">
              <div className="relative h-48 w-72">
                
                {/* Blue book */}
                <div className="absolute bottom-20 right-0 h-9 w-52 rounded-md bg-[#2F5FDE] shadow-sm" />

                {/* Cream book */}
                <div className="absolute bottom-12 right-0 h-9 w-56 rounded-md bg-[#FBE7B5] shadow-sm" />

                {/* Coral book */}
                <div className="absolute bottom-4 right-0 h-10 w-56 rounded-md bg-[#E8604C] shadow-sm" />

                {/* Purple books */}
                <div className="absolute bottom-0 left-8 h-40 w-5 rounded bg-[#7B5CE8]" />

                <div className="absolute bottom-0 left-16 h-36 w-5 rounded bg-[#7B5CE8]/60" />

                {/* Plant stem */}
                <div className="absolute bottom-28 right-24 h-28 w-1 rotate-[20deg] rounded-full bg-[#2FA36B]" />

                {/* Leaves */}
                <div className="absolute right-20 top-6 h-5 w-10 -rotate-12 rounded-full bg-[#2FA36B]" />

                <div className="absolute right-32 top-16 h-5 w-9 rotate-[20deg] rounded-full bg-[#3EBE82]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 1 */}
      <ClassSelector
        selectedClass={selectedClass}
         onClassChange={(className) => {
    setSelectedClass(className);
    setSelectedSubject(null);
  }}
      />

     {/* STEP 2 - STREAM */}
{(selectedClass === "11" || selectedClass === "12") && (
  <StreamSelector
    selectedStream={selectedStream}
    onStreamChange={(stream) => {
      setSelectedStream(stream);
      setSelectedSubject(null);
    }}
  />
)} 

{/* STEP 3 - SUBJECT */}
<SubjectSelector
  selectedClass={selectedClass}
  selectedStream={selectedStream}
  subjects={subjects}
  selectedSubject={selectedSubject}
  onSubjectChange={(subject) =>
    setSelectedSubject(subject.name)
  }
/>

      

    </main>
  );
}