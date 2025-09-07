"use client";

import { GraduationCap, Users, Star, BookOpen } from "lucide-react";
import { StatsCard } from "@/features/marketing/components";
import React from "react";
import Link from "next/link";
import { EBLogo, EBThemeToggle } from "@/components/common";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}

            <div className="space-y-8">
              <EBLogo />
              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Chào mừng đến với{" "}
                  <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                    EduBridge
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Kết nối với các gia sư có trình độ để học tập cá nhân hóa
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <StatsCard
                  icon={Users}
                  number="10,000+"
                  label="Học sinh"
                  iconColor="text-primary"
                />
                <StatsCard
                  icon={BookOpen}
                  number="500+"
                  label="Gia sư chuyên nghiệp"
                  iconColor="text-teal-600"
                />
                <StatsCard
                  icon={Star}
                  number="4.9"
                  label="Đánh giá trung bình"
                  iconColor="text-yellow-400"
                />
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center lg:justify-end">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
