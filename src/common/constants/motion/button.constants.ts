import { Variants } from "motion/react";

// Sidebar Button Animation Variants
export const sidebarButtonVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  tap: {
    scale: 0.98,
    opacity: 0.9,
    backgroundColor: "hsl(var(--primary) / 0.1)",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Icon Animation Variants
export const sidebarIconVariants: Variants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  tap: {
    rotate: 5,
    scale: 0.9,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Text Animation Variants
export const sidebarTextVariants: Variants = {
  initial: {
    opacity: 1,
    x: 0,
  },
  tap: {
    opacity: 0.7,
    x: 2,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  hover: {
    x: 2,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};
