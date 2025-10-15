import React, { useState, useRef, useEffect } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { RemoteVideoList } from "./RemoteVideoList";
import { Participant } from "../hooks/useWebRTC";
import { cn } from "@/lib/utils";

interface DraggableRemoteVideoProps {
  participants: Map<string, Participant>;
  defaultPosition?: { x: number; y: number };
}

/**
 * Draggable wrapper for remote video
 * Supports drag & drop, minimize/maximize, close
 */
export const DraggableRemoteVideo: React.FC<DraggableRemoteVideoProps> = ({
  participants,
  defaultPosition = { x: 16, y: 96 }, // top-24 left-4
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow drag from header area
    if (!(e.target as HTMLElement).closest(".drag-handle")) {
      return;
    }

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: position.x,
      offsetY: position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const newX = dragRef.current.offsetX + deltaX;
    const newY = dragRef.current.offsetY + deltaY;

    // Constrain to viewport
    const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 300);
    const maxY = window.innerHeight - (containerRef.current?.offsetHeight || 200);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  // Don't render if closed (must be after all hooks)
  if (isClosed) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn("fixed z-30 p-2", isDragging ? "cursor-grabbing" : "cursor-grab")}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Wrapper with rounded corners and shadow */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-black/80 backdrop-blur-xl">
        {/* Header - Drag handle + Controls */}
        <div className="drag-handle bg-black/70 backdrop-blur-xl px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-xs font-semibold text-white/90">
              Remote ({participants.size})
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Minimize button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="w-3.5 h-3.5 text-white/70 hover:text-white" />
              ) : (
                <Minimize2 className="w-3.5 h-3.5 text-white/70 hover:text-white" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsClosed(true);
              }}
              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all"
              title="Close"
            >
              <X className="w-3.5 h-3.5 text-white/70 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Content - RemoteVideoList */}
        {!isMinimized && (
          <div className="bg-black/70 backdrop-blur-xl">
            <RemoteVideoList participants={participants} layout="grid" />
          </div>
        )}

        {/* Minimized state hint */}
        {isMinimized && (
          <div className="bg-black/70 backdrop-blur-xl px-4 py-2">
            <p className="text-xs text-white/50 italic text-center">Minimized</p>
          </div>
        )}
      </div>
    </div>
  );
};
