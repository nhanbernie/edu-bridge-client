import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetStudentEnrollmentsRequest, GetStudentEnrollmentsResponse } from "../type";

export const getStudentEnrollmentsEndpoint = (builder: EndpointBuilder<any, any, any>) => {
  return builder.query<GetStudentEnrollmentsResponse, GetStudentEnrollmentsRequest>({
    query: ({ studentId }) => ({
      url: API_ENDPOINTS.COURSE.GET_STUDENT_ENROLLMENTS.replace("{studentId}", studentId),
      method: "GET",
    }),
    providesTags: ["CourseEnrollments"],
  });
};
