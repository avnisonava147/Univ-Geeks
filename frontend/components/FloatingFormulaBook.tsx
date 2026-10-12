"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface FormulaItem {
  id: string;
  formula: string;
  displayFormula: string;
  title: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Science";
  classLevel: string;
  chapter: string;
  keyTerms: { symbol: string; meaning: string }[];
  note: string;
  color: string;
  bgGlow: string;
}

export const formulasData: FormulaItem[] = [
  {
    id: "f-ma",
    formula: "F = m · a",
    displayFormula: "F = ma",
    title: "Newton's Second Law",
    subject: "Physics",
    classLevel: "Class 11 & 12",
    chapter: "Laws of Motion",
    keyTerms: [
      { symbol: "F", meaning: "Net Force (Newtons, N)" },
      { symbol: "m", meaning: "Mass of Body (kg)" },
      { symbol: "a", meaning: "Acceleration (m/s²)" },
    ],
    note: "High-yield RBSE numericals on impulse, force & momentum.",
    color: "#0284c7",
    bgGlow: "rgba(2, 132, 199, 0.25)",
  },
  {
    id: "e-mc2",
    formula: "E = m · c²",
    displayFormula: "E = mc²",
    title: "Mass-Energy Equivalence",
    subject: "Physics",
    classLevel: "Class 12",
    chapter: "Modern Physics & Nuclei",
    keyTerms: [
      { symbol: "E", meaning: "Energy Equivalent (Joules, J)" },
      { symbol: "m", meaning: "Mass Defect (kg)" },
      { symbol: "c", meaning: "Speed of Light (3×10⁸ m/s)" },
    ],
    note: "Standard question in nuclear binding energy derivations.",
    color: "#6366f1",
    bgGlow: "rgba(99, 102, 241, 0.25)",
  },
  {
    id: "v-ir",
    formula: "V = I · R",
    displayFormula: "V = I × R",
    title: "Ohm's Law",
    subject: "Science",
    classLevel: "Class 10 & 12",
    chapter: "Current Electricity",
    keyTerms: [
      { symbol: "V", meaning: "Potential Difference (Volts, V)" },
      { symbol: "I", meaning: "Electric Current (Amperes, A)" },
      { symbol: "R", meaning: "Resistance (Ohms, Ω)" },
    ],
    note: "Core circuit foundation. Repeated every year in Section A/B.",
    color: "#d97706",
    bgGlow: "rgba(217, 119, 6, 0.25)",
  },
  {
    id: "pv-nrt",
    formula: "P · V = n · R · T",
    displayFormula: "PV = nRT",
    title: "Ideal Gas Law",
    subject: "Chemistry",
    classLevel: "Class 11 & 12",
    chapter: "States of Matter & Solutions",
    keyTerms: [
      { symbol: "P", meaning: "Pressure (atm or Pa)" },
      { symbol: "V", meaning: "Volume (Liters or m³)" },
      { symbol: "n", meaning: "Moles of Gas (mol)" },
      { symbol: "R", meaning: "Universal Gas Constant" },
      { symbol: "T", meaning: "Temperature (Kelvin, K)" },
    ],
    note: "Crucial for physical chemistry problems and gas stoichiometry.",
    color: "#059669",
    bgGlow: "rgba(5, 150, 105, 0.25)",
  },
  {
    id: "quadratic",
    formula: "x = (-b ± √(b² - 4ac)) / 2a",
    displayFormula: "x = [-b ± √(b²-4ac)] / 2a",
    title: "Quadratic Formula",
    subject: "Mathematics",
    classLevel: "Class 10 & 11",
    chapter: "Quadratic Equations",
    keyTerms: [
      { symbol: "x", meaning: "Roots of ax² + bx + c = 0" },
      { symbol: "D", meaning: "Discriminant = b² - 4ac" },
      { symbol: "a,b,c", meaning: "Real Coefficients (a ≠ 0)" },
    ],
    note: "Direct 3-mark question for nature of roots and roots finding.",
    color: "#db2777",
    bgGlow: "rgba(219, 39, 119, 0.25)",
  },
  {
    id: "trig-identity",
    formula: "sin²θ + cos²θ = 1",
    displayFormula: "sin²θ + cos²θ = 1",
    title: "Pythagorean Trig Identity",
    subject: "Mathematics",
    classLevel: "Class 10 & 12",
    chapter: "Trigonometry & Calculus",
    keyTerms: [
      { symbol: "θ", meaning: "Angle in degrees/radians" },
      { symbol: "sin θ", meaning: "Opposite / Hypotenuse" },
      { symbol: "cos θ", meaning: "Adjacent / Hypotenuse" },
    ],
    note: "Fundamental identity used in integration & proofs.",
    color: "#2563eb",
    bgGlow: "rgba(37, 99, 235, 0.25)",
  },
  {
    id: "gibbs",
    formula: "ΔG = ΔH - T · ΔS",
    displayFormula: "ΔG = ΔH - TΔS",
    title: "Gibbs Free Energy Equation",
    subject: "Chemistry",
    classLevel: "Class 11 & 12",
    chapter: "Chemical Thermodynamics",
    keyTerms: [
      { symbol: "ΔG", meaning: "Gibbs Free Energy change" },
      { symbol: "ΔH", meaning: "Enthalpy change" },
      { symbol: "T", meaning: "Absolute Temperature (K)" },
      { symbol: "ΔS", meaning: "Entropy change" },
    ],
    note: "Predicts reaction spontaneity: ΔG < 0 is spontaneous.",
    color: "#7c3aed",
    bgGlow: "rgba(124, 58, 237, 0.25)",
  },
  {
    id: "lens-formula",
    formula: "1/f = 1/v - 1/u",
    displayFormula: "1/f = 1/v - 1/u",
    title: "Thin Lens Formula",
    subject: "Physics",
    classLevel: "Class 10 & 12",
    chapter: "Ray Optics & Optical Instruments",
    keyTerms: [
      { symbol: "f", meaning: "Focal Length of Lens (m)" },
      { symbol: "v", meaning: "Image Distance from optical centre" },
      { symbol: "u", meaning: "Object Distance (with sign)" },
    ],
    note: "Ray optics standard question with sign convention.",
    color: "#0d9488",
    bgGlow: "rgba(13, 148, 136, 0.25)",
  },
];

export default function FloatingFormulaBook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const currentFormula = formulasData[currentIndex];

  // Auto-going slideshow timer: smooth and uninteractive by default
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % formulasData.length);
        setIsFlipping(false);
      }, 300);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? formulasData.length - 1 : prev - 1));
      setIsFlipping(false);
    }, 200);
  };

  const handleNext = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % formulasData.length);
      setIsFlipping(false);
    }, 200);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[560px]">
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotateX(10deg) rotateY(-4deg);
          }
          50% {
            transform: translateY(-12px) rotateX(14deg) rotateY(-2deg);
          }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-18px) rotate(180deg); opacity: 0.9; }
          100% { transform: translateY(0px) rotate(360deg); opacity: 0.6; }
        }
        @keyframes shootRight {
          0%   { transform: translateX(-60px) translateY(0px) scaleX(0.3); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateX(340px) translateY(-30px) scaleX(1); opacity: 0; }
        }
        @keyframes shootLeft {
          0%   { transform: translateX(60px) translateY(0px) scaleX(0.3); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateX(-340px) translateY(20px) scaleX(1); opacity: 0; }
        }
        @keyframes shootDiag1 {
          0%   { transform: translate(-40px, 60px) rotate(-35deg) scaleX(0.2); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(280px, -100px) rotate(-35deg) scaleX(1); opacity: 0; }
        }
        @keyframes shootDiag2 {
          0%   { transform: translate(40px, -50px) rotate(25deg) scaleX(0.2); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translate(-260px, 90px) rotate(25deg) scaleX(1); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0.6) rotate(0deg);   opacity: 0.3; }
          50%       { transform: scale(1.3) rotate(180deg); opacity: 1;   }
        }
        @keyframes orbitGlow {
          0%   { transform: rotate(0deg)   translateX(140px) rotate(0deg);   }
          100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        .perspective-container { perspective: 1200px; }
        .floating-book-scene {
          animation: gentleFloat 5.5s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .shoot-line {
          position: absolute;
          height: 3px;
          border-radius: 999px;
          pointer-events: none;
        }
        .shoot-r1 { animation: shootRight 3.0s ease-in-out infinite 0.0s; }
        .shoot-r2 { animation: shootRight 3.8s ease-in-out infinite 1.2s; }
        .shoot-r3 { animation: shootRight 3.4s ease-in-out infinite 2.2s; }
        .shoot-l1 { animation: shootLeft  3.2s ease-in-out infinite 0.6s; }
        .shoot-l2 { animation: shootLeft  4.0s ease-in-out infinite 1.8s; }
        .shoot-d1 { animation: shootDiag1 3.6s ease-in-out infinite 0.4s; }
        .shoot-d2 { animation: shootDiag2 3.5s ease-in-out infinite 1.6s; }
        .sparkle-dot { animation: sparkle 2.2s ease-in-out infinite; }
      `}</style>

      {/* Floating Ambient Glowing Particles */}
      <div className="pointer-events-none absolute -inset-8 z-0 overflow-hidden">
        <span
          className="absolute left-4 top-6 text-lg font-bold text-cyan-500/50"
          style={{ animation: "particleDrift 6s ease-in-out infinite" }}
        >
          F
        </span>
        <span
          className="absolute right-8 top-8 text-xl font-serif text-blue-500/50"
          style={{ animation: "particleDrift 7s ease-in-out infinite 1s" }}
        >
          π
        </span>
        <span
          className="absolute left-8 bottom-10 text-lg font-bold text-indigo-500/50"
          style={{ animation: "particleDrift 8s ease-in-out infinite 2s" }}
        >
          λ
        </span>
        <span
          className="absolute right-6 bottom-12 text-xl font-serif text-amber-500/50"
          style={{ animation: "particleDrift 6.5s ease-in-out infinite 1.5s" }}
        >
          ∫
        </span>
      </div>

      {/* 3D Floating Book Stage */}
      <div className="perspective-container relative w-full pt-2 pb-2 flex items-center justify-center">
        {/* ── FREE ENCHANTED COSMIC PURPLE/CYAN GLOW & SHOOTING LINES ── */}
        <div className="pointer-events-none absolute -inset-16 overflow-visible flex items-center justify-center z-0">

          {/* 1. Free deep purple/violet mystical cosmic aura */}
          <div
            className="absolute h-[420px] w-[560px] rounded-full blur-[70px] transition-all duration-700 animate-pulse"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(139, 92, 246, 0.40) 40%, rgba(56, 189, 248, 0.25) 70%, transparent 90%)",
            }}
          />

          {/* 2. Intense inner enchanted core glow matching current formula or royal purple */}
          <div
            className="absolute h-[260px] w-[380px] rounded-full blur-[40px] transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentFormula.color}99 0%, rgba(168, 85, 247, 0.65) 50%, transparent 80%)`,
            }}
          />

          {/* 3. Outer spread enchanted nebula halo */}
          <div
            className="absolute h-[520px] w-[680px] rounded-full blur-[100px] opacity-60 transition-all duration-700"
            style={{
              background: "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.35) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 75%)",
            }}
          />

          {/* 4. Shooting Star Rays - Right */}
          <div
            className="shoot-line shoot-r1 w-44"
            style={{
              top: "30%",
              left: "-10%",
              height: "3px",
              boxShadow: "0 0 16px #c084fc, 0 0 8px #a855f7",
              background: "linear-gradient(to right, transparent, #c084fc, #ffffff, transparent)",
            }}
          />
          <div
            className="shoot-line shoot-r2 w-32"
            style={{
              top: "65%",
              left: "-5%",
              height: "2.5px",
              boxShadow: "0 0 14px #38bdf8, 0 0 6px #0284c7",
              background: "linear-gradient(to right, transparent, #38bdf8, #ffffff, transparent)",
            }}
          />
          <div
            className="shoot-line shoot-r3 w-36"
            style={{
              top: "18%",
              left: "5%",
              height: "2.5px",
              boxShadow: "0 0 14px #e879f9, 0 0 6px #d946ef",
              background: "linear-gradient(to right, transparent, #e879f9, #ffffff, transparent)",
            }}
          />

          {/* 5. Shooting Star Rays - Left */}
          <div
            className="shoot-line shoot-l1 w-40"
            style={{
              top: "40%",
              right: "-8%",
              height: "3px",
              boxShadow: "0 0 16px #c084fc, 0 0 8px #9333ea",
              background: "linear-gradient(to left, transparent, #c084fc, #ffffff, transparent)",
            }}
          />
          <div
            className="shoot-line shoot-l2 w-28"
            style={{
              top: "72%",
              right: "-4%",
              height: "2.5px",
              boxShadow: "0 0 14px #818cf8, 0 0 6px #4f46e5",
              background: "linear-gradient(to left, transparent, #818cf8, #ffffff, transparent)",
            }}
          />

          {/* 6. Diagonal shooting rays */}
          <div
            className="shoot-line shoot-d1 w-36"
            style={{
              top: "72%",
              left: "10%",
              height: "3px",
              boxShadow: "0 0 16px #a855f7, 0 0 8px #7e22ce",
              background: "linear-gradient(to right, transparent, #a855f7, #ffffff, transparent)",
            }}
          />
          <div
            className="shoot-line shoot-d2 w-32"
            style={{
              top: "12%",
              right: "8%",
              height: "2.5px",
              boxShadow: "0 0 14px #f472b6, 0 0 6px #db2777",
              background: "linear-gradient(to right, transparent, #f472b6, #ffffff, transparent)",
            }}
          />

          {/* 7. Magic Sparkle Stars */}
          <span
            className="sparkle-dot absolute font-black"
            style={{
              top: "10%",
              left: "12%",
              color: "#c084fc",
              textShadow: "0 0 12px #a855f7, 0 0 4px #ffffff",
              fontSize: "16px",
            }}
          >
            ✦
          </span>
          <span
            className="sparkle-dot absolute font-black"
            style={{
              top: "80%",
              right: "10%",
              color: "#38bdf8",
              textShadow: "0 0 12px #38bdf8, 0 0 4px #ffffff",
              fontSize: "14px",
              animationDelay: "0.7s",
            }}
          >
            ✦
          </span>
          <span
            className="sparkle-dot absolute font-black"
            style={{
              top: "22%",
              right: "14%",
              color: "#f472b6",
              textShadow: "0 0 12px #ec4899, 0 0 4px #ffffff",
              fontSize: "15px",
              animationDelay: "1.3s",
            }}
          >
            ✧
          </span>
          <span
            className="sparkle-dot absolute font-black"
            style={{
              top: "88%",
              left: "18%",
              color: "#a855f7",
              textShadow: "0 0 12px #9333ea, 0 0 4px #ffffff",
              fontSize: "13px",
              animationDelay: "1.9s",
            }}
          >
            ✦
          </span>
          <span
            className="sparkle-dot absolute font-black"
            style={{
              top: "48%",
              left: "-2%",
              color: "#c084fc",
              textShadow: "0 0 12px #a855f7, 0 0 4px #ffffff",
              fontSize: "14px",
              animationDelay: "0.5s",
            }}
          >
            ✧
          </span>
        </div>

        {/* The 3D Open Book — FIXED STRICT SIZE */}
        <div className="floating-book-scene relative z-10 w-[520px] max-w-full select-none">
          {/* Hardcover Back Binding (Deep Navy with Gold Accent) */}
          <div
            className="relative rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0b1329] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] ring-1 ring-slate-800"
            style={{
              boxShadow: `0 20px 50px rgba(0,0,0,0.25), 0 0 40px ${currentFormula.color}40`,
            }}
          >
            {/* Center Spine Ridge & Gold Bookmark */}
            <div className="absolute left-1/2 top-0 bottom-0 w-2.5 -translate-x-1/2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 shadow-md z-20 rounded-xs" />

            {/* Bookmark ribbon hanging below */}
            <div className="absolute left-1/2 -bottom-4 h-6 w-3 -translate-x-1/2 bg-amber-500 shadow-md z-20 rounded-b-sm [clip-path:polygon(0%_0%,100%_0%,100%_100%,50%_75%,0%_100%)]" />

            {/* Open Pages Block — FIXED UNCHANGING HEIGHT */}
            <div className="relative z-10 grid grid-cols-2 gap-1 rounded-xl bg-[#faf9f5] border border-amber-900/10 overflow-hidden shadow-inner h-[280px]">
              
              {/* LEFT PAGE: Formula & Subject — FIXED HEIGHT & COMPACT CONTENT */}
              <div
                className={`relative flex flex-col justify-between p-3.5 transition-opacity duration-300 border-r border-slate-300/60 overflow-hidden ${
                  isFlipping ? "opacity-30" : "opacity-100"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #faf8f2 85%, #f4eee2 100%)",
                }}
              >
                <div>
                  {/* Subject & Class Tag */}
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white shadow-xs"
                      style={{ backgroundColor: currentFormula.color }}
                    >
                      {currentFormula.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {currentFormula.classLevel}
                    </span>
                  </div>

                  {/* Chapter Name */}
                  <p className="mt-1 text-[11px] font-semibold text-slate-500 truncate italic">
                    Ch: {currentFormula.chapter}
                  </p>

                  {/* Formula Display Box */}
                  <div
                    className="mt-2 rounded-xl border-2 p-2.5 text-center shadow-xs bg-white"
                    style={{ borderColor: currentFormula.color }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
                      {currentFormula.title}
                    </p>
                    <p
                      className="mt-0.5 text-xl sm:text-2xl font-black font-serif tracking-wide truncate"
                      style={{ color: currentFormula.color }}
                    >
                      {currentFormula.displayFormula}
                    </p>
                  </div>

                  {/* High-Yield Note */}
                  <div className="mt-2 rounded-lg bg-amber-50/90 border border-amber-200/60 px-2 py-1.5">
                    <p className="text-[9px] font-bold text-amber-900">
                      ★ RBSE Weightage:
                    </p>
                    <p className="text-[10px] font-medium leading-snug text-amber-800 line-clamp-2">
                      {currentFormula.note}
                    </p>
                  </div>
                </div>

                {/* Left Page Footer Stamp */}
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-1 text-[9px] text-slate-400 font-semibold">
                  <span>UNIV GEEKS</span>
                  <span>Pg {currentIndex * 2 + 1}</span>
                </div>
              </div>

              {/* RIGHT PAGE: Key Variables & Units — FIXED HEIGHT & COMPACT CONTENT */}
              <div
                className={`relative flex flex-col justify-between p-3.5 transition-opacity duration-300 overflow-hidden ${
                  isFlipping ? "opacity-30" : "opacity-100"
                }`}
                style={{
                  background:
                    "linear-gradient(225deg, #ffffff 0%, #faf8f2 85%, #f4eee2 100%)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                      Variables & Units
                    </h4>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      NCERT
                    </span>
                  </div>

                  {/* Variable Breakdown List — Clean fixed compact spacing */}
                  <div className="mt-1.5 space-y-1">
                    {currentFormula.keyTerms.slice(0, 3).map((term) => (
                      <div
                        key={term.symbol}
                        className="flex items-center gap-1.5 rounded-md bg-white/90 border border-slate-200/70 px-1.5 py-1 shadow-xs"
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded font-serif text-[10px] font-black text-white shrink-0"
                          style={{ backgroundColor: currentFormula.color }}
                        >
                          {term.symbol}
                        </span>
                        <span className="text-[10px] font-medium text-slate-700 leading-tight truncate">
                          {term.meaning}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Exam Tip */}
                  <div className="mt-1.5 rounded-lg bg-blue-50/80 border border-blue-200/60 px-2 py-1">
                    <p className="text-[9px] font-semibold text-blue-900 leading-snug line-clamp-1">
                      ✔ Crucial for numericals & direct scoring.
                    </p>
                  </div>
                </div>

                {/* Right Page Footer */}
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-1 text-[9px] text-slate-400 font-semibold">
                  <span>FORMULA ARCHIVE</span>
                  <span>Pg {currentIndex * 2 + 2}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Formula HUD & Control Bar */}
      <div className="mt-4 w-full rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-md backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-xs shadow-xs"
              style={{ backgroundColor: currentFormula.color }}
            >
              {currentFormula.subject.slice(0, 1)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {currentFormula.title}
                </span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                  {currentFormula.classLevel}
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                {currentFormula.formula}
              </p>
            </div>
          </div>

          {/* Controls: Play/Pause and Next/Prev */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
              title={isPlaying ? "Pause auto slide" : "Play auto slide"}
              aria-label={isPlaying ? "Pause auto slide" : "Play auto slide"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300"
              title="Previous formula"
              aria-label="Previous formula"
            >
              <ChevronLeft size={15} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300"
              title="Next formula"
              aria-label="Next formula"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
          <div className="flex items-center gap-1.5">
            {formulasData.map((f, idx) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-5 bg-cyan-600"
                    : "w-1.5 bg-slate-200 hover:bg-slate-300"
                }`}
                title={`Jump to ${f.title}`}
                aria-label={`Jump to ${f.title}`}
              />
            ))}
          </div>

          <span className="text-[11px] font-medium text-slate-400">
            {currentIndex + 1} of {formulasData.length}
          </span>
        </div>
      </div>
    </div>
  );
}
