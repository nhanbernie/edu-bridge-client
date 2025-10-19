"use client";

import { GraduationCap, Users, Star, BookOpen } from "lucide-react";
import { StatsCard } from "@/features/marketing/components";
import React from "react";
import { EBLogo, EBThemeToggle } from "@/components/common";
import { useTranslations } from "next-intl";
import EBLogoLayout from "./components/EBLogoLayout";

const EBAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("marketing.auth");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/30 to-accent/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Marketing Content */}

            <div className="space-y-8">
              <div className="flex justify-start">
                <EBLogoLayout
                  imageFolder="/logo"
                  imageName="edubridge-logo-text"
                  extension="png"
                  height={100}
                  alt="EduBridge Logo"
                  clickable={true}
                  objectFit="contain"
                  className="mr-auto"
                />
              </div>
              {/* Main Headline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {t("welcome")}{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    EduBridge
                  </span>
                </h2>
                {/* <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {t("subtitle")}
                </p> */}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <StatsCard
                  icon={Users}
                  number="10,000+"
                  label={t("stats.students")}
                  iconColor="text-primary"
                />
                <StatsCard
                  icon={BookOpen}
                  number="500+"
                  label={t("stats.tutors")}
                  iconColor="text-primary"
                />
                <StatsCard
                  icon={Star}
                  number="4.9"
                  label={t("stats.rating")}
                  iconColor="text-accent"
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

export default EBAuthLayout;
