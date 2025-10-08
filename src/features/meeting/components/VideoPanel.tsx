"use client";

import React, { useRef, useEffect } from "react";
import { Video, VideoOff, Mic, MicOff, Users } from "lucide-react";

interface VideoPanelProps {
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  isVideoOn: boolean;
  isMicOn: boolean;
  onToggleVideo: () => void;
  onToggleMic: () => void;
  isJoined: boolean;
}

const VideoPanel: React.FC<VideoPanelProps> = ({
  localStream,
  remoteStreams,
  isVideoOn,
  isMicOn,
  onToggleVideo,
  onToggleMic,
  isJoined,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Setup local video
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Setup remote videos
  useEffect(() => {
    remoteStreams.forEach((stream, peerId) => {
      let videoElement = remoteVideoRefs.current.get(peerId);
      if (!videoElement) {
        videoElement = document.createElement("video");
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.className = "w-full h-full object-cover rounded-lg";
        remoteVideoRefs.current.set(peerId, videoElement);
      }
      videoElement.srcObject = stream;
    });
  }, [remoteStreams]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Main Video Area */}
      <div className="flex-1 relative bg-gray-100">
        {!isJoined ? (
          // Pre-join screen
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-900">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-16 w-16 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sẵn sàng tham gia?</h2>
              <p className="text-gray-600 mb-6">Kiểm tra camera và microphone trước khi tham gia</p>
            </div>
          </div>
        ) : (
          // Meeting screen
          <div className="absolute inset-0 p-4">
            {/* Remote participants grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {Array.from(remoteStreams.entries()).map(([peerId, stream]) => (
                <div
                  key={peerId}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden relative shadow-sm"
                >
                  <video
                    ref={(el) => {
                      if (el) {
                        remoteVideoRefs.current.set(peerId, el);
                        el.srcObject = stream;
                      }
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                    {peerId}
                  </div>
                </div>
              ))}
            </div>

            {/* Local video preview */}
            {localStream && (
              <div className="absolute top-4 right-4 w-48 h-36 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                  Bạn
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4">
          {/* Mic Toggle */}
          <button
            onClick={onToggleMic}
            disabled={!isJoined}
            className={`p-3 rounded-full transition-colors ${
              isMicOn
                ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                : "bg-red-500 hover:bg-red-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={onToggleVideo}
            disabled={!isJoined}
            className={`p-3 rounded-full transition-colors ${
              isVideoOn
                ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                : "bg-red-500 hover:bg-red-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          {/* Participants Count */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">{remoteStreams.size + 1} người</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;
