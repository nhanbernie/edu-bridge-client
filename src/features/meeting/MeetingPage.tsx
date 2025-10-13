"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUserId } from "@/hooks/useUserId";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Hand,
  MessageCircle,
  Phone,
  Maximize2,
  MoreVertical,
} from "lucide-react";
import ChatPanel from "./components/ChatPanel";
import WhiteboardPanel from "./components/WhiteboardPanel";
import UserLoading from "./components/UserLoading";
import { useSignalR } from "./hooks/useSignalR";
interface MeetingPageProps {
  sessionId: string;
}

const MeetingPage: React.FC<MeetingPageProps> = ({ sessionId }) => {
  const { userId, userRole } = useUserId();
  const t = useTranslations("meeting");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // SignalR connection
  const {
    isConnected,
    messages,
    peerId,
    micOn,
    camOn,
    joined,
    isJoining,
    sendChatMessage,
    joinSession,
    toggleMedia,
    handleMount,
  } = useSignalR({
    userId: userId || "",
    userRole: userRole || "",
    sessionId,
  });

  const currentTime = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Auto join session when connected
  useEffect(() => {
    if (isConnected && !joined && !isJoining) {
      joinSession(sessionId);
    }
  }, [isConnected, joined, isJoining, sessionId, joinSession]);

  // Loading state - AFTER all hooks
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <UserLoading userType="tutor" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Main Content Area */}
      <main className="relative h-screen w-full flex">
        {/* Video/Whiteboard Content */}
        <div className={`flex-1 bg-gray-100 dark:bg-gray-900 transition-all duration-300}`}>
          {/* Whiteboard - Hiển thị ngay khi có userId */}
          <div className="w-full h-full pb-20">
            <WhiteboardPanel onMount={handleMount} />
          </div>

          {/* Top Left - Room Info */}
          <div className="absolute top-4 left-4 bg-black/50 dark:bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 z-10">
            <div className="text-sm">
              <div className="font-medium text-white">Room: {sessionId.slice(0, 8)}</div>
              <div className="text-gray-300 text-xs">{currentTime}</div>
            </div>
          </div>

          {/* Video controls overlay */}
          {/* <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button className="p-2 bg-gray-800/50 dark:bg-black/50 rounded-full hover:bg-gray-800/70 dark:hover:bg-black/70 transition-colors">
              <Maximize2 className="w-4 h-4 text-gray-700 dark:text-white" />
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 bg-gray-800/50 dark:bg-black/50 rounded-full hover:bg-gray-800/70 dark:hover:bg-black/70 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gray-700 dark:text-white" />
            </button>
          </div> */}
        </div>

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 left-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-30 transition-all duration-300 ${isChatOpen ? "right-80" : "right-0"}`}
        >
          <div className="flex items-center justify-center px-6 py-4">
            {/* Center - Main Controls */}
            <div className="flex items-center gap-4">
              {/* Mic Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Video Toggle */}
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              {/* Screen Share */}
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <Monitor className="w-5 h-5" />
              </button>

              {/* Raise Hand */}
              <button
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`p-3 rounded-full transition-colors ${
                  isHandRaised
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <Hand className="w-5 h-5" />
              </button>

              {/* Chat Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Panel - Part of main layout */}
        {isChatOpen && (
          <div className="border-l border-gray-200 dark:border-gray-700">
            <ChatPanel
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              messages={messages}
              onSendMessage={sendChatMessage}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingPage;
