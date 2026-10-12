"use client";

import Link from "next/link";
import { ArrowUp, BookOpen, Award, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#081226] via-[#050c1b] to-[#02060e] text-slate-300">
      {/* Top radiant border accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 opacity-80" />

      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

      {/* Inspirational Student Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                Aiming for 95%+ in your Board Exams?
              </p>
              <p className="text-xs text-slate-400">
                Unlock chapter notes, 13+ years of solved PYQs, and topper formulas — completely free.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition hover:brightness-110"
            >
              <BookOpen size={14} />
              Explore Notes
            </Link>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <Award size={14} />
              Toppers List
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <img
                src="/logo.png"
                alt="UnivGeeks Logo"
                className="h-10 w-10 rounded-xl border border-slate-700 bg-slate-900 p-0.5"
              />
              <div>
                <div className="text-lg font-black leading-none tracking-tight text-white">
                  UNIV GEEKS
                </div>
                <div className="text-[11px] font-semibold text-cyan-400 tracking-wider">
                  LEARN • PREPARE • GROW
                </div>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Empowering Rajasthan & State Board students with high-yield chapter notes,
              13+ years of chapter-wise PYQs (2013-2025), and formula sheets to ace exams with confidence.
            </p>

            {/* Social / Connect */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/univ_geeks?stkn=bGV3c3RoaDBoZjQ1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a
                href="https://youtube.com/@himanshubhaiya8?si=jWUdkE3rArBumNwT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <Link
                href="/contact"
                aria-label="Contact Us"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Mail size={17} />
              </Link>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Quick Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition hover:text-cyan-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/notes" className="transition hover:text-cyan-400">
                  Chapter Notes
                </Link>
              </li>
              <li>
                <Link href="/pyqs" className="transition hover:text-cyan-400">
                  13+ Years PYQs Archive
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="flex items-center gap-1.5 transition hover:text-cyan-400">
                  <span>Toppers & Success Panel</span>
                  <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    98%
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-cyan-400">
                  About UnivGeeks
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-cyan-400">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="https://t.me/Univgeeks_svh" target="_blank"  className="transition hover:text-cyan-400">
                  Telegram
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Subjects (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Curriculum & Subjects
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/pyqs/physics" className="transition hover:text-cyan-400">
                  Class 12 Physics PYQs
                </Link>
              </li>
              <li>
                <Link href="/pyqs/chemistry" className="transition hover:text-cyan-400">
                  Class 12 Chemistry PYQs
                </Link>
              </li>
              <li>
                <Link href="/pyqs/mathematics" className="transition hover:text-cyan-400">
                  Class 12 Mathematics PYQs
                </Link>
              </li>
              <li>
                <Link href="/pyqs" className="transition hover:text-cyan-400">
                  Class 12 Biology PYQs
                </Link>
              </li>
              <li>
                <Link href="/notes" className="transition hover:text-cyan-400">
                  Class 10 Science & Maths Notes
                </Link>
              </li>
              <li>
                <Link href="/notes" className="transition hover:text-cyan-400">
                  Class 11 Foundation Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Support & Help (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Student Help
            </h4>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Need assistance or want to suggest new chapter notes?
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-slate-800"
            >
              <Mail size={13} />
              <span>Contact Support</span>
            </Link>

            <div className="mt-5">
              <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Exam Board
              </span>
              <span className="text-xs font-semibold text-slate-300">
                RBSE & State Boards
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/90 pt-8 text-xs text-slate-500 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              © {new Date().getFullYear()} UnivGeeks. All rights reserved.
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Made with ❤️ for student success</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              100% Free Study Portal
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
