import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getAvailabilityBlocksEndpoint,
  createAvailabilityBlockEndpoint,
  updateAvailabilityBlockEndpoint,
  deleteAvailabilityBlockEndpoint,
} from "./endpoints/index";

export const availabilityBlockApi = createApi({
  reducerPath: "availabilityBlockApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AvailabilityBlock"],
  endpoints: (builder) => ({
    getAvailabilityBlocks: getAvailabilityBlocksEndpoint(builder),
    createAvailabilityBlock: createAvailabilityBlockEndpoint(builder),
    updateAvailabilityBlock: updateAvailabilityBlockEndpoint(builder),
    deleteAvailabilityBlock: deleteAvailabilityBlockEndpoint(builder),
  }),
});

export const {
  useGetAvailabilityBlocksQuery,
  useCreateAvailabilityBlockMutation,
  useUpdateAvailabilityBlockMutation,
  useDeleteAvailabilityBlockMutation,
} = availabilityBlockApi;
