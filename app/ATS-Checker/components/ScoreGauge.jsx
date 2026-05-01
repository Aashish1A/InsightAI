import React from 'react';

export default function ScoreGauge({ score }) {
  const radius = 50;
  const circumference = radius * Math.PI; // ~157.08
  const safeScore = score || 0;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  let colorClass = "text-emerald-500";
  let strokeColor = "#10b981"; // emerald-500
  if (safeScore < 50) {
    colorClass = "text-red-500";
    strokeColor = "#ef4444"; // red-500
  } else if (safeScore < 80) {
    colorClass = "text-orange-500";
    strokeColor = "#f97316"; // orange-500
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-28 flex justify-center overflow-hidden">
        <svg viewBox="0 0 120 70" className="w-full h-full transform translate-y-1 drop-shadow-sm">
          {/* Background Arch */}
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
          {/* Foreground Arch */}
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={strokeColor} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute bottom-1 flex items-baseline gap-1">
          <span className={`text-4xl font-black tracking-tight ${colorClass}`}>{safeScore}</span>
          <span className="text-xl font-bold text-slate-300">/100</span>
        </div>
      </div>
    </div>
  );
}
