
import type { ClassName, Stream } from "./notesData";

export type ImportantPdf = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  fileName: string;
};

export function getImportantPdfs(
  selectedClass: ClassName,
  selectedStream: Stream,
  selectedSubject: string
): ImportantPdf[] {

  const classFolder = `class-${selectedClass}`;

  const streamFolder =
    selectedClass === "10"
      ? "all-subjects"
      : selectedStream.toLowerCase();

  const subjectFolder = selectedSubject
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const basePath =
    `/important-pdfs/${classFolder}/${streamFolder}/${subjectFolder}`;

  const pdfList: ImportantPdf[] = [
    {
      id: "blueprint-2026",
      title: "Blueprint 2026",
      description: "Latest examination blueprint and paper pattern.",
      pdfUrl: `${basePath}/blueprint-2026.pdf`,
      fileName: "Blueprint-2026.pdf",
    },
    {
      id: "important-questions-2026",
      title: "Important Questions 2026",
      description: "Important questions for revision and exam preparation.",
      pdfUrl: `${basePath}/important-questions-2026.pdf`,
      fileName: "Important-Questions-2026.pdf",
    },
    {
      id: "sample-paper-2026",
      title: "Sample Question Paper 2026",
      description: "Practice paper for examination preparation.",
      pdfUrl: `${basePath}/sample-paper-2026.pdf`,
      fileName: "Sample-Question-Paper-2026.pdf",
    },
  ];

  return pdfList;
}

