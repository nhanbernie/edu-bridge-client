import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetStudentHistorySessionsResponse, StudentUpcomingSessionsParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getStudentHistorySessionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetStudentHistorySessionsResponse, StudentUpcomingSessionsParams>({
    query: ({ studentId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_STUDENT_HISTORY_SESSIONS.replace(
        "{studentId}",
        studentId
      ),
      method: "GET",
    }),
    providesTags: (result, error, { studentId }) => [
      { type: "StudentHistorySessions", id: studentId },
      "StudentHistorySessions",
    ],
    transformResponse: (response: GetStudentHistorySessionsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
