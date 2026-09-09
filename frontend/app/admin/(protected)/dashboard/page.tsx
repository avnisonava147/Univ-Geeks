// app/admin/(protected)/dashboard/page.tsx
import { Users, StickyNote, FileQuestion, Brain, Newspaper, MessageCircleQuestion } from "lucide-react";

// TODO: replace with real DB queries
const stats = [
  { label: "Total Users", value: "2,340", accent: "#1C2B3A", icon: Users },
  { label: "Total Notes", value: "186", accent: "#E8A33D", icon: StickyNote },
  { label: "Total PYQs", value: "94", accent: "#6B8F71", icon: FileQuestion },
  { label: "Total Quizzes", value: "37", accent: "#B0533E", icon: Brain },
  { label: "Total Blogs", value: "52", accent: "#5B7A99", icon: Newspaper },
];

const recentActivity = [
  { text: "New note uploaded — Class 12 Physics: Electrostatics", time: "12 min ago" },
  { text: "Quiz \"RBSE Chemistry Mock 3\" created", time: "48 min ago" },
  { text: "User Priya Sharma signed up", time: "1 hr ago" },
  { text: "Blog \"How to prepare for RBSE boards\" published", time: "3 hrs ago" },
  { text: "PYQ uploaded — Class 10 Maths 2025", time: "5 hrs ago" },
];

const pendingQuestions = [
  { student: "Rohit Kumar", question: "Difference between AC and DC generator?", time: "2 hrs ago" },
  { student: "Neha Gupta", question: "Can you explain integration by parts?", time: "6 hrs ago" },
  { student: "Aman Singh", question: "Which chapters are most important for boards?", time: "1 day ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1C2B3A]">Dashboard</h1>
        <p className="text-sm text-[#6B7280] mt-1">An overview of content, users, and what needs your attention.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(({ label, value, accent, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-md border border-[#E5E0D5] p-5"
            style={{ borderLeft: `3px solid ${accent}` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">{label}</span>
              <Icon size={16} color={accent} />
            </div>
            <div className="text-2xl font-semibold text-[#1C2B3A] mt-2">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-md border border-[#E5E0D5]">
          <div className="px-5 py-4 border-b border-[#E5E0D5]">
            <h2 className="text-sm font-semibold text-[#1C2B3A]">Recent Activity</h2>
          </div>
          <ul className="divide-y divide-[#F0EDE5]">
            {recentActivity.map((item, i) => (
              <li key={i} className="px-5 py-3 flex items-center justify-between text-sm">
                <span className="text-[#374151]">{item.text}</span>
                <span className="text-[#9CA3AF] whitespace-nowrap ml-4">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Attention: unresolved questions */}
        <div className="bg-white rounded-md border border-[#E5E0D5]">
          <div className="px-5 py-4 border-b border-[#E5E0D5] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1C2B3A] flex items-center gap-2">
              <MessageCircleQuestion size={16} color="#B0533E" />
              Needs Attention
            </h2>
            <a href="/admin/questions" className="text-xs text-[#E8A33D] hover:underline">
              View all
            </a>
          </div>
          <ul className="divide-y divide-[#F0EDE5]">
            {pendingQuestions.map((q, i) => (
              <li key={i} className="px-5 py-3">
                <p className="text-sm text-[#1C2B3A] font-medium">{q.student}</p>
                <p className="text-sm text-[#6B7280] mt-0.5 line-clamp-2">{q.question}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{q.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}