import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { TutorSubjectsResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getTutorSubjectsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<TutorSubjectsResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.TUTOR.GET_ALL_SUBJECTS,
      method: "GET",
    }),
    providesTags: ["TutorSubjects"],
    transformResponse: (response: TutorSubjectsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
