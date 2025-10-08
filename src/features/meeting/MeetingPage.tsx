"use client";

import React, { useState, useEffect } from "react";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  PhoneOff,
  Users,
  Settings,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useMeeting } from "./hooks/useMeeting";
import { Whiteboard, ChatPanel, VideoPanel } from "./components";

interface MeetingPageProps {
  sessionId: string;
  userId?: string;
}

const MeetingPage: React.FC<MeetingPageProps> = ({ sessionId, userId = "user-123" }) => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  const {
    isJoined,
    isVideoOn,
    isMicOn,
    messages,
    localStream,
    remoteStreams,
    isLoading,
    handleJoinMeeting,
    handleLeaveMeeting,
    handleSendMessage,
    toggleVideo,
    toggleMic,
    setupEditorListener,
  } = useMeeting({ sessionId, userId });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-lg">Đang khởi tạo phòng học...</p>
          <p className="text-sm text-gray-600 mt-2">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Meeting Room</h1>
            <p className="text-sm text-gray-600">Session ID: {sessionId}</p>
            <p className="text-xs text-gray-500">User: {userId}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWhiteboard(!showWhiteboard)}
              className={`p-2 rounded-lg transition-colors ${
                showWhiteboard ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-700">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-700">
              <Users className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className="flex-1 flex flex-col">
          {!isJoined ? (
            // Pre-join screen
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-16 w-16 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Sẵn sàng tham gia?</h2>
                <p className="text-gray-600 mb-6">
                  Kiểm tra camera và microphone trước khi tham gia
                </p>
                <button
                  onClick={handleJoinMeeting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Tham gia ngay
                </button>
              </div>
            </div>
          ) : (
            // Meeting screen
            <div className="flex-1 bg-gray-50 relative">
              {showWhiteboard ? (
                <Whiteboard onMount={setupEditorListener} isJoined={isJoined} />
              ) : (
                <VideoPanel
                  localStream={localStream}
                  remoteStreams={remoteStreams}
                  isVideoOn={isVideoOn}
                  isMicOn={isMicOn}
                  onToggleVideo={toggleVideo}
                  onToggleMic={toggleMic}
                  isJoined={isJoined}
                />
              )}
            </div>
          )}

          {/* Controls */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMic}
                disabled={!isJoined}
                className={`p-3 rounded-full transition-colors ${
                  isMicOn
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-red-500 hover:bg-red-600 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleVideo}
                disabled={!isJoined}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-red-500 hover:bg-red-600 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              {isJoined ? (
                <button
                  onClick={handleLeaveMeeting}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  <PhoneOff className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleJoinMeeting}
                  className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUserId={userId}
            isJoined={isJoined}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
