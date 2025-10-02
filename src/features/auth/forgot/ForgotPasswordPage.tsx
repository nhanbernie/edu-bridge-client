"use client";

import React from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useForgotPasswordFlow from "./hooks/useForgotPasswordFlow";

const ForgotPasswordFeature = () => {
  const {
    step,
    email,
    isResending,
    handleEmailSubmit,
    handleOtpSubmit,
    handleResetSubmit,
    handleResendOtp,
  } = useForgotPasswordFlow();

  const getStepContent = () => {
    switch (step) {
      case "email":
        return {
          title: "Quên mật khẩu?",
          description: "Nhập email của bạn để nhận mã OTP đặt lại mật khẩu",
          formType: "forgotPassword" as const,
          onSubmit: handleEmailSubmit,
          showResendButton: false,
        };
      case "otp":
        return {
          title: "Xác thực OTP",
          description: "Nhập mã OTP đã được gửi đến email của bạn",
          formType: "verifyOTP" as const,
          onSubmit: handleOtpSubmit,
          showResendButton: true,
        };
      case "reset":
        return {
          title: "Đặt lại mật khẩu",
          description: "Nhập mật khẩu mới cho tài khoản của bạn",
          formType: "resetPassword" as const,
          onSubmit: handleResetSubmit,
          showResendButton: false,
        };
      default:
        return {
          title: "Quên mật khẩu?",
          description: "Nhập email của bạn để nhận mã OTP đặt lại mật khẩu",
          formType: "forgotPassword" as const,
          onSubmit: handleEmailSubmit,
          showResendButton: false,
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <EBAuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{stepContent.title}</h3>
            <p className="text-gray-600 text-sm">{stepContent.description}</p>
          </div>

          <AuthForm 
            type={stepContent.formType} 
            onSubmit={stepContent.onSubmit}
            email={step === "otp" || step === "reset" ? email : undefined}
          />

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

export default ForgotPasswordFeature;
