// Motion Components
export { MotionCard } from "./MotionCard";
export { MotionContainer, MotionItem } from "./MotionContainer";

// Re-export motion constants for convenience
export {
  cardVariants,
  choiceCardVariants,
  premiumCardVariants,
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  containerVariants,
  DEFAULT_CARD_ANIMATION,
  MOTION_CONFIG,
  EASE_CONFIG,
} from "@/common/constants/motion/motion.constant";

export {
  simpleCardVariants,
  tutorCardVariants,
} from "@/common/constants/motion/cardMotion.constant";

// Types
export type { MotionCardProps } from "./MotionCard";
