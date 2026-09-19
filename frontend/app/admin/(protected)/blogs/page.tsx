// app/admin/(protected)/blogs/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Copy,
  Newspaper,
  Search,
} from "lucide-react";

type BlogStatus = "published" | "draft";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  tags: string[];
  status: BlogStatus;
  coverColor: string;
  publishedAt: string | null;
  readTime: number;
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "b-1",
    title: "How to prepare for RBSE boards: Complete Subject-wise Strategy",
    slug: "how-to-prepare-for-rbse-boards",
    author: "UnivGeeks Editorial",
    tags: ["Strategy", "RBSE", "Boards"],
    status: "published",
    coverColor: "#5B7A99",
    publishedAt: "2026-09-08",
    readTime: 6,
  },
  {
    id: "b-2",
    title: "Top 20 Scoring Questions in Class 12 Physics Electrostatics",
    slug: "class-12-physics-electrostatics-scoring-questions",
    author: "Er. Amit Saxena",
    tags: ["Physics", "Class 12", "PYQ"],
    status: "published",
    coverColor: "#E8A33D",
    publishedAt: "2026-09-04",
    readTime: 8,
  },
  {
    id: "b-3",
    title: "Organic Chemistry Reaction Mechanisms: Master Chart 2026",
    slug: "organic-chemistry-reaction-mechanisms-chart",
    author: "Dr. Ritu Chauhan",
    tags: ["Chemistry", "Reactions", "Revision"],
    status: "draft",
    coverColor: "#6B8F71",
    publishedAt: null,
    readTime: 10,
  },
  {
    id: "b-4",
    title: "Time Management for JEE & Board Dual Aspirants",
    slug: "time-management-jee-board-dual-aspirants",
    author: "UnivGeeks Editorial",
    tags: ["JEE", "Productivity", "Guidance"],
    status: "published",
    coverColor: "#8D6FA3",
    publishedAt: "2026-08-28",
    readTime: 5,
  },
  {
    id: "b-5",
    title: "Biology Diagram Cheat Sheet for Class 12 Botany & Zoology",
    slug: "biology-diagram-cheat-sheet-class-12",
    author: "Pooja Deshmukh",
    tags: ["Biology", "Diagrams", "Class 12"],
    status: "draft",
    coverColor: "#B0533E",
    publishedAt: null,
    readTime: 7,
  },
  {
    id: "b-6",
    title: "Last 5 Years Mathematics PYQ Pattern Analysis",
    slug: "mathematics-pyq-pattern-analysis-5-years",
    author: "Sanjay Singhal",
    tags: ["Maths", "Calculus", "Analysis"],
    status: "published",
    coverColor: "#1C2B3A",
    publishedAt: "2026-08-15",
    readTime: 9,
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BlogStatus>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.slug.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [blogs, search, statusFilter]);

  function handleDelete(id: string) {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleDuplicate(b: BlogPost) {
    const clone: BlogPost = {
      ...b,
      id: `b-${Date.now()}`,
      title: `${b.title} (Copy)`,
      slug: `${b.slug}-copy`,
      status: "draft",
      publishedAt: null,
    };
    setBlogs((prev) => [clone, ...prev]);
  }

  function handleBulkDelete() {
    setBlogs((prev) => prev.filter((b) => !selectedIds.has(b.id)));
    setSelectedIds(new Set());
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Blogs</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {blogs.length} articles published &amp; drafted for students.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by title, author, slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full pl-9"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | BlogStatus)}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {selectedIds.size > 0 && (
          <button
            onClick={handleBulkDelete}
            className="text-sm text-[#B0533E] border border-[#B0533E]/30 bg-[#B0533E]/5 px-3 py-2 rounded-md hover:bg-[#B0533E]/10 transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            Delete {selectedIds.size} Selected
          </button>
        )}
      </div>

      {/* Table List */}
      <div className="bg-white rounded-md border border-[#E5E0D5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Newspaper size={36} className="text-[#9CA3AF] mb-3" />
            <p className="text-sm text-[#6B7280] font-medium">No blog posts found.</p>
            <p className="text-xs text-[#9CA3AF] mt-1">Try refining your search terms or create a new post.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B7280] border-b border-[#E5E0D5] bg-[#FAF7F2]/40">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={() => {
                      if (selectedIds.size === filtered.length) {
                        setSelectedIds(new Set());
                      } else {
                        setSelectedIds(new Set(filtered.map((b) => b.id)));
                      }
                    }}
                    className="accent-[#1C2B3A] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Article</th>
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                return (
                  <tr
                    key={b.id}
                    className="border-b border-[#F0EDE5] last:border-0 hover:bg-[#FAF7F2]/60 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(b.id)}
                        onChange={() => toggleSelect(b.id)}
                        className="accent-[#1C2B3A] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-inner"
                          style={{ backgroundColor: b.coverColor }}
                        >
                          {b.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#1C2B3A] truncate">{b.title}</p>
                          <p className="text-xs text-[#9CA3AF] truncate mt-0.5">/{b.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#374151] whitespace-nowrap">
                      {b.author}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {b.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF7F2] text-[#6B7280] border border-[#E5E0D5]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {b.status === "published" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6B8F71]/15 text-[#6B8F71]">
                          Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9CA3AF]/20 text-[#6B7280]">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#9CA3AF] whitespace-nowrap">
                      {b.publishedAt ? b.publishedAt : "Unpublished"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDuplicate(b)}
                          className="p-1.5 rounded text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors"
                          title="Duplicate post"
                        >
                          <Copy size={15} />
                        </button>
                        <Link
                          href={`/admin/blogs/new?edit=${b.id}`}
                          className="p-1.5 rounded text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors"
                          title="Edit post"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded text-[#9CA3AF] hover:text-[#B0533E] transition-colors"
                          title="Delete post"
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
        )}
      </div>
    </div>
  );
}
