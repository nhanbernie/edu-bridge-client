import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

import { toast } from "sonner";
import { selectUser } from "@/redux/selectors/auth.selectors";
import { useCreateBookingMutation } from "@/services/booking";
import { useCreatePaymentMutation } from "@/services/payment";
import type { CreateBookingRequest, SlotRequest } from "@/services/booking/type";
import type { CreatePaymentRequest, CreatePaymentData } from "@/services/payment/type";

interface SelectedSession {
  date: Date;
  timeSlot: string;
  sessionNumber: number;
  blockId: string;
}

interface UseBookingFlowProps {
  tutorId: string;
  courseId?: string;
}

interface BookingData {
  selectedPackage: string;
  selectedSessions: SelectedSession[];
}

export const useBookingFlow = ({ tutorId, courseId }: UseBookingFlowProps) => {
  const { push } = useLocaleRouter();
  const user = useSelector(selectUser);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<CreatePaymentData | null>(null);

  // API mutations
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();
  const [createPayment, { isLoading: isCreatingPayment }] = useCreatePaymentMutation();

  // Get student ID from user
  const studentId = user?.student?.studentId || user?.userId;

  // Step 1: Create booking
  const handleCreateBooking = useCallback(
    async (bookingData: BookingData) => {
      if (!studentId) {
        toast.error("Không tìm thấy thông tin học viên. Vui lòng đăng nhập lại.");
        return;
      }

      if (!courseId) {
        toast.error("Không tìm thấy thông tin khóa học.");
        return;
      }

      try {
        // Prepare slot requests with blockId (now directly from session)
        const slotRequests: SlotRequest[] = bookingData.selectedSessions.map((session) => {
          // Format startTime as "YYYY-MM-DD HH:mm" using local date to avoid timezone issues
          const year = session.date.getFullYear();
          const month = String(session.date.getMonth() + 1).padStart(2, "0");
          const day = String(session.date.getDate()).padStart(2, "0");
          const sessionDate = `${year}-${month}-${day}`;
          const [startTime] = session.timeSlot.split("-"); // Split by "-" not " - "
          const formattedStartTime = `${sessionDate} ${startTime}`;

          return {
            blockId: session.blockId, // Use blockId directly from session
            startTime: formattedStartTime,
          };
        });

        const bookingRequest: CreateBookingRequest = {
          courseId,
          packageId: bookingData.selectedPackage,
          slotRequests,
        };

        const result = await createBooking(bookingRequest).unwrap();

        if (result.success && result.data) {
          setBookingId(result.data.bookingId);
          setShowPaymentDialog(true);
          toast.success(result.message || "Đặt lịch thành công! Vui lòng xác nhận thanh toán.");
        } else {
          toast.error(result.message || "Có lỗi xảy ra khi đặt lịch.");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Có lỗi xảy ra khi đặt lịch.");
      }
    },
    [studentId, courseId, createBooking]
  );

  // Step 2: Create payment and show QR code
  const handleConfirmPayment = useCallback(async () => {
    if (!bookingId || !studentId) {
      toast.error("Thông tin đặt lịch không hợp lệ.");
      return;
    }

    try {
      const paymentRequest: CreatePaymentRequest = {
        bookingId,
        studentId,
      };

      const result = await createPayment(paymentRequest).unwrap();

      if (result.success && result.data) {
        toast.success(result.message || "Tạo thanh toán thành công!");

        // Store payment data for QR code dialog
        setPaymentData(result.data);
        setShowPaymentDialog(false);
        setShowQRDialog(true);
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi tạo thanh toán.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Có lỗi xảy ra khi tạo thanh toán.");
    } finally {
      setShowPaymentDialog(false);
    }
  }, [bookingId, studentId, createPayment]);

  // Cancel payment dialog
  const handleCancelPayment = useCallback(() => {
    setShowPaymentDialog(false);
    setBookingId(null);
    // Optionally redirect to cancel page
    if (bookingId) {
      push(`/student/booking/cancel?bookingId=${bookingId}&reason=user_cancelled`);
    }
  }, [bookingId, push]);

  // Close QR dialog
  const handleCloseQRDialog = useCallback(() => {
    setShowQRDialog(false);
    setPaymentData(null);
  }, []);

  return {
    // State
    showPaymentDialog,
    showQRDialog,
    bookingId,
    paymentData,
    isLoading: isCreatingBooking || isCreatingPayment,

    // Actions
    handleCreateBooking,
    handleConfirmPayment,
    handleCancelPayment,
    handleCloseQRDialog,

    // Utils
    studentId,
  };
};
