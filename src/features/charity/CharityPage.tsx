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
    },
    {
      label: t("donation.goal"),
      value: "50.000.000",
      unit: "VND",
    },
    {
      label: t("donation.contributors"),
      value: "1,247",
      unit: t("donation.people"),
    },
  ];

  const programGoals = [
    {
      icon: Library,
      title: t("goals.libraries.title"),
      description: t("goals.libraries.description"),
    },
    {
      icon: BookOpen,
      title: t("goals.scholarships.title"),
      description: t("goals.scholarships.description"),
    },
    {
      icon: GraduationCap,
      title: t("goals.courses.title"),
      description: t("goals.courses.description"),
    },
    {
      icon: Award,
      title: t("goals.workshops.title"),
      description: t("goals.workshops.description"),
    },
    {
      icon: Users,
      title: t("goals.training.title"),
      description: t("goals.training.description"),
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

             {/* Stats Cards - Clean Design */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
               {donationStats.map((stat, index) => (
                 <motion.div
                   key={index}
                   className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   whileHover={{ 
                     y: -4,
                     scale: 1.02,
                     boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                   }}
                   transition={{ 
                     duration: 0.5, 
                     delay: index * 0.1,
                     type: "spring",
                     stiffness: 100
                   }}
                   viewport={{ once: true, margin: "-50px" }}
                 >
                   {/* Subtle gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   
                   <div className="relative z-10">
                     <p className="text-sm text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300">
                       {stat.label}
                     </p>
                     <div className="flex items-baseline gap-2">
                       <motion.span 
                         className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                         initial={{ scale: 0.8 }}
                         whileInView={{ scale: 1 }}
                         transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                       >
                         {stat.value}
                       </motion.span>
                       <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                         {stat.unit}
                       </span>
                     </div>
                   </div>
                   
                   {/* Subtle corner accent */}
                   <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </motion.div>
               ))}
             </div>

             {/* Progress Bar - Enhanced */}
             <div className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                 <span className="font-medium text-foreground">
                   {progressPercentage.toFixed(1)}% {t("donation.completed")}
                 </span>
                 <span className="text-muted-foreground">
                   {t("donation.remaining")}: {formatFullAmount(50000000 - (totalAmount || 0))} VND
                 </span>
               </div>
               
               <div className="relative">
                 <div className="h-4 bg-muted rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${progressPercentage}%` }}
                     transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                     className="relative h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                   >
                     {/* Shimmer effect */}
                     <motion.div
                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                       animate={{ x: ["-100%", "100%"] }}
                       transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                     />
                   </motion.div>
                 </div>
                 
                 {/* Progress indicator dot */}
                 <motion.div
                   className="absolute top-0 w-4 h-4 bg-primary rounded-full shadow-lg"
                   style={{ left: `${Math.min(progressPercentage, 98)}%` }}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 0.5, delay: 1 }}
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
                 <motion.div
                   className="group relative p-6 h-full bg-card border border-border rounded-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
                   initial={{ opacity: 0, y: 20, rotateX: -10 }}
                   whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                   whileHover={{ 
                     y: -8, 
                     rotateY: 5,
                     scale: 1.02,
                     boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                   }}
                   transition={{ 
                     duration: 0.6,
                     delay: index * 0.1,
                     type: "spring",
                     stiffness: 100
                   }}
                   viewport={{ once: true, margin: "-50px" }}
                 >
                   {/* Background gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <div className="relative z-10">
                     <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                       <goal.icon className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                     </div>
                     
                     <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                       {goal.title}
                     </h3>
                     
                     <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                       {goal.description}
                     </p>
                   </div>
                   
                   {/* Corner accent */}
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   
                   {/* Subtle border glow */}
                   <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-300" />
                 </motion.div>
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
                 <motion.div
                   key={index}
                   className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                     milestone.checked
                       ? "border-primary/30 bg-primary/5 hover:border-primary/50"
                       : "border-border bg-card hover:border-primary/20"
                   }`}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   whileHover={{ 
                     scale: 1.02,
                     y: -2,
                     boxShadow: milestone.checked 
                       ? "0 10px 30px rgba(59, 130, 246, 0.15)"
                       : "0 10px 30px rgba(0,0,0,0.1)"
                   }}
                   transition={{ 
                     duration: 0.5, 
                     delay: index * 0.1,
                     type: "spring",
                     stiffness: 100
                   }}
                   viewport={{ once: true, margin: "-50px" }}
                 >
                   {/* Background gradient for completed milestones */}
                   {milestone.checked && (
                     <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-2xl" />
                   )}
                   
                   <div className="relative z-10">
                     <div className="flex items-start gap-4">
                       <motion.div
                         className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                           milestone.checked
                             ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                             : "bg-muted border-2 border-border group-hover:border-primary/30"
                         }`}
                         whileHover={{ scale: 1.1, rotate: 5 }}
                         transition={{ duration: 0.2 }}
                       >
                         {milestone.checked && (
                           <motion.div
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ duration: 0.3, delay: 0.2 }}
                           >
                             <CheckCircle2 className="w-5 h-5" />
                           </motion.div>
                         )}
                       </motion.div>
                       
                       <div className="flex-1">
                         <div className="flex items-center justify-between mb-2">
                           <h3 className={`font-bold transition-colors duration-300 ${
                             milestone.checked 
                               ? "text-primary" 
                               : "text-foreground group-hover:text-primary"
                           }`}>
                             {milestone.title}
                           </h3>
                           <span className={`text-sm font-medium transition-colors duration-300 ${
                             milestone.checked 
                               ? "text-primary/80" 
                               : "text-muted-foreground group-hover:text-foreground"
                           }`}>
                             {milestone.amount} VND
                           </span>
                         </div>
                         <p className={`text-sm transition-colors duration-300 ${
                           milestone.checked 
                             ? "text-primary/70" 
                             : "text-muted-foreground group-hover:text-foreground"
                         }`}>
                           {milestone.description}
                         </p>
                       </div>
                     </div>
                   </div>
                   
                   {/* Corner accent for completed milestones */}
                   {milestone.checked && (
                     <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-2xl" />
                   )}
                 </motion.div>
               ))}
             </div>
          </EBMotionCard>
        </motion.div>
      </div>
    </div>
  );
};

export default CharityPage;
