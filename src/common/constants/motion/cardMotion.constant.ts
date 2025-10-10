import { Variants } from "motion/react";

export const simpleCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    y: -1,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

// Tutor card variants with smooth entrance animation
export const tutorCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.01,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
    },
  },
  hover: {
    y: -8,
    scale: 1.01,
    transition: {
      duration: 0.01,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.01,
    },
  },
};
