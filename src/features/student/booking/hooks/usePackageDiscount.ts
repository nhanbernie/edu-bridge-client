import { useMemo } from "react";

interface DiscountConfig {
  [key: string]: number;
}

// Discount configuration: packageType -> discount percentage
const DISCOUNT_CONFIG: DiscountConfig = {
  FOUR: 0.05,   // 5% discount
  EIGHT: 0.10,  // 10% discount
  TWELVE: 0.15, // 15% discount
};

interface UsePackageDiscountReturn {
  getOriginalPrice: (packageType: string, discountedPrice: number) => number | null;
  getDiscountPercentage: (packageType: string) => number | null;
  hasDiscount: (packageType: string) => boolean;
}

/**
 * Custom hook to handle package discount calculations
 * 
 * @returns Object containing discount helper functions
 */
export const usePackageDiscount = (): UsePackageDiscountReturn => {
  /**
   * Calculate original price before discount
   * 
   * @param packageType - Type of package (FOUR, EIGHT, TWELVE, etc.)
   * @param discountedPrice - Current price after discount
   * @returns Original price or null if no discount
   */
  const getOriginalPrice = useMemo(
    () => (packageType: string, discountedPrice: number): number | null => {
      const discount = DISCOUNT_CONFIG[packageType];
      if (discount && discount > 0) {
        return discountedPrice / (1 - discount);
      }
      return null;
    },
    []
  );

  /**
   * Get discount percentage for a package type
   * 
   * @param packageType - Type of package
   * @returns Discount percentage (0-1) or null if no discount
   */
  const getDiscountPercentage = useMemo(
    () => (packageType: string): number | null => {
      return DISCOUNT_CONFIG[packageType] ?? null;
    },
    []
  );

  /**
   * Check if package type has discount
   * 
   * @param packageType - Type of package
   * @returns True if package has discount
   */
  const hasDiscount = useMemo(
    () => (packageType: string): boolean => {
      const discount = DISCOUNT_CONFIG[packageType];
      return discount !== undefined && discount > 0;
    },
    []
  );

  return {
    getOriginalPrice,
    getDiscountPercentage,
    hasDiscount,
  };
};

