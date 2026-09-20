// app/admin/(protected)/layout.tsx
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, LoaderCircle, LogOut, Menu, X } from "lucide-react";

import SidebarNav from "./_components/sidebar-nav";
import {
  clearAdminSession,
  getAdminSession,
  getServerAdminSession,
  subscribeAdminSession,
} from "./_lib/session";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeAdminSession,
    getAdminSession,
    getServerAdminSession
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The store snapshot is null on the server and during hydration, so the
  // loader renders first; once mounted we bounce signed-out visitors to login.
  useEffect(() => {
    if (!session && !getAdminSession()) {
      router.replace("/admin/login");
    }
  }, [session, router]);

  function handleSignOut() {
    clearAdminSession();
    router.replace("/admin/login");
  }

  if (session === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#FAF7F2]">
        <LoaderCircle size={26} className="animate-spin text-[#E8A33D]" />
        <p className="text-sm text-[#6B7280]">Preparing your workspace…</p>
      </div>
    );
  }

  const initials = (session?.email ?? "A")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C2B3A]">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E5E0D5] bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C2B3A] text-[#E8A33D]">
            <GraduationCap size={16} />
          </span>
          <span className="text-sm font-bold">UnivGeeks Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-md border border-[#E5E0D5] p-2 text-[#6B7280] transition-colors hover:text-[#1C2B3A]"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
      </header>

      <div className="flex">
        {/* Backdrop for the mobile drawer */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-[#1C2B3A]/40 backdrop-blur-[1px] lg:hidden"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col border-r border-[#E5E0D5] bg-white transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand */}
          <div className="flex items-center justify-between px-5 pb-4 pt-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C2B3A] text-[#E8A33D] shadow-sm transition-transform duration-300 hover:scale-105">
                <GraduationCap size={18} />
              </span>
              <span>
                <span className="block text-sm font-bold leading-tight text-[#1C2B3A]">
                  UnivGeeks
                </span>
                <span className="block text-[11px] text-[#9CA3AF]">
                  Admin Console
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-md p-1.5 text-[#9CA3AF] transition-colors hover:text-[#1C2B3A] lg:hidden"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          <SidebarNav onNavigate={() => setDrawerOpen(false)} />

          {/* System status chip */}
          <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-[#6B8F71]/20 bg-[#6B8F71]/10 px-3 py-2 text-[11px] font-medium text-[#6B8F71]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6B8F71]" />
            All systems operational
          </div>

          {/* Session footer */}
          <div className="flex items-center gap-3 border-t border-[#E5E0D5] px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8A33D]/15 text-xs font-bold text-[#E8A33D]">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#1C2B3A]">
                {session?.email.split("@")[0] ?? "Admin"}
              </p>
              <p className="truncate text-[11px] text-[#9CA3AF]">
                {session?.email ?? "admin@univgeeks.in"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out"
              className="rounded-md p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#B0533E]/10 hover:text-[#B0533E]"
            >
              <LogOut size={15} />
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
