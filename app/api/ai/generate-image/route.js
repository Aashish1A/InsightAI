import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";
import axios from "axios";
import cloudinary from "@/lib/cloudinary";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId, plan, free_usage } = await requireAuth();
    const { prompt, publish } = await request.json();

    if (plan !== "premium" && free_usage >= 2) {
      return NextResponse.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const clipdropRes = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      body: formData,
    });

    if (!clipdropRes.ok) {
      if (clipdropRes.status === 401) {
        return NextResponse.json({ success: false, message: "Invalid or missing Clipdrop API key. Please check your .env local variables." }, { status: 401 });
      }
      if (clipdropRes.status === 402) {
        return NextResponse.json({ success: false, message: "Clipdrop Free credits exhausted. Upgrade your API account." }, { status: 402 });
      }
      const errorText = await clipdropRes.text();
      throw new Error(`Clipdrop API Error: ${clipdropRes.status} - ${errorText}`);
    }

    const arrayBuffer = await clipdropRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      folder: "insightai"
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false}) `;

    if (plan !== "premium") {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return NextResponse.json({ success: true, content: secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
