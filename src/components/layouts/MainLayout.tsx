import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import { HeaderConfig, BuildHeaderFunction } from "./types";

interface MainLayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  buildHeader?: BuildHeaderFunction;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, footer, buildHeader }) => {
  const router = useRouter();
  
  // Create the go function for navigation
  const go = (path: string) => router.push(path);
  
  // Build header config if provided
  const headerConfig = buildHeader ? buildHeader({ go }) : undefined;

  return (
    <div className="min-h-screen">
      <Header headerConfig={headerConfig} />
      <main className="flex-1">{children}</main>
      {footer && <Footer />}
    </div>
  );
};

export default MainLayout;
