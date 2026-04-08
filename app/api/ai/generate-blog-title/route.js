import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";
import OpenAI from "openai";
import { clerkClient } from "@clerk/nextjs/server";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { userId, plan, free_usage } = await requireAuth();
    const { prompt } = await request.json();

    if (plan !== "premium" && free_usage >= 10) {
      return NextResponse.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title') `;

    if (plan !== "premium") {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
