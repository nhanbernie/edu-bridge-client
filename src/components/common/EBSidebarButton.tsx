"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import EBButton from "./EBButton";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

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
    if (onClick) {
      onClick();
    } else {
      // Navigate with locale
      push(href);
    }
  };

  return (
    <EBButton
      variant={isActive ? "default" : "ghost"}
      size={isExpanded ? "default" : "icon"}
      icon={icon}
      iconSize={20}
      onClick={handleClick}
      className={cn(
        "w-full transition-all duration-200",
        isExpanded ? "justify-start px-4 py-3 h-12" : "justify-center w-12 h-12",
        isActive && isExpanded && "bg-primary/10 text-primary hover:bg-primary/20",
        isActive && !isExpanded && "bg-primary/20 text-primary hover:bg-primary/30",
        !isActive &&
          isExpanded &&
          "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-700/80",
        !isActive &&
          !isExpanded &&
          "text-gray-600 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-600/80",
        className
      )}
      title={!isExpanded ? label : undefined}
    >
      {isExpanded && <span className="font-medium text-sm whitespace-nowrap ml-2">{label}</span>}
    </EBButton>
  );
};

export default EBSidebarButton;
