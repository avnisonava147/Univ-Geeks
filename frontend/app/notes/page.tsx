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

  const [activeBanner, setActiveBanner] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

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

useEffect(() => {
  if (isBannerHovered) {
    return;
  }

  const timer = setInterval(() => {
    setActiveBanner((current) =>
      (current + 1) % bannerSlides.length
    );
  }, 4200);

  return () => clearInterval(timer);
}, [isBannerHovered]);

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
            <form
               onSubmit={(e) => {
                 e.preventDefault();
                 handleSearch();
                }}
             className="mt-8 flex max-w-2xl items-center rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <span className="ml-4 text-lg text-[#5B6478]">
                🔍
              </span>

              <input
                type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search for class, subject or chapter..."
                aria-label="Search for class, subject or chapter"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                className="rounded-full bg-[#16213E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2F5FDE]"
              >
                Search
              </button>
            </form>
            </div>

            
{searchMessage && (
  <p
    aria-live="polite"
    className="mt-3 px-4 text-sm font-medium text-[#2F5FDE]"
  >
    {searchMessage}
  </p>
)}

          

          {/* Banner Slider */}
<div
  className=" group relative hidden h-72 lg:block"
  onMouseEnter={() => setIsBannerHovered(true)}
  onMouseLeave={() => setIsBannerHovered(false)}
>
  <div className="relative h-full overflow-hidden rounded-[24px] shadow-xl">

    {/* Slides */}
    <div
      className="flex h-full transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(-${activeBanner * 100}%)`,
      }}
    >
      {bannerSlides.map((slide, index) => (
        <div
          key={index}
          className={`relative h-full min-w-full bg-gradient-to-br ${slide.className} p-8 text-white`}
        >

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10" />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              {slide.subtitle}
            </p>

            <h2 className="mt-3 max-w-sm font-serif text-4xl font-semibold leading-tight">
              {slide.title}
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              {slide.description}
            </p>

            <div className="mt-6 inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              Explore Notes →
            </div>

          </div>

          {/* Slide number */}
          <div className="absolute right-6 top-6 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            0{index + 1}
          </div>

        </div>
      ))}
    </div>

    {/* Previous button */}
    <button
      type="button"
      aria-label="Previous banner"
      onClick={() =>
        setActiveBanner(
          (current) =>
            (current - 1 + bannerSlides.length) %
            bannerSlides.length
        )
      }
      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-lg text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 group-hover:opacity-100"
    >
      ←
    </button>

    {/* Next button */}
    <button
      type="button"
      aria-label="Next banner"
      onClick={() =>
        setActiveBanner(
          (current) =>
            (current + 1) % bannerSlides.length
        )
      }
      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-lg text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
    >
      →
    </button>

    {/* Dots */}
    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
      {bannerSlides.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to banner ${index + 1}`}
          onClick={() => setActiveBanner(index)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            activeBanner === index
              ? "w-8 bg-white"
              : "w-2.5 bg-white/50 hover:bg-white/80"
          }`}
        />
      ))}
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