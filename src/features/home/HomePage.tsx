"use client";

import { MainLayout } from "@/components/layouts";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MotionCard, MotionContainer, MotionItem, choiceCardVariants } from "@/components/motion";
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
    <MainLayout footer={true}>
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
            <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* I want to learn Card */}
              <MotionItem>
                <MotionCard
                  variants={choiceCardVariants}
                  onClick={() => router.push("/onboarding/student")}
                  className="group h-full p-8 text-center border-0 bg-card/50 backdrop-blur-sm
                            hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/10
                            transition-all duration-500 ease-out"
                >
                  <div
                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center
                                 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110"
                  >
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    I want to learn
                  </h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                    Find qualified tutors and book personalized lessons
                  </p>
                  <div className="flex items-center justify-center text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm font-medium">10,000+ Students</span>
                  </div>
                </MotionCard>
              </MotionItem>

              {/* I want to teach Card */}
              <MotionItem>
                <MotionCard
                  variants={choiceCardVariants}
                  onClick={() => router.push("/onboarding/tutor")}
                  className="group h-full p-8 text-center border-0 bg-card/50 backdrop-blur-sm
                            hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/10
                            transition-all duration-500 ease-out"
                >
                  <div
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center
                                 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-110"
                  >
                    <GraduationCap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    I want to teach
                  </h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                    Share your knowledge and earn money teaching students
                  </p>
                  <div className="flex items-center justify-center text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                    <Eye size={16} className="mr-2" />
                    <span className="text-sm font-medium">500+ Expert Tutors</span>
                  </div>
                </MotionCard>
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
    </MainLayout>
  );
};

export default HomeFeature;
