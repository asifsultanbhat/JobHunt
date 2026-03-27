import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client (requires ANTHROPIC_API_KEY env var)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "dummy_key_for_build",
});

export async function tailorResume(baseResume: string, jobDescription: string): Promise<string> {
  // If no API key is provided, return a mock response
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "dummy_key_for_build") {
    return "[MOCK] Tailored Resume: Here is where the Claude API would return your resume heavily tailored towards the specific job description provided. Please add ANTHROPIC_API_KEY to hit the real Claude endpoints.";
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      system: "You are an expert resume writer. Given a base resume and a job description, tailor the base resume to perfectly match the job. Highlight matching skills, reorder bullet points by relevance, and adjust the professional summary. Output ONLY the tailored resume in clean Markdown format.",
      messages: [
        {
          role: "user",
          content: `Base Resume:\n${baseResume}\n\nJob Description:\n${jobDescription}\n\nPlease tailor my resume for this role.`
        }
      ]
    });
    
    // @ts-expect-error (Anthropic types can be strict with message blocks)
    return response.content[0].text;
  } catch (error) {
    console.error("Error tailoring resume:", error);
    throw new Error("Failed to tailor resume");
  }
}

export async function scoreJobFit(jobDescription: string, userProfile: string): Promise<{ score: number, breakdown: Record<string, unknown> }> {
  console.log("Scoring fit for:", jobDescription.substring(0, 10), userProfile.substring(0, 10)); // Mark as used
  // Mock scoring if no API key
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "dummy_key_for_build") {
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

  // Real implementation would invoke Claude similarly to the above and return JSON...
  return { score: 0, breakdown: {} };
}
