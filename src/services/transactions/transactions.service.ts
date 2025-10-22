import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getTutorTransactionsEndpoint,
  getStudentTransactionsEndpoint,
  getAdminTransactionsEndpoint,
  getServiceFeesEndpoint,
} from "./endpoints";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["TutorTransactions", "StudentTransactions", "AdminTransactions", "ServiceFees"],
  endpoints: (builder) => ({
    getTutorTransactions: getTutorTransactionsEndpoint(builder),
    getStudentTransactions: getStudentTransactionsEndpoint(builder),
    getAdminTransactions: getAdminTransactionsEndpoint(builder),
    getServiceFees: getServiceFeesEndpoint(builder),
  }),
});

export const {
  useGetTutorTransactionsQuery,
  useGetStudentTransactionsQuery,
  useGetAdminTransactionsQuery,
  useGetServiceFeesQuery,
} = transactionsApi;
