import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetTutorUpcomingSessionsResponse, TutorUpcomingSessionsParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getTutorUpcomingSessionsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetTutorUpcomingSessionsResponse, TutorUpcomingSessionsParams>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.GET_TUTOR_UPCOMING_SESSIONS.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: ["TutorUpcomingSessions"],
  });
