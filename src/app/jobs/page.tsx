import { fetchRemoteJobs, type Job } from "@/lib/jobs";
import { Search } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { auth } from "@clerk/nextjs/server";

export default async function JobsPage({ searchParams }: { searchParams: { q?: string } }) {
  const { userId } = await auth();
  const query = searchParams.q || "technical support";
  
  let jobs: Job[] = [];
  try {
    jobs = await fetchRemoteJobs(query, 30);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Search Remote Jobs</h1>
          <p className="text-gray-500">Discover roles matching your profile.</p>
        </div>

        <form className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            name="q" 
            defaultValue={query}
            placeholder="e.g., Technical Support, Customer Success"
            className="w-full md:w-80 pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: Job) => (
          <div key={job.id} className="bg-white p-5 border rounded-xl hover:shadow-md transition-shadow flex flex-col">
            <h3 className="font-semibold text-lg line-clamp-2" dangerouslySetInnerHTML={{ __html: job.title }} />
            <p className="text-blue-600 font-medium text-sm mt-1">{job.company_name}</p>
            
            <div className="mt-4 flex flex-wrap gap-2 flex-1">
              {job.candidate_required_location && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                  🌍 {job.candidate_required_location}
                </span>
              )}
              {job.salary && (
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                  💰 {job.salary}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(job.publication_date), { addSuffix: true })}
              </span>
              <div className="flex gap-2">
                <Link 
                  href={job.url} 
                  target="_blank"
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border text-sm font-medium rounded-md text-gray-700 transition-colors"
                >
                  View
                </Link>
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

      {jobs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No jobs found for &quot;{query}&quot;. Try a different search term.
        </div>
      )}
    </div>
  );
}
