import React, { useEffect, useRef } from "react";
import { MicOff, VideoOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoTileProps {
  stream: MediaStream | null;
  userId: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isLocal?: boolean;
  className?: string;
}

/**
 * Individual video tile component for displaying a participant's video stream
 * Handles both local and remote streams with audio/video indicators
 *
 * @example
 * <VideoTile
 *   stream={localStream}
 *   userId="user-123"
 *   isMuted={true}
 *   isLocal={true}
 * />
 */
export const VideoTile: React.FC<VideoTileProps> = ({
  stream,
  userId,
  isMuted = false,
  isVideoOff = false,
  isLocal = false,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Attach stream to video element when available
   */
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && stream) {
      videoElement.srcObject = stream;
      console.log(`📹 Video stream attached for: ${userId}`);
    }

    return () => {
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [stream, userId]);

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden bg-gray-900",
        "border-2 border-gray-700",
        isLocal && "border-blue-500",
        className
      )}
    >
      {/* Video element */}
      {stream && !isVideoOff ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal} // Always mute local video to prevent feedback
          className="w-full h-full object-cover"
        />
      ) : (
        // Fallback when video is off
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <User className="w-12 h-12" />
            <span className="text-sm font-medium">{isLocal ? "You" : userId}</span>
          </div>
        </div>
      )}

      {/* User label overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium truncate flex-1">
            {isLocal ? "You" : userId}
          </span>

          {/* Status indicators */}
          <div className="flex items-center gap-1">
            {isMuted && (
              <div className="bg-red-500 rounded-full p-1">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
            {isVideoOff && (
              <div className="bg-red-500 rounded-full p-1">
                <VideoOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local indicator */}
      {isLocal && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          You
        </div>
      )}
    </div>
  );
};
