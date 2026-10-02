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
  
  // Hero banner carousel
const [activeHeroBanner, setActiveHeroBanner] = useState(0);

const heroBanners = [
  {
    src: "/mathematics-notes-banner.png",
    alt: "Mathematics chapter-wise study notes",
  },
  {
    src: "/physics-notes-banner.png",
    alt: "Physics chapter-wise study notes",
  },
  {
    src: "/biology-notes-banner.png",
    alt: "Biology chapter-wise study notes",
  },
];
  

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





  
  // Automatically scroll to the PDF section when a chapter is selected
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

  // Automatically rotate the hero banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroBanner(
        (current) => (current + 1) % heroBanners.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);




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

     
{/* Final Notes Hero */}
<section className="relative isolate overflow-hidden border-b border-slate-800 bg-[#041B33] text-white">
  {/* Background glow and grid */}
  <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
  <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[100px]" />
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

  <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-16">
    {/* Breadcrumb */}
   

    <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
      {/* Left side */}
      <div className="min-w-0">
        
        
{/* Motivational badge */}
<div className="group relative mb-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-cyan-300/30 bg-cyan-400/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(34,211,238,0.08)]">
  <span className="absolute inset-0 rounded-full bg-cyan-400/[0.04]" />

  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-lg">
    🚀
  </span>

  <span className="relative">
    Learn Today
    <span className="mx-2 text-cyan-300">·</span>
    <span className="text-cyan-300">
      Score Higher Tomorrow
    </span>
  </span>

  <span className="relative text-cyan-300" aria-hidden="true">
    ↗
  </span>
</div>


        {/* Main heading */}
        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Chapter-wise
          <span className="mt-2 block text-cyan-400">
            Study Notes.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Clear, chapter-wise notes for Classes 10, 11 and 12 — organised
          to make revision faster and exam preparation simpler.
        </p>

        {/* Statistics */}
        <div className="mt-8 flex flex-wrap items-center">
          <div className="pr-6 sm:pr-8">
            <p className="text-3xl font-bold text-cyan-400 sm:text-4xl">
              200+
            </p>
            <p className="mt-1 text-xs tracking-wide text-slate-300 sm:text-sm">
              CHAPTERS
            </p>
          </div>

          <div className="border-l border-cyan-200/20 px-6 sm:px-8">
            <p className="text-3xl font-bold text-cyan-400 sm:text-4xl">
              Free
            </p>
            <p className="mt-1 text-xs tracking-wide text-slate-300 sm:text-sm">
              ACCESS
            </p>
          </div>

          <div className="border-l border-cyan-200/20 pl-6 sm:pl-8">
            <p className="text-3xl font-bold text-cyan-400 sm:text-4xl">
              3
            </p>
            <p className="mt-1 text-xs tracking-wide text-slate-300 sm:text-sm">
              CLASSES
            </p>
          </div>
        </div>

        {/* Class buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {(["10", "11", "12"] as ClassName[]).map((className) => {
            const isActive = selectedClass === className;

            return (
              <button
                key={className}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
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
                className={`rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-cyan-400 bg-cyan-400 text-[#041B33] shadow-lg shadow-cyan-400/20"
                    : "border-slate-600 bg-white/5 text-white hover:border-cyan-400/60 hover:bg-cyan-400/10"
                }`}
              >
                Class {className}
              </button>
            );
          })}
        </div>

        {/* Search: uses your existing handleSearch */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-full border border-slate-600 bg-white/[0.06] p-2 transition focus-within:border-cyan-400/70 focus-within:ring-4 focus-within:ring-cyan-400/10"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for class, subject or chapter..."
            aria-label="Search for class, subject or chapter"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400 sm:px-4 sm:text-base"
          />

          <button
            type="submit"
            className="shrink-0 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-[#041B33] transition hover:bg-cyan-300 sm:px-8"
          >
            Search
          </button>
        </form>

        {searchMessage && (
          <p aria-live="polite" className="mt-3 text-sm text-cyan-200">
            {searchMessage}
          </p>
        )}
      </div>

      {/* Right side: rotating subject posters */}
      <div className="relative mx-auto w-full max-w-2xl lg:pl-2">
        <div className="pointer-events-none absolute inset-8 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#0B2946] p-1.5 shadow-2xl shadow-cyan-950/30">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[23px] bg-gradient-to-br from-indigo-600 to-blue-700">
            
              
<div className="relative h-full w-full overflow-hidden rounded-[28px] bg-slate-950">
  {heroBanners.map((banner, index) => (
    <div
      key={banner.src}
      className={`absolute inset-0 transition-opacity duration-700 ${
        activeHeroBanner === index
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Blurred background fills the empty sides */}
      <img
        src={banner.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
      />

      {/* Slight dark overlay for a premium look */}
      <div className="absolute inset-0 bg-slate-950/20" />

      {/* Complete poster: no cropping */}
      <img
        src={banner.src}
        alt={banner.alt}
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  ))}
</div>

            

            {/* Previous banner */}
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() =>
                setActiveHeroBanner(
                  (current) =>
                    (current - 1 + heroBanners.length) % heroBanners.length
                )
              }
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/65"
            >
              ‹
            </button>

            {/* Next banner */}
            <button
              type="button"
              aria-label="Next banner"
              onClick={() =>
                setActiveHeroBanner(
                  (current) => (current + 1) % heroBanners.length
                )
              }
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/65"
            >
              ›
            </button>
          </div>

          {/* Carousel indicators */}
          <div className="flex items-center justify-center gap-2 py-3">
            {heroBanners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                aria-label={`Show banner ${index + 1}`}
                aria-pressed={activeHeroBanner === index}
                onClick={() => setActiveHeroBanner(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeHeroBanner === index
                    ? "w-8 bg-cyan-400"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
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