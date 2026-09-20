// app/admin/(protected)/quizzes/_lib/data.ts

export type QuizStatus = "published" | "draft";

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  timeLimit: number;
  status: QuizStatus;
  createdAt: string;
  attempts: number;
}

export const SUBJECT_COLORS: Record<string, string> = {
  Physics: "#5B7A99",
  Chemistry: "#6B8F71",
  Mathematics: "#E8A33D",
  Biology: "#B0533E",
  Science: "#8D6FA3",
  History: "#8C7B6E",
};

export const QUIZ_SUBJECTS = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "Science",
  "History",
];

export const MOCK_QUIZZES: Quiz[] = [
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

export function findQuizById(id: string): Quiz | undefined {
  return MOCK_QUIZZES.find((q) => q.id === id);
}
