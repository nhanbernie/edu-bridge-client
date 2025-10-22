import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetCourseRequest, GetCourseResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getCourseEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetCourseResponse, GetCourseRequest>({
    query: ({ tutorId }) => ({
      url: `${API_ENDPOINTS.COURSE.GET_COURSE}?tutorId=${tutorId}`,
      method: "GET",
    }),

    providesTags: (result, error, { tutorId }) => [{ type: "Course", id: tutorId }, "Course"],
    transformResponse: (response: GetCourseResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
