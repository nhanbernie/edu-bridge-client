import React from "react";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
