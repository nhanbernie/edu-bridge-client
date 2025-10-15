import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { createPaymentEndpoint, getCharityTotalEndpoint, verifyQRCodeEndpoint } from "./endpoints";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment", "Charity"],
  endpoints: (builder) => ({
    createPayment: createPaymentEndpoint(builder),
    getCharityTotal: getCharityTotalEndpoint(builder),
    verifyQRCode: verifyQRCodeEndpoint(builder),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetCharityTotalQuery,
  useLazyGetCharityTotalQuery,
  useVerifyQRCodeQuery,
  useLazyVerifyQRCodeQuery,
} = paymentApi;
