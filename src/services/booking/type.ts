import { ApiResponse } from "@/services/api/type";

// Booking request interfaces
export interface SlotRequest {
  blockId: string;
  startTime: string; // Format: "2025-09-29 09:00"
}

export interface CreateBookingRequest {
  courseId: string;
  packageId: string;
  slotRequests: SlotRequest[];
}

// Booking response interfaces
export interface BookingData {
  bookingId: string;
  slotIds: string[];
  studentId: string;
  courseId: string;
  packageId: string;
  numberOfSessions: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  updatedAt: string | null;
}

export type CreateBookingResponse = ApiResponse<BookingData>;
