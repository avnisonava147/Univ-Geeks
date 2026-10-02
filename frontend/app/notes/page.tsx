"use client";

import { useEffect, useRef, useState } from "react";
import StreamSelector from "./components/StreamSelector";
import ClassSelector from "./components/ClassSelector";
import SubjectSelector from "./components/SubjectSelector";
import ChapterSelector from "./components/ChapterSelector";
import {
  getSubjects,
  streams,
  type ClassName,
  type Stream,
} from "./data/notesData";
import Navbar from "@/components/Navbar";

 const bannerSlides = [
  {
    title: "Study Smarter",
    subtitle: "Learn · Practice · Grow",
    description: "Simple notes designed to make your preparation easier.",
    className: "from-[#F7A83B] to-[#F07A45]",
  },
  {
    title: "Prepare Better",
    subtitle: "Notes · Chapters · PDFs",
    description: "Everything you need for focused exam preparation.",
    className: "from-[#5B6FE8] to-[#7B5CE8]",
  },
  {
    title: "Grow With Knowledge",
    subtitle: "Understand · Revise · Succeed",
    description: "Build strong concepts with chapter-wise study material.",
    className: "from-[#2FA36B] to-[#249B91]",
  },
];

export default function NotesPage() {
  const [selectedClass, setSelectedClass] =
    useState<ClassName>("10");

  const [selectedStream, setSelectedStream] =
  useState<Stream>("Science");  

  const [selectedSubject, setSelectedSubject] =
  useState<string | null>(null);

  const [selectedChapter, setSelectedChapter] =
  useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  

  const streamSectionRef =
    useRef<HTMLElement | null>(null);

  const subjectSectionRef =
    useRef<HTMLElement | null>(null);

  const chapterSectionRef =
    useRef<HTMLElement | null>(null);

  const pdfSectionRef =
    useRef<HTMLElement | null>(null);  

      const scrollToSection = (
    ref: React.RefObject<HTMLElement | null>
  ) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  useEffect(() => {
  if (!selectedChapter) {
    return;
  }

  const timer = setTimeout(() => {
    pdfSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);

  return () => clearTimeout(timer);
}, [selectedChapter]);



  const subjects = getSubjects(
  selectedClass,
  selectedStream
);
  const selectedSubjectData = subjects.find(
  (subject) => subject.name === selectedSubject
);


  // Search function
  const handleSearch = () => {
    const term = searchQuery.trim().toLowerCase();

    // Check if the search box is empty
    if (!term) {
      setSearchMessage(
        "Please enter a class, subject, or chapter."
      );
      return;
    }

    // Search for Class 10, Class 11, or Class 12
    const classMatch = term.match(
      /^(?:class\s*)?(10|11|12)$/
    );

    
if (classMatch) {
  const className = classMatch[1] as ClassName;

  setSelectedClass(className);
  setSelectedSubject(null);
  setSelectedChapter(null);

  setSearchMessage(`Showing Class ${className}`);

  // Scroll to the relevant section after selecting a class
  if (className === "10") {
    scrollToSection(subjectSectionRef);
  } else {
    scrollToSection(streamSectionRef);
  }

  return;
}


    // Search for a stream: Science, Commerce, Arts
    const streamMatch = streams.find(
      (stream) => stream.toLowerCase() === term
    );

    if (classMatch) {
  const className = classMatch[1] as ClassName;

  setSelectedClass(className);
  setSelectedSubject(null);
  setSelectedChapter(null);

  setSearchMessage(`Showing Class ${className}`);

  // Automatically scroll to the correct section
  if (className === "10") {
    scrollToSection(subjectSectionRef);
  } else {
    scrollToSection(streamSectionRef);
  }

  return;
}

    // Search through subjects and chapters
    const allClasses: ClassName[] = ["10", "11", "12"];
    const allStreams: Stream[] = [
      "Science",
      "Commerce",
      "Arts",
    ];

    for (const className of allClasses) {
      const streamsToCheck: Stream[] =
        className === "10" ? ["Science"] : allStreams;

      for (const stream of streamsToCheck) {
        const availableSubjects = getSubjects(
          className,
          stream
        );

        for (const subject of availableSubjects) {
          // Search for a matching chapter
          const matchingChapter = subject.chapters.find(
            (chapter) =>
              chapter.name.toLowerCase().includes(term)
          );

          if (matchingChapter) {
            setSelectedClass(className);
            setSelectedStream(stream);
            setSelectedSubject(subject.name);
            setSelectedChapter(matchingChapter.id);

            setSearchMessage(
              `Found chapter: ${matchingChapter.name}`
            );
            return;
          }

          // Search for a matching subject
          
if (
  subject.name.toLowerCase().includes(term)
) {
  setSelectedClass(className);
  setSelectedStream(stream);
  setSelectedSubject(subject.name);
  setSelectedChapter(null);

  setSearchMessage(
    `Found subject: ${subject.name}`
  );

  // Automatically scroll to the subject section
  scrollToSection(subjectSectionRef);

  return;
}
        }
      }
    }

    // If nothing matches
    setSearchMessage(
      `No results found for "${searchQuery}".`
    );
  };


const selectedChapterData = selectedSubjectData?.chapters.find(
  (chapter) => chapter.id === selectedChapter
);

  return (
    <main className="min-h-screen bg-white">
      
      {/* Unified Glassy Navbar */}
      <Navbar />

     
      {/* Hero - New Navy and Cyan Design */}
      <section className="relative isolate overflow-hidden border-b border-slate-800 bg-[#071426] text-white">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: Heading and search */}
          <div className="animate-[fadeInUp_0.7s_ease-out_both]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-cyan-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              LEARN · PREPARE · GROW
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your learning journey,
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                one chapter at a time.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore free, chapter-wise notes for Classes 10, 11 and 12.
              Understand concepts, prepare for exams, and revise with confidence.
            </p>

            {/* Search form: reuses your existing search functionality */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl transition focus-within:border-cyan-300/60 focus-within:ring-4 focus-within:ring-cyan-300/10"
            >
              <span className="pl-2 text-xl text-cyan-300">⌕</span>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search class, subject or chapter..."
                aria-label="Search for class, subject or chapter"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-[#071426] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-300/20"
              >
                Search
              </button>
            </form>

            {searchMessage && (
              <p
                aria-live="polite"
                className="mt-3 text-sm font-medium text-cyan-200"
              >
                {searchMessage}
              </p>
            )}

            {/* Class information */}
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="font-medium text-slate-400">Available for</span>
              {["Class 10", "Class 11", "Class 12"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Three subject cards */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative grid grid-cols-2 items-center gap-4 sm:gap-5">
              {/* Mathematics */}
              <div className="group animate-[fadeInUp_0.7s_0.1s_ease-out_both] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 shadow-xl backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-cyan-500/10">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/mathematics-thumbnail.png"
                    alt="Mathematics study notes"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2 pt-3">
                  <p className="font-semibold text-white">Mathematics</p>
                  <p className="mt-1 text-xs text-slate-400">Practice & solve</p>
                </div>
              </div>

              {/* Physics */}
              <div className="group animate-[fadeInUp_0.7s_0.2s_ease-out_both] mt-10 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 shadow-xl backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-cyan-500/10 sm:mt-14">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/physics-thumbnail.png"
                    alt="Physics study notes"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2 pt-3">
                  <p className="font-semibold text-white">Physics</p>
                  <p className="mt-1 text-xs text-slate-400">Explore concepts</p>
                </div>
              </div>

              {/* Biology */}
              <div className="group col-span-2 mx-auto w-[58%] -mt-1 animate-[fadeInUp_0.7s_0.3s_ease-out_both] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 shadow-xl backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-cyan-500/10 sm:w-[52%]">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/biology-thumbnail.png"
                    alt="Biology study notes"
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2 pt-3">
                  <p className="font-semibold text-white">Biology</p>
                  <p className="mt-1 text-xs text-slate-400">Discover life sciences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* STEP 1 */}
      <ClassSelector
  selectedClass={selectedClass}
  onClassChange={(className) => {
    setSearchQuery("");
    setSearchMessage("");
    setSelectedClass(className);
    setSelectedSubject(null);
    setSelectedChapter(null);

    if (className === "10") {
      scrollToSection(subjectSectionRef);
    } else {
      scrollToSection(streamSectionRef);
    }
  }}
/>

     {/* STEP 2 - STREAM */}
{(selectedClass === "11" || selectedClass === "12") && (
  <StreamSelector
     sectionRef={streamSectionRef}
    selectedStream={selectedStream}
    onStreamChange={(stream) => {
      setSearchQuery("");
      setSearchMessage("");
      setSelectedStream(stream);
      setSelectedSubject(null);
      setSelectedChapter(null);

      scrollToSection(subjectSectionRef);
    }}
  />
)} 

{/* STEP 3 - SUBJECT */}
<SubjectSelector   
  sectionRef={subjectSectionRef}
  selectedClass={selectedClass}
  selectedStream={selectedStream}
  subjects={subjects}
  selectedSubject={selectedSubject}
  onSubjectChange={(subject) =>  {
    setSearchQuery("");
    setSearchMessage("");
    setSelectedSubject(subject.name);
    setSelectedChapter(null);

    scrollToSection(chapterSectionRef);
  }}
/>

{/* STEP 4 - CHAPTER */}
{selectedSubjectData && (
  <ChapterSelector
    sectionRef={chapterSectionRef}
    chapters={selectedSubjectData.chapters}
    selectedChapter={selectedChapter}
    onChapterChange={(chapter) =>
      setSelectedChapter(chapter.id)
    }
  />
)}

{/* STEP 5 - PDF NOTES */}
{selectedChapterData && (
  <section
  ref={pdfSectionRef}
  className="border-b border-slate-200 bg-white px-6 py-14"
>
    <div className="mx-auto max-w-7xl">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-[#16213E]">
          <span className="font-serif italic text-[#2F5FDE]">
            5.
          </span>

          Your chapter notes
        </h2>

        <p className="mt-2 text-sm text-[#5B6478]">
          Read online or download the notes for your selected chapter
        </p>
      </div>

      {/* PDF Card */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

        {/* Background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl transition-all duration-500 group-hover:bg-blue-200/60" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-100/40 blur-3xl" />

        <div className="relative">

          {/* Top information */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              {/* PDF Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                📄
              </div>

              {/* Chapter Details */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                  Chapter Notes
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-[#16213E]">
                  {selectedChapterData.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#64748B]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                    Class {selectedClass}
                  </span>

                  {selectedClass !== "10" && (
                    <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-600">
                      {selectedStream}
                    </span>
                  )}

                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    PDF Notes
                  </span>

                </div>
              </div>

            </div>

            {/* Status */}
            <div className="flex items-center gap-2 self-start rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 lg:self-auto">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Notes available
            </div>

          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-slate-100" />

          {/* Description */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm leading-6 text-[#64748B]">
                Your notes for{" "}
                <span className="font-semibold text-[#16213E]">
                  {selectedChapterData.name}
                </span>{" "}
                are ready. You can open the PDF in a new tab or download it
                for offline study.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">

              {/* View PDF */}
              <a
                href={selectedChapterData.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center justify-center gap-2 rounded-full bg-[#16213E] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2F5FDE] hover:shadow-lg"
              >
                <span className="text-base">
                  👁
                </span>

                View PDF

                <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                  →
                </span>
              </a>

              {/* Download PDF */}
              <a
                href={selectedChapterData.pdf}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#16213E] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-[#2F5FDE]"
              >
                <span className="text-base">
                  ↓
                </span>

                Download PDF
              </a>

            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
)}

      

    </main>
  );
}