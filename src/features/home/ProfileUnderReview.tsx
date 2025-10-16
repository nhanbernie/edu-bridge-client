"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EBMotionCard } from "@/components/motion";
import { CheckCircle, Clock, Circle, Mail, Phone, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { simpleCardVariants } from "@/constants/motion/cardMotion.constant";
import { useTranslations } from "next-intl";

interface ProfileUnderReviewProps {
  title?: string;
  description?: string;
  currentStep?: "submitted" | "review" | "pending";
  onGoToDashboard?: () => void;
  className?: string;
}

const ProfileUnderReview: React.FC<ProfileUnderReviewProps> = ({
  title,
  description,
  currentStep = "review",
  onGoToDashboard,
  className,
}) => {
  const t = useTranslations("tutor.onboard.profile-under-preview");

  const steps = [
    {
      id: "submitted",
      label: t("steps.submitted"),
      icon: CheckCircle,
      status: "completed",
    },
    {
      id: "review",
      label: t("steps.review"),
      icon: Clock,
      status:
        currentStep === "submitted" ? "pending" : currentStep === "review" ? "active" : "completed",
    },
    {
      id: "pending",
      label: t("steps.pending"),
      icon: Circle,
      status:
        currentStep === "pending"
          ? "active"
          : currentStep === "review" || currentStep === "submitted"
            ? "pending"
            : "completed",
    },
  ];

  return (
    <EBMotionCard
      className={cn(
        "max-w-lg mx-auto bg-card/70 backdrop-blur-sm border border-border shadow-2xl rounded-3xl",
        className
      )}
      variants={simpleCardVariants}
    >
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold text-foreground mb-2">{title || t("title")}</h1>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {description || t("description")}
        </p>

        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-8 space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.status === "active";
            const isCompleted = step.status === "completed";
            const isPending = step.status === "pending";

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Icon */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
                    isCompleted &&
                      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                    isActive && "bg-accent/10 text-accent animate-pulse scale-110",
                    isPending && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted && "text-emerald-600 dark:text-emerald-400",
                    isActive && "text-accent",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* What happens next section */}
        <div className="bg-primary/5 border border-primary/20 rounded-4xl px-3 py-4 mb-6">
          <h3 className="text-base font-medium text-primary mb-3">{t("nextSteps.title")}</h3>
          <div className="space-y-2 text-left">
            <div className="flex items-start space-x-2">
              <Eye className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-sm">{t("nextSteps.review")}</span>
            </div>
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-sm">{t("nextSteps.email")}</span>
            </div>
            <div className="flex items-start space-x-2">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-sm">{t("nextSteps.contact")}</span>
            </div>
          </div>
        </div>
      </div>
    </EBMotionCard>
  );
};

export default ProfileUnderReview;
