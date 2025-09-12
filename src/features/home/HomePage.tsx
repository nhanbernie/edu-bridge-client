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

          {/* Choice Cards */}
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

          {/* User Info Section (if logged in) */}
          {user && (
            <MotionCard className="max-w-2xl mx-auto mb-8" variants={simpleCardVariants}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Thông tin người dùng</h3>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
              <div className="space-y-2 text-left">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email:</strong> {user.email}
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Họ và tên:</strong> {user.fullName}
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Vai trò:</strong> {user.role}
                </p>
              </div>
            </MotionCard>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeFeature;
