"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  variant?: "light" | "dark" | "auto";
};

export default function Navbar({ variant = "auto" }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkVariant = variant === "dark";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Notes", href: "/notes" },
    { name: "PYQs", href: "/pyqs" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isDarkVariant
          ? scrolled
            ? "border-b border-white/10 bg-slate-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.36)] backdrop-blur-xl"
            : "border-b border-white/10 bg-slate-950/40 backdrop-blur-md"
          : scrolled
          ? "border-b border-slate-200/70 bg-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "border-b border-slate-200/50 bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
            <img
              src="/logo_UnivGeeks.png"
              alt="UnivGeeks Logo"
              className="h-full w-full object-contain p-0.5"
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${
                isDarkVariant
                  ? "bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent"
                  : "text-slate-900"
              }`}
            >
              UnivGeeks
            </span>
            <span
              className={`text-[10px] font-semibold tracking-wider uppercase ${
                isDarkVariant ? "text-cyan-300/80" : "text-blue-600"
              }`}
            >
              Learn • Prepare • Grow
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 rounded-full border border-slate-200/40 bg-white/40 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-md md:flex dark:border-white/10 dark:bg-white/5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? isDarkVariant
                      ? "bg-blue-600/90 text-white shadow-sm"
                      : "bg-blue-600 text-white shadow-sm"
                    : isDarkVariant
                    ? "text-slate-200 hover:bg-white/10 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/admin/login"
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              isDarkVariant
                ? "border border-white/20 bg-white/5 text-slate-200 backdrop-blur-sm hover:border-cyan-400 hover:bg-white/10 hover:text-white"
                : "border border-slate-200 bg-white/70 text-slate-700 backdrop-blur-sm hover:border-blue-300 hover:bg-white hover:text-blue-600"
            }`}
          >
            Login
          </Link>

          <Link
            href="/notes"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-110 active:scale-95"
          >
            <span>Get Started</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className={`flex h-11 w-11 items-center justify-center rounded-xl border p-2 transition-colors md:hidden ${
            isDarkVariant
              ? "border-white/15 bg-white/10 text-white hover:bg-white/20"
              : "border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100"
          }`}
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu with Glassy Backdrop */}
      {mobileMenuOpen && (
        <div
          className={`border-b px-6 py-6 md:hidden ${
            isDarkVariant
              ? "border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl text-white"
              : "border-slate-200 bg-white/95 shadow-xl backdrop-blur-2xl text-slate-800"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : isDarkVariant
                      ? "text-slate-200 hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-200/50 dark:border-white/10">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl border py-3 text-center text-sm font-semibold ${
                  isDarkVariant
                    ? "border-white/20 bg-white/5 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                Login
              </Link>
              <Link
                href="/notes"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-blue-500/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
