"use client";

import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, XIcon, } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [title, setTitle] = useState("");
  const [editResumeId, setEditResumeId] = useState("");

  const router = useRouter();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const loadAllResumes = async () => {
    try {
      const { data } = await axios.get("/api/resumes");
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/resumes", { title });
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreteResume(false);
      router.push(`/resume-builder?resumeId=${data.resume.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();

      if (confirm) {
        const formData = new FormData();
        formData.append("resumeData", JSON.stringify({ title }));
        const { data } = await axios.put(`/api/resumes/${editResumeId}`, formData);
        setAllResumes(allResumes.map((resume) => resume.id === editResumeId ? { ...resume, title } : resume));
        loadAllResumes();
        setTitle("");
        setEditResumeId("");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume"
      );

      if (confirm) {
        const { data } = await axios.delete(`/api/resumes/${resumeId}`);
        setAllResumes(allResumes.filter((resume) => resume.id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        <div className="flex gap-4">
          <button onClick={() => setShowCreteResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all">
              Create Resume
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-76.25" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button key={index} onClick={() => router.push(`/resume-builder?resumeId=${resume.id}`)} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40) `, borderColor: baseColor + "40", }} >
                <FilePenLineIcon className="size-11 group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }} />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }} >
                  {resume.title}
                </p>

                <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center" style={{ color: baseColor + "90",}} >
                  Updated on {new Date(resume.updated_at).toLocaleDateString()}
                </p>

                <div onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden" >
                  <TrashIcon onClick={() => deleteResume(resume.id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() => { setEditResumeId(resume.id); setTitle(resume.title); }} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreteResume && (
          <form onSubmit={createResume} onClick={() => setShowCreteResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6" >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600" required />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowCreteResume(false); setTitle(""); }} />
            </div>
          </form>
        )}

        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId("")} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6" >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600" required />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setEditResumeId(""); setTitle(""); }} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
