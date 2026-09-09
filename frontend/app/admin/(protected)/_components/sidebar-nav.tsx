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
  { label: "Questions", href: "/admin/questions", icon: MessageCircleQuestion },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 space-y-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-white/10 text-white border-l-2 border-[#E8A33D] -ml-[2px] pl-[14px]"
                : "text-[#C9D1D9] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={16} color={isActive ? "#E8A33D" : undefined} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}