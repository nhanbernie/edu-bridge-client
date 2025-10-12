"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Clock, X } from "lucide-react";
import { motion } from "motion/react";

interface BookingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingGuideModal: React.FC<BookingGuideModalProps> = ({ isOpen, onClose }) => {
  const steps = [
    {
      icon: Package,
      number: 1,
      title: "Chọn gói học",
      description: "Chọn gói học phù hợp với nhu cầu của bạn. Mỗi gói sẽ có số buổi học khác nhau.",
    },
    {
      icon: Calendar,
      number: 2,
      title: "Chọn ngày học",
      description: "Chọn ngày bạn muốn học. Các ngày có sẵn lịch sẽ được đánh dấu màu xanh.",
    },
    {
      icon: Clock,
      number: 3,
      title: "Chọn khung giờ",
      description:
        "Chọn khung giờ phù hợp. Bạn có thể thêm nhiều buổi học cho đến khi đủ số buổi trong gói.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden border-none shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
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
            <h2 className="text-2xl font-bold mb-2">Hướng dẫn đặt lịch học</h2>
            <p className="text-sm text-white/90">
              Làm theo 3 bước đơn giản để đặt lịch học với gia sư
            </p>
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
                className="relative flex gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
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
                    <span className="text-xs font-semibold text-primary">BƯỚC {step.number}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
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
              Bắt đầu đặt lịch
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingGuideModal;
