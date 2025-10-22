"use client";

import React from "react";
import EBHeader from "./EBHeader";
import EBFooter from "./EBFooter";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { HeaderConfig, BuildHeaderFunction, HeaderActionButton } from "./types";

interface MainLayoutProps {
  children?: React.ReactNode;
  footer?: boolean;
  buildHeader?: BuildHeaderFunction;
  actionButtons?: HeaderActionButton[]; // Add action buttons prop
  showTheme?: boolean; // Control theme toggle visibility
  showUserMenu?: boolean; // Control user menu visibility
}

const EBMainLayout: React.FC<MainLayoutProps> = ({
  children,
  footer,
  buildHeader,
  actionButtons,
  showTheme,
  showUserMenu,
}) => {
  const { push } = useLocaleRouter();

  const go = (path: string) => push(path);

  const headerConfig = buildHeader ? buildHeader({ go }) : undefined;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background layer - dưới content */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/30 to-background">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(148,163,184,0.15) 0%, transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(156,163,175,0.15) 0%, transparent 60%),
          radial-gradient(circle at 40% 80%, rgba(139,146,158,0.10) 0%, transparent 50%)
        `,
          }}
        />
      </div>

      {/* Main content - nằm trên background */}
      <div className="relative z-10">
        <EBHeader
          headerConfig={headerConfig}
          actionButtons={actionButtons}
          showTheme={showTheme}
          showUserMenu={showUserMenu}
        />
        <main className="flex-1">{children}</main>
        {footer && <EBFooter />}
      </div>
    </div>
  );
};

export default EBMainLayout;
