"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key_for_build");

export async function tailorResume(baseResume: string, jobDescription: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
    return "[MOCK] Tailored Resume: Please add GEMINI_API_KEY to hit the real endpoints.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert resume writer. Given a base resume and a job description, tailor the base resume to perfectly match the job. Highlight matching skills, reorder bullet points by relevance, and adjust the professional summary. Output ONLY the tailored resume in clean Markdown format.\n\nBase Resume:\n${baseResume}\n\nJob Description:\n${jobDescription}`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error tailoring resume:", error);
    throw new Error("Failed to tailor resume");
  }
}

export async function scoreJobFit(jobDescription: string, userProfile: string): Promise<{ score: number, breakdown: Record<string, unknown> }> {
  console.log("Scoring fit for:", jobDescription.substring(0, 10), userProfile.substring(0, 10)); // Mark as used
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
    return {
      score: 85,
      breakdown: {
        skills: 90,
        experience: 80,
        salary: 100,
        location: 100
      }
    };
  }

  return { score: 0, breakdown: {} };
}

export async function generateCoverLetter(jobDetails: any, userProfile?: any): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
    return "Dear Hiring Manager,\n\nI am writing to express my interest in the position.\n\nSincerely,\nCandidate";
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a professional cover letter for the following job.
    Job Details: ${JSON.stringify(jobDetails)}
    User Profile: ${JSON.stringify(userProfile || "Make it general, emphasizing enthusiasm and willingness to learn.")}
    
    Format the cover letter in plain text, do not use markdown formatting. Make it concise and compelling.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
}

export async function generateOptimalJobSearchQuery(resumeText: string, extraKeywords: string = ""): Promise<string> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy_key_for_build") {
    return "Software Engineer " + extraKeywords;
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert technical recruiter. Based on the following resume text, determine the highly optimal, concise job search query (e.g., job title and top 2 critical skills).
    
    Resume Text:
    ${resumeText.substring(0, 3000)}
    
    User's additional keywords: ${extraKeywords}
    
    Output ONLY the exact search string to be typed into a job board (maximum 5 words, e.g., "Senior Frontend Developer React"). Do not include quotes or any conversational text.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text().replace(/"/g, '').trim();
  } catch (error) {
    console.error("Error generating search query:", error);
    return "Developer " + extraKeywords;
  }
}
