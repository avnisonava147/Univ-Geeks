"use client";

import Link from "next/link";
import { Menu, X, Bell } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "PYQs", href: "/pyqs" },
  { label: "About", href: "/about" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-xl"
          />

          <div>
            <div className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
              UNIV
            </div>
            <div className="text-lg font-black leading-none">
              GEEKS
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Notification */}
          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() =>
                setNotificationOpen((prev) => !prev)
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              <Bell size={20} />

              {/* Notification Count */}
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">

                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-white">
                    Notifications
                  </h3>

                  <span className="text-xs text-cyan-300">
                    3 New
                  </span>
                </div>

                <div className="space-y-2">

                  {/* Notification 1 */}
                  <div className="rounded-lg p-3 transition hover:bg-slate-800">
                    <p className="text-sm font-semibold text-white">
                      📚 New Notes Added
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      New study notes are available.
                    </p>
                  </div>

                  {/* Notification 2 */}
                  <div className="rounded-lg p-3 transition hover:bg-slate-800">
                    <p className="text-sm font-semibold text-white">
                      📝 New PYQs Added
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Previous year questions have been updated.
                    </p>
                  </div>

                  {/* Notification 3 */}
                  <div className="rounded-lg p-3 transition hover:bg-slate-800">
                    <p className="text-sm font-semibold text-white">
                      🎓 Exam Update
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Check the latest board exam updates.
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Explore Notes */}
          <Link
            href="/notes"
            className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Explore Notes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-slate-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-slate-800 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/notes"
              className="mt-2 rounded-xl bg-cyan-500/20 px-3 py-2 text-sm font-semibold text-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Explore Notes
            </Link>

          </div>
        </nav>
      )}
    </header>
  );
}