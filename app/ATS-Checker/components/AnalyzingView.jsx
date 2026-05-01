import React from 'react';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';

export default function AnalyzingView({ loadingSteps }) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl shadow-indigo-900/5 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100 mt-12 relative z-10">
      <div className="w-full md:w-80 border-r border-slate-100 p-10 bg-slate-50/50 flex flex-col items-center">
        <div className="w-32 h-6 bg-slate-200 rounded-md animate-pulse mb-10"></div>
        
        <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
          <svg className="w-full h-full animate-pulse text-slate-200" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="141.37 282.74" strokeDashoffset="141.37" strokeLinecap="round" transform="rotate(-180 50 50)" />
          </svg>
          <div className="absolute bottom-4 w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>
        
        <div className="w-full space-y-8 mt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex justify-between items-center">
              <div className="w-24 h-3 bg-slate-200 rounded-sm animate-pulse"></div>
              <div className="w-12 h-5 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-12 flex flex-col justify-center items-center bg-slate-50/30">
        <div className="max-w-md w-full space-y-10">
          {loadingSteps.map((step) => (
            <div key={step.id} className="flex items-center gap-6">
              <div className="shrink-0">
                {step.status === 'completed' ? (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                ) : step.status === 'active' ? (
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-dashed flex items-center justify-center">
                    <CircleDashed className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
              <span className={`text-xl transition-colors duration-300 ${
                step.status === 'pending' ? 'text-slate-400' : 
                step.status === 'active' ? 'text-indigo-900 font-semibold' : 
                'text-slate-700 font-medium'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
