"use client";

import React from "react";
import EBAuthLayout from "@/components/layouts/EBAuthLayout";
import AuthForm from "@/components/form/auth/AuthForm";
import useLoginSubmit from "./hooks/useLoginSubmit";
import { useTranslations } from "next-intl";

const LoginFeature = () => {
  const t = useTranslations("auth.login");
  const handleLoginSubmit = useLoginSubmit();

  return (
    <EBAuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* EBHeader */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h3>
          </div>

          {/* Auth Form with login type */}
          <AuthForm type="login" onSubmit={handleLoginSubmit} />
        </div>
      </div>
    </EBAuthLayout>
  );
};

export default LoginFeature;
