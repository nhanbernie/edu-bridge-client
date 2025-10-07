import { ApiResponse } from "../api/type";

// Transaction Types
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
export type GetTutorTransactionsResponse = ApiResponse<TransactionDto[]>;
export type GetStudentTransactionsResponse = ApiResponse<TransactionDto[]>;
export type GetAdminTransactionsResponse = ApiResponse<TransactionDto[]>;
