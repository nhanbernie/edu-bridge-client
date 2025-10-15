import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { ApiResponse } from "@/services/api/type";

interface VerifyOtpRegisterRequest {
  email: string;
  otpCode: string;
}

export const verifyOtpRegisterEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<boolean>, VerifyOtpRegisterRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.AUTH.VERIFY_OTP_REGISTER,
      method: "POST",
      body: data,
    }),
  });
