"use client";

type PaperActionsProps = {
  title: string;
  pdfUrl: string;
};

export default function PaperActions({
  title,
  pdfUrl,
}: PaperActionsProps) {
  const hasFile = Boolean(pdfUrl && pdfUrl.trim());

  if (!hasFile) {
    return (
      <div className="mt-5 col-span-2">
        <button
          type="button"
          disabled
          className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-400 cursor-not-allowed"
        >
          📄 PDF paper coming soon
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {/* View PDF */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700 flex items-center justify-center gap-1.5"
      >
        <span>👁️</span> View PDF
      </a>

      {/* Download */}
      <a
        href={pdfUrl}
        download
        className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-bold text-blue-600 transition hover:bg-blue-50 flex items-center justify-center gap-1.5"
      >
        <span>⬇️</span> Download
      </a>
    </div>
  );
}