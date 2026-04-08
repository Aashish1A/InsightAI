import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const { userId, plan } = await requireAuth();

    if (plan !== "premium") {
      return NextResponse.json({ success: false, message: "This feature is only available for premium subscriptions" });
    }

    const formData = await request.formData();
    const object = formData.get("object");
    const imageFile = formData.get("image");

    if (!imageFile || !object) {
      return NextResponse.json({ success: false, message: "Image and object are required" }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const base64Image = `data:${imageFile.type};base64,${Buffer.from(bytes).toString("base64")}`;

    const { public_id } = await cloudinary.uploader.upload(base64Image);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;

    return NextResponse.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
