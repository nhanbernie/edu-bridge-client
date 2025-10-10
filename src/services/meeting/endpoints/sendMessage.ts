import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { SendMessageResponse, SendMessageRequest, MeetingRouteParams } from "../type";

export const sendMessageEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<SendMessageResponse, MeetingRouteParams & { data: SendMessageRequest }>({
    query: ({ sessionId, data }) => ({
      url: API_ENDPOINTS.MEETING.SEND_MESSAGE.replace("{sessionId}", sessionId),
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["ChatHistory"],
  });
