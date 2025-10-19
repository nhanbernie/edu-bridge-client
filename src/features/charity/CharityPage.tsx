"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heart, Users, Library, BookOpen, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { EBMotionCard, MotionContainer, MotionItem } from "@/components/motion";
import { motion } from "motion/react";
import { useGetCharityTotalQuery } from "@/services/payment/payment.service";

const formatFullAmount = (amount: number | null): string => {
  if (amount === null || amount === undefined) return "0";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CharityPage = () => {
  const t = useTranslations("charity");
  const { data } = useGetCharityTotalQuery();
  const totalAmount = data?.success && data?.data !== undefined ? data.data : 0;

  const donationStats = [
    {
      label: t("donation.raised"),
      value: `${formatFullAmount(totalAmount)}`,
      unit: "VND",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      label: t("donation.goal"),
      value: "50.000.000",
      unit: "VND",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      label: t("donation.contributors"),
      value: "1,247",
      unit: t("donation.people"),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
  ];

  const programGoals = [
    {
      icon: Library,
      title: t("goals.libraries.title"),
      description: t("goals.libraries.description"),
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
      icon: BookOpen,
      title: t("goals.scholarships.title"),
      description: t("goals.scholarships.description"),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: GraduationCap,
      title: t("goals.courses.title"),
      description: t("goals.courses.description"),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Award,
      title: t("goals.workshops.title"),
      description: t("goals.workshops.description"),
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      icon: Users,
      title: t("goals.training.title"),
      description: t("goals.training.description"),
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  const milestones = [
    {
      amount: "10.000.000",
      title: t("milestones.first.title"),
      description: t("milestones.first.description"),
      checked: (totalAmount || 0) >= 10000000,
    },
    {
      amount: "25.000.000",
      title: t("milestones.second.title"),
      description: t("milestones.second.description"),
      checked: (totalAmount || 0) >= 25000000,
    },
    {
      amount: "35.000.000",
      title: t("milestones.third.title"),
      description: t("milestones.third.description"),
      checked: (totalAmount || 0) >= 35000000,
    },
    {
      amount: "50.000.000",
      title: t("milestones.complete.title"),
      description: t("milestones.complete.description"),
      checked: (totalAmount || 0) >= 50000000,
    },
  ];

  const progressPercentage = Math.min(((totalAmount || 0) / 50000000) * 100, 100);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] mb-8 sm:mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20" />
          <div className="relative px-6 sm:px-12 py-12 sm:py-20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-card rounded-full mb-6 shadow-lg"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-primary" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Donation Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <EBMotionCard variant="base" className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              {t("donation.title")}
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {donationStats.map((stat, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor}`}
                >
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {progressPercentage.toFixed(1)}% {t("donation.completed")}
                </span>
                <span className="text-muted-foreground">
                  {t("donation.remaining")}: {formatFullAmount(50000000 - (totalAmount || 0))} VND
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                />
              </div>
            </div>
          </EBMotionCard>
        </motion.div>

        {/* About Program Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <EBMotionCard variant="base" className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t("about.title")}</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              {t("about.description1")}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("about.description2")}
            </p>
          </EBMotionCard>
        </motion.div>

        {/* Program Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            {t("goals.title")}
          </h2>
          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programGoals.map((goal, index) => (
              <MotionItem key={index}>
                <EBMotionCard
                  variant="base"
                  className="p-6 h-full hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 ${goal.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <goal.icon className={`w-6 h-6 ${goal.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {goal.description}
                  </p>
                </EBMotionCard>
              </MotionItem>
            ))}
          </MotionContainer>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <EBMotionCard variant="base" className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              {t("milestones.title")}
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all ${
                    milestone.checked
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.checked
                          ? "bg-green-500 text-white"
                          : "bg-muted border-2 border-border"
                      }`}
                    >
                      {milestone.checked && <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-foreground">{milestone.title}</h3>
                        <span className="text-sm font-medium text-muted-foreground">
                          {milestone.amount} VND
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EBMotionCard>
        </motion.div>
      </div>
    </div>
  );
};

export default CharityPage;
