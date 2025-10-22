"use client";

import React, { useState } from "react";
import { Variants, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  sidebarButtonVariants,
  sidebarIconVariants,
  sidebarTextVariants,
} from "@/common/constants/motion/button.constants";

interface EBButtonActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  // Animation customization
  enableIconAnimation?: boolean;
  enableTextAnimation?: boolean;
  variants?: Variants;
}

export const EBButtonAction: React.FC<EBButtonActionProps> = ({
  variants = sidebarButtonVariants,
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
  title,
  enableIconAnimation = false,
  enableTextAnimation = false,
}) => {
  const [isTapping, setIsTapping] = useState(false);

  return (
    <motion.button
      type={type}
      title={title}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onMouseDown={() => setIsTapping(true)}
      onMouseUp={() => setIsTapping(false)}
      onMouseLeave={() => setIsTapping(false)}
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
      {enableIconAnimation && enableTextAnimation ? (
        // Both icon and text animations - separate containers
        <>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              // First child (icon) gets icon animation
              if (index === 0) {
                return (
                  <motion.div
                    key={index}
                    variants={sidebarIconVariants}
                    initial="initial"
                    animate={isTapping ? "tap" : "initial"}
                    className="inline-flex items-center"
                  >
                    {child}
                  </motion.div>
                );
              }
              // Second child (text) gets text animation
              if (index === 1) {
                return (
                  <motion.span
                    key={index}
                    variants={sidebarTextVariants}
                    initial="initial"
                    animate={isTapping ? "tap" : "initial"}
                  >
                    {child}
                  </motion.span>
                );
              }
            }
            return child;
          })}
        </>
      ) : enableIconAnimation ? (
        // Only icon animation
        <motion.div
          variants={sidebarIconVariants}
          initial="initial"
          animate={isTapping ? "tap" : "initial"}
          className="inline-flex items-center"
        >
          {children}
        </motion.div>
      ) : enableTextAnimation ? (
        // Only text animation
        <motion.span
          variants={sidebarTextVariants}
          initial="initial"
          animate={isTapping ? "tap" : "initial"}
        >
          {children}
        </motion.span>
      ) : (
        // No animation
        children
      )}
    </motion.button>
  );
};
