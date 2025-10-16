"use client";

import React from "react";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetCharityTotalQuery } from "@/services/payment/payment.service";

const formatCharityAmount = (amount: number | null): string => {
  if (amount === null || amount === undefined) return "0";
  if (amount >= 1_000_000) {
    // Triệu
    const millions = amount / 1_000_000;
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)} triệu`;
  } else if (amount >= 1_000) {
    // Nghìn
    const thousands = amount / 1_000;
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)} nghìn`;
  } else {
    return amount.toString();
  }
};

const formatFullAmount = (amount: number | null): string => {
  if (amount === null || amount === undefined) return "0";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const EBCharityCounter: React.FC = () => {
  const { data, isLoading, error } = useGetCharityTotalQuery();

  if (isLoading || error) return null;

  const amount = data?.success && data?.data !== undefined ? data.data : 0;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div
            className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-3 
                       bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-primary/20
                       hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer
                       backdrop-blur-sm"
          >
            {/* Heart icon with heartbeat animation */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>

            {/* Amount */}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">{formatCharityAmount(amount)}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">đ</span>
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          className="border border-white/20 dark:border-gray-700/20 shadow-2xl px-4 py-3 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80"
        >
          <div className="text-center space-y-1">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Tổng tiền từ thiện
            </p>
            <p className="text-lg font-bold text-primary">{formatFullAmount(amount)} VND</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cảm ơn sự đóng góp của bạn! 🩵
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EBCharityCounter;
