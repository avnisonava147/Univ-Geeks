// app/admin/(protected)/quizzes/_components/quiz-editor.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { QUIZ_SUBJECTS, type Quiz } from "../_lib/data";

interface MCQQuestion {
  id: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: number;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

function createBlankQuestion(): MCQQuestion {
  return {
    id: Math.random().toString(36).slice(2),
    stem: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  };
}

function questionsFromCount(count: number): MCQQuestion[] {
  return Array.from({ length: Math.max(1, count) }, (_, i) => ({
    ...createBlankQuestion(),
    stem: "",
    options: [
      i === 0 ? "Option A" : "",
      i === 0 ? "Option B" : "",
      i === 0 ? "Option C" : "",
      i === 0 ? "Option D" : "",
    ] as [string, string, string, string],
  }));
}

interface QuizEditorProps {
  mode: "create" | "edit";
  initialQuiz?: Quiz;
}

export default function QuizEditor({ mode, initialQuiz }: QuizEditorProps) {
  const router = useRouter();
  const editing = mode === "edit" && Boolean(initialQuiz);

  const [title, setTitle] = useState(initialQuiz?.title ?? "");
  const [subject, setSubject] = useState(initialQuiz?.subject ?? QUIZ_SUBJECTS[0]);
  const [timeLimit, setTimeLimit] = useState(
    initialQuiz ? String(initialQuiz.timeLimit) : ""
  );
  const [questions, setQuestions] = useState<MCQQuestion[]>(
    initialQuiz ? questionsFromCount(initialQuiz.questionCount) : [createBlankQuestion()]
  );
  const [saving, setSaving] = useState(false);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createBlankQuestion()]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    setQuestions((prev) => {
      const next = [...prev];
      const swapIdx = direction === "up" ? index - 1 : index + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
      return next;
    });
  };

  const updateStem = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, stem: value } : q))
    );
  };

  const updateOption = (id: string, optIdx: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const opts = [...q.options] as [string, string, string, string];
        opts[optIdx] = value;
        return { ...q, options: opts };
      })
    );
  };

  const updateCorrectIndex = (id: string, idx: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, correctIndex: idx } : q))
    );
  };

  const handleSubmit = () => {
    // TODO: Replace with real API call to POST/PUT /api/quizzes
    setSaving(true);
    window.setTimeout(() => router.push("/admin/quizzes"), 600);
  };

  const isValid = title.trim().length > 0 && questions.length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Section 1: Page Header */}
      <div className="admin-anim-fade-up">
        <Link
          href="/admin/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
        >
          <ArrowLeft size={13} /> Back to Quizzes
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#1C2B3A]">
          {editing ? "Edit Quiz" : "New Quiz"}
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          {editing
            ? `Editing “${initialQuiz?.title}” — ${initialQuiz?.questionCount} questions`
            : "Build a new quiz with multiple-choice questions."}
        </p>
      </div>

      {/* Section 2: Quiz Details */}
      <div className="rounded-xl border border-[#E5E0D5] bg-white admin-anim-fade-up" style={{ animationDelay: "60ms" }}>
        <div className="border-b border-[#E5E0D5] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#1C2B3A]">Quiz Details</h2>
        </div>
        <div className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#374151]">
              Quiz Title <span className="text-[#B0533E]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Newtonian Mechanics Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
              >
                {QUIZ_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Time Limit</label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  placeholder="30"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="w-full rounded-md border border-[#E5E0D5] bg-white px-3 py-2 pr-12 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-xs text-[#9CA3AF]">
                  min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#1C2B3A]">
            Questions ({questions.length})
          </span>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-1.5 rounded-md border border-[#E5E0D5] px-3 py-1.5 text-sm text-[#374151] transition-colors hover:bg-[#FAF7F2]"
          >
            <Plus size={14} />
            Add Question
          </button>
        </div>

        {questions.length === 0 && (
          <div className="rounded-md border border-[#E5E0D5] bg-white p-10 text-center">
            <p className="text-sm text-[#9CA3AF]">
              No questions yet. Click &ldquo;Add Question&rdquo; to get started.
            </p>
          </div>
        )}

        {questions.map((question, qIdx) => (
          <div
            key={question.id}
            className="space-y-4 rounded-xl border border-[#E5E0D5] bg-white p-5 transition-shadow hover:shadow-sm admin-anim-fade-up"
            style={{ animationDelay: `${Math.min(120 + qIdx * 40, 400)}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-[#1C2B3A] px-2 py-0.5 text-xs font-medium text-white">
                Q{qIdx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveQuestion(qIdx, "up")}
                  disabled={qIdx === 0}
                  className="rounded p-1 text-[#9CA3AF] transition-colors hover:text-[#1C2B3A] disabled:cursor-not-allowed disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveQuestion(qIdx, "down")}
                  disabled={qIdx === questions.length - 1}
                  className="rounded p-1 text-[#9CA3AF] transition-colors hover:text-[#1C2B3A] disabled:cursor-not-allowed disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteQuestion(question.id)}
                  className="ml-1 rounded p-1 text-[#9CA3AF] transition-colors hover:text-[#B0533E]"
                  title="Delete question"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#6B7280]">Question</label>
              <textarea
                rows={2}
                placeholder="Enter question..."
                value={question.stem}
                onChange={(e) => updateStem(question.id, e.target.value)}
                className="w-full resize-none rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#6B7280]">
                Options — select the correct answer
              </label>
              {question.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctIndex === oIdx}
                    onChange={() => updateCorrectIndex(question.id, oIdx)}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-[#1C2B3A]"
                    title="Mark as correct"
                  />
                  <span className="w-4 shrink-0 text-xs font-semibold text-[#9CA3AF]">
                    {OPTION_LABELS[oIdx]}
                  </span>
                  <input
                    type="text"
                    placeholder={`Option ${OPTION_LABELS[oIdx]}`}
                    value={opt}
                    onChange={(e) => updateOption(question.id, oIdx, e.target.value)}
                    className="flex-1 rounded-md border border-[#E5E0D5] bg-white px-3 py-2 text-sm text-[#374151] transition focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40"
                  />
                  {question.correctIndex === oIdx && (
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-[#6B8F71]">
                      <CheckCircle2 size={12} /> Correct
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section 4: Action bar */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <button
          type="button"
          onClick={() => router.push("/admin/quizzes")}
          className="px-4 py-2 text-sm text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || saving}
          className="flex items-center gap-2 rounded-md bg-[#1C2B3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#28394D] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving && <LoaderCircle size={14} className="animate-spin" />}
          {editing ? "Save Changes" : "Create Quiz"}
        </button>
      </div>
    </div>
  );
}
