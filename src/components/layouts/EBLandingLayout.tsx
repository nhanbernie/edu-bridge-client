"use client";
import React from "react";
import EBMaketingHeader from "./EBMaketingHeader";
import EBFooter from "./EBFooter";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { BuildHeaderFunction } from "./types";

interface LandingLayoutProps {
  children?: React.ReactNode;
  buildHeader?: BuildHeaderFunction;
}

const EBLandingLayout = ({ children, buildHeader }: LandingLayoutProps) => {
  const { push } = useLocaleRouter();

  const go = (path: string) => push(path);

  const headerConfig = buildHeader ? buildHeader({ go }) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <EBMaketingHeader headerConfig={headerConfig} />
      <main className="flex-1">{children}</main>
      <EBFooter />
    </div>
  );
};

export default EBLandingLayout;
