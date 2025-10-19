import { Variants } from "motion/react";

// Card animation variants - Optimized for performance
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.1,
    },
  },
};

// Fade in animation - Optimized
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

// Slide up animation - Optimized
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Scale animation - Optimized
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.15,
    },
  },
};

// Stagger children animation - Optimized
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Default card animation (main one for cards)
export const DEFAULT_CARD_ANIMATION = cardVariants;

// Enhanced choice card variants (for homepage cards) - Optimized
export const choiceCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  hover: {
    y: -3,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.1,
    },
  },
};

// Premium card variants with smooth transitions - Optimized
export const premiumCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.1,
    },
  },
};

// Animation transition configs - Optimized for performance
export const MOTION_CONFIG = {
  type: "tween",
  duration: 0.2,
  ease: "easeOut",
} as const;

export const EASE_CONFIG = {
  ease: "easeOut",
} as const;
