"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MotionCard } from "@/components/motion/MotionCard";
import { slideUpVariants } from "@/components/motion";

interface BookingButtonProps {
  disabled: boolean;
  onBook: () => void;
}

const BookingButton: React.FC<BookingButtonProps> = ({ disabled, onBook }) => {
  return (
    <MotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
      <div className="space-y-4">
        {/* Booking Button */}
        <Button
          onClick={onBook}
          disabled={disabled}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground py-3 text-base font-medium"
          size="lg"
        >
          {disabled ? "Vui lòng chọn đầy đủ thông tin" : "Đặt lịch ngay"}
        </Button>
      </div>
    </MotionCard>
  );
};

export default BookingButton;
