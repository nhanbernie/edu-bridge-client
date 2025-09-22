"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MotionCard } from "@/components/motion/MotionCard";
import { Calendar, Clock, Package } from "lucide-react";
import { slideUpVariants } from "@/components/motion";

interface BookingButtonProps {
  disabled: boolean;
  onBook: () => void;
}

const BookingButton: React.FC<BookingButtonProps> = ({ disabled, onBook }) => {
  return (
    <MotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
      <div className="space-y-4">
        {/* Summary */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Tóm tắt đặt lịch</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Lịch học: {disabled ? "Chưa chọn" : "Đã chọn"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Gói học: {disabled ? "Chưa chọn" : "Đã chọn"}</span>
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <Button
          onClick={onBook}
          disabled={disabled}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground py-3 text-base font-medium"
          size="lg"
        >
          {disabled ? "Vui lòng chọn đầy đủ thông tin" : "Đặt lịch ngay"}
        </Button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          Bạn có thể hủy hoặc thay đổi lịch học trước 24 giờ
        </p>
      </div>
    </MotionCard>
  );
};

export default BookingButton;
