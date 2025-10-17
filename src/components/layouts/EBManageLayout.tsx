"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { EBLogo } from "@/components/common";
import { EBManageLayoutThemeToggle } from "./components";
import EBSidebarButton from "@/components/layouts/components/EBSidebarButton";
import EBButton from "@/components/common/EBButton";
import { Search, Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { EBUserMenu } from "@/components/common";
import {
  EBSidebarItem,
  EBActionButton,
  getDefaultTutorSidebarItems,
  getDefaultTutorActionButtons,
} from "@/common/constants/navigate.constant";
import { MAX_WIDTH_8XL } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";

interface EBManageLayoutProps {
  children: ReactNode;
  sidebarItems?: EBSidebarItem[];
  actionButtons?: EBActionButton[];
  showSearch?: boolean;
  showNotifications?: boolean;
}

const EBManageLayout: React.FC<EBManageLayoutProps> = ({
  children,
  sidebarItems,
  actionButtons,
  showSearch = true,
  showNotifications = true,
}) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = usePathname();
  const { getCurrentLocale } = useLocaleRouter();
  const t = useTranslations();

  // Use provided items or default with translations
  const finalSidebarItems = sidebarItems || getDefaultTutorSidebarItems(t);
  const finalActionButtons = actionButtons || getDefaultTutorActionButtons(t);

  // Check if route is active (handle locale in pathname)
  const isRouteActive = (href: string) => {
    const locale = getCurrentLocale();
    const fullHref = `/${locale}${href}`;
    return pathname === fullHref || (href !== "/tutor" && pathname.startsWith(fullHref));
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Background with gradient - using theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
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
      <div className="relative z-10 flex w-full h-screen bg-card/20 backdrop-blur-xl backdrop-saturate-150 border border-border/20 overflow-hidden shadow-2xl shadow-black/10">
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
                textClassName="text-lg font-bold text-foreground"
                animated={false}
              />
            </div>
          </div>

          {/* Toggle Button - Always visible */}
          <div
            className={`flex items-center mb-8 ${sidebarExpanded ? "justify-end" : "justify-center"}`}
          >
            <EBButton
              variant="ghost"
              size="icon"
              icon={sidebarExpanded ? ChevronLeft : ChevronRight}
              iconSize={16}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="w-8 h-8 bg-muted/80 text-muted-foreground hover:bg-muted backdrop-blur-sm border border-border/50 shadow-sm rounded-lg transition-all duration-200"
              title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="space-y-2">
              {finalSidebarItems.map((item) => {
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
            {finalActionButtons.map((button) => (
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
            <EBManageLayoutThemeToggle isExpanded={sidebarExpanded} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header - Fixed */}
          <header className="h-20 flex items-center justify-end px-6 lg:px-8 flex-shrink-0 bg-transparent">
            {/* Right side - Search, Notifications, User */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {showSearch && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 min-w-[300px]">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
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
                  className="relative p-2 rounded-xl hover:bg-muted/20 text-muted-foreground"
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
            <div className={MAX_WIDTH_8XL}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EBManageLayout;
