"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { motion } from "motion/react";

const NotFoundPage = () => {
  const t = useTranslations("common");
  const { push } = useLocaleRouter();

  const handleGoHome = () => {
    push(ROUTES.HOME);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient - using theme colors */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Enhanced blur pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(148, 163, 184, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 80% 70%, rgba(156, 163, 175, 0.15) 0%, transparent 60%),
                           radial-gradient(circle at 40% 80%, rgba(139, 146, 158, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main glassmorphism container */}
      <div className="relative z-10 min-h-screen w-full bg-card/20 backdrop-blur-xl backdrop-saturate-150 overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* 404 Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <FileQuestion className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
                </div>
                {/* Decorative circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                ></motion.div>
              </div>
            </motion.div>

            {/* 404 Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-4"
            >
              404
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
            >
              {t("pageNotFound")}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed"
            >
              Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại URL
              hoặc quay về trang chủ.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Go Home Button */}
              <button
                onClick={handleGoHome}
                className="group relative w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                <span>{t("goHome")}</span>
              </button>

              {/* Go Back Button */}
              <button
                onClick={handleGoBack}
                className="group relative w-full sm:w-auto px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t("goBack")}</span>
              </button>
            </motion.div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      Cần trợ giúp?
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Nếu bạn cho rằng đây là lỗi, vui lòng{" "}
                      <button
                        onClick={() => push(ROUTES.HOME)}
                        className="text-primary hover:underline font-medium"
                      >
                        liên hệ hỗ trợ
                      </button>{" "}
                      để được giúp đỡ.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

