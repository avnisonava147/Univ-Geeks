"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import SubscribePopup from "../../components/SubscribePopup";
/*
  Posters are 941x1672 (portrait), so the poster area uses aspect-[941/1672]
  and the whole poster shows without cropping.
  Set available: true when a class goes live.
*/
const classes = [
   {
    id: "9",
    title: "Class 9",
    note: "Build strong foundations with previous year papers.",
    banner: "/class-9-banner.png",
    href: "/pyqs/class-9",
    c1: "#38bdf8",
    c2: "#2563eb",
    available: false,
  },
  {
    id: "10",
    title: "Class 10",
    note: "Build strong foundations with previous year papers.",
    banner: "/class-10-banner.png",
    href: "/pyqs/class-10",
    c1: "#38bdf8",
    c2: "#2563eb",
    available: true,
  },
  {
    id: "11",
    title: "Class 11",
    note: "Practice important questions and strengthen concepts.",
    banner: "/class-11-banner.png",
    href: "/pyqs/class-11",
    c1: "#22d3ee",
    c2: "#0e7490",
    available: false,
  },
  {
    id: "12",
    title: "Class 12",
    note: "Explore subject-wise previous year question papers.",
    banner: "/class-12-banner.png",
    href: "/pyqs/class-12",
    c1: "#a78bfa",
    c2: "#4f46e5",
    available: true,
  },


];

const subjects = ["Science", "Mathematics", "Social Science", "English", "Physics", "Chemistry", "Biology"];

function PosterCard({ item, index }: { item: (typeof classes)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
    ref.current.style.setProperty("--px", `${x - 0.5}`);
    ref.current.style.setProperty("--py", `${y - 0.5}`);
    ref.current.style.transform = `rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-8px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  /* Ripple where the card is clicked */
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = ref.current?.querySelector(".ug-inner") as HTMLElement | null;
    if (!inner || !item.available) return;
    const r = inner.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "ug-ripple";
    dot.style.left = `${e.clientX - r.left}px`;
    dot.style.top = `${e.clientY - r.top}px`;
    inner.appendChild(dot);
    setTimeout(() => dot.remove(), 750);
  };

  const card = (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      className={`ug-wrap ${item.available ? "open" : "soon"} h-full`}
      style={{ ["--c1" as string]: item.c1, ["--c2" as string]: item.c2 }}
    >
      <div className="ug-inner flex h-full flex-col">
        {/* Poster */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          {/* Fallback number, only visible if the poster file is missing */}
          <span className="ug-num absolute inset-0 flex items-center justify-center text-[8rem] font-black opacity-30">
            {item.id}
          </span>

          <Image
            src={item.banner}
            alt={`${item.title} poster`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`ug-poster object-cover ${item.available ? "" : "saturate-50"}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Dim for coming soon */}
          {!item.available && <div className="absolute inset-0 bg-[#070d2b]/45" />}
          <div className="ug-sweep" aria-hidden="true" />

          {/* Status badge */}
          <div className="absolute left-4 top-4">
            {item.available ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/40 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open now
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-slate-200 ring-1 ring-white/20 backdrop-blur">
                <span aria-hidden="true">🔒</span> Coming soon
              </span>
            )}
          </div>

          <h3 className="sr-only">{item.title}</h3>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-6 pt-5">
          <p className="flex-1 text-sm leading-6 text-slate-400">{item.note}</p>

          {item.available ? (
            <div
              className="ug-shine relative mt-5 flex items-center justify-center overflow-hidden rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(90deg, ${item.c1}, ${item.c2})` }}
            >
              Explore PYQs
              <span className="ml-2 transition group-hover:translate-x-1.5">→</span>
            </div>
          ) : (
            <div className="mt-5 flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 px-5 py-3.5 text-sm font-bold">
              <span className="ug-shimmer">Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="ug-rise" style={{ animationDelay: `${0.8 + index * 0.18}s` }}>
      {item.available ? (
        <Link
          href={item.href}
          className="ug-bob group block h-full rounded-[28px] focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-400"
          style={{ animationDelay: `${index * -1.3}s` }}
        >
          {card}
        </Link>
      ) : (
        <div aria-disabled="true" className="ug-bob h-full cursor-not-allowed" style={{ animationDelay: `${index * -1.3}s` }}>
          {card}
        </div>
      )}
    </div>
  );
}

export default function ClassesPage() {
  const glow = useRef<HTMLDivElement>(null);

  /* Soft light that follows the cursor across the page */
  useEffect(() => {
    const move = (e: PointerEvent) => {
      glow.current?.style.setProperty("--cx", `${e.clientX}px`);
      glow.current?.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <main className="min-h-screen bg-[#070d2b] text-white">
      <div ref={glow} className="ug-cursor" aria-hidden="true" />
      <style>{`
        @property --a{syntax:"<angle>";initial-value:0deg;inherits:false}
        .ug-bg{background-image:linear-gradient(rgba(120,150,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,255,.07) 1px,transparent 1px);background-size:36px 36px}
        .ug-rise{opacity:0;transform:translateY(40px);animation:ug-up .8s forwards;perspective:1000px}
        @keyframes ug-up{to{opacity:1;transform:none}}
        .ug-wrap{position:relative;border-radius:28px;padding:2px;transform-style:preserve-3d;transition:transform .25s ease,box-shadow .3s ease}
        .ug-wrap::before{content:"";position:absolute;inset:0;border-radius:inherit;background:conic-gradient(from var(--a),transparent 0 50%,var(--c1),var(--c2),transparent);animation:ug-rot 4s linear infinite}
        .ug-wrap.soon::before{opacity:.4;animation-duration:12s}
        @keyframes ug-rot{to{--a:360deg}}
        .ug-wrap:hover{box-shadow:0 40px 90px -35px var(--c1)}
        .ug-inner{position:relative;border-radius:26px;background:#0b1236;overflow:hidden}
        .ug-inner::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(320px circle at var(--mx,50%) var(--my,0%),rgba(255,255,255,.09),transparent 70%)}
        .ug-wrap:hover .ug-inner::after{opacity:1}
        .ug-num{background:linear-gradient(180deg,var(--c1),var(--c2));-webkit-background-clip:text;background-clip:text;color:transparent}
        .ug-poster{transition:transform .35s ease-out}
        .ug-wrap:hover .ug-poster{transform:translate(calc(var(--px,0)*-16px),calc(var(--py,0)*-16px)) scale(1.1)}
        .ug-sweep{position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);transform:translateX(-130%)}
        .ug-wrap:hover .ug-sweep{transition:transform .9s ease;transform:translateX(130%)}
        .ug-wrap.open .ug-sweep{animation:ug-sheen 5s 2.4s infinite}
        .ug-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%);transform:translateX(-120%);animation:ug-sheen 3s 2.6s infinite}
        @keyframes ug-sheen{40%,100%{transform:translateX(130%)}}
        .ug-shimmer{background:linear-gradient(90deg,#64748b 30%,#e2e8f0 50%,#64748b 70%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ug-sweep 2.6s linear infinite}
        @keyframes ug-sweep{to{background-position:-200% 0}}
        .ug-ghost{-webkit-text-stroke:2px rgba(255,255,255,.1);color:transparent;animation:ug-drift 14s ease-in-out infinite alternate}
        @keyframes ug-drift{to{transform:translateX(-40px)}}
        .ug-aurora{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5;pointer-events:none;animation:ug-aur 16s ease-in-out infinite alternate}
        .ug-a1{width:420px;height:420px;left:-120px;top:-60px;background:#2563eb}
        .ug-a2{width:380px;height:380px;right:-100px;top:120px;background:#7c3aed;animation-delay:-6s}
        .ug-a3{width:320px;height:320px;left:40%;top:380px;background:#06b6d4;opacity:.3;animation-delay:-10s}
        @keyframes ug-aur{to{transform:translate(60px,40px) scale(1.2)}}
        .ug-dot{position:absolute;bottom:-10px;width:var(--s);height:var(--s);border-radius:50%;background:#bae6fd;opacity:0;animation:ug-dotrise var(--d) linear infinite;animation-delay:var(--l)}
        @keyframes ug-dotrise{0%{transform:translateY(0);opacity:0}10%{opacity:.85}90%{opacity:.6}100%{transform:translateY(-440px);opacity:0}}
        .ug-cursor{position:fixed;left:0;top:0;width:480px;height:480px;margin:-240px 0 0 -240px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(99,140,255,.22),transparent 65%);transform:translate(var(--cx,50vw),var(--cy,30vh));transition:transform .15s ease-out}
        .ug-marquee{overflow:hidden;border-block:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
        .ug-track{display:flex;width:max-content;animation:ug-marq 30s linear infinite}
        .ug-marquee:hover .ug-track{animation-play-state:paused}
        @keyframes ug-marq{to{transform:translateX(-50%)}}
        .ug-bob{animation:ug-bobt 6s ease-in-out infinite}
        .ug-bob:hover{animation-play-state:paused}
        @keyframes ug-bobt{50%{translate:0 -10px}}
        .ug-ripple{position:absolute;border-radius:50%;pointer-events:none;background:rgba(255,255,255,.5);width:20px;height:20px;margin:-10px;animation:ug-rip .7s ease-out forwards;z-index:5}
        @keyframes ug-rip{to{transform:scale(28);opacity:0}}
        @media (prefers-reduced-motion:reduce){
          .ug-rise{animation:none;opacity:1;transform:none}
          .ug-wrap::before,.ug-wrap.open .ug-sweep,.ug-shine::after,.ug-shimmer,.ug-ghost{animation:none}
          .ug-wrap,.ug-poster{transition:none}
          .ug-aurora,.ug-dot,.ug-track,.ug-bob{animation:none}
          .ug-cursor{display:none}
        }
      `}</style>

      <Navbar />

      <div className="ug-bg relative overflow-hidden">
        <div className="ug-aurora ug-a1" aria-hidden="true" />
        <div className="ug-aurora ug-a2" aria-hidden="true" />
        <div className="ug-aurora ug-a3" aria-hidden="true" />

        {/* Top area: floating dots and the big PYQ outline */}
       <section className="relative h-8 sm:h-10">
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="ug-dot"
                style={{
                  left: `${(i * 53) % 100}%`,
                  ["--s" as string]: `${2 + (i % 3)}px`,
                  ["--d" as string]: `${9 + (i % 5) * 2}s`,
                  ["--l" as string]: `${-i * 1.7}s`,
                }}
              />
            ))}
          </div>

          <span
            aria-hidden="true"
            className="ug-ghost pointer-events-none absolute -right-10 top-2 select-none text-[16rem] font-black leading-none sm:text-[22rem]"
          >
            PYQ
          </span>
        </section>

        {/* Subjects strip */}
        <div
          className="ug-marquee relative z-10 mt-0 mb-4 py-1 sm:py-2"
          aria-hidden="true"
          style={{
            background: "rgba(7, 13, 43, 0.88)",
            borderColor: "rgba(255, 255, 255, 0.12)",
          }}
        >
          <div className="ug-track">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {subjects.map((name) => (
                  <span
                    key={name + k}
                    className="flex items-center text-lg font-bold text-blue-200/80"
                  >
                    <span className="px-8">{name}</span>
                    <span className="text-cyan-300/70">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
                {/* Class Posters */}
       <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-5 pb-12 pt-3 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {classes.map((item, index) => (
            <PosterCard key={item.id} item={item} index={index} />
          ))}
        </section>
        </div>
    </main>
  
);
}






