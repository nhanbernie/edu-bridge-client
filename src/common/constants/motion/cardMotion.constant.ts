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

export const elegantCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    scale: 0.995,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { type: "spring", stiffness: 420, damping: 32, mass: 0.5 },
      y: { type: "spring", stiffness: 520, damping: 40, mass: 0.5 },
      scale: { type: "tween", duration: 0.06, ease: "linear" },
    },
  },

  hover: {
    y: -2,
    scale: 1.02,
    transition: { duration: 0 },
  },
};

export const pressedCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 4,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },

  hover: {
    scale: 1.02,
    y: -1,
    boxShadow: "0 6px 14px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
    transition: {
      duration: 0.1, // phản hồi nhanh
      ease: [0.4, 0, 0.2, 1],
    },
  },

  click: {
    scale: 0.96, // nhấn rõ nhưng không méo
    y: 1,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.05, // phản hồi siêu nhanh, cảm giác thật tay
      ease: "easeOut",
    },
  },
};
