import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    await requireAuth();
    const { userContent } = await request.json();

    if (!userContent) {
      return NextResponse.json({ message: "Missing content" }, { status: 400 });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "system",
          content:
            "Rewrite the user's resume summary into 3-4 concise, professional sentences. Return only the improved summary.",
        },
        { role: "user", content: userContent },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    return NextResponse.json({
      enhancedContent: response.choices[0]?.message?.content?.trim() || "",
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
