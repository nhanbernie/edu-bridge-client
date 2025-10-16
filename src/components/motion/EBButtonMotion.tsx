"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface EBButtonActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const EBButtonAction: React.FC<EBButtonActionProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}) => {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={cn(
        // Base styles with semantic theme
        "p-2 rounded-lg transition-colors",
        // Text color with theme support
        "text-muted-foreground hover:text-foreground",
        // Hover background
        "hover:bg-muted",
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
