import { fetchRemoteJobs, type Job } from "@/lib/jobs";
import { auth } from "@clerk/nextjs/server";
import JobsClientWrapper from "./JobsClientWrapper";

export default async function JobsPage({ searchParams }: { searchParams: { q?: string } }) {
  const { userId } = await auth();
  const query = searchParams.q || "technical support";
  
  let jobs: Job[] = [];
  try {
    jobs = await fetchRemoteJobs(query, 30);
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
  }

  return <JobsClientWrapper initialJobs={jobs} defaultQuery={query} userId={userId} />;
}
