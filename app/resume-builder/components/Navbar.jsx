"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Navbar() {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (user && !sessionStorage.getItem("hasLoggedIn")) {
      toast.success("Successfully logged in!");
      sessionStorage.setItem("hasLoggedIn", "true");
    } else if (!user && sessionStorage.getItem("hasLoggedIn")) {
      sessionStorage.removeItem("hasLoggedIn");
      toast.success("Successfully logged out!");
    }
  }, [user, isLoaded]);

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="logo" width={120} height={44} className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.firstName || "there"}</p>
          <button onClick={() => { 
            signOut({ redirectUrl: "/" });
          }} className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all" >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
