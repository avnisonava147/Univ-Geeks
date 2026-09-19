// app/admin/(protected)/blogs/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UploadCloud,
  X,
  Eye,
  Edit3,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [author, setAuthor] = useState("UnivGeeks Editorial");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Strategy", "Boards"]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState<"write" | "preview">("write");

  const [content, setContent] = useState(
    `# Complete Preparation Blueprint\n\nScoring 90%+ in board exams requires consistent conceptual understanding, solving previous year papers, and disciplined revision cycles.\n\n## 1. High Weightage Chapters\n- Electrostatics and Current Electricity in Physics\n- Chemical Kinetics and Coordination Compounds in Chemistry\n- Calculus and Vectors in Mathematics\n\n## 2. Recommended Daily Routine\nDedicate at least 45 minutes every morning to formula revisions and diagram practice.\n\n> "Consistency beats intensity when preparing for competitive exams."`
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    const derived = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(derived);
  }

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags(tags.filter((t) => t !== tagToRemove));
  }

  function handleSave() {
    // TODO: Connect with backend API POST /api/blogs
    router.push("/admin/blogs");
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-1.5 rounded-md border border-[#E5E0D5] bg-white text-[#6B7280] hover:text-[#1C2B3A] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-[#1C2B3A]">
              {title.trim() ? title : "Untitled Article"}
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              Markdown Editor &amp; Content Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="text-sm text-[#6B7280] hover:text-[#1C2B3A] px-3 py-2 transition-colors"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#1C2B3A] text-white text-sm px-5 py-2 rounded-md hover:bg-[#28394D] transition-colors font-medium flex items-center gap-2"
          >
            <CheckCircle2 size={15} />
            {status === "published" ? "Publish Article" : "Save Draft"}
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Title + Markdown Editor */}
        <div className="lg:col-span-8 space-y-4">
          {/* Post Title & Slug */}
          <div className="bg-white rounded-md border border-[#E5E0D5] p-5 space-y-3">
            <input
              type="text"
              placeholder="Article title here..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-xl font-bold text-[#1C2B3A] placeholder-[#9CA3AF] border-0 border-b border-[#E5E0D5] rounded-none px-0 py-2 focus:ring-0 focus:border-[#E8A33D] w-full"
            />
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="font-semibold text-[#9CA3AF]">Slug:</span>
              <span className="font-mono bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E5E0D5] text-[#374151]">
                /blogs/{slug || "slug-preview"}
              </span>
            </div>
          </div>

          {/* Editor Card */}
          <div className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden flex flex-col min-h-[500px]">
            {/* Editor Switch Tabs */}
            <div className="px-5 py-3 border-b border-[#E5E0D5] bg-[#FAF7F2]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode("write")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewMode === "write"
                      ? "bg-white text-[#1C2B3A] shadow-sm border border-[#E5E0D5]"
                      : "text-[#6B7280] hover:text-[#1C2B3A]"
                  }`}
                >
                  <Edit3 size={13} /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("preview")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewMode === "preview"
                      ? "bg-white text-[#1C2B3A] shadow-sm border border-[#E5E0D5]"
                      : "text-[#6B7280] hover:text-[#1C2B3A]"
                  }`}
                >
                  <Eye size={13} /> Live Preview
                </button>
              </div>
              <span className="text-xs text-[#9CA3AF]">Supports GitHub Flavored Markdown</span>
            </div>

            {/* Content Area */}
            {previewMode === "write" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                placeholder="Type your markdown content here..."
                className="w-full flex-1 p-5 text-sm font-mono text-[#374151] focus:outline-none resize-none leading-relaxed"
              />
            ) : (
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {content.split("\n\n").map((block, idx) => {
                  if (block.startsWith("# ")) {
                    return (
                      <h1 key={idx} className="text-2xl font-bold text-[#1C2B3A] pb-1 border-b border-[#E5E0D5]">
                        {block.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="text-lg font-semibold text-[#1C2B3A] pt-2">
                        {block.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (block.startsWith("> ")) {
                    return (
                      <blockquote key={idx} className="border-l-4 border-[#E8A33D] pl-4 italic text-[#4B5563] bg-[#FAF7F2] py-2 rounded-r">
                        {block.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  if (block.startsWith("- ")) {
                    const items = block.split("\n").map((line) => line.replace(/^- /, ""));
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1 text-sm text-[#374151]">
                        {items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm text-[#374151] leading-relaxed">
                      {block}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Settings & Metadata */}
        <div className="lg:col-span-4 space-y-5">
          {/* Status & Visibility */}
          <div className="bg-white rounded-md border border-[#E5E0D5] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#1C2B3A]">Publish Settings</h3>

            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-white rounded-md border border-[#E5E0D5] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#1C2B3A]">Cover Image</h3>
            {!coverFile ? (
              <label
                htmlFor="cover-upload"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E5E0D5] rounded-md py-8 cursor-pointer hover:border-[#E8A33D] transition-colors text-center px-4"
              >
                <UploadCloud size={24} className="text-[#9CA3AF]" />
                <span className="text-xs text-[#6B7280]">
                  Click or drag banner image (16:9 ratio recommended)
                </span>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between border border-[#E5E0D5] rounded-md px-3.5 py-2.5 bg-[#FAF7F2]">
                <span className="text-xs text-[#374151] truncate max-w-[200px]">
                  {coverFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setCoverFile(null)}
                  className="text-[#9CA3AF] hover:text-[#B0533E]"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-md border border-[#E5E0D5] p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#1C2B3A]">Categorization &amp; Tags</h3>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1C2B3A]/5 text-[#1C2B3A] border border-[#1C2B3A]/10"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-[#9CA3AF] hover:text-[#B0533E]"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type tag and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-xs text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
