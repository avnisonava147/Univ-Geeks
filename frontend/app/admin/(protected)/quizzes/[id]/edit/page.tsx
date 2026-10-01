// app/admin/(protected)/quizzes/[id]/edit/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Brain, FileQuestion } from "lucide-react";

import QuizEditor from "../../_components/quiz-editor";
import { findQuizById } from "../../_lib/data";

export default function EditQuizPage() {
  const params = useParams<{ id: string }>();
  const quiz = findQuizById(params.id);

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center admin-anim-fade-up">
        <Brain size={40} className="mb-3 text-[#9CA3AF]" />
        <h1 className="text-lg font-semibold text-[#1C2B3A]">Quiz not found</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          The quiz you&apos;re looking for doesn&apos;t exist or was deleted.
        </p>
        <Link
          href="/admin/quizzes"
          className="mt-5 flex items-center gap-2 rounded-md bg-[#1C2B3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#28394D]"
        >
          <FileQuestion size={15} />
          Back to Quizzes
        </Link>
      </div>
    );
  }

  return <QuizEditor key={quiz.id} mode="edit" initialQuiz={quiz} />;
}
