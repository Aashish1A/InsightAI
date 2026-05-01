"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CloudUpload } from "lucide-react";

export default function Navbar({ onNewUpload }) {
  const { user } = useUser();

  return (
    <div className="bg-transparent relative z-20">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-slate-800 transition-all">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="logo" width={120} height={44} className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <p className="max-sm:hidden text-slate-600">Hi, {user?.firstName || "there"}</p>
          {onNewUpload && (
            <button onClick={onNewUpload} className="bg-white hover:bg-emerald-50 border border-emerald-300 shadow-sm px-5 py-2 rounded-md active:scale-95 transition-all text-emerald-300 font-bold flex items-center gap-2 cursor-pointer" >
              New Upload
              <CloudUpload className="w-5 h-5" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
