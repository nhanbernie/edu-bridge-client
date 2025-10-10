import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetWhiteboardResponse, MeetingRouteParams } from "../type";

export const getWhiteboardEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetWhiteboardResponse, MeetingRouteParams>({
    query: ({ sessionId }) => ({
      url: API_ENDPOINTS.MEETING.GET_WHITEBOARD.replace("{sessionId}", sessionId),
      method: "GET",
    }),
    providesTags: ["Whiteboard"],
  });
