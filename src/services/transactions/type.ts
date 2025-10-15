import { ApiResponse } from "../api/type";

// New DTO for tutor and student
export interface UserTransactionHistoryDto {
  transactionId: string;
  date: string;
  description: string;
  amount: number;
  flowType: string;
  status: string;
}

// Old DTO for admin (keep unchanged)
export interface TransactionDto {
  transactionId: string;
  paymentId: string;
  bookingId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  serviceFee: number;
  type: number; // 0 = payment, 1 = withdrawal, etc.
  status: number; // 0 = pending, 1 = completed, 2 = failed
  createdAt: string;
  updatedAt: string | null;
  description: string;
}

// API Response Types
export type GetTutorTransactionsResponse = ApiResponse<UserTransactionHistoryDto[]>;
export type GetStudentTransactionsResponse = ApiResponse<UserTransactionHistoryDto[]>;
export type GetAdminTransactionsResponse = ApiResponse<TransactionDto[]>;
export type GetServiceFeesResponse = ApiResponse<number>;
