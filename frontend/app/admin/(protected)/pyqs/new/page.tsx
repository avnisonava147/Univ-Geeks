// app/admin/(protected)/pyqs/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, X } from "lucide-react";

export default function NewPyqPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (file) formData.append("file", file);

    // TODO: replace with real API call, e.g.:
    // await fetch("/api/pyqs", { method: "POST", body: formData });

    setSubmitting(false);
    router.push("/admin/pyqs");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1C2B3A]">Upload PYQ</h1>
        <p className="text-sm text-[#6B7280] mt-1">Add a previous year question paper.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-md border border-[#E5E0D5] p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Class 12 Physics 2025"
            className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
          />
        </div>

        {/* Exam / Class / Subject / Year */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Exam</label>
            <select
              name="exam"
              required
              defaultValue="RBSE"
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              <option value="RBSE">RBSE</option>
              <option value="CBSE">CBSE</option>
              <option value="JEE Mains">JEE Mains</option>
              <option value="NEET">NEET</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Class</label>
            <select
              name="classLevel"
              required
              defaultValue=""
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              <option value="" disabled>Select</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Subject</label>
            <select
              name="subject"
              required
              defaultValue=""
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              <option value="" disabled>Select</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Year</label>
            <select
              name="year"
              required
              defaultValue=""
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              <option value="" disabled>Select</option>
              {Array.from({ length: 6 }, (_, i) => 2025 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">PDF File</label>
          {!file ? (
            <label
              htmlFor="pdf-upload"
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E5E0D5] rounded-md py-8 cursor-pointer hover:border-[#E8A33D] transition-colors"
            >
              <UploadCloud size={22} className="text-[#9CA3AF]" />
              <span className="text-sm text-[#6B7280]">Click to select a PDF, or drag it here</span>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between border border-[#E5E0D5] rounded-md px-4 py-3">
              <span className="text-sm text-[#374151] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-[#9CA3AF] hover:text-[#B0533E]"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting || !file}
            className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Uploading..." : "Upload PYQ"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/pyqs")}
            className="text-sm text-[#6B7280] hover:text-[#1C2B3A] px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}