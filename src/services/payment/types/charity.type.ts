import { ApiResponse } from "@/services/api/type";

export interface CharityResponse {
  totalAmount: number;
}

export type GetCharityTotalResponse = ApiResponse<number>;
