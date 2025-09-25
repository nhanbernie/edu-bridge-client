import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { createBookingEndpoint } from "./endpoints";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: createBookingEndpoint(builder),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
