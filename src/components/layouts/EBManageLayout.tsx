"use client";

import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { EBLogo } from "@/components/common";
import EBThemeToggle from "@/components/common/EBThemeToggle";
import EBSidebarButton from "@/components/common/EBSidebarButton";
import EBButton from "@/components/common/EBButton";
import { Search, Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { EBUserMenu } from "@/components/common";
import { 
  EBSidebarItem, 
  EBActionButton, 
  defaultTutorSidebarItems,
  defaultTutorActionButtons 
} from "@/common/constants/navigate.constant";

interface EBManageLayoutProps {
  children: ReactNode;
  sidebarItems?: EBSidebarItem[];
  actionButtons?: EBActionButton[];
  showSearch?: boolean;
  showNotifications?: boolean;
}

const EBManageLayout: React.FC<EBManageLayoutProps> = ({ 
  children, 
  sidebarItems = defaultTutorSidebarItems,
  actionButtons = defaultTutorActionButtons,
  showSearch = true,
  showNotifications = true
}) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const pathname = usePathname();

  // Check if route is active
  const isRouteActive = (href: string) => {
    return pathname === href || (href !== "/tutor" && pathname.startsWith(href));
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Background with gradient - lighter colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
        {/* Enhanced blur pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(148, 163, 184, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 80% 70%, rgba(156, 163, 175, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 40% 80%, rgba(139, 146, 158, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main glassmorphism container */}
      <div className="relative z-10 flex w-full h-screen bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-gray-700/20 overflow-hidden shadow-2xl shadow-black/10">
        {/* Sidebar - Fixed */}
        <aside
          className={`
          relative flex flex-col bg-transparent transition-all duration-300 py-6 px-4 h-screen overflow-y-auto overflow-x-hidden
          ${sidebarExpanded ? "w-64" : "w-20"}
        `}
        >
          {/* Logo - Always visible */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex items-center ${sidebarExpanded ? "justify-start" : "justify-center w-full"}`}
            >
              <EBLogo
                imageSize={sidebarExpanded ? 36 : 28}
                showText={sidebarExpanded}
                textClassName="text-lg font-bold text-gray-700 dark:text-gray-300"
                animated={false}
              />
            </div>
          </div>

          {/* Toggle Button - Always visible */}
          <div className={`flex items-center mb-8 ${sidebarExpanded ? 'justify-end pr-4' : 'justify-center'}`}>
            <EBButton
              variant="ghost"
              size="icon"
              icon={sidebarExpanded ? ChevronLeft : ChevronRight}
              iconSize={16}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="w-8 h-8 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 shadow-sm rounded-lg transition-all duration-200"
              title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = isRouteActive(item.href);
                return (
                  <EBSidebarButton
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isActive={isActive}
                    isExpanded={sidebarExpanded}
                  />
                );
              })}
            </div>
          </nav>

          {/* Bottom controls */}
          <div className="py-4 space-y-2">
            {/* Action Buttons */}
            {actionButtons.map((button) => (
              <EBSidebarButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                href={button.href || "#"}
                isActive={false}
                isExpanded={sidebarExpanded}
                onClick={button.onClick}
              />
            ))}

            {/* Theme Toggle */}
            <div
              className={`
              flex items-center transition-all duration-200
              ${
                sidebarExpanded
                  ? "gap-3 px-4 py-3 rounded-lg justify-start"
                  : "justify-center w-12 h-12 rounded-lg bg-gray-100/60 dark:bg-gray-700/60"
              }
              ${
                sidebarExpanded
                  ? "text-gray-600 dark:text-gray-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80"
              }
            `}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <EBThemeToggle />
              </div>
              {sidebarExpanded && (
                <span className="font-medium text-sm whitespace-nowrap">Theme</span>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header - Fixed */}
          <header className="h-20 flex items-center justify-end px-6 lg:px-8 bg-transparent flex-shrink-0">
            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {showSearch && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-600/20 min-w-[300px]">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Notifications */}
              {showNotifications && (
                <EBButton
                  variant="ghost"
                  size="icon"
                  icon={Bell}
                  iconSize={20}
                  className="relative p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 text-gray-600 dark:text-gray-400"
                >
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </EBButton>
              )}

              {/* User Menu */}
              <EBUserMenu />
            </div>
          </header>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="max-w-8xl mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EBManageLayout;
