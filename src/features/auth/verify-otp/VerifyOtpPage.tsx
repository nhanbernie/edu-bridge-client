"use client";

import React, { useState } from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useVerifyOtpSubmit from "./hooks/useVerifyOtpSubmit";
import { useResendOtpMutation } from "@/services/auth/auth.service";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/auth.slice";
import { toast } from "sonner";

interface VerifyOtpPageProps {
  searchParams: {
    email?: string;
  };
}

const VerifyOtpFeature = ({ searchParams }: VerifyOtpPageProps) => {
  const handleVerifyOtpSubmit = useVerifyOtpSubmit();
  const email = searchParams?.email;
  const dispatch = useAppDispatch();
  const [resendOtpMutation] = useResendOtpMutation();
  const [isResending, setIsResending] = useState(false);

  const handleResendOtp = async () => {
    if (!email) return;
    
    try {
      setIsResending(true);
      dispatch(setLoading(true));
      const result = await resendOtpMutation({ email }).unwrap();

      if (result.success) {
        toast.success(result.message || "OTP đã được gửi lại");
      } else {
        throw new Error(result.message || "Không thể gửi lại OTP");
      }
    } catch (error: any) {
      let errorMessage = "Không thể gửi lại OTP. Vui lòng thử lại.";
      if (error?.data?.message) errorMessage = error.data.message;
      else if (error?.message) errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
      dispatch(setLoading(false));
    }
  };

  if (!email) {
    return (
      <EBAuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lỗi</h3>
              <p className="text-gray-600">Email không hợp lệ. Vui lòng thử lại.</p>
            </div>
          </div>
        </div>
      </EBAuthLayout>
    );
  }

  return (
    <EBAuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* EBHeader */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Xác thực OTP</h3>
            <p className="text-gray-600 text-sm">
              Nhập mã OTP đã được gửi đến email của bạn
            </p>
          </div>

          {/* Auth Form with verifyOTP type */}
          <AuthForm 
            type="verifyOTP" 
            onSubmit={handleVerifyOtpSubmit} 
            email={email}
          />

          {/* Resend OTP Button */}
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
        </div>
      </div>
    </EBAuthLayout>
  );
};

export default VerifyOtpFeature;
