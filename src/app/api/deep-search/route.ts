import { NextRequest, NextResponse } from "next/server";
import { generateOptimalJobSearchQuery } from "@/lib/gemini";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const keywords = (formData.get("keywords") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No resume uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse the PDF text (Handle potential Next.js ES module default export issues)
    const pdfParseFunc = typeof pdf === "function" ? pdf : pdf.default;
    const parsedPdf = await pdfParseFunc(buffer);
    const text = parsedPdf.text;

    // 1. Analyze resume with Gemini
    const searchQuery = await generateOptimalJobSearchQuery(text, keywords);

    // 2. Fetch from JSearch (RapidAPI)
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    if (!rapidApiKey) {
      // Return mocked deeply searched jobs if the user hasn't added their key yet
      return NextResponse.json({
        queryUsed: searchQuery,
        jobs: [
          {
            id: "mock1_deep", 
            title: `Matching Role for: ${searchQuery}`, 
            company_name: "Mock AI Solutions",
            candidate_required_location: "Remote Everywhere", 
            url: "https://example.com/mock-job-1", 
            publication_date: new Date().toISOString(),
            salary: "$120k - $150k"
          },
          {
            id: "mock2_deep", 
            title: `Senior ${searchQuery.split(' ')[0]} Specialist`, 
            company_name: "Global Tech Inc.",
            candidate_required_location: "US/Remote", 
            url: "https://example.com/mock-job-2", 
            publication_date: new Date(Date.now() - 86400000).toISOString(),
            salary: null
          }
        ]
      });
    }

    const res = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&num_pages=1`, {
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    });

    const data = await res.json();
    const jobs = (data.data || []).map((j: any) => ({
      id: j.job_id,
      title: j.job_title,
      company_name: j.employer_name,
      candidate_required_location: j.job_country || j.job_city || 'Remote',
      url: j.job_apply_link || j.job_google_link,
      publication_date: j.job_posted_at_datetime_utc || new Date().toISOString(),
      salary: j.job_min_salary ? `$${j.job_min_salary} - $${j.job_max_salary}` : null,
      description: j.job_description
    }));

    return NextResponse.json({
      queryUsed: searchQuery,
      jobs
    });

  } catch (e: any) {
    console.error("Deep search error:", e);
    return NextResponse.json({ error: e.message || "Failed to process deep search." }, { status: 500 });
  }
}
