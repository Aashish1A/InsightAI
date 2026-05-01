"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Preview() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      if (!resumeId) return;

      const { data } = await axios.get("/api/resumes/public/" + resumeId);

      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume not found
          </p>
          <Link href="/" className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors">
            <ArrowLeft className="mr-2 size-4" /> got to home page
          </Link>
        </div>
      )}
    </div>
  );
};
