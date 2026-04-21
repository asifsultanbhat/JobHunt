"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  ClipboardList, 
  User,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Search Jobs", href: "/jobs", icon: Briefcase },
  { name: "Applications", href: "/tracker", icon: ClipboardList },
  { name: "Resumes", href: "/resume", icon: FileText },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-white border-r hidden md:flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0 z-40 shadow-sm",
        isHovered ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-16 flex items-center px-4 border-b overflow-hidden whitespace-nowrap">
        <div className="min-w-[2.5rem] flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
             <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <span className={cn(
          "ml-3 text-xl font-bold text-blue-600 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          JobTracker
        </span>
      </div>

      <nav className="flex-1 p-2 space-y-2 mt-4 overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-2 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <div className="min-w-[2.5rem] flex items-center justify-center">
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform", isActive && "scale-110")} />
              </div>
              <span className={cn(
                "font-medium whitespace-nowrap transition-all duration-300",
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              )}>
                {item.name}
              </span>
              
              {!isHovered && isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-[2.5rem] flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold shrink-0">
                ?
             </div>
          </div>
          <div className={cn(
            "transition-opacity duration-300 whitespace-nowrap",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <p className="text-xs font-semibold text-gray-900">Need Help?</p>
            <p className="text-[10px] text-gray-500">View Documentation</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
