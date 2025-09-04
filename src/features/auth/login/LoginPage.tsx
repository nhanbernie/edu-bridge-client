"use client";

import React from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";

const LoginFeature = () => {
  const handleLoginSubmit = async (data: any) => {
    console.log("Login submitted:", data);
    // TODO: Implement login API call here
    try {
      // Example: await loginAPI(data.email, data.password);
      // Handle success: redirect to dashboard
    } catch (error) {
      // Handle error: show error message
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng đến với EduBridge</h3>
          </div>

          {/* Auth Form with login type */}
          <AuthForm type="login" onSubmit={handleLoginSubmit} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginFeature;
