import { Variants } from "motion/react";

// Sidebar Button Animation Variants
export const sidebarButtonVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  tap: {
    scale: 0.99,
    opacity: 0.95,
    backgroundColor: "hsl(var(--primary) / 0.1)",
    transition: {
      duration: 0.08,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.005,
    transition: {
      duration: 0.15,
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
    rotate: 3,
    scale: 0.95,
    transition: {
      duration: 0.08,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.05,
    rotate: 0,
    transition: {
      duration: 0.15,
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
    opacity: 0.8,
    x: 1,
    transition: {
      duration: 0.08,
      ease: "easeInOut",
    },
  },
  hover: {
    x: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

export const flashButtonVariants: Variants = {
  initial: {
    opacity: 0,
    y: 4,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
  hover: {
    scale: 1.04,
    y: -1,
    transition: {
      duration: 0, // instant response
    },
  },
  focus: {
    scale: 1.03,
    transition: { duration: 0.05, ease: "easeOut" },
  },
  disabled: {
    opacity: 0.6,
    scale: 1,
    y: 0,
    transition: { duration: 0 },
  },
};
