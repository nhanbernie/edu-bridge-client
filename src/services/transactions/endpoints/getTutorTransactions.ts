import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetTutorTransactionsResponse } from "../type";

export const getTutorTransactionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetTutorTransactionsResponse, void>({
    query: () => ({
      url: "/api/transaction/tutor",
      method: "GET",
    }),
    providesTags: ["TutorTransactions"],
  });
