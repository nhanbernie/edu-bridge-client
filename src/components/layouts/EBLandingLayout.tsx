"use client";
import React from "react";
import EBMaketingHeader from "./EBMaketingHeader";
import EBFooter from "./EBFooter";
import { useRouter } from "next/navigation";
import { BuildHeaderFunction } from "./types";

interface LandingLayoutProps {
  children?: React.ReactNode;
  buildHeader?: BuildHeaderFunction;
}

const EBLandingLayout = ({ children, buildHeader }: LandingLayoutProps) => {
  const router = useRouter();
  
  const go = (path: string) => router.push(path);
  
  const headerConfig = buildHeader ? buildHeader({ go }) : undefined;

  return (
    <div className="min-h-screen">
      <EBMaketingHeader headerConfig={headerConfig} />
      <main className="flex-1">{children}</main>
      <EBFooter />
    </div>
  );
};

export default EBLandingLayout;
