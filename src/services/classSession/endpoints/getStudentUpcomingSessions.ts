import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetStudentUpcomingSessionsResponse, StudentUpcomingSessionsParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getStudentUpcomingSessionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetStudentUpcomingSessionsResponse, StudentUpcomingSessionsParams>({
    query: ({ studentId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_STUDENT_UPCOMING_SESSIONS.replace(
        "{studentId}",
        studentId
      ),
      method: "GET",
    }),
    providesTags: ["StudentUpcomingSessions"],
  });
