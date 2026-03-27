export interface Job {
  id: string;
  title: string;
  company_name: string;
  url: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

export async function fetchRemoteJobs(search: string = "", limit: number = 20): Promise<Job[]> {
  // Using Remotive public API for remote jobs (No API Key required)
  const query = search ? `search=${encodeURIComponent(search)}` : "category=software-dev";
  const limitQuery = `limit=${limit}`;
  const res = await fetch(`https://remotive.com/api/remote-jobs?${query}&${limitQuery}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();
  
  return data.jobs || [];
}
