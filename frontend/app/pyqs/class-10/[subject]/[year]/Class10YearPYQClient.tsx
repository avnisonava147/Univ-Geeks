"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PaperActions from "../../../../../components/PaperActions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";
import { getClass10Chapters } from "@/app/notes/data/notesData";

const subjectNames: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Mathematics",
  biology: "Biology",
  hindi: "Hindi",
  english: "English",
  "social-science": "Social Science",
  science: "Science",
  sanskrit: "Sanskrit",
  "computer-applications": "Computer Applications",
};

function normalizeText(s?: string | null): string {
  return (s || "")
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractChapterNumber(s?: string | null): number | null {
  if (!s) return null;
  const str = s.trim().toLowerCase();
  const prefixMatch = str.match(/(?:chapter|ch|adhyaay|adhyaya|paath|path)\s*[-:.]?\s*(\d+)/i);
  if (prefixMatch) {
    return parseInt(prefixMatch[1], 10);
  }
  if (/^\d+$/.test(str)) {
    return parseInt(str, 10);
  }
  const leadingMatch = str.match(/^(\d+)\s*[-:.]\s*\S/);
  if (leadingMatch) {
    return parseInt(leadingMatch[1], 10);
  }
  return null;
}

function matchesClass10Chapter(
  pyqChapter: string | null | undefined,
  targetChapterName: string,
  allSubjectChapters: { name: string }[]
): boolean {
  if (!pyqChapter || !pyqChapter.trim()) return false;
  const normPyq = normalizeText(pyqChapter);
  const normTarget = normalizeText(targetChapterName);

  if (normPyq === normTarget) return true;

  const targetIdx = allSubjectChapters.findIndex(
    (c) => normalizeText(c.name) === normTarget
  );
  const targetChapterNo = targetIdx >= 0 ? targetIdx + 1 : null;

  const pyqNum = extractChapterNumber(pyqChapter);
  if (pyqNum !== null && targetChapterNo !== null) {
    if (pyqNum === targetChapterNo) return true;
    return false;
  }

  if (normTarget.length >= 4 && normPyq.includes(normTarget)) {
    return true;
  }

  if (normPyq.length >= 4 && normTarget.includes(normPyq)) {
    const isMoreSpecificMatch = allSubjectChapters.some((c) => {
      const otherNorm = normalizeText(c.name);
      return (
        otherNorm !== normTarget &&
        otherNorm.includes(normPyq) &&
        otherNorm.length < normTarget.length
      );
    });
    if (!isMoreSpecificMatch) {
      return true;
    }
  }

  return false;
}

export default function Class10YearPYQClient({
  subject,
  year,
}: {
  subject: string;
  year: string;
}) {
  const searchParams = useSearchParams();
  const rawChapterParam = searchParams.get("chapter");

  const subjectKey = subject.toLowerCase();
  const formattedSubject =
    subjectNames[subjectKey] ??
    subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);

  let formattedChapter = rawChapterParam?.trim() || null;
  if (formattedChapter && formattedChapter.includes("%")) {
    try {
      formattedChapter = decodeURIComponent(formattedChapter).trim();
    } catch {}
  }

  const [uploadedPyqs, setUploadedPyqs] = useState<any[]>([]);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
    fetch(
      `${backendUrl}/api/pyqs?classLevel=Class%2010&subject=${encodeURIComponent(
        formattedSubject
      )}`
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setUploadedPyqs(data);
        }
      })
      .catch(() => {});
  }, [formattedSubject]);

  const class10Chapters = useMemo(
    () => getClass10Chapters(formattedSubject),
    [formattedSubject]
  );

  const matchingUploadedPapers = useMemo(() => {
    return uploadedPyqs.filter((p: any) => {
      if (!p.fileUrl || !p.fileUrl.trim()) return false;

      // Validate Class 10
      const classNum = (p.classLevel || "").replace(/[^0-9]/g, "");
      const classStr = (p.classLevel || "").trim().toLowerCase();
      if (classNum !== "10" && classStr !== "class 10") {
        return false;
      }

      // Validate Subject
      const subMatch =
        normalizeText(p.subject) === normalizeText(formattedSubject);
      if (!subMatch) return false;

      // Validate Year
      const yrMatch =
        !year || !p.year || p.year.toString().trim() === year.toString().trim();
      if (!yrMatch) return false;

      // Validate Chapter
      if (formattedChapter) {
        return matchesClass10Chapter(
          p.chapter,
          formattedChapter,
          class10Chapters
        );
      }
      return true;
    });
  }, [uploadedPyqs, formattedSubject, year, formattedChapter, class10Chapters]);

  // Separate uploaded papers into English Medium and Hindi Medium
  const englishUploadedPapers = useMemo(() => {
    return matchingUploadedPapers.filter((p: any) => {
      const med = (p.medium || "").toLowerCase();
      if (med.includes("english")) return true;
      if (med.includes("hindi")) return false;
      const text = `${p.title || ""} ${p.fileName || ""}`.toLowerCase();
      if (
        text.includes("english medium") ||
        text.includes("english-medium") ||
        text.includes("(english)")
      )
        return true;
      if (
        text.includes("hindi medium") ||
        text.includes("hindi-medium") ||
        text.includes("(hindi)")
      )
        return false;
      return true; // default unassigned to English
    });
  }, [matchingUploadedPapers]);

  const hindiUploadedPapers = useMemo(() => {
    return matchingUploadedPapers.filter((p: any) => {
      const med = (p.medium || "").toLowerCase();
      if (med.includes("hindi")) return true;
      if (med.includes("english")) return false;
      const text = `${p.title || ""} ${p.fileName || ""}`.toLowerCase();
      return (
        text.includes("hindi medium") ||
        text.includes("hindi-medium") ||
        text.includes("(hindi)")
      );
    });
  }, [matchingUploadedPapers]);

  const papers: any[] = useMemo(() => {
    const list: any[] = [];

    // English Medium Card(s)
    if (englishUploadedPapers.length > 0) {
      englishUploadedPapers.forEach((p: any) => {
        list.push({
          id: p.id,
          title:
            p.title ||
            (formattedChapter
              ? `${formattedChapter} Question Paper`
              : `${formattedSubject} PYQ ${p.year}`),
          subtitle: `RBSE Class 10 ${p.subject} • ${
            p.chapter || formattedChapter || "Full Paper"
          } • ${p.year} • English Medium`,
          type: "English Medium",
          icon: "📄",
          pdfUrl: p.fileUrl,
        });
      });
    } else {
      list.push({
        id: "placeholder-english",
        title: formattedChapter
          ? `${formattedChapter} Question Paper`
          : `${formattedSubject} Question Paper`,
        subtitle: formattedChapter
          ? `RBSE Class 10 ${formattedSubject} • ${formattedChapter} • ${year} • English Medium`
          : `RBSE Class 10 ${formattedSubject} • ${year} • English Medium`,
        type: "English Medium",
        icon: "📄",
        pdfUrl: "",
      });
    }

    // Hindi Medium Card(s)
    if (hindiUploadedPapers.length > 0) {
      hindiUploadedPapers.forEach((p: any) => {
        list.push({
          id: p.id,
          title:
            p.title ||
            (formattedChapter
              ? `${formattedChapter} Question Paper`
              : `${formattedSubject} PYQ ${p.year}`),
          subtitle: `RBSE Class 10 ${p.subject} • ${
            p.chapter || formattedChapter || "Full Paper"
          } • ${p.year} • Hindi Medium`,
          type: "Hindi Medium",
          icon: "📄",
          pdfUrl: p.fileUrl,
        });
      });
    } else {
      list.push({
        id: "placeholder-hindi",
        title: formattedChapter
          ? `${formattedChapter} Question Paper`
          : `${formattedSubject} Question Paper`,
        subtitle: formattedChapter
          ? `RBSE Class 10 ${formattedSubject} • ${formattedChapter} • ${year} • Hindi Medium`
          : `RBSE Class 10 ${formattedSubject} • ${year} • Hindi Medium`,
        type: "Hindi Medium",
        icon: "📄",
        pdfUrl: "",
      });
    }

    return list;
  }, [
    englishUploadedPapers,
    hindiUploadedPapers,
    formattedChapter,
    formattedSubject,
    year,
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-slate-400">›</span>

            <Link
              href="/pyqs/class-10"
              className="text-slate-500 transition hover:text-blue-600"
            >
              class 10 PYQs
            </Link>

            <span className="text-slate-400">›</span>

            <Link
              href={`/pyqs/class-10/${subjectKey}`}
              className="text-slate-500 transition hover:text-blue-600"
            >
              {formattedSubject} PYQs
            </Link>

            {formattedChapter && (
              <>
                <span className="text-slate-400">›</span>
                <span className="font-medium text-slate-700">
                  {formattedChapter}
                </span>
              </>
            )}

            <span className="text-slate-400">›</span>
            <span className="font-semibold text-blue-600">{year}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
        <Link
          href={`/pyqs/class-10/${subjectKey}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to {formattedSubject} Chapters
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06233f] via-[#0a3558] to-[#061728] p-7 text-white shadow-lg sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
              RBSE class 10 • Previous Year Questions
            </p>

            <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {formattedChapter
                ? `${formattedChapter} PYQ ${year}`
                : `${formattedSubject} PYQs ${year}`}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
              {formattedChapter
                ? `Practice ${formattedChapter} previous year questions from RBSE class 10 ${formattedSubject}.`
                : `Explore previous year question papers and solutions for RBSE class 10 ${formattedSubject}.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📅 {year}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📚 class 10
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📄 PDF resources
              </span>
              {formattedChapter && (
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                  📘 Chapter-wise
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Papers */}
        <section className="mt-7">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-[#092653]">
              Available Papers
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {papers.map((paper, idx) => (
              <article
                key={paper.id || `${paper.title}-${idx}`}
                data-medium={paper.type}
                data-pdf-url={paper.pdfUrl}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <FileText size={26} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {paper.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {paper.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Document</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {paper.type}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Format</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      PDF
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <PaperActions title={paper.title} pdfUrl={paper.pdfUrl} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Study Tip */}
        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-3">
            <div className="text-xl">💡</div>
            <div>
              <h3 className="font-bold text-blue-900">Study Tip</h3>
              <p className="mt-1 text-sm leading-6 text-blue-800">
                Choose your preferred medium and practice the question paper
                to prepare for your board examination.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href={`/pyqs/class-10/${subjectKey}`}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            ← All {formattedSubject} Chapters
          </Link>

          <Link
            href="/pyqs/class-10"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore More PYQs →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
