"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EBMotionCard } from "@/components/motion";
import { CheckCircle, Clock, Circle, Mail, Phone, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { simpleCardVariants } from "@/constants/motion/cardMotion.constant";

interface ProfileUnderReviewProps {
  title?: string;
  description?: string;
  currentStep?: "submitted" | "review" | "pending";
  onGoToDashboard?: () => void;
  className?: string;
}

const ProfileUnderReview: React.FC<ProfileUnderReviewProps> = ({
  title = "Profile Under Review",
  description = "Thank you for submitting your tutor application! Our team is reviewing your profile and documents.",
  currentStep = "review",
  onGoToDashboard,
  className,
}) => {
  const steps = [
    {
      id: "submitted",
      label: "Profile Submitted",
      icon: CheckCircle,
      status: "completed",
    },
    {
      id: "review",
      label: "Under Review",
      icon: Clock,
      status:
        currentStep === "submitted" ? "pending" : currentStep === "review" ? "active" : "completed",
    },
    {
      id: "pending",
      label: "Approval Pending",
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
        "max-w-2xl mx-auto bg-card/95 backdrop-blur-sm border border-border shadow-lg",
        className
      )}
      variants={simpleCardVariants}
    >
      <div className="p-8 text-center">
        {/* Animated Clock Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center shadow-lg">
            {/* Spinning border */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-foreground/30 animate-spin"></div>
            <Clock className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{description}</p>

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
                      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                    isActive && "bg-primary/10 text-primary animate-pulse",
                    isPending && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted && "text-green-600 dark:text-green-400",
                    isActive && "text-primary",
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
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">What happens next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                Our team will review your profile and documents within 24-48 hours
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                You&apos;ll receive an email notification once your profile is approved
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                We may contact you if additional information is needed
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-muted-foreground text-sm mb-6">
          In the meantime, you can explore your dashboard and familiarize yourself with the
          platform.
        </p>
      </div>
    </EBMotionCard>
  );
};

export default ProfileUnderReview;
