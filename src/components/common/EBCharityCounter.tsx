"use client";

import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetCharityTotalQuery } from "@/services/payment/payment.service";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useTranslations } from "next-intl";

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
  const { push } = useLocaleRouter();
  const t = useTranslations("charity.counter");

  if (isLoading || error) return null;

  const amount = data?.success && data?.data !== undefined ? data.data : 0;

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    push("/charity");
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div
            className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-3
                       bg-card border-2 border-primary/20 rounded-full shadow-lg
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
              <span className="text-xs text-muted-foreground font-medium">đ</span>
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          className="border border-border shadow-2xl px-4 py-3 backdrop-blur-xl bg-card/95 max-w-xs"
        >
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{t("title")}</p>
            <p className="text-lg font-bold text-primary">{formatFullAmount(amount)} VND</p>
            <p className="text-xs text-muted-foreground">{t("thanks")}</p>

            {/* Read More Button */}
            <button
              onClick={handleReadMore}
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2
                         bg-primary hover:bg-primary/90 text-primary-foreground
                         rounded-lg text-xs font-medium transition-all duration-300
                         hover:scale-105 hover:shadow-lg"
            >
              <span>{t("readMore")}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EBCharityCounter;
