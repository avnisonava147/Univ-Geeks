// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { createPortal } from "react-dom";
// export default function ThreeCanvas() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [hasWebGL, setHasWebGL] = useState(true);
// const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // Check WebGL availability
//     try {
//       const canvas = document.createElement("canvas");
//       const gl =
//         canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
//       if (!gl) {
//         setTimeout(() => setHasWebGL(false), 0);
//         return;
//       }
//     } catch {
//       setTimeout(() => setHasWebGL(false), 0);
//       return;
//     }

//     // Three.js Scene Setup
//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(
//       60,
//       container.clientWidth / container.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 28;

//     let renderer: THREE.WebGLRenderer;
//     try {
//       renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         antialias: true,
//         powerPreference: "high-performance",
//       });
//     } catch {
//       setTimeout(() => setHasWebGL(false), 0);
//       return;
//     }

//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
//     container.appendChild(renderer.domElement);

//     // Mouse tracking with smooth damping (lerp)
//     let mouseX = 0;
//     let mouseY = 0;
//     let targetX = 0;
//     let targetY = 0;

//     const handleMouseMove = (event: MouseEvent) => {
//       const { innerWidth, innerHeight } = window;
//       targetX = (event.clientX / innerWidth - 0.5) * 2;
//       targetY = (event.clientY / innerHeight - 0.5) * 2;
//     };

//     window.addEventListener("mousemove", handleMouseMove, { passive: true });

//     // 1. Constellation Particle Cloud
//     const particleCount = 450;
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);

//     const color1 = new THREE.Color("#38bdf8"); // Cyan
//     const color2 = new THREE.Color("#818cf8"); // Indigo
//     const color3 = new THREE.Color("#fbbf24"); // Amber accent

//     for (let i = 0; i < particleCount; i++) {
//       const i3 = i * 3;
//       positions[i3] = (Math.random() - 0.5) * 60;
//       positions[i3 + 1] = (Math.random() - 0.5) * 45;
//       positions[i3 + 2] = (Math.random() - 0.5) * 35;

//       const mixedColor =
//         i % 4 === 0 ? color3 : i % 2 === 0 ? color1 : color2;
//       colors[i3] = mixedColor.r;
//       colors[i3 + 1] = mixedColor.g;
//       colors[i3 + 2] = mixedColor.b;
//     }

//     const particlesGeometry = new THREE.BufferGeometry();
//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(positions, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colors, 3)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.28,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.75,
//       blending: THREE.AdditiveBlending,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     scene.add(particlesMesh);

//     // 2. Central Mathematical Torus Knot (Science / Geometry representation)
//     const torusGeometry = new THREE.TorusKnotGeometry(7, 1.8, 120, 16, 2, 3);
//     const torusMaterial = new THREE.MeshBasicMaterial({
//       color: 0x38bdf8,
//       wireframe: true,
//       transparent: true,
//       opacity: 0.14,
//     });
//     const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
//     torusKnot.position.set(12, -2, -4);
//     scene.add(torusKnot);

//     // 3. Floating Icosahedron (Physics/Atom node)
//     const icoGeometry = new THREE.IcosahedronGeometry(4.5, 1);
//     const icoMaterial = new THREE.MeshBasicMaterial({
//       color: 0x818cf8,
//       wireframe: true,
//       transparent: true,
//       opacity: 0.2,
//     });
//     const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
//     icosahedron.position.set(-14, 5, -8);
//     scene.add(icosahedron);

//     // 4. Floating Octahedron (Chemistry/Crystal node)
//     const octaGeometry = new THREE.OctahedronGeometry(3.2, 0);
//     const octaMaterial = new THREE.MeshBasicMaterial({
//       color: 0x34d399,
//       wireframe: true,
//       transparent: true,
//       opacity: 0.22,
//     });
//     const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
//     octahedron.position.set(-8, -10, -2);
//     scene.add(octahedron);

//     // Subtle Ambient Light
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//     scene.add(ambientLight);

//     // Animation Loop
//     let animationFrameId: number;
//     const clock = new THREE.Clock();

//     const animate = () => {
//       const elapsedTime = clock.getElapsedTime();

//       // Smooth mouse follow
//       mouseX += (targetX - mouseX) * 0.04;
//       mouseY += (targetY - mouseY) * 0.04;

//       // Rotate objects
//       particlesMesh.rotation.y = elapsedTime * 0.03 + mouseX * 0.25;
//       particlesMesh.rotation.x = elapsedTime * 0.015 - mouseY * 0.2;

//       torusKnot.rotation.x = elapsedTime * 0.12;
//       torusKnot.rotation.y = elapsedTime * 0.18;
//       torusKnot.position.y = -2 + Math.sin(elapsedTime * 0.7) * 0.8;

//       icosahedron.rotation.x = elapsedTime * 0.15;
//       icosahedron.rotation.z = elapsedTime * 0.1;
//       icosahedron.position.y = 5 + Math.cos(elapsedTime * 0.8) * 0.6;

//       octahedron.rotation.y = elapsedTime * 0.2;
//       octahedron.rotation.z = elapsedTime * 0.15;
//       octahedron.position.y = -10 + Math.sin(elapsedTime * 0.9) * 0.5;

//       // Subtle camera tilt
//       camera.position.x = mouseX * 2.5;
//       camera.position.y = -mouseY * 2.5;
//       camera.lookAt(0, 0, 0);

//       renderer.render(scene, camera);
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     // Window Resize Handler
//     const handleResize = () => {
//       if (!container) return;
//       const width = container.clientWidth;
//       const height = container.clientHeight;

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();

//       renderer.setSize(width, height);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup on unmount
//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);

//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//       torusGeometry.dispose();
//       torusMaterial.dispose();
//       icoGeometry.dispose();
//       icoMaterial.dispose();
//       octaGeometry.dispose();
//       octaMaterial.dispose();

//       if (container && renderer.domElement && container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
//     >
//       {!hasWebGL && (
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/60 to-transparent" />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SubscribePopupProps = {
  onClose: () => void;
  onContinue: () => void;
  youtubeUrl: string;
  instagramUrl: string;
};

export default function SubscribePopup({
  onClose,
  onContinue,
  youtubeUrl,
  instagramUrl,
}: SubscribePopupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-title"
        className="relative my-auto w-full max-w-2xl shrink-0 overflow-hidden rounded-3xl border border-blue-400/60 bg-gradient-to-br from-[#071a36] via-[#020817] to-[#10102c] p-5 text-white shadow-[0_0_60px_rgba(0,153,255,0.18)] sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close subscription popup"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white transition hover:bg-white/15 sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="relative z-10">
          <div className="mb-5 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-300 bg-black p-1 shadow-[0_0_28px_rgba(34,211,238,0.55)] sm:h-28 sm:w-28">
              <img
                src="/ug-logo.png"
                alt="UnivGeeks logo"
                className="h-full w-full rounded-full object-contain"
              />
            </div>
          </div>

          <h2
            id="subscribe-title"
            className="text-center text-2xl font-extrabold leading-tight sm:text-4xl"
          >
            Help Us Reach{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              More Students!
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-slate-300 sm:text-base">
            Subscribe to our YouTube channel and follow us on Instagram
            for the latest notes, updates and study tips.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-red-300/70 bg-gradient-to-r from-red-600 to-rose-600 px-4 py-4 shadow-[0_0_22px_rgba(239,68,68,0.22)] transition hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(239,68,68,0.4)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
              <span className="leading-tight">
                <span className="block text-sm">Subscribe on</span>
                <span className="block text-lg font-bold">YouTube ↗</span>
              </span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-fuchsia-300/60 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-500 px-4 py-4 shadow-[0_0_22px_rgba(217,70,239,0.22)] transition hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(217,70,239,0.4)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 shrink-0 fill-none stroke-current"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  className="fill-current stroke-none"
                />
              </svg>
              <span className="leading-tight">
                <span className="block text-sm">Follow us on</span>
                <span className="block text-lg font-bold">Instagram ↗</span>
              </span>
            </a>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-y border-white/10 py-5 sm:grid-cols-4">
            {[
              {
                icon: "▤",
                title: "New Notes",
                detail: "Regularly",
                color: "text-cyan-300",
              },
              {
                icon: "♧",
                title: "Study Tips",
                detail: "& Tricks",
                color: "text-yellow-300",
              },
              {
                icon: "♧",
                title: "Exam Updates",
                detail: "& Alerts",
                color: "text-pink-400",
              },
              {
                icon: "♙",
                title: "Join Learners",
                detail: "Study together",
                color: "text-emerald-300",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className={`mb-2 text-3xl ${item.color}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-blue-400/30 bg-blue-400/[0.07] p-4 text-center">
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              Be a part of our growing{" "}
              <span className="font-bold text-cyan-300">
                learning community ❤️
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-5 w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
          >
            Continue to your notes →
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Your notes are here to help you learn. Thanks for supporting us!
          </p>
        </div>
      </section>
    </div>,
    document.body
  );
}
