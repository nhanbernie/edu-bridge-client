import React from "react";
import { VideoTile } from "./VideoTile";
import { cn } from "@/lib/utils";

interface LocalVideoPreviewProps {
  stream: MediaStream | null;
  userId: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Local video preview component (Picture-in-Picture style)
 * Shows user's own camera feed, typically in corner of screen
 *
 * @example
 * <LocalVideoPreview
 *   stream={localStream}
 *   userId="current-user"
 *   isMuted={micOn}
 *   isVideoOff={!camOn}
 *   size="sm"
 * />
 */
export const LocalVideoPreview: React.FC<LocalVideoPreviewProps> = ({
  stream,
  userId,
  isMuted = false,
  isVideoOff = false,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-32 h-24",
    md: "w-48 h-36",
    lg: "w-64 h-48",
  };

  return (
    <div className={cn("relative flex-shrink-0", sizeClasses[size], className)}>
      <VideoTile
        stream={stream}
        userId={userId}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isLocal={true}
        className="w-full h-full"
      />
    </div>
  );
};
