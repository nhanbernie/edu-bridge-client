"use client";

import React from "react";
import { Tldraw } from "@tldraw/tldraw";
import { ENV } from "@/utils/env";
import "@tldraw/tldraw/tldraw.css";

interface WhiteboardPanelProps {
  onMount?: (editor: any) => void;
}

const WhiteboardPanel: React.FC<WhiteboardPanelProps> = ({ onMount }) => {
  return (
    <div className="w-full h-full">
      <Tldraw onMount={onMount} licenseKey={ENV.TLDRAW.LICENSE_KEY} />
    </div>
  );
};

export default WhiteboardPanel;
