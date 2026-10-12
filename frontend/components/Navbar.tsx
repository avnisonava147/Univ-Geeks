
"use client";

import { useEffect, useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  variant?: "light" | "dark" | "auto";
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "PYQs", href: "/pyqs" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({
  variant = "auto",
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setNotificationOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const dark = variant === "dark";

  return (
    <div
      className={`sticky top-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled ? "px-4 pt-3 sm:px-8" : "px-0 pt-0"
      }`}
    >
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "max-w-6xl rounded-2xl border border-slate-200/80 bg-white/90 shadow-lg backdrop-blur-xl"
            : "max-w-full rounded-none border-b border-slate-200/60 bg-white/95 shadow-sm backdrop-blur-xl"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 transition-all duration-300 ${
            isScrolled
              ? "px-4 py-2.5 sm:px-6"
              : "px-4 py-3.5 sm:px-6"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="UnivGeeks Logo"
              className={`rounded-xl border border-slate-200 object-contain ${
                isScrolled ? "h-9 w-9" : "h-10 w-10"
              }`}
            />

            <div>
              <div className="text-lg font-black leading-none tracking-tight text-slate-900">
                UNIV
              </div>
              <div className="text-lg font-black leading-none tracking-tight text-cyan-600">
                GEEKS
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-3.5 py-2 text-sm font-bold transition ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationOpen}
                onClick={() =>
                  setNotificationOpen((prev) => !prev)
                }
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                  dark
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <Bell size={19} />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-2xl">
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      Notifications
                    </h3>
                    <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                      3 New
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">
                        📚 New Notes Added
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Class 12 Physics and Chemistry notes are updated.
                      </p>
                    </div>

                    <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">
                        📝 New PYQs Added
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        2025 board exam papers are now available.
                      </p>
                    </div>

                    <div className="rounded-xl p-2.5 transition hover:bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">
                        🎓 Exam Update
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Check the latest syllabus and weightage.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/notes"
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-95"
            >
              Explore Notes
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <nav className="rounded-b-2xl border-t border-slate-100 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col space-y-1 px-4 py-3">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm transition ${
                      active
                        ? "bg-blue-50 font-bold text-blue-600"
                        : "font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/notes"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-sm"
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
