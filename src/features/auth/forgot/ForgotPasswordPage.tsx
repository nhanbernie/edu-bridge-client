"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
// import useForgotPasswordSubmit from "./hooks/useForgotPasswordSubmit";

const ForgotPasswordFeature = () => {
  // const handleForgotPasswordSubmit = useForgotPasswordSubmit();
  const handleForgotPasswordSubmit = {};
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
