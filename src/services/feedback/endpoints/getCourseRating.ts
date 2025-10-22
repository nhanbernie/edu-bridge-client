import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetRatingResponse, CourseRatingRouteParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getCourseRatingEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetRatingResponse, CourseRatingRouteParams>({
    query: ({ courseId }) => ({
      url: API_ENDPOINTS.FEEDBACK.GET_COURSE_RATING.replace("{courseId}", courseId),
      method: "GET",
    }),
    providesTags: ["CourseRating"],
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
