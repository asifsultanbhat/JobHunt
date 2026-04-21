"use client";

import { useState, useEffect } from "react";
import type { Job } from "@/lib/jobs";
import { Search, UploadCloud, Loader2, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ApplyWithPdfButton from "./ApplyWithPdfButton";
import { useRouter } from "next/navigation";

export default function JobsClientWrapper({ 
  initialJobs, 
  defaultQuery, 
  defaultLocation,
  userId 
}: { 
  initialJobs: Job[], 
  defaultQuery: string, 
  defaultLocation: string,
  userId: string | null 
}) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const [isStandardSearching, setIsStandardSearching] = useState(false);
  
  const [errorText, setErrorText] = useState("");
  const [queryUsed, setQueryUsed] = useState("");

  // Sync state if server props change after router.push
  useEffect(() => {
    if (!isDeepSearching) {
      setJobs(initialJobs);
      setIsStandardSearching(false);
    }
  }, [initialJobs, isDeepSearching]);

  const handleStandardSearch = () => {
    setIsStandardSearching(true);
    setQueryUsed(""); // Clear AI query readout
    
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("loc", location.trim());
    
    router.push(`/jobs?${params.toString()}`);
  };

  const handleDeepSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsDeepSearching(true);
    setErrorText("");
    setQueryUsed("");
    
    const formData = new FormData();
    formData.append("resume", file);
    // Combine query and location for the AI's context
    const combinedKeywords = [query, location].filter(Boolean).join(" ");
    formData.append("keywords", combinedKeywords);

    try {
      const res = await fetch("/api/deep-search", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed context search");
      
      setJobs(data.jobs || []);
      setQueryUsed(data.queryUsed);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message);
    } finally {
      setIsDeepSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient pb-1">Find your next job</h1>
          <p className="text-gray-600 font-medium mt-1">Search thousands of jobs tailored to your skills.</p>
        </div>

        {/* New Makeover Search Bar Component */}
        <div className="mt-4 glass-panel p-2 rounded-3xl flex flex-col md:flex-row gap-2 transition-shadow focus-within:ring-2 focus-within:ring-violet-300">
          
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-indigo-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e)=> setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStandardSearch()}
              placeholder="Job title, keywords, or company"
              className="w-full pl-11 pr-4 py-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-lg"
            />
          </div>
          
          <div className="hidden md:block w-px bg-gray-200 my-2" />
          
          <div className="relative flex-1 flex items-center border-t md:border-t-0 border-gray-100">
            <MapPin className="absolute left-4 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={location}
              onChange={(e)=> setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStandardSearch()}
              placeholder="City, state, or 'Remote'"
              className="w-full pl-11 pr-4 py-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-lg"
            />
          </div>

          <button 
            onClick={handleStandardSearch}
            disabled={isStandardSearching}
            className="flex items-center justify-center bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all disabled:opacity-70 text-lg shadow-lg hover:shadow-violet-500/30"
          >
            {isStandardSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
          </button>
        </div>

        {/* Preserved AI Deep Search Option */}
        <div className="flex justify-start md:justify-end px-2">
          <label className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-bold transition-colors group">
             <div className="bg-indigo-100/50 p-1.5 rounded-lg group-hover:bg-indigo-200/50 transition-colors shadow-sm">
               <UploadCloud className="w-4 h-4" />
             </div>
             Or auto-search by uploading your Resume
             <input type="file" accept="application/pdf" className="hidden" onChange={handleDeepSearch} />
          </label>
        </div>
      </div>

      {/* States */}
      {isDeepSearching && (
        <div className="flex flex-col items-center justify-center py-16 text-indigo-600 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <span className="font-semibold text-lg text-indigo-900">Scanning Your Resume...</span>
          <span className="text-sm text-indigo-700/70">Our AI is mapping your skills to live jobs across the internet.</span>
        </div>
      )}

      {errorText && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
          {errorText}
        </div>
      )}

      {queryUsed && !isDeepSearching && (
        <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-indigo-900 block mb-1">✨ AI Deep Search Complete</span>
            We searched the web using your resume profile matching: <strong className="bg-white/60 px-2 py-0.5 rounded border border-indigo-200/50">&quot;{queryUsed}&quot;</strong>
          </div>
        </div>
      )}

      {!isDeepSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
          {jobs.map((job: Job) => (
            <div key={job.id} className="glass-panel p-6 rounded-3xl hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <h3 className="font-bold text-xl line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-500 transition-colors" dangerouslySetInnerHTML={{ __html: job.title }} />
              <p className="text-gray-600 font-bold text-sm mt-2">{job.company_name}</p>
              
              <div className="mt-5 flex flex-wrap gap-2 flex-1">
                {job.candidate_required_location && (
                  <span className="bg-white/60 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-100/50 shadow-sm">
                    🌍 {job.candidate_required_location}
                  </span>
                )}
                {job.salary && (
                  <span className="bg-white/60 text-pink-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-pink-100/50 shadow-sm">
                    💰 {job.salary}
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between pt-5 border-t border-gray-200/50">
                <span className="text-xs text-gray-500 font-bold">
                  {job.publication_date ? formatDistanceToNow(new Date(job.publication_date), { addSuffix: true }) : 'Just now'}
                </span>
                <div className="flex gap-2">
                  <ApplyWithPdfButton job={job} />
                  {userId && (
                    <button className="px-4 py-1.5 bg-white/50 hover:bg-white text-indigo-900 border border-indigo-100 text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md">
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {jobs.length === 0 && !isDeepSearching && !isStandardSearching && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <Search className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No jobs found</h3>
          <p>Try adjusting your search keywords or location.</p>
        </div>
      )}
    </div>
  );
}
