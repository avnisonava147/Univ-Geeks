// app/admin/(protected)/pyqs/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, X, AlertCircle } from "lucide-react";
import { apiRequest } from "../../_lib/api";

export default function NewPyqPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileSelect(selected: File | null) {
    setErrorMessage(null);
    if (!selected) {
      setFile(null);
      return;
    }
    if (!selected.name.toLowerCase().endsWith(".pdf") && selected.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed (.pdf)");
      return;
    }
    if (selected.size > 50 * 1024 * 1024) {
      setErrorMessage("File size exceeds 50MB limit");
      return;
    }
    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!file) {
      setErrorMessage("Please select a PDF file before uploading.");
      return;
    }

    setSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const formObj = new FormData(formEl);

      const title = (formObj.get("title") as string)?.trim();
      const exam = formObj.get("exam") as string;
      const classLevel = formObj.get("classLevel") as string;
      const subject = formObj.get("subject") as string;
      const year = formObj.get("year") as string;
      const chapter = (formObj.get("chapter") as string)?.trim() || "";

      if (!title) throw new Error("Title is required");
      if (!exam) throw new Error("Exam is required");
      if (!classLevel) throw new Error("Class level is required");
      if (!subject) throw new Error("Subject is required");
      if (!year) throw new Error("Year is required");

      const multipartData = new FormData();
      multipartData.append("title", title);
      multipartData.append("exam", exam);
      multipartData.append("classLevel", classLevel);
      multipartData.append("subject", subject);
      multipartData.append("year", year);
      if (chapter) {
        multipartData.append("chapter", chapter);
      }
      multipartData.append("published", "true");
      multipartData.append("file", file);

      await apiRequest("/api/admin/pyqs", {
        method: "POST",
        body: multipartData,
      });

      router.push("/admin/pyqs");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload PYQ. Please verify backend connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1C2B3A]">Upload PYQ</h1>
        <p className="text-sm text-[#6B7280] mt-1">Add a previous year question paper to the database.</p>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-3 rounded-md border border-[#B0533E]/30 bg-[#B0533E]/10 p-4 text-sm text-[#B0533E]">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Upload Failed</p>
            <p className="text-xs mt-0.5 text-[#B0533E]/90">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-[#B0533E]/70 hover:text-[#B0533E]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-md border border-[#E5E0D5] p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. class 12 pyqs"
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
              defaultValue="Class 12"
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Subject</label>
            <select
              name="subject"
              required
              defaultValue="Mathematics"
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
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
              defaultValue="2025"
              className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            >
              {Array.from({ length: 13 }, (_, i) => 2025 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chapter (Optional) */}
        <div>
          <label className="block text-sm font-medium text-[#1C2B3A] mb-1.5">Chapter (Optional)</label>
          <input
            name="chapter"
            type="text"
            placeholder="e.g. Electrostatics or Full Paper"
            className="w-full border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
          />
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
              <span className="text-xs text-[#9CA3AF]">Max file size: 50MB</span>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between border border-[#E5E0D5] rounded-md px-4 py-3 bg-[#FAF7F2]/40">
              <div className="min-w-0 pr-3">
                <span className="text-sm font-medium text-[#1C2B3A] block truncate">{file.name}</span>
                <span className="text-xs text-[#9CA3AF]">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-[#9CA3AF] hover:text-[#B0533E] p-1"
                title="Remove file"
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
            className="bg-[#1C2B3A] text-white text-sm px-5 py-2.5 rounded-md hover:bg-[#28394D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Uploading...</span>
              </>
            ) : (
              "Upload PYQ"
            )}
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