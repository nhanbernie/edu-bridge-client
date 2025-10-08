"use client";

import React, { useEffect } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface WhiteboardProps {
  onMount: (editor: any) => void;
  isJoined: boolean;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ onMount, isJoined }) => {
  useEffect(() => {
    // Load Tldraw CSS if not already loaded
    if (!document.querySelector('link[href*="tldraw.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/@tldraw/tldraw@3.15.4/tldraw.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <Tldraw onMount={onMount} persistenceKey={`whiteboard-${isJoined ? "active" : "inactive"}`} />
    </div>
  );
};

export default Whiteboard;
