import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

export default function ResumeBuilderLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedIn>
        <Navbar />
        {children}
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Sign in to build your resume
          </h1>
          <SignInButton mode="modal">
            <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-orange-600">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
