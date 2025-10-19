"use client";

import React from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useRegisterFlow from "./hooks/useRegisterFlow";
import { useTranslations } from "next-intl";

const RegisterFeature = () => {
  const t = useTranslations("auth");
  const { step, email, isResending, handleRegisterSubmit, handleVerifyOtpSubmit, handleResendOtp } =
    useRegisterFlow();

  const getStepContent = () => {
    switch (step) {
      case "register":
        return {
          title: t("register.title"),
          description: "Tham gia EduBridge để kết nối với các gia sư tốt nhất",
          formType: "register" as const,
          onSubmit: handleRegisterSubmit,
          showResendButton: false,
        };
      case "verifyEmail":
        return {
          title: t("verifyOTP.title"),
          description: t("verifyOTP.subtitle"),
          formType: "verifyOTP" as const,
          onSubmit: handleVerifyOtpSubmit,
          showResendButton: true,
        };
      default:
        return {
          title: t("register.title"),
          description: "Tham gia EduBridge để kết nối với các gia sư tốt nhất",
          formType: "register" as const,
          onSubmit: handleRegisterSubmit,
          showResendButton: false,
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <EBAuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">{stepContent.title}</h3>
            <p className="text-muted-foreground text-sm">{stepContent.description}</p>
          </div>

          {/* Auth Form */}
          <AuthForm
            type={stepContent.formType}
            onSubmit={stepContent.onSubmit}
            email={step === "verifyEmail" ? email : undefined}
          />

          {/* Resend OTP Button */}
          {stepContent.showResendButton && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-primary hover:text-primary/80 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? "Đang gửi lại..." : t("verifyOTP.resendButton")}
              </button>
            </div>
          )}
        </div>
      </div>
    </EBAuthLayout>
  );
};

export default RegisterFeature;
