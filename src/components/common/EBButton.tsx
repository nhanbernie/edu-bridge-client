import React, { forwardRef } from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

// Button variants using CVA for better type safety and consistency
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 hover:bg-emerald-700 text-white",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        ghost: "text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500",
        link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Icon position type
type IconPosition = "left" | "right";

// Button props interface
export interface EBButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Loading state
  loading?: boolean;
  // Icon component (from lucide-react or custom)
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  // Icon position
  iconPosition?: IconPosition;
  // Icon size
  iconSize?: number;
  // Custom loading text
  loadingText?: string;
  // As child (for composition)
  asChild?: boolean;
}

// Forward ref button component
const EBButton = forwardRef<HTMLButtonElement, EBButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      icon: Icon,
      iconPosition = "left",
      iconSize = 16,
      loadingText,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = disabled || loading;

    // Render loading icon
    const LoadingIcon = () => <Loader2 size={iconSize} className="animate-spin" />;

    // Render custom icon
    const CustomIcon = () => Icon && <Icon size={iconSize} />;

    // Render button content based on loading state and icon position
    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingIcon />
            {loadingText || children}
          </>
        );
      }

      if (Icon && iconPosition === "left") {
        return (
          <>
            <CustomIcon />
            {children}
          </>
        );
      }

      if (Icon && iconPosition === "right") {
        return (
          <>
            {children}
            <CustomIcon />
          </>
        );
      }

      return children;
    };

    // If asChild is true, return a slot-like component (for advanced composition)
    if (asChild) {
      return (
        <span className={cn(buttonVariants({ variant, size, className }))} {...props}>
          {children}
        </span>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

EBButton.displayName = "EBButton";

export default EBButton;
