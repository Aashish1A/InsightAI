import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { ResumeModel } from "../model";

function getImageKit() {
  const publicKey =
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("ImageKit credentials are missing");
  }

  return new ImageKit({ publicKey, privateKey, urlEndpoint });
}

function hasImageKitCredentials() {
  return Boolean(
    (process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY) &&
      process.env.IMAGEKIT_PRIVATE_KEY &&
      (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT)
  );
}

async function getAuthedUserId() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  return userId;
}

export async function GET(req, { params }) {
  try {
    const userId = await getAuthedUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await params;
    const resume = await ResumeModel.findById(userId, resumeId);

    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const userId = await getAuthedUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await params;
    const contentType = req.headers.get("content-type") || "";
    let resumeData;
    let removeBackground = false;
    let imageFile = null;
    let imageUploadSkipped = false;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const resumeDataStr = formData.get("resumeData");
      removeBackground = formData.get("removeBackground") === "yes";
      imageFile = formData.get("image");

      if (!resumeDataStr) {
        return NextResponse.json({ message: "Missing resume data" }, { status: 400 });
      }

      try {
        resumeData = JSON.parse(resumeDataStr);
      } catch {
        return NextResponse.json({ message: "Invalid resume data JSON" }, { status: 400 });
      }
    } else {
      resumeData = await req.json();
    }

    if (imageFile && imageFile.size > 0 && hasImageKitCredentials()) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const imageKit = getImageKit();

      const response = await imageKit.upload({
        file: buffer,
        fileName: `${resumeId}-profile.png`,
        folder: "user-resumes",
        transformation: {
          pre: "w-300,h-300,fo-face,z-0.45" + (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeData.personal_info = resumeData.personal_info || {};
      resumeData.personal_info.image = response.url;
    } else if (imageFile && imageFile.size > 0) {
      imageUploadSkipped = true;
    }

    const resume = await ResumeModel.update(userId, resumeId, resumeData);

    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: imageUploadSkipped
          ? "Saved successfully. Profile image was skipped because ImageKit is not configured."
          : "Saved successfully",
        resume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resume update error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const userId = await getAuthedUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { resumeId } = await params;
    const deletedResume = await ResumeModel.delete(userId, resumeId);

    if (!deletedResume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
