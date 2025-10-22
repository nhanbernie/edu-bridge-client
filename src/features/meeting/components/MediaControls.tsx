import React from "react";
import { Mic, MicOff, Video, VideoOff, Monitor, Hand, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaControlsProps {
  // Audio/Video state
  micOn: boolean;
  camOn: boolean;
  isScreenSharing?: boolean;
  isHandRaised?: boolean;
  unreadMessages?: number;

  // Actions
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare?: () => void;
  onToggleHand?: () => void;
  onToggleChat?: () => void;
  onEndCall: () => void;

  // UI
  className?: string;
  disabled?: boolean;
}

/**
 * Media controls bar for meeting
 * Contains buttons for mic, camera, screen share, hand raise, chat, and end call
 *
 * @example
 * <MediaControls
 *   micOn={micOn}
 *   camOn={camOn}
 *   onToggleMic={toggleMic}
 *   onToggleCamera={toggleCamera}
 *   onEndCall={handleEndCall}
 * />
 */
export const MediaControls: React.FC<MediaControlsProps> = ({
  micOn,
  camOn,
  isScreenSharing = false,
  isHandRaised = false,
  unreadMessages = 0,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onToggleHand,
  onToggleChat,
  onEndCall,
  className,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-3",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
        "border-t border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Microphone */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onToggleMic}
        disabled={disabled}
        className={cn(
          "rounded-full w-10 h-10 p-0 transition-all shadow-lg",
          micOn
            ? "bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/30"
            : "bg-red-500/80 hover:bg-red-500 text-white border border-red-400/50"
        )}
        aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
      >
        {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </Button>

      {/* Camera */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onToggleCamera}
        disabled={disabled}
        className={cn(
          "rounded-full w-10 h-10 p-0 transition-all shadow-lg",
          camOn
            ? "bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/30"
            : "bg-red-500/80 hover:bg-red-500 text-white border border-red-400/50"
        )}
        aria-label={camOn ? "Turn off camera" : "Turn on camera"}
      >
        {camOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
      </Button>

      {/* Screen Share */}
      {onToggleScreenShare && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleScreenShare}
          disabled={disabled}
          className={cn(
            "rounded-full w-10 h-10 p-0 transition-all shadow-lg",
            isScreenSharing
              ? "bg-blue-500/90 hover:bg-blue-500 text-white border border-blue-400/50"
              : "bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/30"
          )}
          aria-label={isScreenSharing ? "Stop sharing" : "Share screen"}
        >
          <Monitor className="w-4 h-4" />
        </Button>
      )}

      {/* Raise Hand */}
      {onToggleHand && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleHand}
          disabled={disabled}
          className={cn(
            "rounded-full w-10 h-10 p-0 transition-all shadow-lg",
            isHandRaised
              ? "bg-amber-500/90 hover:bg-amber-500 text-white border border-amber-400/50"
              : "bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/30"
          )}
          aria-label={isHandRaised ? "Lower hand" : "Raise hand"}
        >
          <Hand className="w-4 h-4" />
        </Button>
      )}

      {/* Chat */}
      {onToggleChat && (
        <div className="relative">
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleChat}
            disabled={disabled}
            className="rounded-full w-10 h-10 p-0 bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/30 backdrop-blur-xl text-gray-700 dark:text-white border border-gray-200 dark:border-white/30 transition-all shadow-lg"
            aria-label="Toggle chat"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
          {/* Unread message badge */}
          {unreadMessages > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border-2 border-white dark:border-gray-900">
              {unreadMessages > 99 ? "99+" : unreadMessages}
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1" />

      {/* End Call */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onEndCall}
        disabled={disabled}
        className="rounded-full w-10 h-10 p-0 bg-red-500/80 hover:bg-red-500 text-white transition-all shadow-lg border border-red-400/50"
        aria-label="End call"
      >
        <Phone className="w-4 h-4 rotate-[135deg]" />
      </Button>
    </div>
  );
};
