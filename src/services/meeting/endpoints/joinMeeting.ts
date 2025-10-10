import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { JoinMeetingResponse, JoinMeetingRequest } from "../type";

export const joinMeetingEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<JoinMeetingResponse, JoinMeetingRequest>({
    query: ({ sessionId }) => ({
      url: API_ENDPOINTS.MEETING.JOIN_MEETING.replace("{sessionId}", sessionId),
      method: "POST",
    }),
    invalidatesTags: ["Meeting"],
  });
