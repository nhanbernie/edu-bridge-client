"use client";

import { EBMainLayout } from "@/components/layouts";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { EBMotionCard, MotionContainer, MotionItem, choiceCardVariants } from "@/components/motion";
import { BookOpen, GraduationCap, Users, Eye } from "lucide-react";
import { EBLogo } from "@/components/common";
import { useEffect } from "react";
import ProfileUnderReview from "./ProfileUnderReview";
import { useGetAndStoreUser } from "@/hooks/useGetAndStoreUser";
const HomeFeature = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const shouldShowChoiceCards = user?.status === "PENDING" && user?.role === "USER";

  const shouldShowUserInfo = user?.status === "PENDING" && user?.role === "TUTOR";

  // Call the hook at the top level
  useGetAndStoreUser({ userId: user?.userId });

  return (
    <EBMainLayout footer={true}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-32">
        {/* Logo and Title Section */}
        <div className="max-w-6xl mx-auto p-8 text-center">
          <div className="mb-16">
            <div className="flex justify-center mb-6">
              <EBLogo imageSize={60} textClassName="text-2xl" />
            </div>
            <h2 className="text-2xl md:text-5xl font-semibold text-foreground mb-2">
              How would you like to use EduBridge?
            </h2>
          </div>

          {/* Choice Cards - Only show for PENDING status and PENDING role */}
          {shouldShowChoiceCards && (
            <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-3xl mx-auto mb-12">
              {/* I want to learn Card */}
              <MotionItem>
                <EBMotionCard
                  variants={choiceCardVariants}
                  onClick={() => router.push("/onboarding/student")}
                  className="group p-10 text-center border-0 bg-white rounded-2xl shadow-lg
                            hover:shadow-xl hover:shadow-emerald-100/50
                            transition-all duration-300 ease-out cursor-pointer flex flex-col"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="bg-emerald-600 text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center
                                   shadow-md group-hover:shadow-lg group-hover:shadow-emerald-600/25 transition-all duration-300 group-hover:scale-105"
                    >
                      <BookOpen size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                      I want to learn
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Find qualified tutors and book personalized lessons
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 mt-10">
                    <div className="flex flex-col items-start -space-y-1">
                      <span className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                        10,000+
                      </span>
                      <span className="text-sm text-gray-600">Students</span>
                    </div>
                    <div className="text-gray-400 text-xl ml-auto">
                      &gt;
                    </div>
                  </div>
                </EBMotionCard>
              </MotionItem>

              {/* I want to teach Card */}
              <MotionItem>
                <EBMotionCard
                  variants={choiceCardVariants}
                  onClick={() => router.push("/onboarding/tutor")}
                  className="group p-10 text-center border-0 bg-white rounded-2xl shadow-lg
                            hover:shadow-xl hover:shadow-emerald-100/50
                            transition-all duration-300 ease-out cursor-pointer flex flex-col"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="bg-emerald-600 text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center
                                   shadow-md group-hover:shadow-lg group-hover:shadow-emerald-600/25 transition-all duration-300 group-hover:scale-105"
                    >
                      <GraduationCap size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                      I want to teach
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Share your knowledge and earn money teaching students
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 mt-10">
                    <div className="flex flex-col items-start -space-y-1">
                      <span className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                        500+
                      </span>
                      <span className="text-sm text-gray-600">Expert Tutors</span>
                    </div>
                    <div className="text-gray-400 text-xl ml-auto">
                      &gt;
                    </div>
                  </div>
                </EBMotionCard>
              </MotionItem>
            </MotionContainer>
          )}

          {/* User Info - Only show for PENDING status and TUTOR role */}
          {shouldShowUserInfo && (
            <div className="max-w-2xl mx-auto mb-8">
              <ProfileUnderReview
                title="Hồ sơ đang được xem xét"
                description="Cảm ơn bạn đã gửi hồ sơ gia sư! Đội ngũ của chúng tôi đang xem xét hồ sơ và tài liệu của bạn."
                currentStep="review"
                onGoToDashboard={() => router.push("/tutor/dashboard")}
                className="bg-transparent p-0"
              />
            </div>
          )}
        </div>
      </div>
    </EBMainLayout>
  );
};

export default HomeFeature;
