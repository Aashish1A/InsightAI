import { NextResponse } from "next/server";
import OpenAI from "openai";
import pdfParse from "pdf-parse";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    let text = "";
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
    } else {
        // Fallback for docx or other texts if parsed simply (might not be perfectly clean)
        text = buffer.toString('utf-8'); 
    }

    const prompt = `You are an expert ATS (Applicant Tracking System) Analyzer. Analyze the following resume text and provide a structured JSON response evaluating its quality.

The JSON MUST exactly match this structure (return only raw JSON, no markdown formatting):
{
    "score": number (0-100),
    "totalIssues": number,
    "categories": [
        {
            "id": "content",
            "title": "CONTENT",
            "score": number (0-100),
            "items": [
                {
                    "id": "parse_rate",
                    "title": "ATS Parse Rate",
                    "status": "pass" | "fail",
                    "issuesCount": number,
                    "description": "Explanation of what this checks.",
                    "feedback": "Specific feedback for the user based on their resume.",
                    "progress": number (0-100)
                }
            ]
        },
        {
            "id": "sections",
            "title": "SECTIONS",
            "score": number,
            "items": []
        },
        {
            "id": "ats",
            "title": "ATS ESSENTIALS",
            "score": number,
            "items": []
        },
        {
            "id": "tailoring",
            "title": "TAILORING",
            "score": number,
            "items": []
        }
    ]
}

Make sure to provide actual helpful descriptions and feedback based on typical ATS best practices. Use your best judgment based on the resume text provided. Try to populate items for all categories with a few checks like Quantifying Impact, Repetition, Grammar, Contact Info, Education, Formatting, Keywords.

RESUME TEXT:
${text.substring(0, 5000)}
`;

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 2500,
    });

    let rawOutput = response.choices[0]?.message?.content?.trim() || "{}";
    rawOutput = rawOutput.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    const result = JSON.parse(rawOutput);

    return NextResponse.json(result);
  } catch (error) {
    console.error("ATS Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
