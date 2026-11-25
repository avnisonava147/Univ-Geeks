// app/admin/(protected)/important-pdfs/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { apiRequest } from "../_lib/api";
import { resolvePdfUrl } from "@/app/_lib/apiConfig";
import { pdfData as fallbackPdfData } from "@/app/_lib/pdfData";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Download,
  Search,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  UploadCloud,
  X,
  Check,
  AlertCircle,
  Loader2,
  ArrowUpDown,
  LayoutGrid,
  List,
  RefreshCw,
  FileCheck,
} from "lucide-react";

export interface ImportantPdf {
  id: string;
  title: string;
  date: string;
  fileSize?: string;
  pdfUrl: string;
  fileName?: string;
  imageKitFileId?: string;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const EMPTY_FORM = {
  title: "",
  date: new Date().toISOString().split("T")[0],
  isNew: true,
  pdfUrl: "",
};

export default function AdminImportantPdfsPage() {
  const [pdfs, setPdfs] = useState<ImportantPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterNew, setFilterNew] = useState<"all" | "new" | "standard">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "title">("newest");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPdf, setEditingPdf] = useState<ImportantPdf | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [useManualUrl, setUseManualUrl] = useState(false);
  const [formErrors, setFormErrors] = useState<{ title?: string; file?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Delete & Preview modals
  const [deleteTarget, setDeleteTarget] = useState<ImportantPdf | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [previewPdf, setPreviewPdf] = useState<ImportantPdf | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Fetch PDFs from backend
  const fetchPdfs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await apiRequest<ImportantPdf[]>("/api/admin/important-pdfs");
      if (Array.isArray(data) && data.length > 0) {
        setPdfs(data);
      } else {
        // Try public endpoint if empty
        try {
          const publicData = await apiRequest<ImportantPdf[]>("/api/important-pdfs");
          if (Array.isArray(publicData) && publicData.length > 0) {
            setPdfs(publicData);
          } else {
            setPdfs(fallbackPdfData.map((p) => ({ ...p, id: String(p.id) })));
          }
        } catch {
          setPdfs(fallbackPdfData.map((p) => ({ ...p, id: String(p.id) })));
        }
      }
    } catch (err: any) {
      console.warn("Could not load PDFs from admin endpoint, falling back to public data:", err.message);
      try {
        const publicData = await apiRequest<ImportantPdf[]>("/api/important-pdfs");
        if (Array.isArray(publicData) && publicData.length > 0) {
          setPdfs(publicData);
        } else {
          setPdfs(fallbackPdfData.map((p) => ({ ...p, id: String(p.id) })));
        }
      } catch {
        setPdfs(fallbackPdfData.map((p) => ({ ...p, id: String(p.id) })));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPdfs();
  }, [fetchPdfs]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingPdf(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      isNew: true,
      pdfUrl: "",
    });
    setSelectedFile(null);
    setUseManualUrl(false);
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (pdf: ImportantPdf) => {
    setEditingPdf(pdf);
    setFormData({
      title: pdf.title,
      date: pdf.date || new Date().toISOString().split("T")[0],
      isNew: pdf.isNew ?? false,
      pdfUrl: pdf.pdfUrl || "",
    });
    setSelectedFile(null);
    setUseManualUrl(Boolean(pdf.pdfUrl && !pdf.fileName));
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Toggle "New" Badge quickly
  const handleToggleNew = async (pdf: ImportantPdf) => {
    try {
      const updated = await apiRequest<ImportantPdf>(`/api/admin/important-pdfs/${pdf.id}/toggle-new`, {
        method: "PATCH",
      });
      setPdfs((prev) => prev.map((item) => (item.id === pdf.id ? updated : item)));
      showToast(
        `"New" badge ${updated.isNew ? "enabled" : "removed"} for "${pdf.title.slice(0, 30)}..."`,
        "info"
      );
    } catch (err: any) {
      // Optimistic local fallback if backend endpoint temporarily unavailable
      setPdfs((prev) =>
        prev.map((item) => (item.id === pdf.id ? { ...item, isNew: !item.isNew } : item))
      );
      showToast(`Badge updated locally`, "info");
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors: { title?: string; file?: string } = {};
    if (!formData.title.trim()) {
      errors.title = "Please enter a document title";
    }

    if (!editingPdf) {
      if (useManualUrl) {
        if (!formData.pdfUrl.trim()) {
          errors.file = "Please enter a valid PDF URL";
        }
      } else {
        if (!selectedFile) {
          errors.file = "Please select a PDF file to upload";
        }
      }
    }

    if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      errors.file = "Only .pdf files are supported";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save / Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // prevent double-submit
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (selectedFile) {
        // Use multipart upload
        const payload = new FormData();
        payload.append("title", formData.title.trim());
        payload.append("date", formData.date);
        payload.append("isNew", String(formData.isNew));
        payload.append("file", selectedFile);
        if (formData.pdfUrl.trim()) {
          payload.append("pdfUrl", formData.pdfUrl.trim());
        }

        if (editingPdf) {
          const updated = await apiRequest<ImportantPdf>(
            `/api/admin/important-pdfs/${editingPdf.id}`,
            {
              method: "PUT",
              body: payload,
            }
          );
          setPdfs((prev) => prev.map((p) => (p.id === editingPdf.id ? updated : p)));
          showToast(`"${formData.title.trim()}" updated successfully`);
        } else {
          const created = await apiRequest<ImportantPdf>("/api/admin/important-pdfs", {
            method: "POST",
            body: payload,
          });
          setPdfs((prev) => [created, ...prev]);
          showToast(`"${formData.title.trim()}" uploaded successfully`);
        }
      } else {
        // JSON payload
        const jsonBody = {
          title: formData.title.trim(),
          date: formData.date,
          isNew: formData.isNew,
          pdfUrl: formData.pdfUrl.trim() || editingPdf?.pdfUrl,
          fileSize: editingPdf?.fileSize || "1.00 MB",
        };

        if (editingPdf) {
          const updated = await apiRequest<ImportantPdf>(
            `/api/admin/important-pdfs/${editingPdf.id}`,
            {
              method: "PUT",
              body: JSON.stringify(jsonBody),
            }
          );
          setPdfs((prev) => prev.map((p) => (p.id === editingPdf.id ? updated : p)));
          showToast(`"${formData.title.trim()}" updated successfully`);
        } else {
          const created = await apiRequest<ImportantPdf>("/api/admin/important-pdfs", {
            method: "POST",
            body: JSON.stringify(jsonBody),
          });
          setPdfs((prev) => [created, ...prev]);
          showToast(`"${formData.title.trim()}" created successfully`);
        }
      }

      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save document", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    if (deleting) return; // prevent double-fire

    setDeleting(true);
    try {
      await apiRequest(`/api/admin/important-pdfs/${deleteTarget.id}`, {
        method: "DELETE",
      });
      setPdfs((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast(`Document "${deleteTarget.title.slice(0, 30)}..." deleted`, "info");
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete document", "error");
    } finally {
      setDeleting(false);
    }
  };

  // Filtered & Sorted items
  const filteredPdfs = useMemo(() => {
    return pdfs
      .filter((pdf) => {
        const matchesQuery =
          !searchQuery.trim() ||
          pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pdf.date?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
          filterNew === "all" ||
          (filterNew === "new" && pdf.isNew) ||
          (filterNew === "standard" && !pdf.isNew);

        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
        }
        if (sortOrder === "oldest") {
          return new Date(a.date || "").getTime() - new Date(b.date || "").getTime();
        }
        return a.title.localeCompare(b.title);
      });
  }, [pdfs, searchQuery, filterNew, sortOrder]);

  // Statistics
  const totalCount = pdfs.length;
  const newBadgeCount = pdfs.filter((p) => p.isNew).length;
  const latestNotice = pdfs.length > 0 ? pdfs[0] : null;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : toast.type === "info"
              ? "bg-[#5B7A99] text-white"
              : "bg-[#1C2B3A] text-white"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle size={18} className="shrink-0 text-red-200" />
          ) : (
            <Check size={18} className="shrink-0 text-[#E8A33D]" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1C2B3A]">
              Important PDFs & Notices
            </h1>
            <span className="rounded-full bg-[#1C2B3A]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1C2B3A]">
              {totalCount} Total
            </span>
          </div>
          <p className="mt-1 text-sm text-[#5B6478]">
            Manage circulars, exam notifications, and official PDFs shown on the public Notice Board.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchPdfs(true)}
            disabled={refreshing}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#5B6478] shadow-sm hover:bg-slate-50 hover:text-[#1C2B3A] transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin text-[#E8A33D]" : ""} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1C2B3A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1C2B3A]/90 hover:shadow transition active:scale-[0.98]"
          >
            <Plus size={16} className="text-[#E8A33D]" />
            Upload PDF Notice
          </button>
        </div>
      </div>

      {/* Metrics Banner Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
              Total Documents
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#1C2B3A]">{totalCount}</p>
          <p className="mt-1 text-xs text-[#5B6478]">Live on the Important PDFs page</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
              "New" Badges Active
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Sparkles size={16} />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-red-600">{newBadgeCount}</p>
          <p className="mt-1 text-xs text-[#5B6478]">Highlighted with prominent red pill</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
              Latest Notice
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-[#E8A33D]">
              <Calendar size={16} />
            </div>
          </div>
          <p className="mt-2 truncate text-sm font-bold text-[#1C2B3A]" title={latestNotice?.title}>
            {latestNotice ? latestNotice.title : "No notices yet"}
          </p>
          <p className="mt-1 text-xs text-[#5B6478]">
            {latestNotice?.date ? `Published on ${latestNotice.date}` : "Ready for uploads"}
          </p>
        </div>
      </div>

      {/* Controls Bar: Search, Filters & View Toggle */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by title or date..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-9 py-2 text-sm text-[#1C2B3A] placeholder:text-slate-400 focus:border-[#1C2B3A] focus:bg-white focus:outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills, Sort & View Toggles */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status filter */}
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50/60 p-0.5 text-xs">
            {(["all", "new", "standard"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setFilterNew(filter)}
                className={`rounded-lg px-2.5 py-1.5 font-medium capitalize transition ${
                  filterNew === filter
                    ? "bg-white text-[#1C2B3A] shadow-xs font-semibold"
                    : "text-[#5B6478] hover:text-[#1C2B3A]"
                }`}
              >
                {filter === "all" ? "All Notices" : filter === "new" ? "New Only" : "Standard"}
              </button>
            ))}
          </div>

          {/* Sort order dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="appearance-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 pr-7 text-xs font-medium text-[#1C2B3A] shadow-xs hover:border-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="newest">Date: Newest First</option>
              <option value="oldest">Date: Oldest First</option>
              <option value="title">Title: A to Z</option>
            </select>
            <ArrowUpDown
              size={12}
              className="pointer-events-none absolute right-2 text-slate-400"
            />
          </div>

          {/* View mode toggle */}
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50/60 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded-lg p-1.5 transition ${
                viewMode === "table"
                  ? "bg-white text-[#1C2B3A] shadow-xs"
                  : "text-slate-400 hover:text-[#1C2B3A]"
              }`}
              title="Table view"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-1.5 transition ${
                viewMode === "grid"
                  ? "bg-white text-[#1C2B3A] shadow-xs"
                  : "text-slate-400 hover:text-[#1C2B3A]"
              }`}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={28} className="animate-spin text-[#E8A33D]" />
            <p className="text-sm font-medium text-[#5B6478]">Loading documents...</p>
          </div>
        </div>
      ) : filteredPdfs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <FileText size={24} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[#1C2B3A]">No notices found</h3>
          <p className="mt-1 text-sm text-[#5B6478]">
            {searchQuery
              ? `No matches for "${searchQuery}". Try clearing search.`
              : "Upload your first PDF notice to display it on the website."}
          </p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1C2B3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C2B3A]/90 transition"
          >
            <Plus size={16} className="text-[#E8A33D]" />
            Upload PDF Notice
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wider text-[#5B6478]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Document Title</th>
                  <th className="px-4 py-3.5 font-semibold">Notice Date</th>
                  <th className="px-4 py-3.5 font-semibold">File Size</th>
                  <th className="px-4 py-3.5 font-semibold text-center">"New" Badge</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPdfs.map((pdf) => {
                  const resolvedUrl = resolvePdfUrl(pdf.pdfUrl);
                  return (
                    <tr
                      key={pdf.id}
                      className="group transition-colors hover:bg-slate-50/50"
                    >
                      {/* Title & Preview click */}
                      <td className="px-5 py-4 max-w-md">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold text-xs">
                            PDF
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => setPreviewPdf(pdf)}
                              className="text-left font-medium text-[#1C2B3A] hover:text-blue-600 transition leading-snug line-clamp-2"
                              title="Click to preview PDF"
                            >
                              {pdf.title}
                            </button>
                            <p className="mt-0.5 text-xs text-slate-400 truncate max-w-sm">
                              {pdf.fileName || (pdf.pdfUrl?.startsWith("http") ? "Cloud Storage" : pdf.pdfUrl)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-[#5B6478]">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 font-medium">
                          <Calendar size={12} className="text-slate-400" />
                          {pdf.date || "—"}
                        </span>
                      </td>

                      {/* File Size */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-[#5B6478]">
                        {pdf.fileSize || "1.00 MB"}
                      </td>

                      {/* "New" Badge Toggle */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleNew(pdf)}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition active:scale-95 ${
                            pdf.isNew
                              ? "bg-red-500 text-white shadow-xs hover:bg-red-600"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                          }`}
                          title="Click to toggle New badge"
                        >
                          {pdf.isNew && <Sparkles size={10} />}
                          {pdf.isNew ? "New Active" : "Disabled"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          {/* Preview in modal */}
                          <button
                            type="button"
                            onClick={() => setPreviewPdf(pdf)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#5B6478] hover:bg-slate-100 hover:text-blue-600 transition"
                            title="Preview PDF"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Direct Download */}
                          <a
                            href={resolvedUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#5B6478] hover:bg-slate-100 hover:text-green-600 transition"
                            title="Download PDF"
                          >
                            <Download size={14} />
                          </a>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(pdf)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#5B6478] hover:bg-slate-100 hover:text-[#1C2B3A] transition"
                            title="Edit Notice"
                          >
                            <Pencil size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(pdf)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#5B6478] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                            title="Delete Notice"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPdfs.map((pdf) => {
            const resolvedUrl = resolvePdfUrl(pdf.pdfUrl);
            return (
              <div
                key={pdf.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-slate-300"
              >
                <div>
                  {/* Top card row: Date and New Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[#5B6478]">
                      <Calendar size={12} className="text-slate-400" />
                      {pdf.date || "Notice"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleNew(pdf)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold transition active:scale-95 ${
                        pdf.isNew
                          ? "bg-red-500 text-white shadow-xs"
                          : "bg-slate-100 text-slate-400 hover:text-slate-700"
                      }`}
                      title="Toggle 'New' badge"
                    >
                      {pdf.isNew && <Sparkles size={10} />}
                      {pdf.isNew ? "NEW" : "No badge"}
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setPreviewPdf(pdf)}
                    className="mt-3 text-sm font-semibold text-[#1C2B3A] line-clamp-3 leading-snug cursor-pointer group-hover:text-blue-600 transition"
                    title={pdf.title}
                  >
                    {pdf.title}
                  </h3>

                  {/* Meta details */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-red-600 bg-red-50 rounded px-1.5 py-0.5">
                      PDF
                    </span>
                    <span>{pdf.fileSize || "1.00 MB"}</span>
                  </div>
                </div>

                {/* Bottom card action buttons */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setPreviewPdf(pdf)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    <Eye size={13} />
                    Preview
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={resolvedUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-green-600 transition"
                      title="Download"
                    >
                      <Download size={13} />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(pdf)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#1C2B3A] transition"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(pdf)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* UPLOAD / EDIT MODAL                                            */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C2B3A] text-white">
                  <FileText size={18} className="text-[#E8A33D]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C2B3A]">
                    {editingPdf ? "Edit PDF Notice" : "Upload New PDF Notice"}
                  </h3>
                  <p className="text-xs text-[#5B6478]">
                    {editingPdf
                      ? "Update notice title, publication date or replace file."
                      : "Add a new document notice for the public website."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Document Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C2B3A] mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                    if (formErrors.title) setFormErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  placeholder="e.g., RBSE Class 12 Science Board Exam 2026 — Revised Date Sheet & Important Instructions"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#1C2B3A] placeholder:text-slate-400 focus:outline-none transition ${
                    formErrors.title
                      ? "border-red-500 focus:border-red-500 bg-red-50/20"
                      : "border-slate-200 focus:border-[#1C2B3A]"
                  }`}
                />
                {formErrors.title && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {formErrors.title}
                  </p>
                )}
              </div>

              {/* Notice Date & "New" Badge Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C2B3A] mb-1.5">
                    Notice Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-[#1C2B3A] focus:border-[#1C2B3A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C2B3A] mb-1.5">
                    "New" Badge Flag
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2 cursor-pointer hover:bg-slate-50 transition">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isNew: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-[#1C2B3A] flex items-center gap-1">
                      Highlight with <span className="text-red-600 font-bold">New</span> badge
                    </span>
                  </label>
                </div>
              </div>

              {/* PDF File / Source selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C2B3A]">
                    PDF Document {!editingPdf && <span className="text-red-500">*</span>}
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseManualUrl(!useManualUrl)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {useManualUrl ? "← Upload file from computer" : "Use external PDF URL instead →"}
                  </button>
                </div>

                {useManualUrl ? (
                  <div>
                    <input
                      type="url"
                      value={formData.pdfUrl}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, pdfUrl: e.target.value }));
                        if (formErrors.file) setFormErrors((prev) => ({ ...prev, file: undefined }));
                      }}
                      placeholder="https://example.com/notices/exam-circular.pdf or /pdfs/..."
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#1C2B3A] placeholder:text-slate-400 focus:outline-none transition ${
                        formErrors.file
                          ? "border-red-500 bg-red-50/20"
                          : "border-slate-200 focus:border-[#1C2B3A]"
                      }`}
                    />
                    <p className="mt-1 text-xs text-[#5B6478]">
                      Enter a direct link to an existing PDF or external file.
                    </p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                        if (formErrors.file) setFormErrors((prev) => ({ ...prev, file: undefined }));
                      }}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition ${
                        selectedFile
                          ? "border-green-400 bg-green-50/30"
                          : formErrors.file
                          ? "border-red-400 bg-red-50/20"
                          : "border-slate-300 hover:border-[#1C2B3A] bg-slate-50/50 hover:bg-slate-50"
                      }`}
                    >
                      {selectedFile ? (
                        <>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                            <FileCheck size={20} />
                          </div>
                          <p className="text-sm font-semibold text-[#1C2B3A] max-w-xs truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                          </p>
                          <span className="mt-2 text-xs font-medium text-blue-600 hover:underline">
                            Click to change file
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-2">
                            <UploadCloud size={20} />
                          </div>
                          <p className="text-sm font-semibold text-[#1C2B3A]">
                            Click to select PDF document
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Supports PDF files up to 50MB (cloud-optimized)
                          </p>
                          {editingPdf?.pdfUrl && (
                            <p className="mt-2 text-xs text-amber-600 font-medium">
                              (Leave empty to keep existing file)
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {formErrors.file && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {formErrors.file}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#5B6478] hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C2B3A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1C2B3A]/90 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-[#E8A33D]" />
                      <span>{editingPdf ? "Saving Changes..." : "Uploading PDF..."}</span>
                    </>
                  ) : (
                    <span>{editingPdf ? "Save Changes" : "Upload Document"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PREVIEW MODAL                                                  */}
      {/* ============================================================== */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative flex flex-col w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50">
              <div className="flex items-center gap-2.5 truncate pr-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white font-bold text-xs">
                  PDF
                </span>
                <span className="text-sm font-semibold text-[#1C2B3A] truncate">
                  {previewPdf.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resolvePdfUrl(previewPdf.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-[#1C2B3A] hover:bg-slate-50 transition"
                >
                  <ExternalLink size={13} />
                  Open in New Tab
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewPdf(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="flex-1 bg-slate-100">
              <iframe
                src={`${resolvePdfUrl(previewPdf.pdfUrl)}#toolbar=1`}
                title={previewPdf.title}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DELETE CONFIRMATION MODAL                                      */}
      {/* ============================================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
              <Trash2 size={24} />
            </div>

            <h3 className="text-lg font-bold text-[#1C2B3A]">Delete PDF Notice</h3>
            <p className="mt-2 text-sm text-[#5B6478] leading-relaxed">
              Are you sure you want to permanently delete:
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1C2B3A] bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {deleteTarget.title}
            </p>
            <p className="mt-2 text-xs text-red-500">
              This notice will immediately disappear from the public website and total document count.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-[#5B6478] hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Notice</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
