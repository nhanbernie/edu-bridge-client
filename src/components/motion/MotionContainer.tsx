"use client";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { containerVariants, slideUpVariants } from "@/common/constants/motion/motion.constant";

interface MotionContainerProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
}

export const MotionContainer: React.FC<MotionContainerProps> = ({
  children,
  className,
  variants = containerVariants,
  stagger = true,
}) => {
  return (
    <motion.div
      className={className}
      variants={stagger ? variants : undefined}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}

export const MotionItem: React.FC<MotionItemProps> = ({
  children,
  className,
  variants = slideUpVariants,
}) => {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};
