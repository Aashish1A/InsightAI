import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import sql from "@/lib/db";

export async function GET(request) {
  try {
    await requireAuth();

    const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    return NextResponse.json({ success: true, creations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
