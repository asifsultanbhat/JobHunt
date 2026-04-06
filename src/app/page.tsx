import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: "4s" }}></div>

      <div className="max-w-xl w-full glass-panel p-10 rounded-[2.5rem] text-center relative z-10 scale-100 hover:scale-[1.02] transition-transform duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-pink-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_10px_40px_-10px_rgba(139,92,246,0.6)] transform rotate-3 hover:rotate-6 transition-transform">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-gradient pb-2">JobTracker Pro</h1>
        <p className="text-gray-600 text-lg mb-10 font-medium">Your ultimate AI-powered job hunting and tailoring companion.</p>
        
        <div className="space-y-4">
          <a href="/sign-in" className="block w-full py-4 px-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-lg font-bold rounded-2xl transition-all shadow-lg hover:shadow-violet-500/30">
            Sign In to Dashboard
          </a>
          <a href="/sign-up" className="block w-full py-4 px-4 bg-white/60 backdrop-blur-md border-2 border-transparent hover:border-violet-300 text-gray-800 text-lg font-bold rounded-2xl transition-all shadow-sm hover:shadow-md">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
}
