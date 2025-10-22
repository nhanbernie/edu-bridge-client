import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetStudentTransactionsResponse } from "../type";

export const getStudentTransactionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetStudentTransactionsResponse, void>({
    query: () => ({
      url: "/api/transaction/student",
      method: "GET",
    }),
    providesTags: ["StudentTransactions"],
  });
