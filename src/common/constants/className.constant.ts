/**
 * Form Field CSS Constants - Chuẩn hóa styling cho form components
 */

// Base form field styles
export const FORM_FIELD_BASE =
  "w-full h-12 border rounded-lg px-3 py-2 text-foreground bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-background transition-all duration-300 ease-in-out";

// Error states
export const FORM_FIELD_ERROR = "border-destructive bg-destructive/10 focus:ring-destructive/20";

// Normal states
export const FORM_FIELD_NORMAL = "border-border hover:border-border/80 focus:ring-primary/20";

// Textarea specific
export const FORM_FIELD_TEXTAREA =
  "w-full min-h-[100px] border rounded-lg px-3 py-2 text-foreground bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-background transition-all duration-300 ease-in-out resize-none";

// Error message
export const FORM_ERROR_MESSAGE = "text-destructive text-sm mt-1";

// Label
export const FORM_LABEL = "block text-sm font-medium text-foreground mb-2";

// Container
export const FORM_FIELD_CONTAINER = "w-full mb-5";

// max-w-8xl mx-auto p-6
export const MAX_WIDTH_8XL = "max-w-8xl mx-auto p-6";

/**
 * Page Layout CSS Constants - Chuẩn hóa layout cho các trang
 */

// Page container
export const PAGE_CONTAINER = "min-h-screen pt-16";

// Content wrapper
export const CONTENT_WRAPPER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12";

// Page header
export const PAGE_HEADER = "mb-8";

// Page title
export const PAGE_TITLE = "text-3xl font-bold text-foreground mb-2";

// Page subtitle
export const PAGE_SUBTITLE = "text-muted-foreground";

/**
 * Card Component CSS Constants - Card system với rounded-3xl và shadow đẹp
 */

// Base card styles (no border, rounded-3xl, beautiful shadow)
export const CARD_BASE = "eb-card-base";
export const CARD_GLASS = "eb-card-glass";
export const CARD_ELEVATED = "eb-card-elevated";
export const CARD_INTERACTIVE = "eb-card-interactive";

// Card padding utilities
export const CARD_PADDING = "eb-card-padding"; // p-6
export const CARD_PADDING_SM = "eb-card-padding-sm"; // p-4
export const CARD_PADDING_LG = "eb-card-padding-lg"; // p-8

// Card header styles
export const CARD_HEADER = "eb-card-header";
export const CARD_TITLE = "eb-card-title";
export const CARD_DESCRIPTION = "eb-card-description";
