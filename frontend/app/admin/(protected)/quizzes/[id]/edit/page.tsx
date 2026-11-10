import { MOCK_QUIZZES } from "../../_lib/data";
import EditQuizClient from "./EditQuizClient";

export function generateStaticParams() {
  return MOCK_QUIZZES.map((quiz) => ({
    id: quiz.id,
  }));
}

export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditQuizClient id={id} />;
}
