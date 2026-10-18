
"use client";

import { useEffect } from "react";

type Class11PopupProps = {
  onClose: () => void;
  youtubeUrl: string;
  instagramUrl: string;
};

export default function Class11Popup({
  onClose,
  youtubeUrl,
  instagramUrl,
}: Class11PopupProps) {
  useEffect(() => {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/90 p-2 backdrop-blur-md sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="RBSE Class 11 Coming Soon"
        className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "1279 / 1170",
          maxHeight: "94dvh",
        }}
      >
        {/* Exact reference artwork */}
        <img
          src="/class-11-popup.png"
          alt="RBSE Class 11 Coming Soon — UnivGeeks"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-fill"
        />

        {/* Invisible clickable area over the close icon */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute z-10 rounded-full"
          style={{
            left: "91.5%",
            top: "8.5%",
            width: "7.5%",
            height: "7.5%",
          }}
        />

        {/* Invisible clickable area over Subscribe on YouTube */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Subscribe on YouTube"
          className="absolute z-10 rounded-xl"
          style={{
            left: "6%",
            top: "79.5%",
            width: "43%",
            height: "9.5%",
          }}
        />

        {/* Invisible clickable area over Follow on Instagram */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="absolute z-10 rounded-xl"
          style={{
            left: "51%",
            top: "79.5%",
            width: "43%",
            height: "9.5%",
          }}
        />
      </div>
    </div>
  );
}


