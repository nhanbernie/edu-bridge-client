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

      // Force play video nếu bị pause
      if (!isVideoOff) {
        videoElement.play().catch((err) => {
          console.warn(`[VideoTile ${userId}] Video play failed:`, err);
        });
      }
    }

    return () => {
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [stream, userId, isVideoOff]);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
        "shadow-2xl ring-1",
        isLocal ? "ring-blue-500/50 shadow-blue-500/20" : "ring-gray-700/50 shadow-gray-900/50",
        "transition-all duration-300 hover:scale-[1.02]",
        className
      )}
    >
      {/* Video element - Always render but control visibility */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        className={cn(
          "w-full h-full object-cover",
          "transition-opacity duration-300",
          isVideoOff && "opacity-0 invisible"
        )}
        style={{ minWidth: "100%", minHeight: "100%" }}
      />

      {/* Fallback when video is off */}
      {(isVideoOff || !stream) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-full shadow-xl">
                <User className="w-10 h-10 text-gray-300" />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-300">
              {isLocal ? "Camera Off" : userId}
            </span>
          </div>
        </div>
      )}

      {/* User label overlay - Clean without blur */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Status dot */}
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                !isVideoOff ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-500"
              )}
            />
            <span className="text-white text-sm font-medium truncate flex-1">
              {isLocal ? "You" : userId}
            </span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-1.5">
            {isMuted && (
              <div className="bg-red-500 rounded-full p-1.5 shadow-lg">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
            {isVideoOff && (
              <div className="bg-red-500 rounded-full p-1.5 shadow-lg">
                <VideoOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local indicator - Simple small badge */}
      {isLocal && (
        <div className="absolute top-2 left-2">
          <div className="bg-gray-900/80 text-gray-300 text-xs font-medium px-2 py-1 rounded shadow-lg">
            You
          </div>
        </div>
      )}

      {/* Overlay border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      </div>
    </div>
  );
};
