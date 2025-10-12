import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { createPaymentEndpoint, getCharityTotalEndpoint } from "./endpoints";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment", "Charity"],
  endpoints: (builder) => ({
    createPayment: createPaymentEndpoint(builder),
    getCharityTotal: getCharityTotalEndpoint(builder),
  }),
});

export const { useCreatePaymentMutation, useGetCharityTotalQuery, useLazyGetCharityTotalQuery } =
  paymentApi;
