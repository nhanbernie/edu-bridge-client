import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getWhiteboardEndpoint,
  saveWhiteboardEndpoint,
  joinMeetingEndpoint,
  getChatHistoryEndpoint,
  sendMessageEndpoint,
} from "./endpoints";

export const meetingApi = createApi({
  reducerPath: "meetingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Whiteboard", "Meeting", "ChatHistory"],
  endpoints: (builder) => ({
    getWhiteboard: getWhiteboardEndpoint(builder),
    saveWhiteboard: saveWhiteboardEndpoint(builder),
    joinMeeting: joinMeetingEndpoint(builder),
    getChatHistory: getChatHistoryEndpoint(builder),
    sendMessage: sendMessageEndpoint(builder),
  }),
});

export const {
  useGetWhiteboardQuery,
  useSaveWhiteboardMutation,
  useJoinMeetingMutation,
  useGetChatHistoryQuery,
  useSendMessageMutation,
} = meetingApi;
