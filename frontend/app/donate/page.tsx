"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Server,
  PenLine,
  Megaphone,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Gift,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/About/Reveal";

// Brand icons (lucide v1 ships no brand glyphs)
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// =====================================================
//  SUPPORT / DONATE PAGE
//  NOTE: Amounts & the usage breakdown below are editable
//  placeholders — replace them with your real running costs
//  and hook the "Continue" button to your payment gateway
//  (Razorpay / UPI / BuyMeACoffee) when it is live.
// =====================================================

const tiers = [
  {
    amount: 11,
    label: "Chhota Sa Saath",
    funds: "Ek student ko ek hafte tak free notes & PYQs chalate rakhta hai.",
  },
  {
    amount: 51,
    label: "UnivGeeks Supporter",
    funds: "Ek mahine ka server + domain ka kharcha nikaal deta hai.",
  },
  {
    amount: 101,
    label: "UnivGeeks Champion",
    funds: "Ek naya chapter solve karke notes banane ka kharcha cover karta hai.",
  },
  {
    amount: 151,
    label: "UnivGeeks Hero",
    funds: "Ek poore subject ka PYQ update + platform ki nayi improvement.",
  },
];

const usage = [
  { label: "Servers & Hosting", percent: 35, icon: "🖥️", note: "Site 24x7 online rahe" },
  { label: "Notes & PYQ Creation", percent: 40, icon: "📝", note: "Scan, solve, format & verify" },
  { label: "Design & Tools", percent: 15, icon: "🧰", note: "Better UI, faster downloads" },
  { label: "Outreach", percent: 10, icon: "📣", note: "Zyada tak pahunch, bilkul free" },
];

const faqs = [
  {
    q: "Kya UnivGeeks abhi bhi free rahega?",
    a: "Bilkul. Donation sirf platform ko zinda aur behtar rakhne ke liye hai — notes, PYQs aur formula sheets hamesha students ke liye free rahenge. Koi paywall nahi, koi ads nahi.",
  },
  {
    q: "Mera paisa kahan lagega?",
    a: "Server & domain, naye notes/PYQs banane ka kaam (scan, solve, format), aur platform ki designing me. Har mahine ka usage breakdown hum apne social channels par share karte hain.",
  },
  {
    q: "Bina donate kiye bhi support kar sakte hain?",
    a: "Haan! UnivGeeks ko apne doston, school group aur juniors ke saath share karna sabse bada support hai. Instagram par follow karke bhi humein motivate kar sakte ho.",
  },
  {
    q: "Donation ka process kaisa hai?",
    a: "Payment gateway jaldi live ho raha hai. Us tak aap neeche wale form se apni salahakat bhej sakte ho — hum aapko UPI / payment link seedha bhej denge.",
  },
];

export default function DonatePage() {
  const [cycle, setCycle] = useState<"once" | "monthly">("once");
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const isCustom = selectedIndex === -1;
  const selectedAmount = isCustom
    ? Math.max(0, Number(customAmount) || 0)
    : tiers[selectedIndex].amount;

  return (
    <main className="overflow-hidden bg-white text-slate-800">
      <Navbar />

      {/* =================================================
          1. HERO
      ================================================= */}
      <section className="relative overflow-hidden bg-[#061A40] px-6 py-16 text-white sm:py-20 md:px-12 lg:px-20">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-0 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 top-20 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-rose-300">
                <Heart size={13} className="fill-rose-400 text-rose-400" />
                <span>Support UnivGeeks</span>
              </div>

              <h1 className="mt-4 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
                Aapka support,
                <span className="block bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
                  bacho ki free padhai.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                UnivGeeks par har notes, har PYQ aur har formula sheet bilkul free hai —
                aur aisa hi rehna chahiye. Aapka chhota sa contribution hi is platform ko
                zinda rakhta hai.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#donate"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(244,63,94,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(251,146,60,0.45)]"
                >
                  <Heart size={16} className="fill-white text-white" />
                  <span>Donate karo</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#usage"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <span>Paisa kahan lagta hai?</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-blue-200/80">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" /> 100% free, hamesha free
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" /> No ads, no paywall
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" /> Transparent usage
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — glass "thank you" card */}
          <Reveal delay={150}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-6 rounded-[40px] blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(244,63,94,0.45), transparent 60%), radial-gradient(circle at 75% 70%, rgba(56,189,248,0.35), transparent 60%)",
                }}
              />

              <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 shadow-[0_30px_70px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-xl shadow-lg shadow-rose-500/30">
                    ❤️
                  </span>
                  <div>
                    <p className="text-lg font-black text-white">
                      Shukriya, pehle se hi!
                    </p>
                    <p className="text-xs font-semibold text-blue-200/80">
                      25,000+ students UnivGeeks par padh rahe hain
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { icon: "🖥️", text: "Server par chalta hai — 24x7 available" },
                    { icon: "📝", text: "13 saal ke PYQs solve karke publish hote hain" },
                    { icon: "🎓", text: "Notes, formula sheets — sab free access" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <p className="text-xs font-semibold leading-relaxed text-blue-100 sm:text-[13px]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/70">
                    Aapka har rupya
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    Seedha students ke liye 💙
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================================
          2. WHY YOUR SUPPORT MATTERS
      ================================================= */}
      <section className="relative px-6 py-16 sm:py-20 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute left-1/4 top-10 h-64 w-64 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 sm:text-sm">
                Kyun chahiye aapka support
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Ek chhota sa contribution,
                <span className="text-rose-600"> bada impact.</span>
              </h2>
              <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-rose-500 to-amber-400" />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <Server size={22} />,
                title: "Platform Zinda Rakhe",
                text: "Hosting, domain aur bandwidth — site tab tak online hai jab tak koi toh kharcha uthata hai.",
              },
              {
                icon: <PenLine size={22} />,
                title: "Naya Content Banta Rahe",
                text: "Har paper scan karke, solve karke aur chapter-wise organise karne me mehnat lagti hai.",
              },
              {
                icon: <Megaphone size={22} />,
                title: "Har Tak Pahunche",
                text: "Chhote shehron aur gaon ke students tak UnivGeeks free me pahunchta rahe — bina ads ke.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={100 * (i + 1)}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 text-rose-600 ring-1 ring-rose-100 transition-transform group-hover:scale-110">
                    {card.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-black text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          3. TRANSPARENT USAGE BREAKDOWN
      ================================================= */}
      <section
        id="usage"
        className="relative overflow-hidden border-y border-blue-100 bg-gradient-to-b from-[#f0f7ff] to-[#e8f3fe] px-6 py-16 sm:py-20 md:px-12 lg:px-20"
      >
        <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
                100% Transparent
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                Aapka har rupya
                <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  kahan jaata hai.
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Hum koi investor nahi, koi ads network nahi — sirf students aur supporters.
                Isliye har contribution ka use sirf platform aur content me hota hai.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/80 px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
                <Sparkles size={15} className="text-cyan-500" />
                Indicative breakdown — har quarter actual usage share ki jaati hai.
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="rounded-3xl border border-blue-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="space-y-6">
                {usage.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2.5 font-bold text-slate-900">
                        <span className="text-lg">{row.icon}</span>
                        {row.label}
                      </span>
                      <span className="font-black text-slate-700">{row.percent}%</span>
                    </div>

                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="usage-bar h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>

                    <p className="mt-1.5 text-xs text-slate-500">{row.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <style jsx>{`
          .usage-bar {
            transform-origin: left;
            animation: usageGrow 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes usageGrow {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .usage-bar {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* =================================================
          4. DONATION WIDGET
      ================================================= */}
      <section id="donate" className="relative px-6 py-16 sm:py-20 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 sm:text-sm">
                Donate / Support Us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Ek baar, ya har mahine —
                <span className="text-rose-600"> dono chalte hain. 🙏</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.10)]">
              {/* Widget header */}
              <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-white to-amber-50 px-6 py-6 sm:flex-row sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30">
                    <Heart size={20} className="fill-white text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      UnivGeeks ko support karo
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      Free padhai ko free rakhne me madad karo
                    </p>
                  </div>
                </div>

                {/* Cycle toggle */}
                <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
                  {(
                    [
                      { key: "once", label: "Ek baar" },
                      { key: "monthly", label: "Har mahine" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setCycle(opt.key)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        cycle === opt.key
                          ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 py-7 sm:px-8">
                {/* Amount presets */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {tiers.map((tier, i) => {
                    const active = selectedIndex === i;
                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedIndex(i);
                          setCustomAmount("");
                          setSubmitted(false);
                        }}
                        className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                          active
                            ? "border-rose-400 bg-rose-50/70 shadow-[0_10px_25px_rgba(244,63,94,0.10)] ring-2 ring-rose-200"
                            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-black text-slate-900">
                            ₹{tier.amount}
                          </span>
                          {active ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white">
                              <Check size={12} />
                            </span>
                          ) : (
                            <Gift size={16} className="text-slate-300" />
                          )}
                        </div>
                        <p className="mt-1 text-xs font-black uppercase tracking-wide text-rose-600">
                          {tier.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                          {tier.funds}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom amount */}
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Apni marzi ka amount</p>
                    <p className="text-xs text-slate-500">
                      Jo aapke budget me ho — ₹10 se bhi chalega. 🙌
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 transition ${
                      isCustom ? "border-rose-400 ring-2 ring-rose-100" : "border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-black text-slate-400">₹</span>
                    <input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      placeholder="Amount"
                      value={customAmount}
                      onFocus={() => {
                        setSelectedIndex(-1);
                        setSubmitted(false);
                      }}
                      onChange={(e) => {
                        setSelectedIndex(-1);
                        setCustomAmount(e.target.value);
                        setSubmitted(false);
                      }}
                      className="w-28 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Total + CTA */}
                <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 px-5 py-4 sm:flex-row">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Total {cycle === "monthly" ? "(har mahine)" : "(ek baar)"}
                    </p>
                    <p className="text-2xl font-black text-white">
                      ₹{selectedAmount}
                      {cycle === "monthly" && (
                        <span className="text-sm font-bold text-slate-400"> /month</span>
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    disabled={selectedAmount <= 0}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-rose-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/35 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    <span>Donate karo</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Honest next-step panel */}
                {submitted && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-black text-emerald-900">
                          Bohot shukriya! 💚 — ₹{selectedAmount}{" "}
                          {cycle === "monthly" ? "har mahine" : "ka contribution"}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                          Payment gateway abhi live nahi hai. Tab tak Instagram par DM kar do
                          ya contact form bhar do — hum aapko UPI / payment link turant bhej denge.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="https://www.instagram.com/univ_geeks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
                          >
                            <InstagramIcon size={13} />
                            Instagram DM
                          </a>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-50"
                          >
                            Contact form
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-[11px] font-medium text-slate-400">
                  100% of your contribution goes into running UnivGeeks. Koi salary, koi profit nahi — sirf students. 💙
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================================
          5. FREE WAYS TO HELP
      ================================================= */}
      <section className="relative overflow-hidden border-y border-amber-100/70 bg-gradient-to-b from-[#f8fafc] via-[#fffbf3] to-[#f8fafc] px-6 py-16 sm:py-20 md:px-12 lg:px-20">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 sm:text-sm">
                Paisa nahi hai? Koi baat nahi!
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Free tarike se bhi
                <span className="text-amber-600"> support karo.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Sabse bada donation hota hai — apna knowledge aur reach share karna.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <Share2 size={20} />,
                title: "Share karo",
                text: "Apne school group, juniors aur doston ke saath UnivGeeks share karo.",
                cta: "Notes bhejo →",
                href: "/notes",
              },
              {
                icon: <InstagramIcon size={20} />,
                title: "Follow karo",
                text: "Instagram par updates, quick revision tips aur naye PYQs paate raho.",
                cta: "Instagram →",
                href: "https://www.instagram.com/univ_geeks",
                external: true,
              },
              {
                icon: <YoutubeIcon size={20} />,
                title: "YouTube dekho",
                text: "Concept videos aur exam strategies — sab kuch free me available hai.",
                cta: "YouTube →",
                href: "https://youtube.com/@himanshubhaiya8",
                external: true,
              },
            ].map((card, i) => {
              const external = "external" in card && card.external;
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                    {card.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-black text-slate-900">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {card.text}
                  </p>
                  <p className="mt-4 text-sm font-black text-amber-600">{card.cta}</p>
                </>
              );

              return (
                <Reveal key={card.title} delay={100 * (i + 1)}>
                  {external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="block h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10"
                    >
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          6. FAQ
      ================================================= */}
      <section className="relative px-6 py-16 sm:py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
                Sawal jawab
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Aapke mann ke
                <span className="text-blue-600"> sawal. 💬</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={80 * i}>
                <details className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-blue-300 open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 sm:text-base">
                    <span>{faq.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          7. THANK YOU CTA
      ================================================= */}
      <section className="relative px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 p-8 text-center text-white shadow-2xl sm:p-14">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-300/25 blur-2xl" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-bold backdrop-blur-md">
                  <Heart size={13} className="fill-white text-white" />
                  Dhanyavaad 🙏
                </span>

                <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                  Padhai free rahe — yehi sabse bada mission hai.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-base">
                  Chahe ₹10 ho ya ₹1000 — har contribution ek student ke exam confidence
                  ko strong banata hai.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="#donate"
                    className="rounded-2xl bg-white px-8 py-4 font-black text-rose-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Donate karo ❤️
                  </a>

                  <Link
                    href="/pyqs"
                    className="rounded-2xl border border-white/30 bg-white/15 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25"
                  >
                    Free PYQs dekho →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
