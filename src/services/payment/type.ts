import { ApiResponse } from "@/services/api/type";

// Payment request interfaces
export interface CreatePaymentRequest {
  bookingId: string;
  studentId: string;
}

// Payment response interfaces
export interface PaymentData {
  paymentId: string;
  bookingId: string;
  amount: number;
  serviceFee: number;
  paymentMethod: "BANK_TRANSFER" | "CREDIT_CARD" | "E_WALLET" | "CASH";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED" | "REFUNDED";
  createdAt: string;
}

export interface CreatePaymentData {
  payment: PaymentData;
  paymentUrl: string;
  qrCodeBase64: string;
}

export type CreatePaymentResponse = ApiResponse<CreatePaymentData>;

export interface VerifyQRCodeResponse {
  success: boolean;
  data: string;
  message: string;
  errors: null;
}
