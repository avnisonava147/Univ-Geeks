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
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
import { Menu, X, Bell } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "PYQs", href: "/pyqs" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`sticky top-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${
        isScrolled ? "pt-3 px-4 sm:px-8" : "pt-0 px-0"
      }`}
    >
      <header
        className={`w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-6xl rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            : "max-w-full rounded-none border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
            isScrolled ? "px-4 py-2.5 sm:px-6" : "px-4 py-3.5 sm:px-6"
          }`}
        >

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="UnivGeeks Logo"
              className={`rounded-xl border border-slate-200 shadow-xs transition-all duration-300 ${
                isScrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            />

            <div>
              <div className="text-lg font-black leading-none text-slate-900 tracking-tight">
                UNIV
              </div>
              <div className="text-lg font-black leading-none text-cyan-600 tracking-tight">
                GEEKS
              </div>
            </div>
          </Link>

          {/* Navigation with Active State Indicator */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-3.5 py-1.5 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "text-blue-600 bg-blue-50/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  )}
                </Link>
              );
            })}
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
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              <Bell size={19} />

              {/* Notification Count */}
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-xs">
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">

                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-slate-900 text-sm">
                    Notifications
                  </h3>

                  <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                    3 New
                  </span>
                </div>

                <div className="space-y-1.5">

                  {/* Notification 1 */}
                  <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                    <p className="text-xs font-bold text-slate-900">
                      📚 New Notes Added
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Class 12 Physics & Chemistry notes are updated.
                    </p>
                  </div>

                  {/* Notification 2 */}
                  <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                    <p className="text-xs font-bold text-slate-900">
                      📝 New PYQs Added
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      2025 Board exam question papers now available.
                    </p>
                  </div>

                  {/* Notification 3 */}
                  <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                    <p className="text-xs font-bold text-slate-900">
                      🎓 Exam Update
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Check updated RBSE syllabus & weightage marks.
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Explore Notes Button */}
          <Link
            href="/notes"
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition hover:brightness-105 active:scale-95"
          >
            Explore Notes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 md:hidden hover:bg-slate-100"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-t border-slate-100 bg-white/98 md:hidden rounded-b-2xl">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 space-y-1">

            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/notes"
              className="mt-2 block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Explore Notes
            </Link>

          </div>
        </nav>
      )}
    </header>
  </div>
  );
}