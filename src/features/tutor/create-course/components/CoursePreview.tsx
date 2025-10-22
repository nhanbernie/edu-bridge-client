"use client";

import { Clock, Users, Info, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseFormData } from "@/components/form/course";
import { useTranslations } from "next-intl";
import { usePackageDiscount } from "@/features/student/booking/hooks";

interface CoursePreviewProps {
  formData: CourseFormData | null;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ formData }) => {
  const t = useTranslations("tutor.courses.create.preview");
  const { getOriginalPrice, getDiscountPercentage } = usePackageDiscount();

  // Default preview data
  const previewData = {
    title: formData?.title || t("defaultTitle"),
    subjects: formData?.subjects || [],
    description: formData?.description || t("defaultDescription"),
    hoursPerSession: formData?.hoursPerSession || "2",
    hourlyRate: formData?.hourlyRate || 100000,
    students: 0, // New course, no students yet
    popular: false,
  };

  const getSubjectLabel = (value: string) => {
    // Valid subject keys from translation file
    const validKeys = ["math", "physics", "chemistry", "biology", "english", "literature", "history", "geography"];
    
    // If value is a valid key, use translation, otherwise return as-is
    return validKeys.includes(value.toLowerCase()) ? value : value;
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5 text-muted-foreground" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Course Preview Card */}
        <Card className="hover:shadow-md transition-shadow border border-border rounded-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-foreground line-clamp-2">
                {previewData.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {previewData.subjects.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {previewData.subjects.map(getSubjectLabel).join(", ")}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3">{previewData.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{previewData.students} {t("stats.students")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{previewData.hoursPerSession}{t("stats.hoursPerSession")}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">
                    {previewData.hourlyRate.toLocaleString()} {t("price.currency")}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Info className="h-3 w-3" />
                    <span>{t("price.label")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Packages Preview */}
        <div className="mt-6">
          <h4 className="font-medium text-foreground mb-3">{t("packages.title")}</h4>
          <div className="space-y-3">
            {[
              { sessions: 4, packageType: "FOUR" },
              { sessions: 8, packageType: "EIGHT" },
              { sessions: 12, packageType: "TWELVE" },
            ].map((pkg) => {
              // Calculate base price (before discount)
              const basePrice = previewData.hourlyRate * pkg.sessions;
              
              // Get discount percentage for this package
              const discountPercentage = getDiscountPercentage(pkg.packageType);
              
              // Calculate discounted price
              const discountedPrice = discountPercentage 
                ? basePrice * (1 - discountPercentage)
                : basePrice;
              
              // Get original price using hook
              const originalPrice = getOriginalPrice(pkg.packageType, discountedPrice);
              
              // Calculate display discount percentage
              const displayDiscount = discountPercentage ? Math.round(discountPercentage * 100) : 0;

              return (
                <div
                  key={pkg.sessions}
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-lg text-sm min-h-[60px]"
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-foreground">
                      {t(`packages.sessions.${pkg.sessions}`)}
                    </span>
                    {displayDiscount > 0 && (
                      <Badge variant="secondary" className="mt-1 text-xs w-fit">
                        {t("packages.discount", { discount: displayDiscount })}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    {originalPrice ? (
                      <>
                        <div className="text-primary font-semibold">
                          {discountedPrice.toLocaleString()} {t("price.currency")}
                        </div>
                        <div className="text-xs text-muted-foreground line-through">
                          {originalPrice.toLocaleString()} {t("price.currency")}
                        </div>
                      </>
                    ) : (
                      <div className="text-foreground font-semibold">
                        {discountedPrice.toLocaleString()} {t("price.currency")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary">
            <Info className="h-4 w-4 inline mr-1" />
            {t("note")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursePreview;
