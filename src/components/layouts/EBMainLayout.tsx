"use client"

import React from "react";
import EBHeader from "./EBHeader";
import EBFooter from "./EBFooter";
import { useRouter } from "next/navigation";
import { HeaderConfig, BuildHeaderFunction } from "./types";

interface MainLayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  buildHeader?: BuildHeaderFunction;
}

const EBMainLayout: React.FC<MainLayoutProps> = ({ children, footer, buildHeader }) => {
  const router = useRouter();
  
  const go = (path: string) => router.push(path);
  
  const headerConfig = buildHeader ? buildHeader({ go }) : undefined;

  return (
    <div className="min-h-screen">
      <EBHeader headerConfig={headerConfig} />
      <main className="flex-1">{children}</main>
      {footer && <EBFooter />}
    </div>
  );
};

export default EBMainLayout;
