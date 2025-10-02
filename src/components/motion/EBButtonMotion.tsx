"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const EBButtonAction = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      className={cn("p-2 rounded-lg transition-colors text-gray-600", className)}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
