import React, { useState, useEffect } from 'react';
import { Lock, Check, AlertTriangle, ChevronDown, ChevronUp, X } from 'lucide-react';
import ScoreGauge from './ScoreGauge';

export default function ResultsView({ resultsData, file }) {
  const [activeCategory, setActiveCategory] = useState(resultsData?.categories?.[0]?.id || null);
  const [expandedItem, setExpandedItem] = useState(resultsData?.categories?.[0]?.items?.[0]?.id || null);

  const activeCategoryData = resultsData?.categories?.find(c => c.id === activeCategory);
  
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf"))) {
      const url = URL.createObjectURL(file);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!resultsData) return null;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start mt-8 relative z-10">
      
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white/70 rounded-3xl shadow-sm border border-white overflow-hidden shrink-0 sticky top-8">
        <div className="p-8 flex flex-col items-center border-b border-white">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Your Score</h2>
          <ScoreGauge score={resultsData.score || 0} />
          <p className="text-slate-500 font-medium mt-4">{resultsData.totalIssues || 0} Issues</p>
        </div>

        <div className="p-4 space-y-2">
          {resultsData.categories?.map((cat) => (
            <div key={cat.id}>
              <button onClick={() => {setActiveCategory(cat.id); setExpandedItem(cat.items?.[0]?.id || null); }} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeCategory === cat.id ? 'bg-indigo-50/70 shadow-sm' : 'hover:bg-slate-50'}`} >
                <span className={`font-bold text-sm uppercase tracking-wide ${activeCategory === cat.id ? 'text-indigo-900' : 'text-slate-600'}`}>
                  {cat.title}
                </span>
                <div className="flex items-center gap-2">
                  {cat.score < 100 ? (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cat.score < 80 ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {cat.score}%
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      100%
                    </span>
                  )}
                  {activeCategory === cat.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              
              {activeCategory === cat.id && cat.items && cat.items.length > 0 && (
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {cat.items.map(item => (
                    <button key={item.id} onClick={() => setExpandedItem(item.id)} className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm ${expandedItem === item.id ? 'bg-white shadow-sm font-semibold text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`} >
                      <div className="flex items-center gap-2">
                        {item.status === 'pass' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-left">{item.title}</span>
                      </div>
                      {item.issuesCount > 0 ? (
                        <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 whitespace-nowrap ml-2">
                          {item.issuesCount} issue{item.issuesCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 whitespace-nowrap ml-2">
                          No issues
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-6 pt-0 mt-4">
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
            Unlock Full Report <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Area */}
      <div className="flex-1 bg-white/70 backdrop-blur-md rounded-3xl shadow-sm border border-white overflow-hidden flex flex-col">
        <div className="bg-indigo-50/50 border-b border-white p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">{activeCategoryData?.title || "Overview"}</h2>
          </div>
          <div className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm">
            {resultsData.totalIssues || 0} issues found
          </div>
        </div>
        
        <div className="p-8">
          {activeCategoryData?.items?.map(item => (
            <div key={item.id} className={`border rounded-2xl mb-4 overflow-hidden transition-all duration-300 ${expandedItem === item.id ? 'border-indigo-100 shadow-md bg-white/70' : 'border-slate-100 hover:border-slate-300 bg-white/50'}`}>
              <button onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}className="w-full p-5 flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                  <div className={`w-1 h-6 rounded-full ${item.status === 'pass' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                  <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">{item.title}</h3>
                </div>
                {expandedItem === item.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {expandedItem === item.id && item.description && (
                <div className="p-6 pt-2 border-t border-slate-50">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-8 text-[15px]">
                    {item.description}
                  </p>
                  
                  <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 text-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${item.status === 'pass' ? 'bg-linear-to-r from-emerald-300 to-emerald-500' : 'bg-linear-to-r from-red-300 to-red-500'}`}></div>
                    
                    {item.progress !== undefined && (
                      <div className="max-w-md mx-auto mb-8 mt-2">
                        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full rounded-full absolute top-0 left-0 transition-all duration-1000 ${item.status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <h4 className="text-xl font-bold text-slate-800 mb-3">Feedback</h4>
                    <p className="text-slate-600 max-w-lg mx-auto text-[15px] leading-relaxed">
                      {item.feedback || "No specific feedback provided."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {(!activeCategoryData?.items || activeCategoryData.items.length === 0) && (
            <div className="text-center py-20 text-slate-400">
              <p>No specific checks available for this category.</p>
            </div>
          )}
        </div>

        {/* Display Resume Image/PDF at the bottom */}
        {fileUrl && (
          <div className="p-8 border-t border-slate-100 bg-slate-100 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Your Resume</h3>
            <div className="w-full max-w-3xl aspect-[8.5/11] md:h-auto border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
               <iframe src={`${fileUrl}#view=FitH`}  className="w-full h-full" title="Resume Preview" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
