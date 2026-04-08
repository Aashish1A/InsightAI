import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const { userId, plan } = await requireAuth();

    if (plan !== "premium") {
      return NextResponse.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
    }

    // Convert the uploaded file to a Buffer and then to Base64 for Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image') `;

    return NextResponse.json({ success: true, content: secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
