import React from "react";
import { Loader2 } from "lucide-react";

interface EBLoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "card";
  className?: string;
}

const EBLoadingSpinner: React.FC<EBLoadingSpinnerProps> = ({
  message = "Đang tải...",
  size = "md",
  variant = "default",
  className = "",
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: "w-4 h-4",
      text: "text-sm",
      container: "py-4",
    },
    md: {
      spinner: "w-8 h-8",
      text: "text-base",
      container: "py-12",
    },
    lg: {
      spinner: "w-12 h-12",
      text: "text-lg",
      container: "py-16",
    },
  };

  // Variant configurations
  const variantConfig = {
    default: "flex items-center justify-center",
    minimal: "flex items-center gap-2",
    card: "flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  if (variant === "minimal") {
    return (
      <div className={`${currentVariant} ${className}`}>
        <Loader2 className={`${currentSize.spinner} animate-spin text-gray-600`} />
        <span className={`${currentSize.text} text-gray-600`}>{message}</span>
      </div>
    );
  }

  return (
    <div className={`${currentVariant} ${currentSize.container} ${className}`}>
      <div className="text-center">
        <Loader2 className={`${currentSize.spinner} animate-spin mx-auto mb-4 text-gray-600`} />
        <p className={`${currentSize.text} text-gray-600`}>{message}</p>
      </div>
    </div>
  );
};

export default EBLoadingSpinner;
