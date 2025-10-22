import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetServiceFeesResponse } from "../type";

export const getServiceFeesEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetServiceFeesResponse, void>({
    query: () => ({
      url: "/api/transaction/admin/service-fees",
      method: "GET",
    }),
    providesTags: ["ServiceFees"],
  });
