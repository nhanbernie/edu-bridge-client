import React from "react";
import { Loader2 } from "lucide-react";

interface EBPageLoadingProps {
  message?: string;
}

/**
 * Full-page loading component
 * Use for page-level loading states (not for card loading)
 */
const EBPageLoading: React.FC<EBPageLoadingProps> = ({ message = "Đang tải..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default EBPageLoading;
