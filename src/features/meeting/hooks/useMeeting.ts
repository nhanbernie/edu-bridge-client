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
import { useUserId } from "@/hooks/useUserId";

interface UseMeetingProps {
  sessionId: string;
}

export const useMeeting = ({ sessionId }: UseMeetingProps) => {
  // Get dynamic userId based on user role
  const { userId, isLoading: userIdLoading, userRole } = useUserId();

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
          .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chatHub`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .withAutomaticReconnect([0, 2000, 10000, 30000])
          .configureLogging(signalR.LogLevel.Warning)
          .build();

        // Event handlers
        conn.on("ReceiveWhiteboardUpdate", (snapshotJson, meta) => {
          console.log("📝 Received whiteboard update:", { snapshotJson, meta, userId });
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
          console.log("💬 Received message:", { userId, message });
          const newMessage = {
            userId,
            message,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => {
            const currentMessages = Array.isArray(prev) ? prev : [];
            return [...currentMessages, newMessage];
          });
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
        console.log(
          "✅ SignalR connected successfully to:",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chatHub`
        );
        console.log("🔗 Connection state:", conn.state);

        // Add connection state handlers
        conn.onclose((error) => {
          console.warn("⚠️ SignalR connection closed:", error);
          console.log("🔗 Connection state after close:", conn.state);
        });

        conn.onreconnecting((error) => {
          console.warn("🔄 SignalR reconnecting:", error);
          console.log("🔗 Connection state during reconnect:", conn.state);
        });

        conn.onreconnected((connectionId) => {
          console.log("✅ SignalR reconnected:", connectionId);
          console.log("🔗 Connection state after reconnect:", conn.state);
        });

        // Add heartbeat to keep connection alive
        const heartbeatInterval = setInterval(async () => {
          if (conn.state === signalR.HubConnectionState.Connected) {
            try {
              // Try Ping method first, fallback to SendMessage if not available
              try {
                await conn.invoke("Ping");
                console.log("💓 Heartbeat sent (Ping)");
              } catch (pingErr) {
                // Fallback: send a heartbeat message
                await conn.invoke("SendMessage", sessionId, userId, "heartbeat");
                console.log("💓 Heartbeat sent (SendMessage)");
              }
            } catch (err) {
              console.warn("⚠️ Heartbeat failed:", err);
            }
          }
        }, 15000); // Ping every 15 seconds

        // Store interval for cleanup
        (conn as any)._heartbeatInterval = heartbeatInterval;
      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
        console.error("❌ Connection URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/chatHub`);
        console.error("❌ Error details:", err);
        // Don't throw error, just continue without SignalR
        connectionRef.current = null;
      }
    };

    connectSignalR();

    return () => {
      if (connectionRef.current) {
        // Clear heartbeat interval
        if ((connectionRef.current as any)._heartbeatInterval) {
          clearInterval((connectionRef.current as any)._heartbeatInterval);
          console.log("🧹 Heartbeat interval cleared");
        }
        connectionRef.current.stop();
        connectionRef.current = null;
        console.log("🧹 SignalR connection stopped");
      }
    };
  }, [userId, peerId, localStream, sessionId]);

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
        // Check if media devices are available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.warn("Media devices not supported");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        setLocalStream(stream);
        setIsVideoOn(true);
        setIsMicOn(true);
        console.log("✅ Media devices initialized successfully");
      } catch (err) {
        console.warn("Media devices not available:", err);
        // Don't throw error, just continue without media
        setLocalStream(null);
        setIsVideoOn(false);
        setIsMicOn(false);
      }
    };

    initMedia();
  }, []);

  // Load chat history
  useEffect(() => {
    if (chatHistory?.data && Array.isArray(chatHistory.data)) {
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
      // Fix: Use correct Tldraw API
      if (editor.store && typeof editor.store.loadSnapshot === "function") {
        editor.store.loadSnapshot(snapshot);
      } else if (typeof editor.loadSnapshot === "function") {
        editor.loadSnapshot(snapshot);
      } else {
        console.warn("⚠️ No valid loadSnapshot method found");
      }
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
      // Try API first
      await saveWhiteboard({
        sessionId,
        data: { whiteboardData: JSON.stringify(snapshot) },
      }).unwrap();
      console.log("✅ API save whiteboard successful");
    } catch (err) {
      console.warn("⚠️ API save whiteboard failed, using SignalR only:", err);
    }

    // Always try SignalR broadcast
    if (connectionRef.current) {
      try {
        console.log(
          "🔗 Connection state before whiteboard broadcast:",
          connectionRef.current.state
        );

        if (connectionRef.current.state === signalR.HubConnectionState.Connected) {
          await connectionRef.current.invoke(
            "BroadcastWhiteboard",
            sessionId,
            JSON.stringify(snapshot)
          );
          console.log("✅ SignalR broadcast whiteboard successful");
        } else {
          console.warn(
            "⚠️ SignalR not connected for whiteboard, state:",
            connectionRef.current.state
          );
        }
      } catch (signalRErr) {
        console.warn("⚠️ SignalR broadcast whiteboard failed:", signalRErr);
        console.log("🔗 Connection state after whiteboard error:", connectionRef.current?.state);
      }
    } else {
      console.warn("⚠️ No SignalR connection available for whiteboard");
    }
  };

  const handleStoreChange = (changes: any) => {
    if (isLoadingSnapshot.current || changes.source !== "user") return;

    // Fix: Use correct Tldraw API
    if (!editorRef.current?.store) return;

    try {
      const snapshot = editorRef.current.store.getSnapshot();
      if (!snapshot) return;

      // Debounce hub broadcast
      if (sendDebounceRef.current) clearTimeout(sendDebounceRef.current);
      sendDebounceRef.current = setTimeout(() => sendSnapshotToHub(snapshot), 250);

      // Debounce server save
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
      saveDebounceRef.current = setTimeout(() => saveSnapshotToServer(snapshot), 2000);
    } catch (error) {
      console.warn("⚠️ Whiteboard snapshot error:", error);
    }
  };

  // Meeting actions
  const handleJoinMeeting = async () => {
    if (!userId) {
      console.error("❌ Cannot join meeting: User ID not available");
      return;
    }

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
      console.warn("⚠️ API join meeting failed, continuing with local join:", err);
      // Continue with local join even if API fails
      setIsJoined(true);

      // Try SignalR anyway
      if (connectionRef.current && peerId) {
        try {
          await connectionRef.current.invoke("SendPeerId", sessionId, peerId, userId);
          console.log("✅ SignalR SendPeerId successful (fallback)");
        } catch (signalRErr) {
          console.warn("⚠️ SignalR SendPeerId failed:", signalRErr);
        }
      }
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
    if (!userId) {
      console.error("❌ Cannot send message: User ID not available");
      return;
    }

    try {
      // Try API first
      await sendMessage({
        sessionId,
        data: { userId, message },
      }).unwrap();
      console.log("✅ API send message successful");
    } catch (err) {
      console.warn("⚠️ API send message failed, using SignalR only:", err);
    }

    // Add message to local state immediately
    const newMessage = {
      userId,
      message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => (Array.isArray(prev) ? [...prev, newMessage] : [newMessage]));

    // Always try SignalR broadcast
    if (connectionRef.current) {
      try {
        console.log("📤 Sending message via SignalR:", { sessionId, userId, message });
        console.log("🔗 Connection state before send:", connectionRef.current.state);

        if (connectionRef.current.state === signalR.HubConnectionState.Connected) {
          await connectionRef.current.invoke("SendMessage", sessionId, userId, message);
          console.log("✅ SignalR send message successful");
        } else {
          console.warn("⚠️ SignalR not connected, state:", connectionRef.current.state);
        }
      } catch (signalRErr) {
        console.warn("⚠️ SignalR send message failed:", signalRErr);
        console.log("🔗 Connection state after error:", connectionRef.current?.state);
      }
    } else {
      console.warn("⚠️ No SignalR connection available");
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
    isLoading: !connectionRef.current || !peerRef.current || userIdLoading,

    // User info
    userId,
    userRole,
  };
};
