import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { CreateBookingRequest, CreateBookingResponse } from "../type";

export const createBookingEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<CreateBookingResponse, CreateBookingRequest>({
    query: (data) => ({
      url: "/api/booking",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Booking"],
  });
