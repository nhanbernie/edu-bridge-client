import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetAdminTransactionsResponse } from "../type";

export const getAdminTransactionsEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.query<GetAdminTransactionsResponse, void>({
    query: () => ({
      url: "/api/transaction/admin",
      method: "GET",
    }),
    providesTags: ["AdminTransactions"],
  });
