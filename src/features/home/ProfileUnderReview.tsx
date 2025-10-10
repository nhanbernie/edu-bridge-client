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
  title = "Hồ sơ đang được xem xét",
  description = "Cảm ơn bạn đã gửi hồ sơ gia sư! Đội ngũ của chúng tôi đang xem xét hồ sơ và tài liệu của bạn.",
  currentStep = "review",
  onGoToDashboard,
  className,
}) => {
  const steps = [
    {
      id: "submitted",
      label: "Đã gửi hồ sơ",
      icon: CheckCircle,
      status: "completed",
    },
    {
      id: "review",
      label: "Đang xem xét",
      icon: Clock,
      status:
        currentStep === "submitted" ? "pending" : currentStep === "review" ? "active" : "completed",
    },
    {
      id: "pending",
      label: "Chờ phê duyệt",
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
        "max-w-lg mx-auto bg-white border border-gray-200 shadow-sm rounded-4xl",
        className
      )}
      variants={simpleCardVariants}
    >
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{description}</p>

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
                    isCompleted && "bg-emerald-100 text-emerald-600",
                    isActive && "bg-orange-100 text-orange-600 animate-pulse scale-110",
                    isPending && "bg-gray-100 text-gray-400"
                  )}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted && "text-emerald-600",
                    isActive && "text-orange-600",
                    isPending && "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* What happens next section */}
        <div className="bg-teal-50 rounded-4xl p-4 mb-6">
          <h3 className="text-base font-medium text-teal-900 mb-3">Điều gì sẽ xảy ra tiếp theo?</h3>
          <div className="space-y-2 text-left">
            <div className="flex items-start space-x-2">
              <Eye className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-teal-800 text-sm">
                Đội ngũ của chúng tôi sẽ xem xét hồ sơ trong vòng 24-48 giờ
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-teal-800 text-sm">
                Bạn sẽ nhận được email thông báo khi hồ sơ được phê duyệt
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Phone className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-teal-800 text-sm">
                Chúng tôi có thể liên hệ nếu cần thêm thông tin
              </span>
            </div>
          </div>
        </div>
      </div>
    </EBMotionCard>
  );
};

export default ProfileUnderReview;
