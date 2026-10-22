"use client";

import { useEffect, useState } from "react";
import { Eye, Download } from "lucide-react";
import SubjectsPopup from "./SubscribePopup";
import { resolvePdfUrl } from "@/app/_lib/apiConfig";

type PaperActionsProps = {
  title: string;
  pdfUrl: string;
};

type PdfAction = "view" | "download" | null;
const POPUP_STORAGE_KEY = (title: string) =>
  `univgeeks-subscribe-popup-seen-${title}`;

export default function PaperActions({
  title,
  pdfUrl,
}: PaperActionsProps) {
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [pendingPdfAction, setPendingPdfAction] =
    useState<PdfAction>(null);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [isPreferenceLoaded, setIsPreferenceLoaded] = useState(false);

  const resolvedUrl = resolvePdfUrl(pdfUrl);
  const hasFile = Boolean(resolvedUrl);

  useEffect(() => {
    const seen =
  window.localStorage.getItem(POPUP_STORAGE_KEY(title)) === "true";

    setHasSeenPopup(seen);
    setIsPreferenceLoaded(true);
  }, []);

  const performPdfAction = (action: PdfAction) => {
    const fileUrl = resolvePdfUrl(pdfUrl);

    if (!fileUrl) {
      window.alert(`${title} PDF will be available soon.`);
      return;
    }

    if (action === "view") {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (action === "download") {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const closePopup = () => {
    setShowSubscribePopup(false);
    setPendingPdfAction(null);

    setHasSeenPopup(true);
    window.localStorage.setItem(POPUP_STORAGE_KEY(title), "true");
  };

  const handleContinue = () => {
    const action = pendingPdfAction;

    closePopup();
    performPdfAction(action);
  };

  const openPopup = (action: Exclude<PdfAction, null>) => {
    if (!isPreferenceLoaded) return;

    if (hasSeenPopup) {
      performPdfAction(action);
      return;
    }

    setPendingPdfAction(action);
    setShowSubscribePopup(true);
  };

  return (
    <>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => openPopup("view")}
          disabled={!isPreferenceLoaded}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-wait disabled:opacity-70"
        >
          <Eye size={18} />
          View Paper
        </button>

        {hasFile && (
          <button
            type="button"
            onClick={() => openPopup("download")}
            disabled={!isPreferenceLoaded}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-bold text-blue-600 transition hover:bg-blue-50 disabled:cursor-wait disabled:opacity-70"
          >
            <Download size={18} />
            Download
          </button>
        )}
      </div>

      {showSubscribePopup && (
        <SubjectsPopup
          onClose={closePopup}
          onContinue={handleContinue}
          youtubeUrl="https://www.youtube.com/@Himanshubhaiya8"
          instagramUrl="https://www.instagram.com/univ_geeks?igsh=MmRxYTN5ZTE2N2J2"
        />
      )}
    </>
  );
}