// app/admin/(protected)/pyqs/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  X,
  Download,
  Search,
  ArrowUpDown,
  FileText,
  LayoutGrid,
  List,
  Eye,
} from "lucide-react";

type Pyq = {
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  exam: string;
  year: string;
  fileUrl: string;
  uploadedAt: string;
  downloads: number;
};

const initialPyqs: Pyq[] = [
  {
    id: "1",
    title: "Class 12 Physics 2025 Board Paper",
    classLevel: "Class 12",
    subject: "Physics",
    exam: "RBSE",
    year: "2025",
    fileUrl: "/files/c12-physics-2025.pdf",
    uploadedAt: "2025-09-08",
    downloads: 412,
  },
  {
    id: "2",
    title: "Class 10 Maths 2025 Standard Exam",
    classLevel: "Class 10",
    subject: "Mathematics",
    exam: "CBSE",
    year: "2025",
    fileUrl: "/files/c10-maths-2025.pdf",
    uploadedAt: "2025-09-05",
    downloads: 289,
  },
  {
    id: "3",
    title: "Class 12 Chemistry 2024 Question Paper",
    classLevel: "Class 12",
    subject: "Chemistry",
    exam: "RBSE",
    year: "2024",
    fileUrl: "/files/c12-chem-2024.pdf",
    uploadedAt: "2024-09-01",
    downloads: 731,
  },
  {
    id: "4",
    title: "Class 10 Science 2024 Final Paper",
    classLevel: "Class 10",
    subject: "Science",
    exam: "CBSE",
    year: "2024",
    fileUrl: "/files/c10-science-2024.pdf",
    uploadedAt: "2024-08-20",
    downloads: 566,
  },
  {
    id: "5",
    title: "Class 12 Biology 2023 Theory Paper",
    classLevel: "Class 12",
    subject: "Biology",
    exam: "RBSE",
    year: "2023",
    fileUrl: "/files/c12-bio-2023.pdf",
    uploadedAt: "2023-09-14",
    downloads: 198,
  },
  {
    id: "6",
    title: "JEE Mains Physics Session 1 2024",
    classLevel: "Class 12",
    subject: "Physics",
    exam: "JEE Mains",
    year: "2024",
    fileUrl: "/files/jee-physics-2024.pdf",
    uploadedAt: "2024-02-10",
    downloads: 890,
  },
  {
    id: "7",
    title: "NEET UG Chemistry 2023 Question Paper",
    classLevel: "Class 12",
    subject: "Chemistry",
    exam: "NEET",
    year: "2023",
    fileUrl: "/files/neet-chem-2023.pdf",
    uploadedAt: "2023-05-20",
    downloads: 1120,
  },
];

const subjectColors: Record<string, string> = {
  Physics: "#5B7A99",
  Chemistry: "#6B8F71",
  Mathematics: "#E8A33D",
  Biology: "#B0533E",
  Science: "#8D6FA3",
};

type SortKey = "title" | "year" | "downloads";

export default function PyqsPage() {
  const [pyqs, setPyqs] = useState(initialPyqs);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [previewPyq, setPreviewPyq] = useState<Pyq | null>(null);

  const subjects = useMemo(
    () => Array.from(new Set(initialPyqs.map((p) => p.subject))),
    []
  );
  const years = useMemo(
    () => Array.from(new Set(initialPyqs.map((p) => p.year))).sort((a, b) => b.localeCompare(a)),
    []
  );
  const exams = useMemo(
    () => Array.from(new Set(initialPyqs.map((p) => p.exam))),
    []
  );

  const filtered = useMemo(() => {
    return pyqs
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (subjectFilter ? p.subject === subjectFilter : true))
      .filter((p) => (yearFilter ? p.year === yearFilter : true))
      .filter((p) => (examFilter ? p.exam === examFilter : true))
      .sort((a, b) => {
        const dir = sortAsc ? 1 : -1;
        if (sortKey === "downloads") return (a.downloads - b.downloads) * dir;
        return a[sortKey].localeCompare(b[sortKey]) * dir;
      });
  }, [pyqs, search, subjectFilter, yearFilter, examFilter, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  function toggleSelect(id: string, e: React.SyntheticEvent) {
    e.stopPropagation();
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleBulkDelete() {
    setPyqs(pyqs.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">PYQs</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {filtered.length} of {pyqs.length} question papers available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-[#E5E0D5] rounded-md p-0.5 mr-2">
            <button
              onClick={() => setViewMode("table")}
              title="Table view"
              className={`p-1.5 rounded transition-colors ${
                viewMode === "table"
                  ? "bg-[#1C2B3A] text-white"
                  : "text-[#6B7280] hover:text-[#1C2B3A]"
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-[#1C2B3A] text-white"
                  : "text-[#6B7280] hover:text-[#1C2B3A]"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>

          <Link
            href="/admin/pyqs/new"
            className="flex items-center gap-2 bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors font-medium"
          >
            <Plus size={16} />
            Upload PYQ
          </Link>
        </div>
      </div>

      {/* Toolbar: Search + Subject/Year/Exam Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers by title..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#E5E0D5] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 text-[#374151]"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="text-sm border border-[#E5E0D5] rounded-md px-3 py-2 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="text-sm border border-[#E5E0D5] rounded-md px-3 py-2 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
          className="text-sm border border-[#E5E0D5] rounded-md px-3 py-2 bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
        >
          <option value="">All Exams</option>
          {exams.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        {selected.size > 0 && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 text-sm text-[#B0533E] border border-[#B0533E]/30 bg-[#B0533E]/5 px-3 py-2 rounded-md hover:bg-[#B0533E]/10 transition-colors"
          >
            <Trash2 size={14} />
            Delete {selected.size} selected
          </button>
        )}
      </div>

      {/* Main Content: Table or Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-md border border-[#E5E0D5] flex flex-col items-center justify-center py-20 text-center">
          <FileText size={36} className="text-[#D1CBBC] mb-3" />
          <p className="text-sm text-[#6B7280]">No PYQs match your search or filters.</p>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pyq) => {
            const subColor = subjectColors[pyq.subject] ?? "#6B7280";
            return (
              <div
                key={pyq.id}
                onClick={() => setPreviewPyq(pyq)}
                className="bg-white rounded-md border border-[#E5E0D5] p-5 cursor-pointer hover:border-[#E8A33D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${subColor}1A`,
                        color: subColor,
                      }}
                    >
                      {pyq.subject}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-[#1C2B3A]/5 text-[#1C2B3A] rounded">
                      {pyq.exam}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1C2B3A] mt-3 leading-snug">
                    {pyq.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mt-1.5">
                    <span>{pyq.classLevel}</span>
                    <span>&middot;</span>
                    <span>Year {pyq.year}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#F0EDE5]">
                  <span className="text-xs text-[#6B7280]">
                    {pyq.downloads} downloads
                  </span>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setPreviewPyq(pyq)}
                      className="p-1 text-[#6B7280] hover:text-[#1C2B3A] transition-colors"
                      title="Preview PDF"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => setPyqs(pyqs.filter((p) => p.id !== pyq.id))}
                      className="p-1 text-[#6B7280] hover:text-[#B0533E] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B7280] border-b border-[#E5E0D5] bg-[#FAF7F2]/40">
                <th className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={() =>
                      setSelected(
                        selected.size === filtered.length
                          ? new Set()
                          : new Set(filtered.map((p) => p.id))
                      )
                    }
                    className="accent-[#1C2B3A] cursor-pointer"
                  />
                </th>
                <th
                  className="px-2 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("title")}
                >
                  <span className="flex items-center gap-1">
                    Title <ArrowUpDown size={12} />
                  </span>
                </th>
                <th className="px-2 py-3 font-medium">Exam</th>
                <th className="px-2 py-3 font-medium">Class</th>
                <th className="px-2 py-3 font-medium">Subject</th>
                <th
                  className="px-2 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("year")}
                >
                  <span className="flex items-center gap-1">
                    Year <ArrowUpDown size={12} />
                  </span>
                </th>
                <th
                  className="px-2 py-3 font-medium cursor-pointer select-none"
                  onClick={() => toggleSort("downloads")}
                >
                  <span className="flex items-center gap-1">
                    Downloads <ArrowUpDown size={12} />
                  </span>
                </th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pyq) => (
                <tr
                  key={pyq.id}
                  onClick={() => setPreviewPyq(pyq)}
                  className="border-b border-[#F0EDE5] last:border-0 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                >
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(pyq.id)}
                      onChange={(e) => toggleSelect(pyq.id, e)}
                      className="accent-[#1C2B3A] cursor-pointer"
                    />
                  </td>
                  <td className="px-2 py-3 text-[#1C2B3A] font-medium">{pyq.title}</td>
                  <td className="px-2 py-3 text-[#374151]">
                    <span className="text-xs bg-[#1C2B3A]/5 text-[#1C2B3A] px-2 py-0.5 rounded font-medium">
                      {pyq.exam}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-[#374151]">{pyq.classLevel}</td>
                  <td className="px-2 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${subjectColors[pyq.subject] ?? "#6B8F71"}1A`,
                        color: subjectColors[pyq.subject] ?? "#6B8F71",
                      }}
                    >
                      {pyq.subject}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-[#374151]">{pyq.year}</td>
                  <td className="px-2 py-3 text-[#9CA3AF]">{pyq.downloads}</td>
                  <td className="px-5 py-3">
                    <div
                      className="flex items-center justify-end gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setPreviewPyq(pyq)}
                        className="text-[#6B7280] hover:text-[#1C2B3A]"
                        title="View PDF"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setPyqs(pyqs.filter((p) => p.id !== pyq.id))}
                        className="text-[#6B7280] hover:text-[#B0533E]"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview modal */}
      {previewPyq && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6"
          onClick={() => setPreviewPyq(null)}
        >
          <div
            className="bg-white rounded-md w-full max-w-3xl h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E0D5]">
              <div>
                <h2 className="text-sm font-semibold text-[#1C2B3A]">{previewPyq.title}</h2>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {previewPyq.exam} &middot; {previewPyq.subject} &middot; {previewPyq.year} &middot; {previewPyq.downloads} downloads
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={previewPyq.fileUrl}
                  download
                  className="text-[#6B7280] hover:text-[#1C2B3A]"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={() => setPreviewPyq(null)}
                  className="text-[#6B7280] hover:text-[#1C2B3A]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-[#FAF7F2] flex flex-col items-center justify-center p-8 text-center">
              <FileText size={48} className="text-[#E8A33D] mb-3" />
              <p className="text-sm font-medium text-[#1C2B3A]">PDF Document Viewer</p>
              <p className="text-xs text-[#6B7280] mt-1 max-w-md">
                In production, this renders the uploaded question paper PDF from {previewPyq.fileUrl}.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}