"use client";

import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useRegisterSubmit from "./hooks/useRegisterSubmit";

const RegisterFeature = () => {
  const handleRegisterSubmit = useRegisterSubmit();

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h3>
            <p className="text-gray-600 text-sm">
              Tham gia EduBridge để kết nối với các gia sư tốt nhất
            </p>
          </div>

          {/* Auth Form with register type */}
          <AuthForm type="register" onSubmit={handleRegisterSubmit} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterFeature;
