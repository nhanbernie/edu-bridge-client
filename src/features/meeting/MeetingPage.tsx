"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface MeetingPageProps {
  sessionId: string;
}

const MeetingPage: React.FC<MeetingPageProps> = ({ sessionId }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const handleJoin = () => setIsJoined(true);
  const handleLeave = () => setIsJoined(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Meeting Room</h1>
            <p className="text-sm text-gray-400">Session ID: {sessionId}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
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
            <div className="flex-1 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Sẵn sàng tham gia?</h2>
                <p className="text-gray-400 mb-6">
                  Kiểm tra camera và microphone trước khi tham gia
                </p>
                <button
                  onClick={handleJoin}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  Tham gia ngay
                </button>
              </div>
            </div>
          ) : (
            // Meeting screen
            <div className="flex-1 bg-gray-800 relative">
              {/* Main video */}
              <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-400">Gia sư đang kết nối...</p>
                </div>
              </div>

              {/* Participant videos */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400">Bạn</p>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-full transition-colors ${
                  isMicOn ? "bg-gray-600 hover:bg-gray-500" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn ? "bg-gray-600 hover:bg-gray-500" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              {isJoined ? (
                <button
                  onClick={handleLeave}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                >
                  <PhoneOff className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Chat */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-semibold">Chat</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Chào mừng bạn đến với buổi học!</p>
                <p className="text-xs text-gray-500 mt-1">Gia sư - 14:00</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Gửi</button>
            </div>
          </div>

          {/* Participants */}
          <div className="border-t border-gray-700 p-4">
            <h3 className="font-semibold mb-3">Thành viên (2)</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
                <span className="text-sm">Gia sư</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">B</span>
                </div>
                <span className="text-sm">Bạn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
