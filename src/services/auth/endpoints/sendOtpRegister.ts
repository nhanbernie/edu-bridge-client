import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { ApiResponse } from "@/services/api/type";

interface SendOtpRegisterRequest {
  email: string;
}

export const sendOtpRegisterEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<string>, SendOtpRegisterRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.AUTH.SEND_OTP_REGISTER,
      method: "POST",
      body: data,
    }),
  });
