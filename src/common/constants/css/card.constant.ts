/**
 * Card styling constants for consistent design across the application
 */

// Base card styles
export const CARD_BASE =
  "bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50";

// Card colors
export const CARD_COLORS = {
  EMERALD: "text-emerald-600",
  BLUE: "text-blue-600",
  YELLOW: "text-yellow-600",
  GREEN: "text-green-600",
  RED: "text-red-600",
  PURPLE: "text-purple-600",
} as const;

// Rounded corners
export const ROUNDED = {
  SM: "rounded-lg",
  MD: "rounded-xl",
  LG: "rounded-2xl",
  XL: "rounded-3xl",
} as const;

// Shadow styles
export const SHADOW = {
  SM: "shadow-sm",
  MD: "shadow-md",
  LG: "shadow-lg",
  XL: "shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50",
} as const;

// Text styles
export const CARD_TEXT = {
  TITLE: "text-3xl font-bold text-gray-900 dark:text-white leading-tight",
  SUBTITLE: "text-gray-600 dark:text-gray-400 mt-3 text-lg leading-relaxed",
} as const;
