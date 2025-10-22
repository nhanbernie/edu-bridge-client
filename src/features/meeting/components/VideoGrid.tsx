import React, { ReactNode } from "react";
import { LocalVideoPreview } from "./LocalVideoPreview";
import { RemoteVideoList } from "./RemoteVideoList";
import { DraggableRemoteVideo } from "./DraggableRemoteVideo";
import { cn } from "@/lib/utils";

// Simplified Participant type (no hook dependency)
export interface Participant {
  peerId: string;
  userId: string;
  stream: MediaStream;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface VideoGridProps {
  // Streams
  localStream: MediaStream | null;
  screenStream?: MediaStream | null; // Screen share stream
  participants: Map<string, Participant>;
  userId: string;
  remoteScreenShareUserId?: string | null; // User ID đang share màn hình

  // Local user state
  micOn: boolean;
  camOn: boolean;
  isScreenSharing?: boolean;

  // Layout
  layout?: "grid" | "sidebar" | "fullscreen";
  showLocalPreview?: boolean;

  children?: ReactNode; // For whiteboard or other overlays

  className?: string;
}
export const VideoGrid: React.FC<VideoGridProps> = ({
  localStream,
  screenStream,
  participants,
  userId,
  remoteScreenShareUserId,
  micOn,
  camOn,
  isScreenSharing = false,
  layout = "grid",
  showLocalPreview = true,
  children,
  className,
}) => {
  const participantCount = participants.size;

  // Tìm remote participant đang share màn hình
  const remoteScreenShareParticipant = remoteScreenShareUserId
    ? Array.from(participants.values()).find((p) => p.userId === remoteScreenShareUserId)
    : null;

  // Kiểm tra xem có ai đang share màn hình không
  const hasScreenShare = isScreenSharing || !!remoteScreenShareParticipant;

  // Grid layout: All participants in a grid, local preview in corner
  if (layout === "grid") {
    return (
      <div className={cn("relative w-full h-full", className)}>
        {/*
          PRIORITY RENDERING:
          1. Screen Share (nếu có) - z-10
          2. Whiteboard (nếu không có screen share) - z-0
          3. Remote participants (draggable) - z-30
          4. Local preview (PiP) - z-20
        */}

        {/* Whiteboard - CHỈ hiển thị khi KHÔNG có screen share */}
        {!hasScreenShare && children && <div className="absolute inset-0 z-0">{children}</div>}

        {/* Local Screen Share - Hiển thị màn hình share của chính mình */}
        {isScreenSharing && screenStream && (
          <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
            <video
              ref={(el) => {
                if (el && screenStream) {
                  el.srcObject = screenStream;
                  el.play().catch(console.error);
                }
              }}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
            {/* Screen share indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-30 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">You are sharing your screen</span>
            </div>
          </div>
        )}

        {/* Remote Screen Share - Hiển thị màn hình share của người khác */}
        {!isScreenSharing && remoteScreenShareParticipant && (
          <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
            <video
              ref={(el) => {
                if (el && remoteScreenShareParticipant.stream) {
                  el.srcObject = remoteScreenShareParticipant.stream;
                  el.play().catch(console.error);
                }
              }}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
            {/* Remote screen share indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-30 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">
                {remoteScreenShareParticipant.userId} is sharing their screen
              </span>
            </div>
          </div>
        )}

        {/* Remote participants - Draggable (1:1 mode) */}
        <DraggableRemoteVideo participants={participants} defaultPosition={{ x: 16, y: 96 }} />

        {/* Local preview (Picture-in-Picture) */}
        {showLocalPreview && localStream && (
          <div className="absolute bottom-4 right-4 z-20">
            <LocalVideoPreview
              stream={localStream}
              userId={userId}
              isMuted={!micOn}
              isVideoOff={!camOn}
              size="md"
            />
          </div>
        )}
      </div>
    );
  }

  // Sidebar layout: Whiteboard/content main, videos in sidebar
  if (layout === "sidebar") {
    return (
      <div className={cn("flex w-full h-full", className)}>
        {/* Main content area */}
        <div className="flex-1 relative">
          {children || (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <p className="text-gray-400">No content</p>
            </div>
          )}
        </div>

        {/* Sidebar with videos */}
        <div className="w-80 bg-gray-900 border-l border-gray-700 p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Local preview */}
          {showLocalPreview && localStream && (
            <LocalVideoPreview
              stream={localStream}
              userId={userId}
              isMuted={!micOn}
              isVideoOff={!camOn}
              size="lg"
            />
          )}

          {/* Remote participants */}
          <RemoteVideoList participants={participants} layout="sidebar" />
        </div>
      </div>
    );
  }

  // Fullscreen layout: One participant fills screen, others in strip
  if (layout === "fullscreen") {
    const participantArray = Array.from(participants.values());
    const mainParticipant = participantArray[0]; // First participant as main

    return (
      <div className={cn("relative w-full h-full bg-gray-900", className)}>
        {/* Main participant fullscreen */}
        {mainParticipant ? (
          <div className="absolute inset-0">
            <video
              ref={(el) => {
                if (el && mainParticipant.stream) {
                  el.srcObject = mainParticipant.stream;
                }
              }}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-white text-sm">
              {mainParticipant.userId}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400">No participants</p>
          </div>
        )}

        {/* Bottom strip with other participants + local */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-2">
            {/* Local preview */}
            {showLocalPreview && localStream && (
              <LocalVideoPreview
                stream={localStream}
                userId={userId}
                isMuted={!micOn}
                isVideoOff={!camOn}
                size="sm"
              />
            )}

            {/* Other participants (skip first one) */}
            {participantArray.slice(1).map((participant) => (
              <div key={participant.peerId} className="w-32 h-24">
                <video
                  ref={(el) => {
                    if (el && participant.stream) {
                      el.srcObject = participant.stream;
                    }
                  }}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover rounded border-2 border-gray-600"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
