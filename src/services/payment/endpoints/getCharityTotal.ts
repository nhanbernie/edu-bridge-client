import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetCharityTotalResponse } from "../types/charity.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getCharityTotalEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetCharityTotalResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.PAYMENT.CHARITY,
      method: "GET",
    }),
    transformResponse: (response: GetCharityTotalResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
