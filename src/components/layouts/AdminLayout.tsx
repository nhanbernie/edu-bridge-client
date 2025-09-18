"use client";

import React, { ReactNode } from "react";
import { EBLogo } from "@/components/common";
import EBThemeToggle from "@/components/common/EBThemeToggle";
import LanguageSelector from "@/components/common/LanguageSelector";
import { User } from "lucide-react";
import UserMenu from "./components/UserMenu";
interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { label: "Dashboard", icon: <User className="w-5 h-5" />, href: "/admin" },
  { label: "Classes", icon: <User className="w-5 h-5" />, href: "/admin/classes" },
  { label: "Students", icon: <User className="w-5 h-5" />, href: "/admin/students" },
  { label: "Tutors", icon: <User className="w-5 h-5" />, href: "/admin/tutors" },
  // ...add more as needed
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col border-r border-border/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-6 gap-8">
        <div className="flex items-center gap-2 mb-8">
          <EBLogo imageSize={36} textClassName="text-xl font-bold" />
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors font-medium"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <EBThemeToggle />
          <LanguageSelector variant="icon-only" />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-border/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* User avatar placeholder */}
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
