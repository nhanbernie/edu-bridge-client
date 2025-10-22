"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { EBButtonAction } from "@/components/motion/EBButtonMotion";

interface EBSidebarButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  className?: string;
}

const EBSidebarButton: React.FC<EBSidebarButtonProps> = ({
  icon,
  label,
  href,
  isActive = false,
  isExpanded = true,
  onClick,
  className,
}) => {
  const { push } = useLocaleRouter();

  const handleClick = () => {
    // If href is not a placeholder, navigate
    if (href && href !== "#") {
      push(href);
    }
    // Always call onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <EBButtonAction
      enableIconAnimation={true}
      enableTextAnimation={true}
      onClick={handleClick}
      className={cn(
        "w-full transition-all duration-200",
        "flex items-center text-muted-foreground hover:bg-muted",
        "flex items-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
        isExpanded
          ? "justify-start px-4 py-3 h-12 rounded-3xl"
          : "justify-center w-12 h-12 rounded-full",
        isActive && isExpanded && "bg-primary/20 text-primary hover:bg-primary/30",
        isActive && !isExpanded && "bg-primary/30 text-primary hover:bg-primary/40",
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

export default EBSidebarButton;
