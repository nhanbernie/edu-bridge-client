import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { TutorSearchResponse } from "../type";

export interface SearchTutorsRequest {
  SearchTerm?: string;
  PageNumber?: number;
  PageSize?: number;
}

export const searchTutorsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<TutorSearchResponse, SearchTutorsRequest>({
    query: (params) => {
      const searchParams = new URLSearchParams();

      if (params.SearchTerm) {
        searchParams.append("SearchTerm", params.SearchTerm);
      }
      if (params.PageNumber !== undefined) {
        searchParams.append("PageNumber", params.PageNumber.toString());
      }
      if (params.PageSize !== undefined) {
        searchParams.append("PageSize", params.PageSize.toString());
      }

      return {
        url: `/api/tutor/search?${searchParams.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["Tutor"],
    transformResponse: (response: TutorSearchResponse) => {
      return response;
    },
  });
