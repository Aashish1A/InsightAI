import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ResumeModel } from "./model";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const resumes = await ResumeModel.findAllByUserId(userId);
    return NextResponse.json({ resumes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();
    const resume = await ResumeModel.create(userId, title);

    return NextResponse.json(
      { message: "Resume created successfully", resume },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
