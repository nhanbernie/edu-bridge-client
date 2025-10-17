"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";
import EBActionsMenu, { type ActionItem } from "./EBActionsMenu";
import { EBMotionCard, EBButtonAction } from "@/components/motion";
import { flashButtonVariants } from "@/common/constants/motion/button.constants";
// Types
interface CourseData {
  id: string;
  title: string;
  tutorId: string;
  tutorName: string;
  price: { min: number; max: number };
  duration: string;
  students: number;
  popular?: boolean;
}

interface EBTutorCourseCardProps {
  course?: number;
  mode?: "user" | "tutor";
  courseData: CourseData;
  actions?: ActionItem[];
  onClick?: () => void;
}

const EBTutorCourseCard: React.FC<EBTutorCourseCardProps> = ({
  course,
  mode = "user",
  courseData,
  actions = [],
  onClick,
}) => {
  const t = useTranslations("components.tutorCourseCard");
  const { push } = useLocaleRouter();

  const handleBooking = () => {
    // Navigate to booking page với tutor ID và course ID
    push(`/student/booking/${courseData.tutorId}?courseId=${courseData.id}`);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <EBMotionCard
      variant="base"
      className="hover:shadow-lg transition-shadow cursor-pointer"
      initial={undefined}
      animate={undefined}
      whileHover={undefined}
      whileTap={undefined}
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-foreground">{courseData.title}</h3>
          <div className="flex items-center gap-2">
            {courseData.popular && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {t("popular")}
              </Badge>
            )}
            {mode === "tutor" && actions.length > 0 && (
              <div onClick={(e) => e.stopPropagation()}>
                <EBActionsMenu actions={actions} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{t("studentsEnrolled", { count: courseData.students })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{courseData.duration}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary">
                {courseData.price.min.toLocaleString()} - {courseData.price.max.toLocaleString()}{" "}
                {t("currency")}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Info className="h-3 w-3" />
                <span>{t("priceInfo")}</span>
              </div>
            </div>
            {mode === "user" && (
              <EBButtonAction
                variants={flashButtonVariants}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  handleBooking();
                }}
              >
                {t("enrollButton")}
              </EBButtonAction>
            )}
          </div>
        </div>
      </div>
    </EBMotionCard>
  );
};

export default EBTutorCourseCard;
export type { CourseData, EBTutorCourseCardProps };
