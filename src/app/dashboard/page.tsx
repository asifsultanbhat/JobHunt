import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Briefcase, FileText, CheckCircle2 } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tailored Resumes</p>
              <h3 className="text-2xl font-bold mt-1">5</h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Applications Sent</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Matching Jobs</h3>
          <p className="text-sm text-gray-500">Connect to API to load jobs.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Application Pipeline</h3>
          <p className="text-sm text-gray-500">Connect to Supabase to load tracked applications.</p>
        </div>
      </div>
    </div>
  );
}
