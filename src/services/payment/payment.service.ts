import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { createPaymentEndpoint } from "./endpoints";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createPayment: createPaymentEndpoint(builder),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
