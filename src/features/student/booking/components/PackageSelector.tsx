"use client";

import React from "react";
import { EBMotionCard } from "@/components/motion/EBMotionCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { slideUpVariants } from "@/components/motion";
import { Loader2, Package } from "lucide-react";
import type { PackageDto, PackageType } from "@/services/course/type";

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
  // Helper function to get package type name
  const getPackageTypeName = (packageType: number): string => {
    const typeNames = {
      0: "Buổi học thử",
      1: "Gói cơ bản",
      2: "Gói tiêu chuẩn",
      3: "Gói cao cấp",
      4: "Gói tùy chỉnh",
    };
    return typeNames[packageType as keyof typeof typeNames] || "Gói học";
  };

  // Transform API packages to display format
  const packages =
    apiPackages?.map((pkg) => ({
      id: pkg.packageId,
      name: getPackageTypeName(pkg.packageType),
      description: `${pkg.numberOfSessions} buổi học`,
      sessions: pkg.numberOfSessions,
      price: pkg.price / 1000, // Convert to thousands
      originalPrice: pkg.packageType === 2 ? (pkg.price * 1.2) / 1000 : null, // Add 20% as original price for popular packages
      popular: pkg.packageType === 2, // Standard package is popular
    })) || [];

  // Loading state
  if (isLoading) {
    return (
      <EBMotionCard
        className="text-card-foreground p-0 border-0 shadow-none hover:shadow-none"
        variants={slideUpVariants}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Chọn gói học</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải gói học...</span>
        </div>
      </EBMotionCard>
    );
  }

  // Empty state
  if (!packages || packages.length === 0) {
    return (
      <EBMotionCard
        className="text-card-foreground p-0 border-0 shadow-none hover:shadow-none"
        variants={slideUpVariants}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Chọn gói học</h3>
        </div>
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có gói học nào</h3>
          <p className="text-gray-500">Khóa học này chưa có gói học nào được tạo.</p>
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
        <h3 className="text-lg font-semibold text-foreground">Chọn gói học</h3>
      </div>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => onPackageChange(pkg.id)}
            className={cn(
              "relative p-4 pt-6 rounded-xl border-2 cursor-pointer transition-all",
              selectedPackage === pkg.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50 hover:shadow-sm"
            )}
          >
            {pkg.popular && (
              <Badge className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1">
                Phổ biến nhất
              </Badge>
            )}

            <div className="flex justify-between items-start pr-8">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base">{pkg.name}</h3>
                {/* <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p> */}
                <p className="text-xs text-muted-foreground mt-1">
                  {pkg.sessions} buổi học trong tháng
                </p>
              </div>

              <div className="text-right ml-4 min-w-fit">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {formatVNDPrice(pkg.price)}đ
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatVNDPrice(pkg.originalPrice)}đ
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{pkg.sessions} buổi</div>
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={cn(
                "absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all",
                selectedPackage === pkg.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30 bg-background"
              )}
            >
              {selectedPackage === pkg.id && (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
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
