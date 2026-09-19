// app/admin/(protected)/quizzes/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Brain, Search } from "lucide-react";

type QuizStatus = "published" | "draft";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  timeLimit: number;
  status: QuizStatus;
  createdAt: string;
  attempts: number;
}

const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#5B7A99",
  Chemistry: "#6B8F71",
  Mathematics: "#E8A33D",
  Biology: "#B0533E",
  Science: "#8D6FA3",
  History: "#8C7B6E",
};

const MOCK_QUIZZES: Quiz[] = [
  {
    id: "q1",
    title: "Newtonian Mechanics Fundamentals",
    subject: "Physics",
    questionCount: 20,
    timeLimit: 30,
    status: "published",
    createdAt: "2026-08-10",
    attempts: 142,
  },
  {
    id: "q2",
    title: "Periodic Table & Element Properties",
    subject: "Chemistry",
    questionCount: 15,
    timeLimit: 25,
    status: "published",
    createdAt: "2026-08-15",
    attempts: 98,
  },
  {
    id: "q3",
    title: "Calculus: Derivatives & Integrals",
    subject: "Mathematics",
    questionCount: 18,
    timeLimit: 45,
    status: "draft",
    createdAt: "2026-08-22",
    attempts: 0,
  },
  {
    id: "q4",
    title: "Cell Biology & Organelles",
    subject: "Biology",
    questionCount: 12,
    timeLimit: 20,
    status: "published",
    createdAt: "2026-09-01",
    attempts: 67,
  },
  {
    id: "q5",
    title: "Ancient Civilizations Overview",
    subject: "History",
    questionCount: 25,
    timeLimit: 40,
    status: "draft",
    createdAt: "2026-09-05",
    attempts: 0,
  },
  {
    id: "q6",
    title: "Scientific Method & Experiments",
    subject: "Science",
    questionCount: 10,
    timeLimit: 15,
    status: "published",
    createdAt: "2026-09-08",
    attempts: 34,
  },
];

const SUBJECTS = ["All Subjects", "Physics", "Chemistry", "Mathematics", "Biology", "Science", "History"];

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(MOCK_QUIZZES);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = subjectFilter === "All Subjects" || q.subject === subjectFilter;
      const matchesStatus = statusFilter === "all" || q.status === statusFilter;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [quizzes, search, subjectFilter, statusFilter]);

  const handleDelete = (id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C2B3A]">Quizzes</h1>
          <p className="text-sm text-[#6B7280] mt-1">{quizzes.length} quizzes total</p>
        </div>
        <Link
          href="/admin/quizzes/new"
          className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Quiz
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full pl-9"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D]"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Card Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Brain size={40} className="text-[#9CA3AF] mb-3" />
          <p className="text-sm text-[#6B7280] font-medium">No quizzes match your search.</p>
          <p className="text-xs text-[#9CA3AF] mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((quiz) => {
            const subjectColor = SUBJECT_COLORS[quiz.subject] ?? "#8C7B6E";
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-md border border-[#E5E0D5] p-5 flex flex-col gap-2"
              >
                {/* Top row: subject badge + status badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${subjectColor}1A`,
                      color: subjectColor,
                    }}
                  >
                    {quiz.subject}
                  </span>
                  {quiz.status === "published" ? (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#6B8F711A", color: "#6B8F71" }}
                    >
                      Published
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#9CA3AF1A", color: "#9CA3AF" }}
                    >
                      Draft
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-base font-semibold text-[#1C2B3A] mt-2 leading-snug">
                  {quiz.title}
                </h2>

                {/* Meta */}
                <p className="text-xs text-[#9CA3AF] mt-1">
                  {quiz.questionCount} questions &middot; {quiz.timeLimit} min
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0EDE5]">
                  <span className="text-xs text-[#6B7280]">
                    {quiz.attempts.toLocaleString()} attempt{quiz.attempts !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/quizzes/${quiz.id}/edit`}
                      className="text-[#9CA3AF] hover:text-[#1C2B3A] transition-colors p-1 rounded"
                      title="Edit quiz"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="text-[#9CA3AF] hover:text-[#B0533E] transition-colors p-1 rounded"
                      title="Delete quiz"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
