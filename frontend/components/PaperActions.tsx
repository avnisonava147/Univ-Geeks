"use client";

type PaperActionsProps = {
  title: string;
  pdfUrl: string;
};

export default function PaperActions({
  title,
  pdfUrl,
}: PaperActionsProps) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">

      {/* View PDF */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
      >
        👁️ View PDF
      </a>

      {/* Download */}
      <a
        href={pdfUrl}
        download
        className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-bold text-blue-600 transition hover:bg-blue-50"
      >
        ⬇️ Download
      </a>

    </div>
  );
}