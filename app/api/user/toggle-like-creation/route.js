import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";

export async function POST(request) {
  try {
    const { userId } = await requireAuth();
    const { id } = await request.json();

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return NextResponse.json({ success: false, message: "Creation not found" });
    }

    // Default to empty array if uninitialized in DB
    const currentLikes = creation.likes || [];
    const userIdString = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdString)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdString);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdString];
      message = "Creation Liked";
    }

    const formattedArray = `{${updatedLikes.join(",")}}`;

    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
