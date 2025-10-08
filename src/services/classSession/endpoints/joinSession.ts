import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { ApiResponse } from "@/services/api/type";

export interface JoinSessionParams {
  sessionId: string;
}

export type JoinSessionResponse = ApiResponse<string>;

export const joinSessionEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<JoinSessionResponse, JoinSessionParams>({
    query: ({ sessionId }) => ({
      url: API_ENDPOINTS.CLASS_SESSION.JOIN_SESSION.replace("{sessionId}", sessionId),
      method: "POST",
    }),
    invalidatesTags: ["StudentUpcomingSessions", "TutorUpcomingSessions"],
  });
