"use client";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    subject: string;
    year: string;
  }>;
};

export default async function YearPYQPage({ params }: PageProps) {
  const { subject, year } = await params;

  const formattedSubject =
    subject.charAt(0).toUpperCase() + subject.slice(1);

  const papers = [
    {
      title: `${formattedSubject} Question Paper`,
      subtitle: `RBSE Class 12 ${formattedSubject} ${year}`,
      type: "Question Paper",
      size: "PDF",
    },
    {
      title: `${formattedSubject} Solution`,
      subtitle: `Solved answers for ${year} examination`,
      type: "Solution",
      size: "PDF",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href={`/pyqs/${subject}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to {formattedSubject} Papers
        </Link>

        {/* Header */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-100">
            RBSE Class 12 • Previous Year Questions
          </p>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            {formattedSubject} PYQs {year}
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Download previous year question papers and their detailed
            solutions for better exam preparation.
          </p>
        </div>

        {/* Paper Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                {paper.type === "Solution" ? "✅" : "📄"}
              </div>

              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {paper.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {paper.subtitle}
                </p>
              </div>

              {/* Details */}
              <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-500">Document Type</p>
                  <p className="font-semibold text-slate-800">
                    {paper.type}
                  </p>
                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                  {paper.size}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                  onClick={() =>
                    alert(
                      `${paper.title} PDF will be connected here later.`
                    )
                  }
                >
                  View PDF
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
                  onClick={() =>
                    alert(
                      `${paper.title} download will be connected here later.`
                    )
                  }
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-800">
          <strong>Note:</strong> Abhi ye demo buttons hain. Real PDF files
          baad mein backend ya public folder se connect karenge.
        </div>
      </div>
    </main>
  );
}

