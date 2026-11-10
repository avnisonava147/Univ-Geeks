import { Suspense } from "react";
import YearPYQClient from "./YearPYQClient";

const subjects = [
  "chemistry",
  "physics",
  "mathematics",
  "biology",
  "hindi",
  "english",
];

const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

export function generateStaticParams() {
  const params: { subject: string; year: string }[] = [];
  for (const subject of subjects) {
    for (const year of years) {
      params.push({ subject, year });
    }
  }
  return params;
}

export default async function YearPYQPage({
  params,
}: {
  params: Promise<{
    subject: string;
    year: string;
  }>;
}) {
  const { subject, year } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <YearPYQClient subject={subject} year={year} />
    </Suspense>
  );
}