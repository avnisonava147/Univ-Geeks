import Link from "next/link";
import PaperActions from "../../../../components/PaperActions";
type PageProps = {
  params: Promise<{
    subject: string;
    year: string;
  }>;
  searchParams: Promise<{
    chapter?: string;
  }>;
};

export default async function YearPYQPage({
  params,
  searchParams,
}: PageProps) {
  const { subject, year } = await params;
  const { chapter } = await searchParams;

  const formattedSubject =
    subject.charAt(0).toUpperCase() + subject.slice(1);

  const formattedChapter = chapter || null;

  const papers = [
    {
      title: formattedChapter
        ? `${formattedChapter} Question Paper`
        : `${formattedSubject} Question Paper`,
      subtitle: formattedChapter
        ? `RBSE Class 12 ${formattedSubject} • ${formattedChapter} • ${year}`
        : `RBSE Class 12 ${formattedSubject} • ${year}`,
      type: "Question Paper",
      icon: "📄",
      free: true,
    },
    {
      title: formattedChapter
        ? `${formattedChapter} Solution`
        : `${formattedSubject} Solution`,
      subtitle: formattedChapter
        ? `Solved answers for ${formattedChapter} • ${year}`
        : `Solved answers for ${year} examination`,
      type: "Solution",
      icon: "✅",
      free: false,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

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
              href={`/pyqs/${subject}`}
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

            <span className="font-semibold text-blue-600">
              {year}
            </span>

          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">

        {/* Back */}
        <Link
          href={`/pyqs/${subject}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to {formattedSubject} Papers
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06233f] via-[#0a3558] to-[#061728] p-7 text-white shadow-lg sm:p-10">

          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
              RBSE Class 12 • Previous Year Questions
            </p>

            <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {formattedChapter
                ? `${formattedChapter} PYQ ${year}`
                : `${formattedSubject} PYQs ${year}`}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
              {formattedChapter
                ? `Practice ${formattedChapter} previous year questions from RBSE Class 12 ${formattedSubject}.`
                : `Download previous year question papers and detailed solutions for RBSE Class 12 ${formattedSubject}.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📅 {year}
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📚 Class 12
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                📄 PDF
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

            <p className="mt-1 text-sm text-slate-500">
              View or download the available study material.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {papers.map((paper) => (

              <article
                key={paper.type}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    {paper.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      paper.free
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {paper.free ? "🔓 Free" : "🔒 ₹1"}
                  </span>

                </div>

                <div className="mt-5">

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {paper.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {paper.subtitle}
                  </p>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Document
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {paper.type}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Format
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      PDF
                    </p>
                  </div>

                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
<PaperActions title={paper.title} />

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* Study Tip */}
        <section className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex gap-3">

            <div className="text-xl">
              💡
            </div>

            <div>

              <h3 className="font-bold text-blue-900">
                Study Tip
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Solve the question paper yourself first and then use
                the solution to check your answers.
              </p>

            </div>

          </div>

        </section>

        {/* Bottom Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

          <Link
            href={`/pyqs/${subject}`}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            ← All {formattedSubject} Chapters
          </Link>

          <Link
            href={`/pyqs/${subject}`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Explore More PYQs →
          </Link>

        </div>

      </div>
    </main>
  );
}

