import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Briefcase, FileText, ClipboardList, User } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">JobTracker Pro</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/jobs" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
            <Briefcase className="w-5 h-5" /> Search Jobs
          </Link>
          <Link href="/tracker" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
            <ClipboardList className="w-5 h-5" /> Applications
          </Link>
          <Link href="/resume" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
            <FileText className="w-5 h-5" /> Resumes
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
            <User className="w-5 h-5" /> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">Job Hunt Dashboard</h2>
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
