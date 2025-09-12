"use client";

import { MainLayout } from "@/components/layouts";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MotionCard, MotionContainer, MotionItem, choiceCardVariants } from "@/components/motion";
import { BookOpen, GraduationCap, Users, Eye } from "lucide-react";
import { EBLogo } from "@/components/common";
import { simpleCardVariants } from "@/constants/motion/cardMotion.constant";
const HomeFeature = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const shouldShowChoiceCards = user?.status === "PENDING" && user?.role === "PENDING";

  const shouldShowUserInfo = user?.status === "PENDING" && user?.role === "TUTOR";

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
            <MotionCard
              className="max-w-2xl mx-auto mb-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
              variants={simpleCardVariants}
            >
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Hồ sơ gia sư
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Thông tin tài khoản của bạn
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Họ và tên
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {user.fullName || "Chưa cập nhật"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vai trò
                  </p>
                  <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {user.role}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trạng thái
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      user.status === "PENDING"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : user.status === "APPROVED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {user.status === "PENDING"
                      ? "Đang chờ duyệt"
                      : user.status === "APPROVED"
                        ? "Đã duyệt"
                        : "Từ chối"}
                  </span>
                </div>
              </div>

              {user.status === "PENDING" && (
                <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Hồ sơ của bạn đang được xem xét. Vui lòng chờ admin phê duyệt.
                    </p>
                  </div>
                </div>
              )}
            </MotionCard>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeFeature;
