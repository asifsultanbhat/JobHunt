import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-xl text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">JobTracker Pro</h1>
        <p className="text-gray-500 mb-8">Your ultimate AI-powered job hunting and tailoring companion.</p>
        
        <div className="space-y-4">
          <a href="/sign-in" className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
            Sign In to Dashboard
          </a>
          <a href="/sign-up" className="block w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-blue-600 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
}
