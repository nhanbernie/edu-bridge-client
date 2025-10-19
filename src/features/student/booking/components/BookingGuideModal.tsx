"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Clock, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";

interface BookingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingGuideModal: React.FC<BookingGuideModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("student.booking.bookingGuide");

  const steps = [
    {
      icon: Package,
      number: 1,
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
    },
    {
      icon: Calendar,
      number: 2,
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      icon: Clock,
      number: 3,
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden border-0 shadow-xl rounded-3xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header - Simple với màu primary */}
        <div className="bg-primary text-white p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
            <p className="text-sm text-white/90">{t("subtitle")}</p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                className="relative flex gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
              >
                {/* Step icon với màu primary */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary">
                      {t("stepLabel")} {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-9 -bottom-4 w-0.5 h-4 bg-emerald-200 dark:bg-emerald-800"></div>
                )}
              </motion.div>
            );
          })}

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="pt-2"
          >
            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-5 text-base"
            >
              {t("gotIt")}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingGuideModal;
