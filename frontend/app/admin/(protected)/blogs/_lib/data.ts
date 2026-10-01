// app/admin/(protected)/blogs/_lib/data.ts

export type BlogStatus = "published" | "draft";

export interface BlogPost {
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

export const INITIAL_BLOGS: BlogPost[] = [
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

export function findBlogById(id: string): BlogPost | undefined {
  return INITIAL_BLOGS.find((b) => b.id === id);
}
