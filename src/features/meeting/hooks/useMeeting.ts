"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import Peer from "peerjs";
import {
  useGetWhiteboardQuery,
  useSaveWhiteboardMutation,
  useJoinMeetingMutation,
  useGetChatHistoryQuery,
  useSendMessageMutation,
} from "@/services/meeting";

interface UseMeetingProps {
  sessionId: string;
  userId: string;
}

export const useMeeting = ({ sessionId, userId }: UseMeetingProps) => {
  // API hooks
  const { data: whiteboardData, refetch: refetchWhiteboard } = useGetWhiteboardQuery({ sessionId });
  const [saveWhiteboard] = useSaveWhiteboardMutation();
  const [joinMeeting] = useJoinMeetingMutation();
  const { data: chatHistory, refetch: refetchChat } = useGetChatHistoryQuery({ sessionId });
  const [sendMessage] = useSendMessageMutation();

  // State
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());

  // Refs
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const editorRef = useRef<any>(null);
  const sendDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const saveDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingSnapshot = useRef(false);

  // SignalR connection
  useEffect(() => {
    const connectSignalR = async () => {
      try {
        const conn = new signalR.HubConnectionBuilder()
          .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chatHub`)
          .withAutomaticReconnect([0, 3000, 5000, 10000])
          .configureLogging(signalR.LogLevel.Information)
          .build();

        // Event handlers
        conn.on("ReceiveWhiteboardUpdate", (snapshotJson, meta) => {
          if (meta?.ClientId === userId) return;
          try {
            const snapshot =
              typeof snapshotJson === "string" ? JSON.parse(snapshotJson) : snapshotJson;
            loadSnapshotIntoEditor(snapshot);
          } catch (e) {
            console.error("ReceiveWhiteboardUpdate error:", e);
          }
        });

        conn.on("ReceiveShapeUpdate", (shapeData, meta) => {
          if (meta?.ClientId === userId) return;
          try {
            const editor = editorRef.current;
            if (!editor) return;
            const shape = typeof shapeData === "string" ? JSON.parse(shapeData) : shapeData;
            editor.store.mergeRemoteChanges(() => {
              if (shape.isDeleted) {
                editor.store.remove([shape.id]);
              } else {
                editor.store.put([shape]);
              }
            });
          } catch (e) {
            console.error("ReceiveShapeUpdate error:", e);
          }
        });

        conn.on("ReceiveMessage", (userId, message) => {
          setMessages((prev) => [
            ...prev,
            { userId, message, timestamp: new Date().toISOString() },
          ]);
        });

        conn.on("ReceivePeerId", (newPeerId, remoteClientId) => {
          if (newPeerId !== peerId && peerRef.current && localStream) {
            const call = peerRef.current.call(newPeerId, localStream);
            handleIncomingCall(call, remoteClientId);
          }
        });

        conn.on("UserLeft", (peerId) => {
          setRemoteStreams((prev) => {
            const newMap = new Map(prev);
            newMap.delete(peerId);
            return newMap;
          });
        });

        await conn.start();
        connectionRef.current = conn;
        console.log("SignalR connected");
      } catch (err) {
        console.error("SignalR connection error:", err);
      }
    };

    connectSignalR();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [userId, peerId, localStream]);

  // PeerJS setup
  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("Peer ID:", id);
    });

    peer.on("call", (call) => {
      if (localStream) {
        call.answer(localStream);
        handleIncomingCall(call, call.peer);
      }
    });

    peerRef.current = peer;

    return () => {
      if (peer) peer.destroy();
    };
  }, [localStream]);

  // Initialize media stream
  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        setIsVideoOn(true);
        setIsMicOn(true);
      } catch (err) {
        console.error("Failed to get media devices:", err);
      }
    };

    initMedia();
  }, []);

  // Load chat history
  useEffect(() => {
    if (chatHistory?.data) {
      setMessages(chatHistory.data);
    }
  }, [chatHistory]);

  // Helper functions
  const handleIncomingCall = (call: any, remoteClientId: string) => {
    call.on("stream", (remoteStream: MediaStream) => {
      setRemoteStreams((prev) => new Map(prev).set(call.peer, remoteStream));
    });

    call.on("close", () => {
      setRemoteStreams((prev) => {
        const newMap = new Map(prev);
        newMap.delete(call.peer);
        return newMap;
      });
    });
  };

  const loadSnapshotIntoEditor = (snapshot: any) => {
    const editor = editorRef.current;
    if (!editor || !snapshot || isLoadingSnapshot.current) return;

    isLoadingSnapshot.current = true;
    try {
      editor.loadSnapshot(snapshot);
    } catch (err) {
      console.error("Failed to load snapshot:", err);
    } finally {
      isLoadingSnapshot.current = false;
    }
  };

  const sendSnapshotToHub = (snapshot: any) => {
    if (!connectionRef.current || !isJoined) return;

    const dto = {
      SessionId: sessionId,
      SnapshotJson: JSON.stringify(snapshot),
      Version: Date.now(),
      ClientId: userId,
      Timestamp: Date.now(),
    };

    connectionRef.current.invoke("BroadcastWhiteboard", dto).catch(console.error);
  };

  const saveSnapshotToServer = async (snapshot: any) => {
    if (!isJoined) return;

    try {
      await saveWhiteboard({
        sessionId,
        data: { whiteboardData: JSON.stringify(snapshot) },
      }).unwrap();
    } catch (err) {
      console.error("Save whiteboard failed:", err);
    }
  };

  const handleStoreChange = (changes: any) => {
    if (isLoadingSnapshot.current || changes.source !== "user") return;

    const snapshot = editorRef.current?.store?.getSnapshot();
    if (!snapshot) return;

    // Debounce hub broadcast
    if (sendDebounceRef.current) clearTimeout(sendDebounceRef.current);
    sendDebounceRef.current = setTimeout(() => sendSnapshotToHub(snapshot), 250);

    // Debounce server save
    if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    saveDebounceRef.current = setTimeout(() => saveSnapshotToServer(snapshot), 2000);
  };

  // Meeting actions
  const handleJoinMeeting = async () => {
    try {
      // Call API join meeting first
      await joinMeeting({ sessionId }).unwrap();
      console.log("✅ API join meeting successful");

      setIsJoined(true);

      // Load whiteboard data
      if (whiteboardData?.data) {
        const snapshot = JSON.parse(whiteboardData.data);
        setTimeout(() => loadSnapshotIntoEditor(snapshot), 500);
      }

      // Send peer ID to SignalR
      if (connectionRef.current && peerId) {
        await connectionRef.current.invoke("SendPeerId", sessionId, peerId, userId);
        console.log("✅ SignalR SendPeerId successful");
      }
    } catch (err) {
      console.error("❌ Join meeting failed:", err);
    }
  };

  const handleLeaveMeeting = async () => {
    try {
      if (connectionRef.current && peerId) {
        await connectionRef.current.invoke("LeaveSession", sessionId, peerId, userId);
      }
      setIsJoined(false);
    } catch (err) {
      console.error("Leave meeting failed:", err);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage({
        sessionId,
        data: { userId, message },
      }).unwrap();

      if (connectionRef.current) {
        await connectionRef.current.invoke("SendMessage", sessionId, userId, message);
      }
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Setup editor listener
  const setupEditorListener = (editor: any) => {
    editorRef.current = editor;

    if (isJoined) {
      const cleanup = editor.store.listen(handleStoreChange, { source: "user", scope: "all" });
      return cleanup;
    }
  };

  return {
    // State
    isJoined,
    isVideoOn,
    isMicOn,
    messages,
    peerId,
    localStream,
    remoteStreams,
    whiteboardData,

    // Actions
    handleJoinMeeting,
    handleLeaveMeeting,
    handleSendMessage,
    toggleVideo,
    toggleMic,
    setupEditorListener,

    // Loading states
    isLoading: !connectionRef.current || !peerRef.current,
  };
};
