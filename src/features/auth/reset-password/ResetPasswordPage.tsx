"use client";

import React from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
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
      <EBAuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-border">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Lỗi</h3>
              <p className="text-muted-foreground">Email không hợp lệ. Vui lòng thử lại.</p>
            </div>
          </div>
        </div>
      </EBAuthLayout>
    );
  }

  return (
    <EBAuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-border">
          {/* EBHeader */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Đặt lại mật khẩu</h3>
            <p className="text-muted-foreground text-sm">Nhập mật khẩu mới cho tài khoản của bạn</p>
          </div>

          {/* Auth Form with resetPassword type */}
          <AuthForm type="resetPassword" onSubmit={handleResetPasswordSubmit} email={email} />
        </div>
      </div>
    </EBAuthLayout>
  );
};

export default ResetPasswordFeature;
