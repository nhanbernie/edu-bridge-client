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

export const smoothCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 28,
      mass: 0.5,
    },
  },
  hover: {
    y: -2,
    scale: 1.01,
    transition: {
      type: "tween",
      duration: 0,
      ease: "linear",
    },
  },
  tap: {
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};
