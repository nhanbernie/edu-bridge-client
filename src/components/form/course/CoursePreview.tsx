"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Info, Eye } from "lucide-react";
import { CourseFormData } from "./CourseForm";
import { smoothCardVariants } from "@/common/constants/motion/cardMotion.constant";
import { EBMotionCard } from "@/components/motion";

interface CoursePreviewProps {
  formData: CourseFormData | null;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ formData }) => {
  const t = useTranslations("tutor.courses.create.preview");
  const tSubjects = useTranslations("tutor.courses.create.subjects");

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
    // Map Vietnamese subject names back to English keys
    const subjectKeyMap: { [key: string]: string } = {
      Toán: "math",
      "Vật lý": "physics",
      "Hóa học": "chemistry",
      "Sinh học": "biology",
      "Tiếng Anh": "english",
      "Ngữ văn": "literature",
      "Lịch sử": "history",
      "Địa lý": "geography",
    };

    // Valid subject keys from translation file
    const validKeys = ["math", "physics", "chemistry", "biology", "english", "literature", "history", "geography"];

    const key = subjectKeyMap[value] || value;
    
    // Only use translation if key is valid, otherwise return the original value
    if (validKeys.includes(key)) {
      return tSubjects(key as any);
    }
    
    return value;
  };

  return (
    <Card className="shadow-sm border-border rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5 text-muted-foreground" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Course Preview Card */}
        <EBMotionCard
          variants={smoothCardVariants}
          className="hover:shadow-md transition-shadow border border-border rounded-lg"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-foreground line-clamp-2">
                {previewData.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {previewData.popular && <Badge variant="secondary">Phổ biến</Badge>}
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
              <p className="text-sm text-muted-foreground line-clamp-3">
                {previewData.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {previewData.students} {t("stats.students")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {previewData.hoursPerSession}
                    {t("stats.hoursPerSession")}
                  </span>
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
        </EBMotionCard>

        {/* Pricing Packages Preview */}
        <div className="mt-6">
          <h4 className="font-medium text-foreground mb-3">{t("packages.title")}</h4>
          <div className="space-y-3">
            {[
              { sessions: 4, discount: 0, label: t("packages.sessions.4") },
              { sessions: 8, discount: 10, label: t("packages.sessions.8") },
              { sessions: 12, discount: 15, label: t("packages.sessions.12") },
            ].map((pkg) => {
              const originalPrice = previewData.hourlyRate * pkg.sessions;
              const discountedPrice = originalPrice * (1 - pkg.discount / 100);

              return (
                <EBMotionCard
                  variants={smoothCardVariants}
                  key={pkg.sessions}
                  className="hover:shadow-md transition-shadow border border-border rounded-lg  flex justify-between items-center p-4 bg-muted/50 text-sm min-h-[60px]"
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-foreground">{pkg.label}</span>
                    {pkg.discount > 0 && (
                      <Badge variant="secondary" className="mt-1 text-xs w-fit">
                        {t("packages.discount", { discount: pkg.discount })}
                      </Badge>
                    )}
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    {pkg.discount > 0 ? (
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
                        {originalPrice.toLocaleString()} {t("price.currency")}
                      </div>
                    )}
                  </div>
                </EBMotionCard>
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
