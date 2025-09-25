"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  BookOpen,
  ArrowRight,
  Download,
  Share2,
  Home,
} from "lucide-react";
import { MainLayout } from "@/components/layouts";
import { MotionCard, MotionContainer, MotionItem } from "@/components/motion";

// Animation variants
const successVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const checkmarkVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const BookingSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [confetti, setConfetti] = useState(true);

  // Get booking details from URL params
  const bookingId = searchParams.get("bookingId") || "BK-2024-001";
  const tutorName = searchParams.get("tutorName") || "Nguyễn Văn A";
  const subject = searchParams.get("subject") || "Toán học";
  const date = searchParams.get("date") || "2024-01-15";
  const time = searchParams.get("time") || "14:00 - 16:00";
  const price = searchParams.get("price") || "200,000";

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    router.push("/student");
  };

  const handleViewBookings = () => {
    router.push("/student/bookings");
  };

  const handleDownloadReceipt = () => {
    // Implement download receipt functionality
    console.log("Download receipt for booking:", bookingId);
  };

  const handleShareBooking = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: "Đặt lịch học thành công",
        text: `Tôi đã đặt lịch học ${subject} với ${tutorName}`,
        url: window.location.href,
      });
    }
  };

  return (
    <MainLayout footer={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        {/* Confetti Effect */}
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionContainer variants={containerVariants}>
            {/* Success Icon and Title */}
            <MotionItem variants={itemVariants}>
              <motion.div
                className="text-center mb-8"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>

                  {/* Animated checkmark */}
                  <motion.svg
                    className="absolute inset-0 w-24 h-24"
                    viewBox="0 0 100 100"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.path
                      d="M25 50 L40 65 L75 30"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                      variants={checkmarkVariants}
                    />
                  </motion.svg>
                </div>

                <h1 className="text-4xl font-bold text-foreground mb-4">Đặt lịch thành công! 🎉</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Chúc mừng! Bạn đã đặt lịch học thành công. Gia sư sẽ liên hệ với bạn sớm nhất.
                </p>
              </motion.div>
            </MotionItem>

            {/* Booking Details Card */}
            <MotionItem variants={itemVariants}>
              <MotionCard className="mb-8 bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Chi tiết đặt lịch</h2>
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <span>Mã đặt lịch: {bookingId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gia sư</p>
                        <p className="font-semibold text-foreground">{tutorName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Môn học</p>
                        <p className="font-semibold text-foreground">{subject}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ngày học</p>
                        <p className="font-semibold text-foreground">
                          {new Date(date).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Thời gian</p>
                        <p className="font-semibold text-foreground">{time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-foreground">Tổng chi phí:</span>
                    <span className="text-2xl font-bold text-primary">{price}đ</span>
                  </div>
                </div>
              </MotionCard>
            </MotionItem>

            {/* Action Buttons */}
            <MotionItem variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <motion.button
                  onClick={handleViewBookings}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Xem lịch học</span>
                </motion.button>

                <motion.button
                  onClick={handleDownloadReceipt}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Tải hóa đơn</span>
                </motion.button>

                <motion.button
                  onClick={handleShareBooking}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Chia sẻ</span>
                </motion.button>

                <motion.button
                  onClick={handleGoHome}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Về trang chủ</span>
                </motion.button>
              </div>
            </MotionItem>

            {/* Next Steps */}
            <MotionItem variants={itemVariants}>
              <MotionCard className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-4">Bước tiếp theo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Chờ xác nhận</h4>
                      <p className="text-sm text-muted-foreground">
                        Gia sư sẽ xác nhận lịch học trong vòng 24h
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Nhận thông báo</h4>
                      <p className="text-sm text-muted-foreground">
                        Bạn sẽ nhận được thông báo qua email và SMS
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Bắt đầu học</h4>
                      <p className="text-sm text-muted-foreground">
                        Tham gia buổi học đúng giờ đã đặt
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      Có thắc mắc? Liên hệ với chúng tôi qua{" "}
                      <a
                        href="mailto:support@edubridge.com"
                        className="text-primary hover:underline"
                      >
                        support@edubridge.com
                      </a>{" "}
                      hoặc hotline{" "}
                      <a href="tel:1900123456" className="text-primary hover:underline">
                        1900 123 456
                      </a>
                    </p>
                  </div>
                </div>
              </MotionCard>
            </MotionItem>
          </MotionContainer>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingSuccess;
