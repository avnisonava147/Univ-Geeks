// app/admin/(protected)/notes/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  StickyNote,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

type ClassLevel = "10" | "11" | "12";
type StreamName = "Common" | "Science" | "Commerce" | "Arts";
type NoteStatus = "published" | "draft";
type SortKey = "title" | "downloads" | "updatedAt";

interface NoteDoc {
  id: string;
  title: string;
  subject: string;
  classLevel: ClassLevel;
  stream: StreamName;
  chapterNo: number;
  pages: number;
  sizeMb: number;
  downloads: number;
  status: NoteStatus;
  updatedAt: string;
  uploadedBy: string;
  pdfUrl: string;
}

const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#5B7A99",
  Chemistry: "#6B8F71",
  Mathematics: "#E8A33D",
  Biology: "#B0533E",
  Science: "#8D6FA3",
  "Social Science": "#8C7B6E",
  History: "#8C7B6E",
  "Political Science": "#B0533E",
  Geography: "#5B7A99",
  Sociology: "#8D6FA3",
  Accountancy: "#5B7A99",
  "Business Studies": "#6B8F71",
  Economics: "#E8A33D",
  English: "#8D6FA3",
  Hindi: "#B0533E",
  "Computer Applications": "#5B7A99",
};

const CLASS_META: Record<ClassLevel, { label: string; color: string }> = {
  "10": { label: "Class 10", color: "#E8A33D" },
  "11": { label: "Class 11", color: "#7B5CE8" },
  "12": { label: "Class 12", color: "#E8604C" },
};

const SUBJECT_OPTIONS = Object.keys(SUBJECT_COLORS);

const INITIAL_NOTES: NoteDoc[] = [
  { id: "n1", title: "Real Numbers", subject: "Mathematics", classLevel: "10", stream: "Common", chapterNo: 1, pages: 24, sizeMb: 1.8, downloads: 1240, status: "published", updatedAt: "2026-09-10", uploadedBy: "Amit Saxena", pdfUrl: "/pdfs/class-10/mathematics/1.pdf" },
  { id: "n2", title: "Polynomials", subject: "Mathematics", classLevel: "10", stream: "Common", chapterNo: 2, pages: 18, sizeMb: 1.2, downloads: 0, status: "draft", updatedAt: "2026-09-12", uploadedBy: "Amit Saxena", pdfUrl: "/pdfs/class-10/mathematics/2.pdf" },
  { id: "n3", title: "Chemical Reactions and Equations", subject: "Science", classLevel: "10", stream: "Common", chapterNo: 1, pages: 30, sizeMb: 2.6, downloads: 980, status: "published", updatedAt: "2026-09-08", uploadedBy: "Dr. Ritu Chauhan", pdfUrl: "/pdfs/class-10/science/1.pdf" },
  { id: "n4", title: "Electricity", subject: "Science", classLevel: "10", stream: "Common", chapterNo: 11, pages: 34, sizeMb: 3.1, downloads: 1523, status: "published", updatedAt: "2026-09-05", uploadedBy: "Er. Amit Saxena", pdfUrl: "/pdfs/class-10/science/11.pdf" },
  { id: "n5", title: "Electric Charges and Fields", subject: "Physics", classLevel: "12", stream: "Science", chapterNo: 1, pages: 28, sizeMb: 2.2, downloads: 864, status: "published", updatedAt: "2026-09-11", uploadedBy: "Er. Amit Saxena", pdfUrl: "/pdfs/class-12/science/physics/1.pdf" },
  { id: "n6", title: "Electrostatic Potential and Capacitance", subject: "Physics", classLevel: "12", stream: "Science", chapterNo: 2, pages: 32, sizeMb: 2.9, downloads: 0, status: "draft", updatedAt: "2026-09-14", uploadedBy: "Er. Amit Saxena", pdfUrl: "/pdfs/class-12/science/physics/2.pdf" },
  { id: "n7", title: "Some Basic Concepts of Chemistry", subject: "Chemistry", classLevel: "11", stream: "Science", chapterNo: 1, pages: 22, sizeMb: 1.9, downloads: 712, status: "published", updatedAt: "2026-09-03", uploadedBy: "Dr. Ritu Chauhan", pdfUrl: "/pdfs/class-11/science/chemistry/1.pdf" },
  { id: "n8", title: "Trigonometric Functions", subject: "Mathematics", classLevel: "11", stream: "Science", chapterNo: 3, pages: 26, sizeMb: 2.0, downloads: 590, status: "published", updatedAt: "2026-09-01", uploadedBy: "Sanjay Singhal", pdfUrl: "/pdfs/class-11/science/maths/3.pdf" },
  { id: "n9", title: "Cell: The Unit of Life", subject: "Biology", classLevel: "11", stream: "Science", chapterNo: 8, pages: 25, sizeMb: 2.4, downloads: 0, status: "draft", updatedAt: "2026-09-13", uploadedBy: "Pooja Deshmukh", pdfUrl: "/pdfs/class-11/science/biology/8.pdf" },
  { id: "n10", title: "Introduction to Accounting", subject: "Accountancy", classLevel: "11", stream: "Commerce", chapterNo: 1, pages: 20, sizeMb: 1.5, downloads: 356, status: "published", updatedAt: "2026-08-28", uploadedBy: "UnivGeeks Editorial", pdfUrl: "/pdfs/class-11/commerce/accountancy/1.pdf" },
];

const EMPTY_FORM = {
  title: "",
  subject: "",
  classLevel: "10" as ClassLevel,
  stream: "Common" as StreamName,
  chapterNo: 1,
  pages: 20,
  sizeMb: 1.5,
  status: "draft" as NoteStatus,
  uploadedBy: "Admin",
  pdfFile: "",
};

function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createNoteId() {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDownloads(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

function subjectColor(subject: string) {
  return SUBJECT_COLORS[subject] ?? "#6B7280";
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteDoc[]>(INITIAL_NOTES);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<"" | ClassLevel>("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | NoteStatus>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const [previewNote, setPreviewNote] = useState<NoteDoc | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NoteDoc | null>(null);
  const [toast, setToast] = useState<{ msg: string; kind: "success" | "info" } | null>(null);

  // Auto-dismiss toasts (setState happens in the timer callback, not render).
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(msg: string, kind: "success" | "info" = "success") {
    setToast({ msg, kind });
  }

  const publishedCount = notes.filter((n) => n.status === "published").length;
  const draftCount = notes.length - publishedCount;
  const totalDownloads = notes.reduce((sum, n) => sum + n.downloads, 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes
      .filter((n) =>
        q
          ? n.title.toLowerCase().includes(q) ||
            n.subject.toLowerCase().includes(q) ||
            n.uploadedBy.toLowerCase().includes(q)
          : true
      )
      .filter((n) => (classFilter ? n.classLevel === classFilter : true))
      .filter((n) => (subjectFilter ? n.subject === subjectFilter : true))
      .filter((n) => (statusFilter ? n.status === statusFilter : true))
      .sort((a, b) => {
        const dir = sortAsc ? 1 : -1;
        if (sortKey === "downloads") return (a.downloads - b.downloads) * dir;
        return a[sortKey].localeCompare(b[sortKey]) * dir;
      });
  }, [notes, search, classFilter, subjectFilter, statusFilter, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((prev) => !prev);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((n) => selectedIds.has(n.id));

  function toggleSelectAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) filtered.forEach((n) => next.delete(n.id));
      else filtered.forEach((n) => next.add(n.id));
      return next;
    });
  }

  function bulkSetStatus(status: NoteStatus) {
    const stamp = todayISO();
    setNotes((prev) =>
      prev.map((n) => (selectedIds.has(n.id) ? { ...n, status, updatedAt: stamp } : n))
    );
    showToast(
      status === "published"
        ? `${selectedIds.size} note${selectedIds.size !== 1 ? "s" : ""} published`
        : `${selectedIds.size} note${selectedIds.size !== 1 ? "s" : ""} moved to drafts`
    );
    setSelectedIds(new Set());
  }

  function bulkDelete() {
    const count = selectedIds.size;
    setNotes((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
    showToast(`${count} note${count !== 1 ? "s" : ""} deleted`, "info");
  }

  function quickToggleStatus(note: NoteDoc) {
    const nextStatus: NoteStatus = note.status === "published" ? "draft" : "published";
    const stamp = todayISO();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id
          ? { ...n, status: nextStatus, updatedAt: stamp }
          : n
      )
    );
    showToast(
      nextStatus === "published" ? `“${note.title}” published` : `“${note.title}” moved to drafts`
    );
  }

  function openAdd() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  }

  function openEdit(note: NoteDoc) {
    setEditingId(note.id);
    setForm({
      title: note.title,
      subject: note.subject,
      classLevel: note.classLevel,
      stream: note.stream,
      chapterNo: note.chapterNo,
      pages: note.pages,
      sizeMb: note.sizeMb,
      status: note.status,
      uploadedBy: note.uploadedBy,
      pdfFile: note.pdfUrl.split("/").pop() ?? "",
    });
    setShowModal(true);
  }

  function setFormClass(classLevel: ClassLevel) {
    setForm((prev) => ({
      ...prev,
      classLevel,
      stream: classLevel === "10" ? "Common" : prev.stream === "Common" ? "Science" : prev.stream,
    }));
  }

  function saveNote() {
    if (!form.title.trim() || !form.subject.trim()) return;

    const stamp = todayISO();
    const subjectSlug = form.subject.trim().toLowerCase().replace(/\s+/g, "-");
    const pdfUrl =
      form.pdfFile.trim() ||
      `/pdfs/class-${form.classLevel}/${subjectSlug}/${form.chapterNo}.pdf`;

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, ...form, title: form.title.trim(), subject: form.subject.trim(), pdfUrl, updatedAt: stamp } : n))
      );
      showToast(`“${form.title.trim()}” updated`);
    } else {
      const newNote: NoteDoc = {
        id: createNoteId(),
        ...form,
        title: form.title.trim(),
        subject: form.subject.trim(),
        pdfUrl,
        updatedAt: stamp,
        downloads: 0,
      };
      setNotes((prev) => [newNote, ...prev]);
      showToast(`“${newNote.title}” uploaded`);
    }
    setShowModal(false);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setNotes((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(deleteTarget.id);
      return next;
    });
    showToast(`“${deleteTarget.title}” deleted`, "info");
    setDeleteTarget(null);
  }

  function clearFilters() {
    setSearch("");
    setClassFilter("");
    setSubjectFilter("");
    setStatusFilter("");
  }

  const statusPill = (status: NoteStatus, onClick?: () => void) =>
    status === "published" ? (
      <button
        type="button"
        onClick={onClick}
        title={onClick ? "Click to move to drafts" : undefined}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-[#6B8F71]/15 text-[#6B8F71] ${onClick ? "transition-colors hover:bg-[#6B8F71]/25 cursor-pointer" : "cursor-default"}`}
      >
        <CheckCircle2 size={11} /> Published
      </button>
    ) : (
      <button
        type="button"
        onClick={onClick}
        title={onClick ? "Click to publish" : undefined}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold bg-[#E8A33D]/15 text-[#E8A33D] ${onClick ? "transition-colors hover:bg-[#E8A33D]/25 cursor-pointer" : "cursor-default"}`}
      >
        <FileText size={11} /> Draft
      </button>
    );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-3 admin-anim-fade-up">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Notes</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {filtered.length} of {notes.length} chapter notes &middot;{" "}
            {publishedCount} published &middot; {formatDownloads(totalDownloads)} downloads
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 rounded-md bg-[#1C2B3A] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#28394D] hover:shadow-md active:translate-y-0"
        >
          <Plus size={16} />
          Upload Notes
        </button>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap gap-2.5 admin-anim-fade-up" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-white px-3.5 py-1 text-xs text-[#6B7280] shadow-sm">
          <StickyNote size={12} className="text-[#E8A33D]" />
          Total: <span className="font-semibold text-[#1C2B3A]">{notes.length}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-white px-3.5 py-1 text-xs text-[#6B7280] shadow-sm">
          <CheckCircle2 size={12} className="text-[#6B8F71]" />
          Published: <span className="font-semibold text-[#1C2B3A]">{publishedCount}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-white px-3.5 py-1 text-xs text-[#6B7280] shadow-sm">
          <FileText size={12} className="text-[#E8A33D]" />
          Drafts: <span className="font-semibold text-[#1C2B3A]">{draftCount}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#E5E0D5] bg-white px-3.5 py-1 text-xs text-[#6B7280] shadow-sm">
          <Download size={12} className="text-[#5B7A99]" />
          Downloads: <span className="font-semibold text-[#1C2B3A]">{totalDownloads.toLocaleString()}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 admin-anim-fade-up" style={{ animationDelay: "120ms" }}>
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by title, subject or uploader..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-[#E5E0D5] bg-white py-2 pl-9 pr-3 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
          />
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value as "" | ClassLevel)}
          className="rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Classes</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Subjects</option>
          {Array.from(new Set(notes.map((n) => n.subject))).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "" | NoteStatus)}
          className="rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <div className="flex items-center rounded-md border border-[#E5E0D5] bg-white p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            title="Grid view"
            className={`rounded p-1.5 transition-colors ${
              viewMode === "grid" ? "bg-[#1C2B3A] text-white" : "text-[#6B7280] hover:text-[#1C2B3A]"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            title="Table view"
            className={`rounded p-1.5 transition-colors ${
              viewMode === "table" ? "bg-[#1C2B3A] text-white" : "text-[#6B7280] hover:text-[#1C2B3A]"
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#E8A33D]/30 bg-[#E8A33D]/5 px-4 py-2.5 admin-anim-fade-up">
          <span className="text-xs font-medium text-[#1C2B3A]">
            {selectedIds.size} selected
          </span>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => bulkSetStatus("published")}
            className="flex items-center gap-1.5 rounded-md border border-[#6B8F71]/30 bg-[#6B8F71]/5 px-3 py-1.5 text-xs font-medium text-[#6B8F71] transition-colors hover:bg-[#6B8F71]/15"
          >
            <CheckCircle2 size={13} /> Publish
          </button>
          <button
            type="button"
            onClick={() => bulkSetStatus("draft")}
            className="flex items-center gap-1.5 rounded-md border border-[#E8A33D]/30 bg-[#E8A33D]/5 px-3 py-1.5 text-xs font-medium text-[#E8A33D] transition-colors hover:bg-[#E8A33D]/15"
          >
            <FileText size={13} /> Move to Drafts
          </button>
          <button
            type="button"
            onClick={bulkDelete}
            className="flex items-center gap-1.5 rounded-md border border-[#B0533E]/30 bg-[#B0533E]/5 px-3 py-1.5 text-xs font-medium text-[#B0533E] transition-colors hover:bg-[#B0533E]/15"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-[#E5E0D5] bg-white py-20 text-center admin-anim-fade-up">
          <StickyNote size={36} className="mb-3 text-[#D1CBBC]" />
          <p className="text-sm font-medium text-[#6B7280]">No notes match your search or filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-sm font-medium text-[#5B7A99] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* ---------- Grid view ---------- */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note, i) => {
            const color = subjectColor(note.subject);
            return (
              <div
                key={note.id}
                onClick={() => setPreviewNote(note)}
                className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-[#E5E0D5] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D]/70 hover:shadow-lg hover:shadow-[#E8A33D]/10 admin-anim-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="rounded-lg px-2 py-1 text-[11px] font-bold"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    Ch {note.chapterNo}
                  </span>
                  <span onClick={(e) => e.stopPropagation()}>
                    {statusPill(note.status, () => quickToggleStatus(note))}
                  </span>
                </div>

                <div>
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#1C2B3A]">
                    {note.title}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <span className="font-medium" style={{ color }}>{note.subject}</span>
                    <span>&middot;</span>
                    <span>{CLASS_META[note.classLevel].label}</span>
                    {note.stream !== "Common" && (
                      <>
                        <span>&middot;</span>
                        <span>{note.stream}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <FileText size={12} className="text-[#9CA3AF]" /> {note.pages} pages
                  </span>
                  <span className="flex items-center gap-1">
                    <Download size={12} className="text-[#9CA3AF]" /> {formatDownloads(note.downloads)}
                  </span>
                  <span className="ml-auto">{note.sizeMb} MB</span>
                </div>

                <div
                  className="flex items-center justify-between border-t border-[#F0EDE5] pt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[11px] text-[#9CA3AF]">
                    Updated {formatDate(note.updatedAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewNote(note)}
                      title="Preview"
                      className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#5B7A99]/10 hover:text-[#5B7A99]"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(note)}
                      title="Edit"
                      className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#1C2B3A]/5 hover:text-[#1C2B3A]"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(note)}
                      title="Delete"
                      className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#B0533E]/10 hover:text-[#B0533E]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ---------- Table view ---------- */
        <div className="overflow-hidden rounded-md border border-[#E5E0D5] bg-white admin-anim-fade-up">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E0D5] bg-[#FAF7F2]/40 text-left text-[#6B7280]">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                    className="cursor-pointer accent-[#1C2B3A]"
                  />
                </th>
                <th className="px-2 py-3 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("title")}
                    className="flex items-center gap-1 font-medium hover:text-[#1C2B3A]"
                  >
                    Chapter <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="px-2 py-3 font-medium">Class / Stream</th>
                <th className="px-2 py-3 font-medium">Subject</th>
                <th className="px-2 py-3 font-medium">Status</th>
                <th className="px-2 py-3 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("downloads")}
                    className="flex items-center gap-1 font-medium hover:text-[#1C2B3A]"
                  >
                    Downloads <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="px-2 py-3 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("updatedAt")}
                    className="flex items-center gap-1 font-medium hover:text-[#1C2B3A]"
                  >
                    Updated <ArrowUpDown size={12} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((note) => {
                const color = subjectColor(note.subject);
                return (
                  <tr
                    key={note.id}
                    className="border-b border-[#F0EDE5] transition-colors last:border-0 hover:bg-[#FAF7F2]/60"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(note.id)}
                        onChange={() => toggleSelect(note.id)}
                        className="cursor-pointer accent-[#1C2B3A]"
                      />
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
                          style={{ backgroundColor: `${color}1A`, color }}
                        >
                          {note.chapterNo}
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate font-medium text-[#1C2B3A]">
                            {note.title}
                          </p>
                          <p className="text-[11px] text-[#9CA3AF]">
                            {note.pages} pages &middot; {note.sizeMb} MB
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 text-[#374151]">
                      <span
                        className="rounded px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${CLASS_META[note.classLevel].color}14`,
                          color: CLASS_META[note.classLevel].color,
                        }}
                      >
                        {CLASS_META[note.classLevel].label}
                      </span>
                      {note.stream !== "Common" && (
                        <span className="ml-1.5 text-xs text-[#9CA3AF]">{note.stream}</span>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: `${color}1A`, color }}
                      >
                        {note.subject}
                      </span>
                    </td>
                    <td className="px-2 py-3">{statusPill(note.status, () => quickToggleStatus(note))}</td>
                    <td className="px-2 py-3 text-[#6B7280]">{note.downloads.toLocaleString()}</td>
                    <td className="whitespace-nowrap px-2 py-3 text-xs text-[#9CA3AF]">
                      {formatDate(note.updatedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewNote(note)}
                          title="Preview"
                          className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:text-[#5B7A99]"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(note)}
                          title="Edit"
                          className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:text-[#1C2B3A]"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(note)}
                          title="Delete"
                          className="rounded p-1.5 text-[#9CA3AF] transition-colors hover:text-[#B0533E]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- Add / Edit modal ---------- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B3A]/40 p-4 sm:p-6 admin-anim-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-xl flex-col rounded-xl bg-white shadow-2xl admin-anim-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D5] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8A33D]/15 text-[#E8A33D]">
                  <UploadCloud size={16} />
                </span>
                <h2 className="text-sm font-semibold text-[#1C2B3A]">
                  {editingId ? "Edit Note" : "Upload New Notes"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded p-1 text-[#9CA3AF] transition-colors hover:text-[#1C2B3A]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {/* PDF dropzone */}
              <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-[#E5E0D5] py-6 text-center transition-colors hover:border-[#E8A33D]/60 hover:bg-[#FAF7F2]/60">
                <UploadCloud size={22} className="text-[#9CA3AF]" />
                {form.pdfFile ? (
                  <p className="px-4 text-xs font-medium text-[#6B8F71]">{form.pdfFile}</p>
                ) : (
                  <>
                    <p className="text-xs text-[#9CA3AF]">Click to choose the chapter PDF</p>
                    <p className="text-[10px] text-[#C4BEB2]">A path is auto-generated if skipped</p>
                  </>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm((prev) => ({ ...prev, pdfFile: file.name }));
                  }}
                />
              </label>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">
                  Chapter Title <span className="text-[#B0533E]">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Quadratic Equations"
                  className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                />
              </div>

              {/* Class + Stream */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Class</label>
                  <select
                    value={form.classLevel}
                    onChange={(e) => setFormClass(e.target.value as ClassLevel)}
                    className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                  >
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Stream</label>
                  <select
                    value={form.stream}
                    disabled={form.classLevel === "10"}
                    onChange={(e) => setForm({ ...form, stream: e.target.value as StreamName })}
                    className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 disabled:cursor-not-allowed disabled:bg-[#FAF7F2] disabled:text-[#9CA3AF]"
                  >
                    {form.classLevel === "10" ? (
                      <option value="Common">All Subjects</option>
                    ) : (
                      <>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">
                  Subject <span className="text-[#B0533E]">*</span>
                </label>
                <input
                  type="text"
                  list="note-subject-options"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Mathematics"
                  className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                />
                <datalist id="note-subject-options">
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>

              {/* Chapter / pages / size */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Chapter #</label>
                  <input
                    type="number"
                    min={1}
                    value={form.chapterNo}
                    onChange={(e) => setForm({ ...form, chapterNo: Math.max(1, Number(e.target.value) || 1) })}
                    className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Pages</label>
                  <input
                    type="number"
                    min={1}
                    value={form.pages}
                    onChange={(e) => setForm({ ...form, pages: Math.max(1, Number(e.target.value) || 1) })}
                    className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Size (MB)</label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={form.sizeMb}
                    onChange={(e) => setForm({ ...form, sizeMb: Math.max(0.1, Number(e.target.value) || 0.1) })}
                    className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                  />
                </div>
              </div>

              {/* Uploader + status */}
              <div className="flex items-center justify-between rounded-lg border border-[#E5E0D5] bg-[#FAF7F2]/60 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#1C2B3A]">Publish immediately</p>
                  <p className="text-xs text-[#9CA3AF]">
                    Drafts stay hidden from students until published
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.status === "published"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.checked ? "published" : "draft" })
                    }
                  />
                  <div className="h-5 w-9 rounded-full bg-[#E5E0D5] transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#6B8F71] peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#E5E0D5] px-5 py-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNote}
                disabled={!form.title.trim() || !form.subject.trim()}
                className="rounded-md bg-[#1C2B3A] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#28394D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Upload Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Preview modal ---------- */}
      {previewNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B3A]/40 p-4 sm:p-6 admin-anim-fade-in"
          onClick={() => setPreviewNote(null)}
        >
          <div
            className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl admin-anim-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D5] px-5 py-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-[#1C2B3A]">{previewNote.title}</h2>
                <p className="mt-0.5 text-xs text-[#9CA3AF]">
                  {previewNote.subject} &middot; {CLASS_META[previewNote.classLevel].label}
                  {previewNote.stream !== "Common" ? ` · ${previewNote.stream}` : ""} &middot; Chapter{" "}
                  {previewNote.chapterNo} &middot; {previewNote.downloads.toLocaleString()} downloads
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={previewNote.pdfUrl}
                  download
                  title="Download PDF"
                  className="text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
                >
                  <Download size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewNote(null)}
                  className="text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center bg-[#FAF7F2] p-8 text-center">
              <FileText size={48} className="mb-3 text-[#E8A33D]" />
              <p className="text-sm font-medium text-[#1C2B3A]">PDF Document Viewer</p>
              <p className="mt-1 max-w-md text-xs text-[#6B7280]">
                In production this renders {previewNote.pdfUrl} ({previewNote.pages} pages,{" "}
                {previewNote.sizeMb} MB).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Delete confirmation modal ---------- */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B3A]/40 p-4 admin-anim-fade-in"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl admin-anim-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B0533E]/10 text-[#B0533E]">
              <Trash2 size={18} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#1C2B3A]">Delete this note?</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              “{deleteTarget.title}” will be permanently removed from the library.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-[#B0533E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#9A4634]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div
          key={`${toast.kind}:${toast.msg}`}
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm shadow-lg admin-anim-toast ${
            toast.kind === "success"
              ? "border-[#6B8F71]/25 bg-white text-[#1C2B3A]"
              : "border-[#5B7A99]/25 bg-white text-[#1C2B3A]"
          }`}
        >
          {toast.kind === "success" ? (
            <CheckCircle2 size={16} className="shrink-0 text-[#6B8F71]" />
          ) : (
            <Trash2 size={16} className="shrink-0 text-[#5B7A99]" />
          )}
          <span className="font-medium">{toast.msg}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-1 text-[#C4BEB2] transition-colors hover:text-[#1C2B3A]"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
