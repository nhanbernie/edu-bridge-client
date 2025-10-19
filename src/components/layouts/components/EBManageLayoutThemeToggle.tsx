"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { EBButtonAction } from "@/components/motion/EBButtonMotion";

interface EBManageLayoutThemeToggleProps {
  isExpanded?: boolean;
  className?: string;
}

const EBManageLayoutThemeToggle: React.FC<EBManageLayoutThemeToggleProps> = ({
  isExpanded = true,
  className,
}) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const icon = theme === "light" ? Sun : Moon;
  const label = theme === "light" ? "Dark mode" : "Light mode";

  return (
    <EBButtonAction
      enableIconAnimation={true}
      enableTextAnimation={true}
      onClick={handleToggle}
      className={cn(
        "w-full transition-all duration-200",
        "flex items-center text-muted-foreground hover:bg-muted",
        "flex items-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
        isExpanded
          ? "justify-start px-4 py-3 h-12 rounded-3xl"
          : "justify-center w-12 h-12 rounded-full",
        className
      )}
      title={!isExpanded ? label : undefined}
    >
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        {React.createElement(icon, { className: "w-5 h-5" })}
      </div>
      {isExpanded && <span className="font-medium text-sm whitespace-nowrap ml-2">{label}</span>}
    </EBButtonAction>
  );
};

export default EBManageLayoutThemeToggle;
