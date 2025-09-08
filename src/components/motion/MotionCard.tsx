import React from "react";
import { motion, type Variants, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEFAULT_CARD_ANIMATION } from "@/common/constants/motion/motion.constant";

export interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string;
  animate?: string;
  whileHover?: string | TargetAndTransition;
  whileTap?: string | TargetAndTransition;
  layout?: boolean;
  layoutId?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className,
  variants = DEFAULT_CARD_ANIMATION,
  initial = "hidden",
  animate = "visible",
  whileHover = "hover",
  whileTap = "tap",
  layout = false,
  layoutId,
  onClick,
  style,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        // Base card styles using CSS variables (auto theme support)
        "bg-card text-card-foreground border border-border rounded-3xl p-6 shadow-sm",
        // Hover effects
        "transition-shadow duration-200 hover:shadow-md",
        // Interactive cursor if clickable
        onClick && "cursor-pointer",
        className
      )}
      variants={variants}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      layout={layout}
      layoutId={layoutId}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};
