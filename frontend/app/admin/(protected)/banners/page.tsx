// app/admin/(protected)/banners/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  UploadCloud,
  X,
} from "lucide-react";

interface Banner {
  id: string;
  title: string;
  linkUrl: string;
  imageColor: string;
  priority: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

const INITIAL_BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Summer Crash Course 2026",
    linkUrl: "https://univgeeks.in/courses/summer-crash",
    imageColor: "#E8A33D",
    priority: 1,
    active: true,
    startDate: "2026-06-01",
    endDate: "2026-07-31",
  },
  {
    id: "b2",
    title: "JEE Advanced Mock Test Series",
    linkUrl: "https://univgeeks.in/mocks/jee-advanced",
    imageColor: "#5B7A99",
    priority: 2,
    active: true,
    startDate: "2026-08-01",
    endDate: "2026-09-30",
  },
  {
    id: "b3",
    title: "NEET PYQ Mega Bundle",
    linkUrl: "https://univgeeks.in/pyqs/neet-bundle",
    imageColor: "#6B8F71",
    priority: 3,
    active: false,
    startDate: "2026-05-15",
    endDate: "2026-08-15",
  },
  {
    id: "b4",
    title: "Referral Bonus — Earn ₹500",
    linkUrl: "https://univgeeks.in/referral",
    imageColor: "#8D6FA3",
    priority: 4,
    active: true,
    startDate: "2026-09-01",
    endDate: "2026-12-31",
  },
  {
    id: "b5",
    title: "New App Launch — Download Now",
    linkUrl: "https://univgeeks.in/app",
    imageColor: "#B0533E",
    priority: 5,
    active: false,
    startDate: "2026-09-10",
    endDate: "2026-10-10",
  },
];

const EMPTY_FORM = {
  title: "",
  linkUrl: "",
  imageColor: "#E8A33D",
  priority: 1,
  active: true,
  startDate: "",
  endDate: "",
};

function getInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatDate(d: string) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const sorted = useMemo(
    () => [...banners].sort((a, b) => a.priority - b.priority),
    [banners]
  );

  const activeCount = banners.filter((b) => b.active).length;

  function toggleActive(id: string) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  }

  function movePriority(id: string, dir: "up" | "down") {
    const list = [...sorted];
    const idx = list.findIndex((b) => b.id === id);
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= list.length) return;

    const aPriority = list[idx].priority;
    const bPriority = list[swapIdx].priority;

    setBanners((prev) =>
      prev.map((b) => {
        if (b.id === list[idx].id) return { ...b, priority: bPriority };
        if (b.id === list[swapIdx].id) return { ...b, priority: aPriority };
        return b;
      })
    );
  }

  function deleteBanner(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }

  function openAdd() {
    setEditingBanner(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  }

  function openEdit(b: Banner) {
    setEditingBanner(b);
    setForm({
      title: b.title,
      linkUrl: b.linkUrl,
      imageColor: b.imageColor,
      priority: b.priority,
      active: b.active,
      startDate: b.startDate,
      endDate: b.endDate,
    });
    setShowModal(true);
  }

  function saveModal() {
    if (!form.title.trim()) return;
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id ? { ...b, ...form } : b
        )
      );
    } else {
      const newBanner: Banner = {
        id: `b${Date.now()}`,
        ...form,
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    setShowModal(false);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Banners</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {banners.length} banner{banners.length !== 1 ? "s" : ""} &middot;{" "}
            {activeCount} active
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors flex items-center gap-2"
        >
          <Plus size={15} />
          Add Banner
        </button>
      </div>

      {/* Banner List */}
      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="bg-white rounded-md border border-[#E5E0D5] p-12 flex flex-col items-center gap-3 text-center">
            <ImageIcon size={36} className="text-[#9CA3AF]" />
            <p className="text-sm text-[#6B7280]">No banners yet. Add your first one.</p>
          </div>
        )}
        {sorted.map((b, idx) => (
          <div
            key={b.id}
            className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden flex flex-row"
          >
            {/* Image Preview */}
            <div
              className="w-40 h-24 flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: b.imageColor }}
            >
              <span className="text-white/80 text-xl font-bold tracking-wide">
                {getInitials(b.title)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
              {/* Row 1: title + toggle */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#1C2B3A] truncate">{b.title}</span>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={b.active}
                    onChange={() => toggleActive(b.id)}
                  />
                  <div className="w-9 h-5 bg-[#E5E0D5] peer-checked:bg-[#6B8F71] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4"></div>
                </label>
              </div>

              {/* Row 2: priority badge + dates */}
              <div className="flex items-center mt-1.5">
                <span className="bg-[#1C2B3A]/5 text-[#1C2B3A] text-xs px-2 py-0.5 rounded-md font-medium">
                  Priority {b.priority}
                </span>
                <span className="text-xs text-[#9CA3AF] ml-2">
                  {formatDate(b.startDate)} – {formatDate(b.endDate)}
                </span>
              </div>

              {/* Row 3: link */}
              <div className="mt-1">
                <span className="text-xs text-[#5B7A99] truncate block">{b.linkUrl}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 mt-2">
                <button
                  onClick={() => movePriority(b.id, "up")}
                  disabled={idx === 0}
                  className="p-1 rounded text-[#9CA3AF] hover:text-[#1C2B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Increase priority"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  onClick={() => movePriority(b.id, "down")}
                  disabled={idx === sorted.length - 1}
                  className="p-1 rounded text-[#9CA3AF] hover:text-[#1C2B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Decrease priority"
                >
                  <ChevronDown size={15} />
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => openEdit(b)}
                  className="p-1.5 rounded text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => deleteBanner(b.id)}
                  className="p-1.5 rounded text-[#9CA3AF] hover:text-[#B0533E] transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-md max-w-lg w-full shadow-xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#E5E0D5] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#1C2B3A]">
                {editingBanner ? "Edit Banner" : "Add Banner"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Image color + upload zone */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                  Banner Image
                </label>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-16 h-16 rounded-md border border-[#E5E0D5] flex items-center justify-center"
                      style={{ backgroundColor: form.imageColor }}
                    >
                      <span className="text-white/80 text-sm font-bold">
                        {form.title ? getInitials(form.title) : "BG"}
                      </span>
                    </div>
                    <input
                      type="color"
                      value={form.imageColor}
                      onChange={(e) => setForm({ ...form, imageColor: e.target.value })}
                      className="w-16 h-7 rounded cursor-pointer border border-[#E5E0D5]"
                      title="Pick background color"
                    />
                  </div>
                  <div className="flex-1 border-2 border-dashed border-[#E5E0D5] rounded-md flex flex-col items-center justify-center gap-1.5 py-4 text-center cursor-pointer hover:border-[#E8A33D]/60 transition-colors">
                    <UploadCloud size={22} className="text-[#9CA3AF]" />
                    <p className="text-xs text-[#9CA3AF]">Click or drag to upload image</p>
                    <p className="text-[10px] text-[#9CA3AF]">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                  Title <span className="text-[#B0533E]">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Summer Crash Course 2026"
                  className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
                />
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                  Link URL
                </label>
                <input
                  type="url"
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                  placeholder="https://univgeeks.in/..."
                  className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                  Priority <span className="text-[#9CA3AF]">(lower = higher priority)</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
                  className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
                />
              </div>

              {/* Date range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
                  />
                </div>
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-[#1C2B3A]">Active</p>
                  <p className="text-xs text-[#9CA3AF]">Show this banner to users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  />
                  <div className="w-9 h-5 bg-[#E5E0D5] peer-checked:bg-[#6B8F71] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4"></div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-[#E5E0D5] flex items-center justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-[#6B7280] hover:text-[#1C2B3A] px-4 py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveModal}
                disabled={!form.title.trim()}
                className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingBanner ? "Save Changes" : "Add Banner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
