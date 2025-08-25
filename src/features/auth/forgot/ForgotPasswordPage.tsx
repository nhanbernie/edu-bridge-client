"use client";

import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";

const ForgotPasswordFeature = () => {
  const handleForgotPasswordSubmit = async (data: any) => {
    console.log("Forgot password submitted:", data);
    // TODO: Implement forgot password API call here
    try {
      // Example: await forgotPasswordAPI(data.email);
      // Handle success: show success message, redirect to check email
    } catch (error) {
      // Handle error: show error message
      console.error("Forgot password failed:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quên mật khẩu?</h3>
            <p className="text-gray-600 text-sm">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
          </div>

          {/* Auth Form with forgotPassword type */}
          <AuthForm type="forgotPassword" onSubmit={handleForgotPasswordSubmit} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordFeature;
