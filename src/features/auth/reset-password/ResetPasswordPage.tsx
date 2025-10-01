"use client";

import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useResetPasswordSubmit from "./hooks/useResetPasswordSubmit";

interface ResetPasswordPageProps {
  searchParams: {
    email?: string;
  };
}

const ResetPasswordFeature = ({ searchParams }: ResetPasswordPageProps) => {
  const handleResetPasswordSubmit = useResetPasswordSubmit();
  const email = searchParams?.email;

  if (!email) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lỗi</h3>
              <p className="text-gray-600">Email không hợp lệ. Vui lòng thử lại.</p>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Đặt lại mật khẩu</h3>
            <p className="text-gray-600 text-sm">
              Nhập mật khẩu mới cho tài khoản của bạn
            </p>
          </div>

          {/* Auth Form with resetPassword type */}
          <AuthForm 
            type="resetPassword" 
            onSubmit={handleResetPasswordSubmit} 
            email={email}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordFeature;
