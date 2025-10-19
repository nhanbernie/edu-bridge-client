"use client";

import { EBMotionCard } from "@/components/motion/EBMotionCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { slideUpVariants } from "@/components/motion";
import { Loader2, Package } from "lucide-react";
import type { PackageDto } from "@/services/course/type";
import { useTranslations } from "next-intl";

// Format Vietnamese currency
const formatVNDPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

interface PackageSelectorProps {
  selectedPackage: string | null;
  onPackageChange: (packageId: string) => void;
  packages?: PackageDto[];
  isLoading?: boolean;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({
  selectedPackage,
  onPackageChange,
  packages: apiPackages,
  isLoading,
}) => {
  const t = useTranslations("student.booking.packageSelector");

  // Helper function to get package type name
  const getPackageTypeName = (packageType: string): string => {
    return t(`packageTypes.${packageType}` as any) || t("packageTypes.SINGLE");
  };

  // Transform API packages to display format
  const packages =
    apiPackages?.map((pkg) => ({
      id: pkg.packageId,
      name: getPackageTypeName(pkg.packageType as string),
      description: `${pkg.numberOfSessions} ${t("sessions")}`,
      sessions: pkg.numberOfSessions,
      price: pkg.price,
      originalPrice: (pkg.packageType as string) === "EIGHT" ? pkg.price * 1.15 : null,
      popular: (pkg.packageType as string) === "EIGHT",
      isTrial: (pkg.packageType as string) === "TRIAL",
      packageType: pkg.packageType as string,
    })) || [];

  // Sort: TRIAL first, then by price
  const sortedPackages = [...packages].sort((a, b) => {
    if (a.isTrial) return -1; // TRIAL always first
    if (b.isTrial) return 1;
    return a.price - b.price; // Others sort by price
  });

  // Loading state
  if (isLoading) {
    return (
      <EBMotionCard
        className="text-card-foreground p-0 border-0 shadow-none hover:shadow-none"
        variants={slideUpVariants}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">{t("loading")}</span>
        </div>
      </EBMotionCard>
    );
  }

  // Empty state
  if (!sortedPackages || sortedPackages.length === 0) {
    return (
      <EBMotionCard
        className="text-card-foreground p-0 border-0 shadow-none hover:shadow-none"
        variants={slideUpVariants}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>
        </div>
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t("empty.title")}</h3>
          <p className="text-gray-500">{t("empty.description")}</p>
        </div>
      </EBMotionCard>
    );
  }

  return (
    <EBMotionCard
      className="text-card-foreground p-0 border-0 shadow-none  hover:shadow-none"
      variants={slideUpVariants}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>
      </div>
      <div className="space-y-4">
        {sortedPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => onPackageChange(pkg.id)}
            className={cn(
              "relative p-4 pt-6 rounded-xl border-2 cursor-pointer transition-all",
              pkg.isTrial
                ? "border-transparent bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-purple-900/30 shadow-lg overflow-hidden"
                : selectedPackage === pkg.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50 hover:shadow-sm"
            )}
          >
            {/* Animated border for TRIAL package */}
            {pkg.isTrial && (
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 dark:from-rose-500 dark:via-pink-500 dark:to-purple-500 bg-[length:200%_100%] animate-border-flow" />
                <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-purple-900/30" />
              </div>
            )}

            {pkg.isTrial && (
              <Badge className="absolute -top-0.5 left-4 bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-500 dark:to-pink-600 text-white text-xs px-3 py-1 shadow-md z-10">
                {t("trialBadge")}
              </Badge>
            )}
            {pkg.popular && !pkg.isTrial && (
              <Badge className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1">
                {t("popularBadge")}
              </Badge>
            )}

            <div className="flex justify-between items-start pr-8 relative z-10">
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "font-semibold text-base",
                    pkg.isTrial ? "text-rose-900 dark:text-rose-200" : "text-foreground"
                  )}
                >
                  {pkg.name}
                </h3>
                <p
                  className={cn(
                    "text-xs mt-1",
                    pkg.isTrial ? "text-rose-700 dark:text-rose-400" : "text-muted-foreground"
                  )}
                >
                  {pkg.sessions} {t("sessionsPerMonth")}
                </p>
                {pkg.isTrial && (
                  <p className="text-[11px] text-pink-600 dark:text-pink-300 mt-1.5 font-medium leading-tight">
                    {t("charitySupport")}
                  </p>
                )}
              </div>

              <div className="text-right ml-4 min-w-fit">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-lg font-bold",
                        pkg.isTrial ? "text-pink-600 dark:text-pink-300" : "text-primary"
                      )}
                    >
                      {formatVNDPrice(pkg.price)}đ
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatVNDPrice(pkg.originalPrice)}đ
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      pkg.isTrial ? "text-pink-600 dark:text-pink-300" : "text-muted-foreground"
                    )}
                  >
                    {pkg.sessions} {t("sessions")}
                  </div>
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={cn(
                "absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all z-10",
                selectedPackage === pkg.id
                  ? pkg.isTrial
                    ? "border-pink-500 dark:border-pink-300 bg-pink-500 dark:bg-pink-300"
                    : "border-primary bg-primary"
                  : "border-muted-foreground/30 bg-background"
              )}
            >
              {selectedPackage === pkg.id && (
                <div
                  className={cn(
                    "w-full h-full rounded-full flex items-center justify-center",
                    pkg.isTrial ? "bg-pink-500 dark:bg-pink-300" : "bg-primary"
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </EBMotionCard>
  );
};

export default PackageSelector;
