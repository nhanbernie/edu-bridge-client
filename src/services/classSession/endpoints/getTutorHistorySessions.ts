import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetTutorHistorySessionsResponse, TutorUpcomingSessionsParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getTutorHistorySessionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetTutorHistorySessionsResponse, TutorUpcomingSessionsParams>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_TUTOR_HISTORY_SESSIONS.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: (result, error, { tutorId }) => [
      { type: "TutorHistorySessions", id: tutorId },
      "TutorHistorySessions",
    ],
    transformResponse: (response: GetTutorHistorySessionsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
