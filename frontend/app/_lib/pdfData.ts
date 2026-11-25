export interface PDFItem {
  id: string;
  title: string;
  date: string;        // "YYYY-MM-DD" format
  fileSize: string;    // display string like "288.26 KB"
  pdfUrl: string;      // link to the PDF file
  isNew: boolean;      // show "New" badge
}

// IDs match the backend seed IDs (ip1–ip8) so delete operations work
// even when the admin panel falls back to this static data.
export const pdfData: PDFItem[] = [
  {
    id: "ip1",
    title:
      "Advisory for Students regarding Aadhaar Data Updates and Biometric Authentication.",
    date: "2026-11-17",
    fileSize: "288.26 KB",
    pdfUrl: "/pdfs/advisory-aadhaar.pdf",
    isNew: true,
  },
  {
    id: "ip2",
    title:
      "RBSE Class 12 Science Board Exam 2026 \u2014 Revised Date Sheet & Important Instructions",
    date: "2026-11-17",
    fileSize: "2.26 MB",
    pdfUrl: "/pdfs/revised-datesheet-2026.pdf",
    isNew: true,
  },
  {
    id: "ip3",
    title:
      "Combined Higher Secondary (10+2) Level Examination, 2025 (Tier-II): Uploading of Final Answer Key(s) along with Response Sheet(s) and Marks",
    date: "2026-11-17",
    fileSize: "230.92 KB",
    pdfUrl: "/pdfs/answer-key-2025.pdf",
    isNew: true,
  },
  {
    id: "ip4",
    title:
      "Important Notice: Changes in Syllabus for Class 12 Physics & Chemistry \u2014 RBSE 2026-27 Session",
    date: "2026-11-16",
    fileSize: "282.53 KB",
    pdfUrl: "/pdfs/syllabus-changes.pdf",
    isNew: true,
  },
  {
    id: "ip5",
    title:
      "Information regarding Exam Center allocation and Admit Card download for Class 12 Board Examination, 2026",
    date: "2026-11-13",
    fileSize: "320.80 KB",
    pdfUrl: "/pdfs/exam-center-info.pdf",
    isNew: false,
  },
  {
    id: "ip6",
    title:
      "Identity Verification (IV) for the candidates shortlisted in RBSE Merit List of Class 10 Toppers, 2025 - reg.",
    date: "2026-11-07",
    fileSize: "315.38 KB",
    pdfUrl: "/pdfs/identity-verification.pdf",
    isNew: false,
  },
  {
    id: "ip7",
    title:
      "RBSE Class 10 & 12 Board Exam 2026 \u2014 Model Papers Released for All Subjects",
    date: "2026-10-28",
    fileSize: "1.45 MB",
    pdfUrl: "/pdfs/model-papers-2026.pdf",
    isNew: false,
  },
  {
    id: "ip8",
    title:
      "Scholarship Application Form for Meritorious Students \u2014 Last Date 15 Nov 2026",
    date: "2026-10-20",
    fileSize: "512.00 KB",
    pdfUrl: "/pdfs/scholarship-form.pdf",
    isNew: false,
  },
];
