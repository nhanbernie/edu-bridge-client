"use client";

import React from "react";
import { MotionCard } from "@/components/motion/MotionCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { slideUpVariants } from "@/components/motion";

interface PackageSelectorProps {
  selectedPackage: string | null;
  onPackageChange: (packageId: string) => void;
}

const PackageSelector: React.FC<PackageSelectorProps> = ({ selectedPackage, onPackageChange }) => {
  const packages = [
    {
      id: "basic",
      name: "Buổi học đơn lẻ",
      description: "Học thử hoặc học ngắn hạn",
      sessions: 1,
      price: 550,
      originalPrice: null,
      popular: false,
    },
    {
      id: "standard",
      name: "Gói tháng",
      description: "4 buổi học trong tháng",
      sessions: 4,
      price: 1980,
      originalPrice: 2200,
      popular: true,
    },
    {
      id: "premium",
      name: "Gói chuyên sâu",
      description: "8 buổi học trong tháng",
      sessions: 8,
      price: 3520,
      originalPrice: 4400,
      popular: false,
    },
    {
      id: "intensive",
      name: "Gói chuyên sâu",
      description: "12 buổi học trong tháng",
      sessions: 12,
      price: 4950,
      originalPrice: 6600,
      popular: false,
    },
  ];

  return (
    <MotionCard
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
                <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {pkg.sessions} buổi học trong tháng
                </p>
              </div>

              <div className="text-right ml-4 min-w-fit">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {pkg.price.toLocaleString()}đ
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {pkg.originalPrice.toLocaleString()}đ
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
    </MotionCard>
  );
};

export default PackageSelector;
