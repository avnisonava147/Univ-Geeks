"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImportantPDFs from "@/components/ImportantPDFs";

export default function ImportantPDFsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Important PDFs & Notice Board Section */}
      <div className="flex-1 py-6 sm:py-10">
        <ImportantPDFs />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}