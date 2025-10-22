"use client";

import React from "react";
import { motion, type Variants, type TargetAndTransition } from "motion/react";
import { cn } from "@/lib/utils";
import { DEFAULT_CARD_ANIMATION } from "@/common/constants/motion/motion.constant";
import {
  CARD_BASE,
  CARD_GLASS,
  CARD_ELEVATED,
  CARD_INTERACTIVE,
  CARD_PADDING,
  CARD_PADDING_SM,
  CARD_PADDING_LG,
} from "@/common/constants/className.constant";

export interface MotionCardProps {
  children: React.ReactNode;

  /**
   * Card variant style
   * - base: Clean card with shadow-lg
   * - glass: Card with backdrop blur
   * - elevated: Card with prominent shadow
   * - interactive: Auto-applied if onClick exists
   */
  variant?: "base" | "glass" | "elevated" | "interactive";

  /**
   * Padding size
   * - sm: p-4
   * - md: p-6 (default)
   * - lg: p-8
   */
  padding?: "sm" | "md" | "lg";

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

export const EBMotionCard: React.FC<MotionCardProps> = ({
  children,
  variant = "glass",
  padding = "md",
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
  // Select card variant class
  const variantClass = {
    base: CARD_BASE,
    glass: CARD_GLASS,
    elevated: CARD_ELEVATED,
    interactive: CARD_INTERACTIVE,
  }[variant];

  // Select padding class
  const paddingClass = {
    sm: CARD_PADDING_SM,
    md: CARD_PADDING,
    lg: CARD_PADDING_LG,
  }[padding];

  // Auto use interactive variant if onClick exists
  const finalVariant = onClick && variant === "base" ? CARD_INTERACTIVE : variantClass;

  return (
    <motion.div
      className={cn(finalVariant, paddingClass, className)}
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
