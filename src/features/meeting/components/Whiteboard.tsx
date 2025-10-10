"use client";

import React, { useEffect, useState } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

interface WhiteboardProps {
  onMount: (editor: any) => void;
  isJoined: boolean;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ onMount, isJoined }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure CSS is loaded
    const loadCSS = () => {
      if (!document.querySelector('link[href*="tldraw.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/@tldraw/tldraw@3.15.4/tldraw.css";
        link.onload = () => setIsReady(true);
        document.head.appendChild(link);
      } else {
        setIsReady(true);
      }
    };

    loadCSS();
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bảng trắng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      <Tldraw onMount={onMount} persistenceKey={`whiteboard-${isJoined ? "active" : "inactive"}`} />
    </div>
  );
};

export default Whiteboard;
