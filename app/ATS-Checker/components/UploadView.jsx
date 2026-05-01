import React, { useRef } from 'react';
import { Lock, UploadCloud } from 'lucide-react';

export default function UploadView({ onUpload, error }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (fileInputRef.current) {
         fileInputRef.current.files = files;
      }
      onUpload(files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[80vh]">
      <div className="pr-8">
        <p className="text-sm font-bold text-indigo-600 tracking-wider mb-4 uppercase">Resume Checker</p>
        <h1 className="text-5xl font-extrabold text-slate-800 mb-6 leading-[1.15]">
          Is your resume good enough?
        </h1>
        <p className="text-base text-slate-600 mb-8 leading-relaxed">
          A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-tr from-indigo-100 to-emerald-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
        
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className="bg-white/90 backdrop-blur-xl border border-emerald-100 border-dashed rounded-3xl p-12 flex flex-col items-center text-center shadow-xl shadow-emerald-900/5 relative overflow-hidden cursor-pointer hover:bg-emerald-50/50 transition-colors" >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 to-indigo-400"></div>
          
          <UploadCloud className="w-16 h-16 text-emerald-400 mb-4" />
          <p className="text-slate-700 text-lg mb-2 font-medium">Drop your resume here or click to choose.</p>
          <p className="text-sm text-slate-400 mb-8">PDF & DOCX only. Max 2MB file size.</p>
          
          {error && (
            <div className="mb-6 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm w-full">
              {error}
            </div>
          )}
          
          <button type="button" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-10 rounded-xl transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 mb-6 text-lg w-full max-w-xs cursor-pointer" >
            Upload Your Resume
          </button>
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx" />

          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Lock className="w-4 h-4" />
            <span>Privacy guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
