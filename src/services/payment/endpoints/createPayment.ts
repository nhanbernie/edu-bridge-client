import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { CreatePaymentRequest, CreatePaymentResponse } from "../type";

export const createPaymentEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<CreatePaymentResponse, CreatePaymentRequest>({
    query: (data) => ({
      url: "/api/payment",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Payment"],
  });
