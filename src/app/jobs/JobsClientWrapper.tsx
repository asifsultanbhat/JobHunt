"use client";

import { useState } from "react";
import type { Job } from "@/lib/jobs";
import { Search, UploadCloud, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ApplyWithPdfButton from "./ApplyWithPdfButton";

export default function JobsClientWrapper({ initialJobs, defaultQuery, userId }: { initialJobs: Job[], defaultQuery: string, userId: string | null }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [query, setQuery] = useState(defaultQuery);
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [queryUsed, setQueryUsed] = useState("");

  const handleDeepSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsDeepSearching(true);
    setErrorText("");
    setQueryUsed("");
    
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("keywords", query);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Search Remote Jobs</h1>
          <p className="text-gray-500">Discover roles matching your profile.</p>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e)=> setQuery(e.target.value)}
              placeholder="Filter by keywords (e.g. Remote)"
              className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <input 
              type="file" 
              accept="application/pdf"
              onChange={handleDeepSearch}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Upload resume for Deep Search"
            />
            <button className="flex items-center justify-center w-full md:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              <UploadCloud className="w-4 h-4" />
              Deep Search (Resume)
            </button>
          </div>
        </div>
      </div>

      {isDeepSearching && (
        <div className="flex flex-col items-center justify-center py-16 text-indigo-600 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <span className="font-semibold text-lg text-indigo-900">Scanning Your Resume...</span>
          <span className="text-sm text-indigo-700/70">Our AI is fetching perfect matches across the entire internet.</span>
        </div>
      )}

      {errorText && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm font-medium border border-red-100">
          {errorText}
        </div>
      )}

      {queryUsed && !isDeepSearching && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-100 flex items-center justify-between">
          <div>
            <span className="font-semibold text-green-900 block mb-1">Deep Search Completed</span>
            The AI determined the optimal search parameter for your resume was: <strong className="bg-white px-2 py-0.5 rounded text-green-800 border-green-200">"{queryUsed}"</strong>
          </div>
        </div>
      )}

      {!isDeepSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: Job) => (
            <div key={job.id} className="bg-white p-5 border rounded-xl hover:shadow-md transition-shadow flex flex-col">
              <h3 className="font-semibold text-lg line-clamp-2 leading-tight" dangerouslySetInnerHTML={{ __html: job.title }} />
              <p className="text-blue-600 font-medium text-sm mt-1">{job.company_name}</p>
              
              <div className="mt-4 flex flex-wrap gap-2 flex-1">
                {job.candidate_required_location && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                    🌍 {job.candidate_required_location}
                  </span>
                )}
                {job.salary && (
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
                    💰 {job.salary}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 font-medium">
                  {job.publication_date ? formatDistanceToNow(new Date(job.publication_date), { addSuffix: true }) : 'Just now'}
                </span>
                <div className="flex gap-2">
                  <ApplyWithPdfButton job={job} />
                  {userId && (
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-md text-white transition-colors">
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {jobs.length === 0 && !isDeepSearching && (
        <div className="text-center py-16 text-gray-500 border border-dashed rounded-xl">
          No jobs found. Try adjusting your keywords or uploading a new resume.
        </div>
      )}
    </div>
  );
}
