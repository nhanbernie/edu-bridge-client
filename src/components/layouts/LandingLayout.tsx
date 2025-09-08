import React from "react";
import MaketingHeader from "./components/MaketingHeader";
import Footer from "./Footer";

const LandingLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <MaketingHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
