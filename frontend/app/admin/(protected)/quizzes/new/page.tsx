// app/admin/(protected)/quizzes/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface MCQQuestion {
  id: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: number;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology", "Science", "History"];

function createBlankQuestion(): MCQQuestion {
  return {
    id: Math.random().toString(36).slice(2),
    stem: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  };
}

export default function NewQuizPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState<MCQQuestion[]>([createBlankQuestion()]);

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
    // TODO: Replace with real API call to POST /api/quizzes
    router.push("/admin/quizzes");
  };

  const isValid = title.trim().length > 0 && questions.length > 0;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Section 1: Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1C2B3A]">New Quiz</h1>
        <p className="text-sm text-[#6B7280] mt-1">Build a new quiz with multiple-choice questions.</p>
      </div>

      {/* Section 2: Quiz Details */}
      <div className="bg-white rounded-md border border-[#E5E0D5]">
        <div className="px-5 py-4 border-b border-[#E5E0D5]">
          <h2 className="text-sm font-semibold text-[#1C2B3A]">Quiz Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">
              Quiz Title <span className="text-[#B0533E]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Newtonian Mechanics Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">Time Limit</label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  placeholder="30"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] pointer-events-none select-none">
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
            onClick={addQuestion}
            className="border border-[#E5E0D5] text-sm px-3 py-1.5 rounded-md text-[#374151] hover:bg-[#FAF7F2] flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            Add Question
          </button>
        </div>

        {questions.length === 0 && (
          <div className="bg-white rounded-md border border-[#E5E0D5] p-10 text-center">
            <p className="text-sm text-[#9CA3AF]">No questions yet. Click &ldquo;Add Question&rdquo; to get started.</p>
          </div>
        )}

        {questions.map((question, qIdx) => (
          <div key={question.id} className="bg-white rounded-md border border-[#E5E0D5] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#1C2B3A] text-white text-xs px-2 py-0.5 rounded-md font-medium">
                Q{qIdx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveQuestion(qIdx, "up")}
                  disabled={qIdx === 0}
                  className="p-1 rounded text-[#9CA3AF] hover:text-[#1C2B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move up"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => moveQuestion(qIdx, "down")}
                  disabled={qIdx === questions.length - 1}
                  className="p-1 rounded text-[#9CA3AF] hover:text-[#1C2B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move down"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="p-1 rounded text-[#9CA3AF] hover:text-[#B0533E] transition-colors ml-1"
                  title="Delete question"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Question</label>
              <textarea
                rows={2}
                placeholder="Enter question..."
                value={question.stem}
                onChange={(e) => updateStem(question.id, e.target.value)}
                className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] w-full resize-none"
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
                    className="w-4 h-4 flex-shrink-0 cursor-pointer accent-[#1C2B3A]"
                    title="Mark as correct"
                  />
                  <span className="text-xs font-semibold text-[#9CA3AF] w-4 flex-shrink-0">
                    {OPTION_LABELS[oIdx]}
                  </span>
                  <input
                    type="text"
                    placeholder={`Option ${OPTION_LABELS[oIdx]}`}
                    value={opt}
                    onChange={(e) => updateOption(question.id, oIdx, e.target.value)}
                    className="border border-[#E5E0D5] rounded-md px-3 py-2 text-sm text-[#374151] bg-white focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/40 focus:border-[#E8A33D] flex-1"
                  />
                  {question.correctIndex === oIdx && (
                    <span className="text-xs text-[#6B8F71] font-medium flex-shrink-0">✓ Correct</span>
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
          onClick={() => router.push("/admin/quizzes")}
          className="text-sm text-[#6B7280] hover:text-[#1C2B3A] px-4 py-2 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-[#1C2B3A] text-white text-sm px-4 py-2 rounded-md hover:bg-[#28394D] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}
