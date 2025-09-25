"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Home,
  MessageCircle,
  Phone,
  Clock,
} from "lucide-react";
import { MainLayout } from "@/components/layouts";
import {
  MotionCard,
  MotionContainer,
  MotionItem,
  slideUpVariants,
  scaleVariants,
  containerVariants as defaultContainerVariants,
} from "@/components/motion";

// Use existing animation variants
const containerVariants = defaultContainerVariants;
const itemVariants = slideUpVariants;
const cancelVariants = scaleVariants;

const BookingCancel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shake, setShake] = useState(false);

  // Get booking details from URL params
  const bookingId = searchParams.get("bookingId") || "BK-2024-001";
  const reason = searchParams.get("reason") || "payment_failed";
  const tutorName = searchParams.get("tutorName") || "Nguyễn Văn A";
  const subject = searchParams.get("subject") || "Toán học";

  useEffect(() => {
    // Trigger shake animation on mount
    const timer = setTimeout(() => setShake(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    router.push("/student");
  };

  const handleTryAgain = () => {
    router.push("/student");
  };

  const handleContactSupport = () => {
    // Implement contact support functionality
    window.open("mailto:support@edubridge.com?subject=Booking Issue - " + bookingId);
  };

  const handleCallSupport = () => {
    window.open("tel:1900123456");
  };

  const getReason = (reasonCode: string) => {
    const reasons: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
      payment_failed: {
        title: "Thanh toán thất bại",
        description:
          "Giao dịch không thể hoàn tất. Vui lòng kiểm tra thông tin thanh toán và thử lại.",
        icon: <XCircle className="w-12 h-12 text-red-500" />,
      },
      tutor_unavailable: {
        title: "Gia sư không có sẵn",
        description:
          "Gia sư đã chọn hiện không có sẵn trong khung giờ này. Vui lòng chọn thời gian khác.",
        icon: <Clock className="w-12 h-12 text-orange-500" />,
      },
      system_error: {
        title: "Lỗi hệ thống",
        description:
          "Đã xảy ra lỗi kỹ thuật. Chúng tôi đang khắc phục và sẽ liên hệ với bạn sớm nhất.",
        icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
      },
      user_cancelled: {
        title: "Đã hủy đặt lịch",
        description: "Bạn đã hủy đặt lịch học này. Bạn có thể đặt lịch mới bất cứ lúc nào.",
        icon: <XCircle className="w-12 h-12 text-gray-500" />,
      },
    };

    return reasons[reasonCode] || reasons.system_error;
  };

  const reasonInfo = getReason(reason);

  return (
    <MainLayout footer={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionContainer variants={containerVariants}>
            {/* Cancel Icon and Title */}
            <MotionItem variants={itemVariants}>
              <motion.div
                className="text-center mb-8"
                variants={cancelVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="relative inline-block mb-6"
                  animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                    {reasonInfo.icon}
                  </div>
                </motion.div>

                <h1 className="text-4xl font-bold text-foreground mb-4">{reasonInfo.title}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {reasonInfo.description}
                </p>
              </motion.div>
            </MotionItem>

            {/* Booking Info Card */}
            <MotionItem variants={itemVariants}>
              <MotionCard className="mb-8 bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Thông tin đặt lịch</h2>
                  <div className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium border border-red-200 dark:border-red-800">
                    <span>Mã đặt lịch: {bookingId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gia sư</p>
                      <p className="font-semibold text-foreground">{tutorName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Môn học</p>
                      <p className="font-semibold text-foreground">{subject}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-medium text-red-600 dark:text-red-400">
                      Trạng thái: Đã hủy
                    </span>
                  </div>
                </div>
              </MotionCard>
            </MotionItem>

            {/* Action Buttons */}
            <MotionItem variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <motion.button
                  onClick={handleTryAgain}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="font-medium">Thử lại</span>
                </motion.button>

                <motion.button
                  onClick={handleContactSupport}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Liên hệ hỗ trợ</span>
                </motion.button>

                <motion.button
                  onClick={handleCallSupport}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Gọi hotline</span>
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

            {/* Help Section */}
            <MotionItem variants={itemVariants}>
              <MotionCard className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-4">Cần hỗ trợ?</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Chat trực tuyến</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Nhận hỗ trợ ngay lập tức từ đội ngũ chăm sóc khách hàng
                      </p>
                      <button
                        onClick={handleContactSupport}
                        className="text-primary hover:underline font-medium"
                      >
                        Bắt đầu chat
                      </button>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">Hotline 24/7</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Gọi ngay để được hỗ trợ trực tiếp
                      </p>
                      <button
                        onClick={handleCallSupport}
                        className="text-primary hover:underline font-medium"
                      >
                        1900 123 456
                      </button>
                    </div>
                  </div>

                  {/* Common Issues */}
                  <div className="pt-6 border-t border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-foreground mb-4">Các vấn đề thường gặp</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <p className="font-medium text-foreground mb-1">Thanh toán thất bại</p>
                        <p className="text-muted-foreground">Kiểm tra thông tin thẻ và số dư</p>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <p className="font-medium text-foreground mb-1">Gia sư không có sẵn</p>
                        <p className="text-muted-foreground">
                          Chọn thời gian khác hoặc gia sư khác
                        </p>
                      </div>
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <p className="font-medium text-foreground mb-1">Lỗi kỹ thuật</p>
                        <p className="text-muted-foreground">Thử lại sau hoặc liên hệ hỗ trợ</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-muted-foreground">
                      Email hỗ trợ:{" "}
                      <a
                        href="mailto:support@edubridge.com"
                        className="text-primary hover:underline"
                      >
                        support@edubridge.com
                      </a>
                    </p>
                  </div>
                </div>
              </MotionCard>
            </MotionItem>

            {/* Back to Search */}
            <MotionItem variants={itemVariants}>
              <div className="text-center">
                <motion.button
                  onClick={() => router.push("/student")}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Tìm gia sư khác</span>
                </motion.button>
              </div>
            </MotionItem>
          </MotionContainer>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingCancel;
