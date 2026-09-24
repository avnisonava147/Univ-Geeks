// app/admin/(protected)/dashboard/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  StickyNote,
  FileQuestion,
  Brain,
  Newspaper,
  Users,
  MessageCircleQuestion,
  TrendingUp,
  Upload,
  Send,
  Sparkles,
} from "lucide-react";

/* ---------------------------- Mock data ---------------------------- */

const stats = [
  { label: "Total Users", value: 2340, delta: "+124 this month", accent: "#1C2B3A", icon: Users, href: "/admin/users" },
  { label: "Total Notes", value: 186, delta: "+12 this month", accent: "#E8A33D", icon: StickyNote, href: "/admin/notes" },
  { label: "Total PYQs", value: 94, delta: "+8 this month", accent: "#6B8F71", icon: FileQuestion, href: "/admin/pyqs" },
  { label: "Total Quizzes", value: 37, delta: "+3 this month", accent: "#B0533E", icon: Brain, href: "/admin/quizzes" },
  { label: "Total Blogs", value: 52, delta: "+5 this month", accent: "#5B7A99", icon: Newspaper, href: "/admin/blogs" },
];

const weeklyDownloads = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 410 },
  { day: "Wed", value: 385 },
  { day: "Thu", value: 520 },
  { day: "Fri", value: 470 },
  { day: "Sat", value: 610 },
  { day: "Sun", value: 580 },
];

const contentMix = [
  { label: "Notes", value: 186, color: "#E8A33D" },
  { label: "PYQs", value: 94, color: "#6B8F71" },
  { label: "Quizzes", value: 37, color: "#B0533E" },
  { label: "Blogs", value: 52, color: "#5B7A99" },
];

const recentActivity = [
  { text: "New note uploaded — Class 12 Physics: Electrostatics", time: "12 min ago", color: "#E8A33D" },
  { text: "Quiz \"RBSE Chemistry Mock 3\" created", time: "48 min ago", color: "#B0533E" },
  { text: "User Priya Sharma signed up", time: "1 hr ago", color: "#5B7A99" },
  { text: "Blog \"How to prepare for RBSE boards\" published", time: "3 hrs ago", color: "#6B8F71" },
  { text: "PYQ uploaded — Class 10 Maths 2025", time: "5 hrs ago", color: "#8D6FA3" },
];

const pendingQuestions = [
  { student: "Rohit Kumar", question: "Difference between AC and DC generator?", time: "2 hrs ago" },
  { student: "Neha Gupta", question: "Can you explain integration by parts?", time: "6 hrs ago" },
  { student: "Aman Singh", question: "Which chapters are most important for boards?", time: "1 day ago" },
];

const quickActions = [
  { label: "Upload Notes", hint: "Add chapter PDFs", href: "/admin/notes", icon: Upload, color: "#E8A33D" },
  { label: "Upload PYQ", hint: "Past year papers", href: "/admin/pyqs/new", icon: FileQuestion, color: "#6B8F71" },
  { label: "New Quiz", hint: "Build questions", href: "/admin/quizzes/new", icon: Brain, color: "#B0533E" },
  { label: "New Article", hint: "Write a blog post", href: "/admin/blogs/new", icon: Newspaper, color: "#5B7A99" },
  { label: "Broadcast", hint: "Notify students", href: "/admin/notifications", icon: Send, color: "#8D6FA3" },
];

/* --------------------------- Count-up hook -------------------------- */

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

function StatCard({
  label,
  value,
  delta,
  accent,
  icon: Icon,
  href,
  delay,
}: (typeof stats)[number] & { delay: number }) {
  const animated = useCountUp(value, 800 + delay * 300);

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-[#E5E0D5] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E8A33D]/50 hover:shadow-lg hover:shadow-[#E8A33D]/10 admin-anim-fade-up"
      style={{ borderLeft: `3px solid ${accent}`, animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6B7280]">{label}</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon size={15} />
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums text-[#1C2B3A]">
        {animated.toLocaleString()}
      </div>
      <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#6B8F71]">
        <TrendingUp size={11} />
        {delta}
      </div>
    </Link>
  );
}

/* ------------------------------ Page ------------------------------- */

export default function DashboardPage() {
  const maxDownload = Math.max(...weeklyDownloads.map((d) => d.value));
  const mixTotal = contentMix.reduce((s, m) => s + m.value, 0);
  const totalQuestions = pendingQuestions.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="admin-anim-fade-up">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[#1C2B3A]">
          Welcome back, Admin
          <Sparkles size={18} className="text-[#E8A33D]" />
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Here&apos;s an overview of content, users, and what needs your attention.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 70} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 admin-anim-fade-up" style={{ animationDelay: "200ms" }}>
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center gap-3 rounded-xl border border-[#E5E0D5] bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8A33D]/50 hover:shadow-md"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
              style={{ backgroundColor: `${action.color}14`, color: action.color }}
            >
              <action.icon size={16} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-[#1C2B3A]">
                {action.label}
              </span>
              <span className="block truncate text-[11px] text-[#9CA3AF]">{action.hint}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Downloads chart + content mix */}
        <div className="space-y-6 lg:col-span-2">
          {/* Weekly downloads */}
          <div className="rounded-xl border border-[#E5E0D5] bg-white p-5 admin-anim-fade-up" style={{ animationDelay: "260ms" }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-[#1C2B3A]">
                <TrendingUp size={15} className="text-[#E8A33D]" />
                Downloads This Week
              </h2>
              <span className="rounded-full bg-[#6B8F71]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6B8F71]">
                {weeklyDownloads.reduce((s, d) => s + d.value, 0).toLocaleString()} total
              </span>
            </div>
            <div className="flex h-40 items-end gap-3">
              {weeklyDownloads.map((d, i) => (
                <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-[#6B7280] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {d.value}
                  </span>
                  <div
                    className="w-full max-w-[38px] rounded-t-md bg-gradient-to-t from-[#E8A33D]/70 to-[#E8A33D] transition-all duration-300 group-hover:from-[#E8A33D] group-hover:to-[#E8A33D] group-hover:brightness-110 admin-anim-grow-bar"
                    style={{
                      height: `${Math.max(8, (d.value / maxDownload) * 100)}%`,
                      animationDelay: `${300 + i * 70}ms`,
                    }}
                  />
                  <span className="text-[11px] text-[#9CA3AF]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content mix */}
          <div className="rounded-xl border border-[#E5E0D5] bg-white p-5 admin-anim-fade-up" style={{ animationDelay: "320ms" }}>
            <h2 className="mb-4 text-sm font-semibold text-[#1C2B3A]">Content Mix</h2>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#F0EDE5]">
              {contentMix.map((m, i) => (
                <div
                  key={m.label}
                  className="h-full admin-anim-grow-col"
                  style={{
                    backgroundColor: m.color,
                    width: `${(m.value / mixTotal) * 100}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                  title={`${m.label}: ${m.value}`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {contentMix.map((m) => (
                <span key={m.label} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                  {m.label}
                  <span className="font-semibold text-[#1C2B3A]">{m.value}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-[#E5E0D5] bg-white admin-anim-fade-up" style={{ animationDelay: "380ms" }}>
            <div className="border-b border-[#E5E0D5] px-5 py-4">
              <h2 className="text-sm font-semibold text-[#1C2B3A]">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-[#F0EDE5]">
              {recentActivity.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-[#FAF7F2]/60"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate text-[#374151]">{item.text}</span>
                  </span>
                  <span className="ml-4 whitespace-nowrap text-xs text-[#9CA3AF]">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Needs attention */}
        <div className="rounded-xl border border-[#E5E0D5] bg-white admin-anim-fade-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between border-b border-[#E5E0D5] px-5 py-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-[#1C2B3A]">
              <MessageCircleQuestion size={16} className="text-[#B0533E]" />
              Needs Attention
            </h2>
            <span className="rounded-full bg-[#B0533E]/10 px-2 py-0.5 text-xs font-semibold text-[#B0533E]">
              {totalQuestions} open
            </span>
          </div>
          <ul className="divide-y divide-[#F0EDE5]">
            {pendingQuestions.map((q, i) => (
              <li key={i} className="px-5 py-3.5 transition-colors hover:bg-[#FAF7F2]/60">
                <p className="text-sm font-medium text-[#1C2B3A]">{q.student}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-[#6B7280]">{q.question}</p>
                <p className="mt-1 text-xs text-[#9CA3AF]">{q.time}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#E5E0D5] p-4">
            <Link
              href="/admin/questions"
              className="block rounded-md bg-[#1C2B3A] py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#28394D]"
            >
              Answer questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
