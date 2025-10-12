"use client";

import React from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useRegisterFlow from "./hooks/useRegisterFlow";

const RegisterFeature = () => {
  const { step, email, isResending, handleRegisterSubmit, handleVerifyOtpSubmit, handleResendOtp } =
    useRegisterFlow();

  const getStepContent = () => {
    switch (step) {
      case "register":
        return {
          title: "Tạo tài khoản mới",
          description: "Tham gia EduBridge để kết nối với các gia sư tốt nhất",
          formType: "register" as const,
          onSubmit: handleRegisterSubmit,
          showResendButton: false,
        };
      case "verifyEmail":
        return {
          title: "Xác thực email",
          description: "Nhập mã OTP đã được gửi đến email của bạn",
          formType: "verifyOTP" as const,
          onSubmit: handleVerifyOtpSubmit,
          showResendButton: true,
        };
      default:
        return {
          title: "Tạo tài khoản mới",
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
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{stepContent.title}</h3>
            <p className="text-gray-600 text-sm">{stepContent.description}</p>
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
                {isResending ? "Đang gửi lại..." : "Gửi lại mã OTP"}
              </button>
            </div>
          )}
        </div>
      </div>
    </EBAuthLayout>
  );
};

export default RegisterFeature;
