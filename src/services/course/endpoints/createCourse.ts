import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateCourseRequest, CreateCourseResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const createCourseEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CreateCourseResponse, CreateCourseRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.COURSE.CREATE_COURSE,
      method: "POST",
      body,
    }),

    invalidatesTags: ["Course"],
    transformResponse: (response: CreateCourseResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Create course error:", response);
      return response;
    },
  });
