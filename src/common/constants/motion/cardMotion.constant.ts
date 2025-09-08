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
