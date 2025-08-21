import React from "react";
import MaketingHeader from "./components/MaketingHeader";

const LandingLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <MaketingHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default LandingLayout;
