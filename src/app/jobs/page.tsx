import { fetchRemoteJobs, type Job } from "@/lib/jobs";
import { auth } from "@clerk/nextjs/server";
import JobsClientWrapper from "./JobsClientWrapper";

export default async function JobsPage({ searchParams }: { searchParams: { q?: string, loc?: string } }) {
  const { userId } = await auth();
  const query = searchParams.q || "";
  const location = searchParams.loc || "";
  
  let jobs: Job[] = [];
  try {
    const combinedSearch = [query, location].filter(Boolean).join(" ");
    jobs = await fetchRemoteJobs(combinedSearch || "technical support", 30);
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
  }

  return <JobsClientWrapper initialJobs={jobs} defaultQuery={query} defaultLocation={location} userId={userId} />;
}
