import { NextResponse } from "next/server";
import { ResumeModel } from "../../model";

export async function GET(req, { params }) {
  try {
    const { resumeId } = await params;
    const resume = await ResumeModel.findPublicById(resumeId);

    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
