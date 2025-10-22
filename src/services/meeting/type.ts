import { ApiResponse } from "../api/type";

// Meeting Types
export interface WhiteboardData {
  whiteboardData: string; // JSON string of Tldraw snapshot
}

export interface ChatMessage {
  userId: string;
  message: string;
  timestamp: string;
}

export interface JoinMeetingRequest {
  sessionId: string;
}

export interface SendMessageRequest {
  userId: string;
  message: string;
}

// API Response Types
export type GetWhiteboardResponse = ApiResponse<string>;
export type SaveWhiteboardResponse = ApiResponse<boolean>;
export type JoinMeetingResponse = ApiResponse<boolean>;
export type GetChatHistoryResponse = ApiResponse<ChatMessage[]>;
export type SendMessageResponse = ApiResponse<boolean>;

// Route Parameters
export interface MeetingRouteParams {
  sessionId: string;
}
