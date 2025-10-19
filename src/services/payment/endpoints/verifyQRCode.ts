import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { VerifyQRCodeResponse } from "../type";

export const verifyQRCodeEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<VerifyQRCodeResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.PAYMENT.VERIFY_QR,
      method: "GET",
    }),
  });
