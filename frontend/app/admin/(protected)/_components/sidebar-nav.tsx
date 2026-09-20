// app/admin/(protected)/_components/sidebar-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, StickyNote, FileQuestion, Brain,
  Newspaper, MessageCircleQuestion, Bell, Image, Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Notes", href: "/admin/notes", icon: StickyNote },
  { label: "PYQs", href: "/admin/pyqs", icon: FileQuestion },
  { label: "Quizzes", href: "/admin/quizzes", icon: Brain },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Questions", href: "/admin/questions", icon: MessageCircleQuestion, badge: 3 },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B9B1A2]">
        Manage
      </p>
      {navItems.map(({ label, href, icon: Icon, badge }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
              isActive
                ? "bg-[#1C2B3A] font-medium text-white shadow-sm shadow-[#1C2B3A]/20"
                : "text-[#5B6478] hover:translate-x-0.5 hover:bg-[#1C2B3A]/5 hover:text-[#1C2B3A]"
            }`}
          >
            <Icon
              size={16}
              className={`shrink-0 transition-colors duration-200 ${
                isActive
                  ? "text-[#E8A33D]"
                  : "text-[#9CA3AF] group-hover:text-[#1C2B3A]"
              }`}
            />
            <span className="flex-1">{label}</span>

            {badge ? (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors ${
                  isActive
                    ? "bg-[#E8A33D] text-white"
                    : "bg-[#E8A33D]/15 text-[#E8A33D]"
                }`}
              >
                {badge}
              </span>
            ) : (
              <span
                className={`h-1.5 w-1.5 rounded-full bg-[#E8A33D] transition-all duration-300 ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
