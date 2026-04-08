import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";
import OpenAI from "openai";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { userId, plan } = await requireAuth();

    if (plan !== "premium") {
      return NextResponse.json({ success: false, message: "This feature is only available for premium subscriptions" });
    }

    const formData = await request.formData();
    const resumeFile = formData.get("resume");

    if (!resumeFile) {
      return NextResponse.json({ success: false, message: "No resume provided" }, { status: 400 });
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." });
    }

    // Convert file to buffer for pdf-parse (no filesystem needed!)
    const bytes = await resumeFile.arrayBuffer();
    const dataBuffer = Buffer.from(bytes);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        { role: "system", content: "You are an expert ATS and HR professional. Review the provided resume thoroughly. Provide constructive feedback on strengths, weaknesses, and areas for improvement. Ensure your response is well-structured, naturally concludes, and never cuts off abruptly." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review') `;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
