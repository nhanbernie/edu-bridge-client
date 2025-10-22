"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUserId } from "@/hooks/useUserId";
import ChatPanel from "./components/ChatPanel";
import WhiteboardPanel from "./components/WhiteboardPanel";
import UserLoading from "./components/UserLoading";
import { useSignalR } from "./hooks/useSignalR";
import { VideoGrid, MediaControls } from "./components";
import { useWebRTC } from "./hooks";

interface MeetingPageProps {
  sessionId: string;
}

const MeetingPage: React.FC<MeetingPageProps> = ({ sessionId }) => {
  const { userId, userRole } = useUserId();
  const t = useTranslations("meeting");
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [lastReadMessageCount, setLastReadMessageCount] = useState(0);

  const {
    isConnected,
    messages,
    peerId: signalRPeerId,
    joined,
    isJoining,
    sendChatMessage,
    joinSession,
    handleMount,
    sendPeerId,
    onReceivePeerId,
  } = useSignalR({
    userId: userId || "",
    userRole: userRole || "",
    sessionId,
  });

  const {
    localStream,
    micOn,
    camOn,
    toggleMic,
    toggleCamera,
    participants,
    isReady: isWebRTCReady,
    callPeer,
    peerId: webRTCPeerId,
  } = useWebRTC({
    sessionId,
    userId: userId || "",
    autoStartMedia: true,
  });

  useEffect(() => {
    if (webRTCPeerId && joined) {
      sendPeerId(webRTCPeerId);
    }
  }, [webRTCPeerId, joined, sendPeerId]);

  useEffect(() => {
    onReceivePeerId((remotePeerId, remoteUserId) => {
      callPeer(remotePeerId, remoteUserId);
    });
  }, [onReceivePeerId, callPeer]);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (isChatOpen) {
      // Chat is open, mark all as read
      setLastReadMessageCount(messages.length);
      setUnreadMessages(0);
    } else {
      // Chat is closed, count new messages
      const newMessages = messages.length - lastReadMessageCount;
      if (newMessages > 0) {
        setUnreadMessages(newMessages);
      }
    }
  }, [messages.length, isChatOpen, lastReadMessageCount]);

  // Auto join session when connected
  useEffect(() => {
    if (isConnected && !joined && !isJoining) {
      joinSession(sessionId);
    }
  }, [isConnected, joined, isJoining, sessionId, joinSession]);

  // NOTE: !isConnected
  if (!userId || !userRole) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <UserLoading userType={userRole === "STUDENT" ? "student" : "tutor"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Main Content Area */}
      <main className="relative h-screen w-full flex">
        <div className="flex-1 relative flex flex-col">
          <div className="flex-1 relative">
            <VideoGrid
              localStream={localStream}
              participants={participants}
              userId={userId || ""}
              micOn={micOn}
              camOn={camOn}
              layout="grid"
              showLocalPreview={true}
            >
              <WhiteboardPanel onMount={handleMount} />
            </VideoGrid>
          </div>

          <MediaControls
            micOn={micOn}
            camOn={camOn}
            isHandRaised={isHandRaised}
            unreadMessages={unreadMessages}
            onToggleMic={toggleMic}
            onToggleCamera={toggleCamera}
            onToggleHand={() => setIsHandRaised(!isHandRaised)}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
            onEndCall={() => {
              // TODO: Implement end call logic
            }}
            disabled={false}
          />
        </div>

        {/* Chat Panel - Sidebar */}
        {isChatOpen && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700">
            <ChatPanel
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              messages={messages}
              onSendMessage={sendChatMessage}
              currentUserId={userId || ""}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingPage;
