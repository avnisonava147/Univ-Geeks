import Link from "next/link";
import PaperActions from "../../../../../components/PaperActions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

type PageProps = {
  params: Promise<{
    subject: string;
    year: string;
  }>;
  searchParams: Promise<{
    chapter?: string;
  }>;
};

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

export default async function YearPYQPage({
  params,
  searchParams,
}: PageProps) {
  const { subject, year } = await params;
  const { chapter } = await searchParams;

  const subjectKey = subject.toLowerCase();
  const formattedSubject =
    subjectNames[subjectKey] ??
    subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);

  const formattedChapter = chapter?.trim() || null;

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  let uploadedPyqs: any[] = [];
  try {
    const res = await fetch(`${backendUrl}/api/pyqs?classLevel=Class%2010`, {
      cache: "no-store",
    });
    if (res.ok) {
      uploadedPyqs = await res.json();
    }
  } catch {
    // fallback if backend is unreachable
  }

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  const matchingUploadedPapers = uploadedPyqs.filter((p: any) => {
    if (!p.fileUrl) return false;
    const subMatch = norm(p.subject || "") === norm(formattedSubject);
    const yrMatch = !year || (p.year && p.year.toString() === year.toString());
    if (!subMatch || !yrMatch) return false;

    if (formattedChapter) {
      if (!p.chapter) return false;
      const chNorm = norm(p.chapter);
      const targetNorm = norm(formattedChapter);
      return chNorm === targetNorm || chNorm.includes(targetNorm) || targetNorm.includes(chNorm);
    }
    return true;
  });

  const papers = matchingUploadedPapers.length > 0
    ? matchingUploadedPapers.map((p: any) => ({
        title: p.title || (formattedChapter ? `${formattedChapter} Question Paper` : `${formattedSubject} PYQ ${p.year}`),
        subtitle: `RBSE Class 10 ${p.subject} • ${p.chapter || "Full Paper"} • ${p.year}`,
        type: p.exam || "RBSE Board Paper",
        icon: "📄",
        pdfUrl: p.fileUrl,
      }))
    : [
        {
          title: formattedChapter
            ? `${formattedChapter} Question Paper`
            : `${formattedSubject} Question Paper`,
          subtitle: formattedChapter
            ? `RBSE Class 10 ${formattedSubject} • ${formattedChapter} • ${year} • English Medium`
            : `RBSE Class 10 ${formattedSubject} • ${year} • English Medium`,
          type: "English Medium",
          icon: "📄",
          pdfUrl: "",
        },
        {
          title: formattedChapter
            ? `${formattedChapter} Question Paper`
            : `${formattedSubject} Question Paper`,
          subtitle: formattedChapter
            ? `RBSE Class 10 ${formattedSubject} • ${formattedChapter} • ${year} • Hindi Medium`
            : `RBSE Class 10 ${formattedSubject} • ${year} • Hindi Medium`,
          type: "Hindi Medium",
          icon: "📄",
          pdfUrl: "",
        },
      ];


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
            {papers.map((paper) => (
              <article
                key={paper.type}
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
