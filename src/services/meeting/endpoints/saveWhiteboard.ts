import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { SaveWhiteboardResponse, WhiteboardData, MeetingRouteParams } from "../type";

export const saveWhiteboardEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<SaveWhiteboardResponse, MeetingRouteParams & { data: WhiteboardData }>({
    query: ({ sessionId, data }) => ({
      url: API_ENDPOINTS.MEETING.SAVE_WHITEBOARD.replace("{sessionId}", sessionId),
      method: "PUT",
      body: data,
    }),
    invalidatesTags: ["Whiteboard"],
  });
