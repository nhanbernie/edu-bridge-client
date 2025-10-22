import React from "react";
import { VideoTile } from "./VideoTile";
import { Participant } from "../hooks/useWebRTC";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface RemoteVideoListProps {
  participants: Map<string, Participant>;
  className?: string;
  layout?: "grid" | "sidebar";
}

/**
 * Component to display all remote participants' video streams
 * Supports grid and sidebar layouts
 *
 * @example
 * <RemoteVideoList
 *   participants={participantsMap}
 *   layout="grid"
 * />
 */
export const RemoteVideoList: React.FC<RemoteVideoListProps> = ({
  participants,
  className,
  layout = "grid",
}) => {
  const participantArray = Array.from(participants.values());
  const count = participantArray.length;

  // Empty state - 1:1 mode placeholder (simple & clean)
  if (count === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl",
          "border border-white/10",
          "w-[280px] h-[210px]",
          className
        )}
      >
        <Users className="w-12 h-12 text-white/40 mb-3" />
        <p className="text-white/70 text-sm font-medium">Waiting for participant</p>
        <p className="text-white/40 text-xs mt-1">Video will appear here</p>
      </div>
    );
  }

  // Grid layout - Responsive grid based on participant count
  if (layout === "grid") {
    const gridCols =
      count === 1
        ? "grid-cols-1"
        : count === 2
          ? "grid-cols-2"
          : count <= 4
            ? "grid-cols-2"
            : "grid-cols-3";

    return (
      <div className={cn("grid gap-4", gridCols, "auto-rows-fr", className)}>
        {participantArray.map((participant) => (
          <VideoTile
            key={participant.peerId}
            stream={participant.stream}
            userId={participant.userId}
            isMuted={participant.isMuted}
            isVideoOff={participant.isVideoOff}
            className="aspect-video"
          />
        ))}
      </div>
    );
  }

  // Sidebar layout - Vertical list
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {participantArray.map((participant) => (
        <VideoTile
          key={participant.peerId}
          stream={participant.stream}
          userId={participant.userId}
          isMuted={participant.isMuted}
          isVideoOff={participant.isVideoOff}
          className="aspect-video"
        />
      ))}
    </div>
  );
};
