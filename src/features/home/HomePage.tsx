"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { EBMotionCard, MotionContainer, MotionItem, choiceCardVariants } from "@/components/motion";
import { BookOpen, GraduationCap, Users, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileUnderReview from "./ProfileUnderReview";
import { useGetAndStoreUser } from "@/hooks/useGetAndStoreUser";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import { useTranslations } from "next-intl";
import EBLogoLayout from "@/components/layouts/components/EBLogoLayout";

const HomeFeature = () => {
  const { user, logout } = useAuth();
  const { push } = useLocaleRouter();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const t = useTranslations("home");

  const shouldShowChoiceCards = user?.status === "PENDING" && user?.role === "USER";

  const shouldShowUserInfo = user?.status === "PENDING" && user?.role === "TUTOR";

  useGetAndStoreUser({ userId: user?.userId });

  useEffect(() => {
    if (!user || isNavigating) {
      setIsCheckingStatus(true);
      return;
    }

    if (user?.status === "APPROVED") {
      if (user?.role === "STUDENT") {
        push("/student");
      } else if (user?.role === "TUTOR") {
        push("/tutor");
      }
    } else {
      setIsCheckingStatus(false);
    }
  }, [user?.status, user?.role, push, user, isNavigating]);

  const handleNavigateToOnboarding = (path: string) => {
    setIsNavigating(true);
    push(path);
  };

  if (isCheckingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EBLoadingSpinner size="lg" message={t("checkingStatus")} />
      </div>
    );
  }

  return (
    <MotionContainer className="min-h-screen bg-background relative overflow-hidden pt-32">
      {/* Logo and Title Section */}
      <MotionItem className="max-w-6xl mx-auto text-center">
        {!shouldShowUserInfo && (
          <div className="mb-16">
            <div className="flex justify-center mb-6">
              <EBLogoLayout
                imageFolder="/logo"
                imageName="edubridge-logo-text-buttom"
                extension="png"
                height={100}
                alt="EduBridge Logo"
                navigateTo="/tutor"
                clickable={true}
                objectFit="contain"
              />
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground mb-2">
              {t("title")}
            </h2>
          </div>
        )}
        {/* Choice Cards - Only show for PENDING status and PENDING role */}
        {shouldShowChoiceCards && (
          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-3xl mx-auto mb-12">
            {/* I want to learn Card */}
            <MotionItem>
              <EBMotionCard
                variants={choiceCardVariants}
                onClick={() => handleNavigateToOnboarding("/onboarding/student")}
                className="group p-10 text-center border-0 bg-card rounded-2xl shadow-lg
                            hover:shadow-xl hover:shadow-primary/20
                            transition-all duration-300 ease-out cursor-pointer flex flex-col"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="bg-primary text-primary-foreground p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center
                                   shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105"
                  >
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {t("choiceCards.learn.title")}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {t("choiceCards.learn.description")}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-4 mt-10">
                  <div className="flex flex-col items-start -space-y-1">
                    <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                      {t("choiceCards.learn.stats.count")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("choiceCards.learn.stats.label")}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xl ml-auto">&gt;</div>
                </div>
              </EBMotionCard>
            </MotionItem>

            {/* I want to teach Card */}
            <MotionItem>
              <EBMotionCard
                variants={choiceCardVariants}
                onClick={() => handleNavigateToOnboarding("/onboarding/tutor")}
                className="group p-10 text-center border-0 bg-card rounded-2xl shadow-lg
                            hover:shadow-xl hover:shadow-primary/20
                            transition-all duration-300 ease-out cursor-pointer flex flex-col"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="bg-primary text-primary-foreground p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center
                                   shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105"
                  >
                    <GraduationCap size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {t("choiceCards.teach.title")}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {t("choiceCards.teach.description")}
                  </p>
                </div>
                <div className="flex items-center justify-start gap-4 mt-10">
                  <div className="flex flex-col items-start -space-y-1">
                    <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                      {t("choiceCards.teach.stats.count")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("choiceCards.teach.stats.label")}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xl ml-auto">&gt;</div>
                </div>
              </EBMotionCard>
            </MotionItem>
          </MotionContainer>
        )}

        {/* User Info - Only show for PENDING status and TUTOR role */}
        {shouldShowUserInfo && (
          <MotionItem className="max-w-2xl mx-auto mb-8">
            <ProfileUnderReview
              currentStep="review"
              onGoToDashboard={() => push("/tutor/dashboard")}
              className=""
            />
          </MotionItem>
        )}
      </MotionItem>
    </MotionContainer>
  );
};

export default HomeFeature;
