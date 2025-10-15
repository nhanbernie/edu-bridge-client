import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetChatHistoryResponse, MeetingRouteParams } from "../type";

export const getChatHistoryEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetChatHistoryResponse, MeetingRouteParams>({
    query: ({ sessionId }) => ({
      url: API_ENDPOINTS.MEETING.GET_CHAT_HISTORY.replace("{sessionId}", sessionId),
      method: "GET",
    }),
    providesTags: ["ChatHistory"],
  });
