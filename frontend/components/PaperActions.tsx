"use client";

type PaperActionsProps = {
  title: string;
};

export default function PaperActions({
  title,
}: PaperActionsProps) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">

      <button
        type="button"
        onClick={() =>
          alert(
            `${title} preview will be connected when the PDF file is added.`
          )
        }
        className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        👁️ View PDF
      </button>

      <button
        type="button"
        onClick={() =>
          alert(
            `${title} download will be connected when the PDF file is added.`
          )
        }
        className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
      >
        ⬇️ Download
      </button>

    </div>
  );
}