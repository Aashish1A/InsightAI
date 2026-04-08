import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";

export async function GET(request) {
  try {
    // Auth check
    const { userId } = await requireAuth();

    // Fetch user creations
    const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    return NextResponse.json({ success: true, creations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
