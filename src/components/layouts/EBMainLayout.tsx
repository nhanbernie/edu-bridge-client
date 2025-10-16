"use client";

import React from "react";
import EBHeader from "./EBHeader";
import EBFooter from "./EBFooter";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { HeaderConfig, BuildHeaderFunction, HeaderActionButton } from "./types";

interface MainLayoutProps {
  children: React.ReactNode;
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
    <div className="min-h-screen bg-background text-foreground">
      <EBHeader
        headerConfig={headerConfig}
        actionButtons={actionButtons}
        showTheme={showTheme}
        showUserMenu={showUserMenu}
      />
      <main className="flex-1">{children}</main>
      {footer && <EBFooter />}
    </div>
  );
};

export default EBMainLayout;
