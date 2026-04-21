"use client";

import { useState } from "react";
import { generateCoverLetter } from "@/lib/gemini";
import type { Job } from "@/lib/jobs";

const downloadPdf = async (jobTitle: string, companyName: string, coverLetterText: string) => {
  const { pdf } = await import("@react-pdf/renderer");
  const { JobApplicationPdf } = await import("@/components/JobApplicationPdf");
  
  // Strip HTML from title if present
  const cleanTitle = jobTitle.replace(/<[^>]*>?/gm, '');

  const blob = await pdf(<JobApplicationPdf jobTitle={cleanTitle} companyName={companyName} coverLetterText={coverLetterText} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function ApplyWithPdfButton({ job }: { job: Job }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleApply = async () => {
    setIsGenerating(true);
    try {
      // 1. Generate text using Server Action
      const text = await generateCoverLetter(job);
      
      // 2. Generate and download PDF purely on client-side
      await downloadPdf(job.title, job.company_name, text);
      
      // 3. Open actual application link
      window.open(job.url, "_blank");
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. We will still redirect you to the application.");
      window.open(job.url, "_blank");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleApply}
      disabled={isGenerating}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        isGenerating 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
          : "bg-black hover:bg-gray-800 text-white shadow-sm"
      }`}
    >
      {isGenerating ? "Cooking PDF..." : "Apply & Get PDF"}
    </button>
  );
}
