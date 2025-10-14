"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import Peer from "peerjs";
import { getSnapshot } from "@tldraw/tldraw";
import { ENV } from "@/utils/env";

interface UseSignalRProps {
  userId: string;
  userRole: string;
  sessionId: string;
}

export const useSignalR = ({ userId, userRole, sessionId }: UseSignalRProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const receivePeerIdCallbackRef = useRef<((peerId: string, userId: string) => void) | null>(null);

  const recentMessagesRef = useRef<Set<string>>(new Set());

  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const currentVersionRef = useRef(0);

  // WebRTC refs
  const mediaElementsRef = useRef<
    Record<string, { wrapper: HTMLElement; video: HTMLVideoElement }>
  >({});
  const callsRef = useRef<Record<string, any>>({});
  const peerRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const editorRef = useRef<any>(null);
  const sendSnapshotDebounceRef = useRef<any>(null);
  const saveDebounceRef = useRef<any>(null); // send data to database
  const isLoadingSnapshot = useRef(false);
  const sessionRef = useRef({ sessionId: "", joined: false });

  // --- Helper: Check snapshot valid for tldraw ---
  const isLikelyTldrawSnapshot = (snapshot: any) => {
    if (!snapshot || typeof snapshot !== "object") return false;
    if (
      snapshot.document?.store &&
      typeof snapshot.document.store === "object" &&
      snapshot.document.store.storeVersion != null
    )
      return true;
    if (snapshot.document?.schema?.schemaVersion != null) return true;
    if (snapshot.document != null) return true;
    if (snapshot.session?.pageStates != null) return true;
    return false;
  };

  // --- Get snapshot from editor ---
  const getSnapshotFromEditor = () => {
    const editor = editorRef.current;
    if (!editor) return null;
    try {
      return getSnapshot(editor.store);
    } catch (e) {
      console.warn("getSnapshotFromEditor error", e);
      return null;
    }
  };

  // --- Load snapshot into editor ---
  const loadSnapshotIntoEditor = useCallback((snapshot: any) => {
    const editor = editorRef.current;
    if (!editor || !snapshot || isLoadingSnapshot.current) return;
    if (!isLikelyTldrawSnapshot(snapshot)) return;
    isLoadingSnapshot.current = true;
    try {
      if (!snapshot.instance) {
        snapshot.instance = {
          version: 0,
          currentPageId: snapshot.session?.currentPageId || "page:page",
        };
      }
      if (
        !snapshot.document.store ||
        !Object.keys(snapshot.document.store).some((key: string) => key.startsWith("shape:"))
      ) {
        snapshot.document.store = {
          ...snapshot.document.store,
          "document:document": snapshot.document.store["document:document"] || {
            gridSize: 10,
            name: "",
            meta: {},
            id: "document:document",
            typeName: "document",
          },
          "page:page": snapshot.document.store["page:page"] || {
            meta: {},
            id: "page:page",
            name: "Page 1",
            index: "a1",
            typeName: "page",
          },
        };
      }
      editor.loadSnapshot(snapshot);
    } catch (err: any) {
      console.error("Failed to load snapshot:", err.message, snapshot);
    } finally {
      isLoadingSnapshot.current = false;
    }
  }, []);

  // --- Send shape update to SignalR hub ---
  const sendShapeUpdateToHub = (shape: any) => {
    const currentSession = sessionRef.current;
    if (
      !connectionRef.current ||
      connectionRef.current.state !== signalR.HubConnectionState.Connected ||
      !currentSession.sessionId ||
      !currentSession.joined
    )
      return;
    const dto = {
      SessionId: currentSession.sessionId,
      ShapeData: JSON.stringify(shape),
      ClientId: userId,
      Timestamp: Date.now(),
    };
    connectionRef.current
      .invoke("BroadcastShapeUpdate", dto)
      .catch((err) => console.error("BroadcastShapeUpdate failed", err));
  };

  // --- Send snapshot to SignalR hub ---
  const sendSnapshotToHub = (snapshot: any) => {
    const currentSession = sessionRef.current;
    if (
      !connectionRef.current ||
      connectionRef.current.state !== signalR.HubConnectionState.Connected ||
      !currentSession.sessionId ||
      !currentSession.joined
    ) {
      console.log("Không gửi được - connection chưa sẵn sàng");
      return;
    }
    const dto = {
      SessionId: currentSession.sessionId,
      SnapshotJson: JSON.stringify(snapshot),
      Version: Date.now(),
      ClientId: userId,
      Timestamp: Date.now(),
    };
    console.log("Snapshot size:", dto.SnapshotJson.length, "characters");
    connectionRef.current.invoke("BroadcastWhiteboard", dto).then(() => {
      console.log("Đã gửi snapshot qua SignalR");
      console.log("Chờ server broadcast đến các clients khác...\n");
    });
  };

  // --- Save snapshot to server ---
  const saveSnapshotToServer = async (snapshot: any) => {
    const currentSession = sessionRef.current;
    if (!currentSession.sessionId || !currentSession.joined) return;
    try {
      const payload = JSON.stringify({
        WhiteboardData: JSON.stringify(snapshot),
      });
      await fetch(`${ENV.API.BASE_URL}/api/class-session/${currentSession.sessionId}/whiteboard`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    } catch (e) {
      console.warn("Save snapshot to server failed", e);
    }
  };

  // --- Handle store change ---
  const handleStoreChange = useCallback(
    (changes: any) => {
      if (isLoadingSnapshot.current || changes.source !== "user") {
        return;
      }
      let hasShapeUpdate = false;
      const updatedShapes: any[] = [];
      for (const change of changes.added || []) {
        if (change.typeName === "shape") {
          hasShapeUpdate = true;
          updatedShapes.push(change);
        }
      }
      for (const [id, , to] of changes.updated || []) {
        if (id.startsWith("shape:") && to.typeName === "shape") {
          hasShapeUpdate = true;
          updatedShapes.push(to);
        }
      }
      for (const change of changes.removed || []) {
        if (change.typeName === "shape") hasShapeUpdate = true;
      }
      if (hasShapeUpdate) {
        updatedShapes.forEach((shape) => sendShapeUpdateToHub(shape));
      }
      const snapshot = getSnapshotFromEditor();
      if (!snapshot) return;
      if (sendSnapshotDebounceRef.current) clearTimeout(sendSnapshotDebounceRef.current);
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);

      console.log("⏱️ Debounce 200ms để gửi snapshot qua SignalR...");
      sendSnapshotDebounceRef.current = setTimeout(() => sendSnapshotToHub(snapshot), 200);

      console.log("⏱️ Debounce 3000ms để lưu snapshot vào database...\n");
      saveDebounceRef.current = setTimeout(() => saveSnapshotToServer(snapshot), 3000);
    },
    [userId, sendShapeUpdateToHub, sendSnapshotToHub]
  );

  // --- SignalR setup ---
  useEffect(() => {
    if (!userId || !userRole || !sessionId) {
      console.log("Skipping SignalR setup - missing userId, userRole, or sessionId");
      return;
    }

    console.log("Setting up SignalR connection...");
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${ENV.API.BASE_URL}/chatHub`)
      .withAutomaticReconnect([0, 3000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    conn.onclose((err) => {
      console.error("SignalR connection closed:", err);
      setIsConnected(false);
      setJoined(false);
      setMicOn(false);
      setCamOn(false);

      if (err) {
        console.log("SignalR will attempt to reconnect automatically...");
        // Không cần alert vì có automatic reconnect
      } else {
        console.log("SignalR connection closed by user");
      }
    });

    conn.on("UserJoined", (userId, role) => {
      console.log(`User joined: ${userId} (${role})`);
    });

    conn.on("UserLeft", (peerId, userId) => {
      console.log("User left:", peerId, userId);
      const els = mediaElementsRef.current[peerId];
      if (els) {
        if (els.wrapper && els.wrapper.parentNode) {
          els.wrapper.parentNode.removeChild(els.wrapper);
        }
        delete mediaElementsRef.current[peerId];
        console.log("Removed video element for peer:", peerId);
      }
      if (callsRef.current[peerId]) {
        callsRef.current[peerId].close();
        delete callsRef.current[peerId];
      }
    });

    conn.on("ReceiveWhiteboardUpdate", (snapshotJson, meta) => {
      if (meta && meta.ClientId === userId) {
        console.log("Bỏ qua update từ chính mình");
        return;
      }
      if (meta.Version <= currentVersionRef.current) {
        console.log(
          "Bỏ qua snapshot cũ, currentVersion:",
          currentVersionRef.current,
          "received:",
          meta.Version
        );
        return;
      }
      try {
        const snapshot = typeof snapshotJson === "string" ? JSON.parse(snapshotJson) : snapshotJson;
        console.log("Snapshot data:", JSON.stringify(snapshot, null, 2));
        if (!snapshot.document?.schema || !snapshot.document.schema.schemaVersion) {
          console.warn("Invalid snapshot from SignalR:", snapshot);
          return;
        }
        console.log("Đang load snapshot vào editor...");
        loadSnapshotIntoEditor(snapshot);
        currentVersionRef.current = meta.Version;
      } catch (e) {
        console.error("ReceiveWhiteboardUpdate: invalid snapshotJson", e, snapshotJson);
      }
    });

    conn.on("ReceiveShapeUpdate", (shapeData, meta) => {
      console.log("SignalR.ReceiveShapeUpdate meta:", meta);
      if (meta && meta.ClientId === userId) {
        console.log("Skipping self shape update");
        return;
      }
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
        console.log("Applied shape update:", shape.id, shape.isDeleted ? "(deleted)" : "");
      } catch (e) {
        console.error("ReceiveShapeUpdate: invalid shape data", e, shapeData);
      }
    });

    conn.on("ReceiveMessage", (receivedUserId, message) => {
      // Create unique key for message deduplication
      const messageKey = `${receivedUserId}:${message}:${Date.now()}`;
      const messageKeyShort = `${receivedUserId}:${message}`;

      // Check if this exact message was received recently (within 1 second)
      if (recentMessagesRef.current.has(messageKeyShort)) {
        console.log("🚫 Duplicate message detected, ignoring:", messageKeyShort);
        return;
      }

      // Only add message if it's from another user (not from current user)
      // Current user's message was already added optimistically
      if (receivedUserId !== userId) {
        setMessages((prev) => [...prev, { userId: receivedUserId, message }]);

        // Track this message to prevent duplicates
        recentMessagesRef.current.add(messageKeyShort);

        // Clear the tracking after 2 seconds
        setTimeout(() => {
          recentMessagesRef.current.delete(messageKeyShort);
        }, 2000);
      }
    });

    conn.on("ReceivePeerId", (newPeerId, remoteUserId) => {
      console.log("📡 [SignalR] Received peerId:", newPeerId, "from user:", remoteUserId);

      // ✨ NEW: Call external callback (useWebRTC will handle the actual peer connection)
      if (receivePeerIdCallbackRef.current) {
        receivePeerIdCallbackRef.current(newPeerId, remoteUserId);
      }

      // ⚠️ OLD WebRTC logic - will be removed after testing
      if (newPeerId !== peerId) {
        const call = peerRef.current.call(newPeerId, localStreamRef.current);
        callsRef.current[newPeerId] = call;
        call.on("stream", (remoteStream: MediaStream) => {
          console.log("Received remote stream from peer:", newPeerId);
          let els = mediaElementsRef.current[newPeerId];
          if (!els) {
            const container = document.getElementById("remote-media-list");
            const wrapper = document.createElement("div");
            wrapper.style.marginBottom = "8px";
            wrapper.style.border = "1px solid #eee";
            wrapper.style.padding = "6px";
            wrapper.style.borderRadius = "6px";
            const name = document.createElement("div");
            name.textContent = remoteUserId;
            name.style.fontSize = "12px";
            name.style.marginBottom = "6px";
            const video = document.createElement("video");
            video.autoplay = true;
            video.playsInline = true;
            video.style.width = "100%";
            video.style.maxHeight = "150px";
            wrapper.appendChild(name);
            wrapper.appendChild(video);
            if (container) container.appendChild(wrapper);
            els = { wrapper, video };
            mediaElementsRef.current[newPeerId] = els;
          }
          els.video.srcObject = remoteStream;
        });
        call.on("error", (err: any) => {
          console.error("WebRTC call error for peer:", newPeerId, err);
          // Thử reconnect call sau 3 giây
          setTimeout(() => {
            if (peerRef.current && !callsRef.current[newPeerId]) {
              console.log("Retrying WebRTC call to peer:", newPeerId);
              const retryCall = peerRef.current.call(newPeerId, localStreamRef.current);
              callsRef.current[newPeerId] = retryCall;
              // Re-attach event listeners...
            }
          }, 3000);
        });
        call.on("close", () => {
          console.log("Call closed for peer:", newPeerId);
          const els = mediaElementsRef.current[newPeerId];
          if (els) {
            if (els.wrapper && els.wrapper.parentNode) {
              els.wrapper.parentNode.removeChild(els.wrapper);
            }
            delete mediaElementsRef.current[newPeerId];
          }
          delete callsRef.current[newPeerId];
        });
      }
    });

    conn.on("ReceiveOffer", (targetUserId, offer, senderUserId) => {
      console.log("Received offer for:", targetUserId, "from:", senderUserId);
      if (targetUserId !== userId) return;
      const call = peerRef.current.call(senderUserId, localStreamRef.current);
      callsRef.current[senderUserId] = call;
      call.answer(offer);
      call.on("stream", (remoteStream: MediaStream) => {
        console.log("Received remote stream from offer:", senderUserId);
        let els = mediaElementsRef.current[senderUserId];
        if (!els) {
          const container = document.getElementById("remote-media-list");
          const wrapper = document.createElement("div");
          wrapper.style.marginBottom = "8px";
          wrapper.style.border = "1px solid #eee";
          wrapper.style.padding = "6px";
          wrapper.style.borderRadius = "6px";
          const name = document.createElement("div");
          name.textContent = senderUserId;
          name.style.fontSize = "12px";
          name.style.marginBottom = "6px";
          const video = document.createElement("video");
          video.autoplay = true;
          video.playsInline = true;
          video.style.width = "100%";
          video.style.maxHeight = "150px";
          wrapper.appendChild(name);
          wrapper.appendChild(video);
          if (container) container.appendChild(wrapper);
          els = { wrapper, video };
          mediaElementsRef.current[senderUserId] = els;
        }
        els.video.srcObject = remoteStream;
      });
      call.on("error", (err: any) => {
        console.error("WebRTC call error for offer:", senderUserId, err);
      });
    });

    conn.on("ReceiveAnswer", (targetUserId, _answer, senderConnectionId) => {
      console.log("Received answer for:", targetUserId, "from:", senderConnectionId);
      // Xử lý answer nếu cần
    });

    conn.on("ReceiveIceCandidate", (targetUserId, _candidate, senderConnectionId) => {
      console.log("Received ICE candidate for:", targetUserId, "from:", senderConnectionId);
      // Xử lý ICE candidate nếu cần
    });

    conn
      .start()
      .then(() => {
        console.log("SignalR connected");
        setIsConnected(true);
      })
      .catch((err) => console.error("SignalR connection error:", err));

    connectionRef.current = conn;

    return () => {
      console.log("Cleaning up SignalR connection...");
      conn.stop().catch((err) => console.error("Stop failed in cleanup:", err));
    };
  }, [userId, userRole, sessionId, peerId, loadSnapshotIntoEditor]);

  // --- PeerJS setup ---
  useEffect(() => {
    console.log("Initializing PeerJS...");

    const timeout: NodeJS.Timeout = setTimeout(() => {
      console.warn("PeerJS connection timeout - proceeding without video calls");
      setPeerId("fallback-no-video");
    }, 10000); // 10 giây timeout

    let fallbackTimeout: NodeJS.Timeout;

    const attachPeerEventListeners = (fallbackTimeoutRef: NodeJS.Timeout) => {
      peerRef.current.on("open", (id: string) => {
        if (fallbackTimeoutRef) clearTimeout(fallbackTimeoutRef);
        if (timeout) clearTimeout(timeout);
        setPeerId(id);
      });

      peerRef.current.on("error", (err: any) => {
        if (err.type === "network" || err.type === "server-error") {
        }
      });
    };

    // Thử kết nối với local PeerJS server trước
    const tryPeerConnection = () => {
      // Cách 1: Sử dụng local server
      peerRef.current = new Peer(undefined as any, {
        host: ENV.PEER.HOST,
        port: ENV.PEER.PORT,
        path: ENV.PEER.PATH,
        secure: ENV.PEER.SECURE,
        debug: 2,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
            { urls: "stun:stun2.l.google.com:19302" },
          ],
        },
      });

      // Fallback sau 5 giây nếu local server không hoạt động
      fallbackTimeout = setTimeout(() => {
        console.warn("Local server timeout, trying cloud server...");
        if (peerRef.current) {
          peerRef.current.destroy();
        }

        peerRef.current = new Peer({
          debug: 2,
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
            ],
          },
        });

        // Re-attach event listeners cho fallback
        attachPeerEventListeners(fallbackTimeout);
      }, 5000);

      return fallbackTimeout;
    };

    fallbackTimeout = tryPeerConnection();

    // Attach event listeners cho lần đầu
    attachPeerEventListeners(fallbackTimeout);

    peerRef.current.on("disconnected", () => {
      console.warn("PeerJS disconnected");
    });

    peerRef.current.on("call", (call: any) => {
      console.log("Received call from peer:", call.peer);
      call.answer(localStreamRef.current);
      callsRef.current[call.peer] = call;
      call.on("stream", (remoteStream: MediaStream) => {
        console.log("Received remote stream from peer:", call.peer);
        let els = mediaElementsRef.current[call.peer];
        if (!els) {
          const container = document.getElementById("remote-media-list");
          const wrapper = document.createElement("div");
          wrapper.style.marginBottom = "8px";
          wrapper.style.border = "1px solid #eee";
          wrapper.style.padding = "6px";
          wrapper.style.borderRadius = "6px";
          const name = document.createElement("div");
          name.textContent = call.peer;
          name.style.fontSize = "12px";
          name.style.marginBottom = "6px";
          const video = document.createElement("video");
          video.autoplay = true;
          video.playsInline = true;
          video.style.width = "100%";
          video.style.maxHeight = "150px";
          wrapper.appendChild(name);
          wrapper.appendChild(video);
          if (container) container.appendChild(wrapper);
          els = { wrapper, video };
          mediaElementsRef.current[call.peer] = els;
        }
        els.video.srcObject = remoteStream;
      });
      call.on("error", (err: any) => {
        console.error("WebRTC call error for peer:", call.peer, err);
      });
      call.on("close", () => {
        console.log("Call closed for peer:", call.peer);
        const els = mediaElementsRef.current[call.peer];
        if (els) {
          if (els.wrapper && els.wrapper.parentNode) {
            els.wrapper.parentNode.removeChild(els.wrapper);
          }
          delete mediaElementsRef.current[call.peer];
        }
        delete callsRef.current[call.peer];
      });
    });

    // connect peer js
    peerRef.current.on("error", (err: any) => {
      console.error("Error type:", err.type);
      console.error("Error message:", err.message);

      // Thử khởi tạo lại PeerJS sau 3 giây nếu gặp lỗi
      if (err.type === "network" || err.type === "server-error") {
        console.log("Retrying PeerJS connection in 3 seconds...");
        setTimeout(() => {
          if (peerRef.current) {
            peerRef.current.destroy();
          }
          peerRef.current = new Peer();
          // Re-attach event listeners
          peerRef.current.on("open", (id: string) => {
            console.log("PeerJS reconnected! My Peer ID:", id);
            setPeerId(id);
          });
        }, 3000);
      }
    });

    return () => {
      if (timeout) clearTimeout(timeout);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (peerRef.current) peerRef.current.destroy();
    };
  }, []); // ← KHÔNG CÓ DEPENDENCY - giống demo.js

  // --- Initialize local stream ---
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        setMicOn(true);
        setCamOn(true);
        let localPreview = document.getElementById("local-preview-video");
        if (!localPreview && document.getElementById("local-preview")) {
          const v = document.createElement("video");
          v.id = "local-preview-video";
          v.autoplay = true;
          v.muted = true;
          v.playsInline = true;
          v.style.width = "100%";
          v.style.maxHeight = "150px";
          document.getElementById("local-preview")?.appendChild(v);
          localPreview = v;
        }
        if (localPreview) (localPreview as HTMLVideoElement).srcObject = stream;
      })
      .catch((e) => console.error("Initial getUserMedia failed:", e));
  }, []);

  // --- Setup change listener ---
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !joined) return;
    const cleanup = editor.store.listen(handleStoreChange, {
      source: "user",
      scope: "all",
    });
    return () => {
      if (cleanup) cleanup();
      if (sendSnapshotDebounceRef.current) clearTimeout(sendSnapshotDebounceRef.current);
      if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    };
  }, [joined, handleStoreChange]);

  // --- Join session ---
  const joinSession = useCallback(
    async (roomId: string) => {
      if (!roomId || !userId) {
        alert("Vui lòng nhập session ID và user ID");
        return;
      }

      // Check SignalR connection first
      const conn = connectionRef.current;
      if (!conn || conn.state !== signalR.HubConnectionState.Connected) {
        alert("SignalR chưa sẵn sàng. Vui lòng đợi kết nối hoàn tất.");
        return;
      }

      // ⚠️ OLD: Commented out - peerId now managed by useWebRTC hook
      // if (!peerId) {
      //   const proceed = window.confirm(
      //     "PeerJS chưa sẵn sàng (video call sẽ không hoạt động). Bạn có muốn tiếp tục chỉ với whiteboard và chat không?"
      //   );
      //   if (!proceed) {
      //     return;
      //   }
      // }

      setIsJoining(true);
      try {
        const body = { userId: userId, isTutor: userRole === "TUTOR" };

        const response = await fetch(`${ENV.API.BASE_URL}/api/class-session/${roomId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await response.json();

        if (!json.success) throw new Error(json.message);
        await conn.invoke("JoinSession", roomId, userId, userRole === "TUTOR");

        // ⚠️ OLD: This sends old peerId from useSignalR (not used anymore)
        // if (peerId && peerId !== "fallback-no-video") {
        //   await conn.invoke("SendPeerId", roomId, peerId, userId);
        // }

        sessionRef.current = { sessionId: roomId, joined: true };
        setJoined(true);
        console.log("✅ [useSignalR] Joined session successfully, joined =", true);

        const whiteboardRes = await fetch(
          `${ENV.API.BASE_URL}/api/class-session/${roomId}/whiteboard`
        );
        const whiteboardJson = await whiteboardRes.json();

        if (whiteboardJson && whiteboardJson.success && whiteboardJson.data) {
          try {
            const snapshot = JSON.parse(whiteboardJson.data);
            console.log("Đang load snapshot vào editor...");
            setTimeout(() => {
              loadSnapshotIntoEditor(snapshot);
              currentVersionRef.current = Date.now();
            }, 500);
          } catch (e) {}
        }

        const chatRes = await fetch(`${ENV.API.BASE_URL}/api/class-session/${roomId}/chat`);
        const chatJson = await chatRes.json();

        if (chatJson && chatJson.Success && chatJson.Data) {
          try {
            const chatHistory = JSON.parse(chatJson.Data);
            setMessages(
              chatHistory.map((msg: any) => ({
                userId: msg.UserId,
                message: msg.Message,
                timestamp: msg.Timestamp,
              }))
            );
          } catch (e) {}
        }
      } catch (e: any) {
        sessionRef.current = { sessionId: "", joined: false };
        setJoined(false);
        alert(`Lỗi khi join: ${e.message}`);
      } finally {
        setIsJoining(false);
      }
    },
    [userId, userRole, peerId, loadSnapshotIntoEditor]
  );

  // --- Send chat message ---
  const sendChatMessage = async (message: string) => {
    if (!message || !sessionRef.current.sessionId) return;

    // Optimistic update: Add message immediately for current user
    setMessages((prev) => [...prev, { userId, message }]);

    try {
      await connectionRef.current?.invoke(
        "SendMessage",
        sessionRef.current.sessionId,
        userId,
        message
      );
    } catch (e) {
      console.error("Failed to send message:", e);
    }
  };

  // --- Toggle mic/camera ---
  const toggleMedia = ({ audio = !micOn, video = !camOn } = {}) => {
    if (!sessionRef.current.joined) {
      alert("Vui lòng tham gia phòng trước khi bật/tắt mic/camera");
      return;
    }
    if (!localStreamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video, audio })
        .then((stream) => {
          localStreamRef.current = stream;
          setMicOn(audio);
          setCamOn(video);
          let localPreview = document.getElementById("local-preview-video");
          if (!localPreview && document.getElementById("local-preview")) {
            const v = document.createElement("video");
            v.id = "local-preview-video";
            v.autoplay = true;
            v.muted = true;
            v.playsInline = true;
            v.style.width = "100%";
            v.style.maxHeight = "150px";
            document.getElementById("local-preview")?.appendChild(v);
            localPreview = v;
          }
          if (localPreview) (localPreview as HTMLVideoElement).srcObject = stream;
          if (peerId) {
            connectionRef.current?.invoke(
              "SendPeerId",
              sessionRef.current.sessionId,
              peerId,
              userId
            );
          }
        })
        .catch((e) => {
          console.error("getUserMedia failed:", e);
          alert(`Không thể truy cập mic/camera: ${e.message}`);
        });
    } else {
      localStreamRef.current.getTracks().forEach((track) => {
        if (track.kind === "audio") track.enabled = audio;
        if (track.kind === "video") track.enabled = video;
      });
      setMicOn(audio);
      setCamOn(video);
    }
  };

  // --- Handle mount ---
  const handleMount = (editor: any) => {
    editorRef.current = editor;
    console.log("Editor mounted");
  };

  // --- Cleanup ---
  useEffect(() => {
    return () => {
      try {
        if (editorRef.current && sessionRef.current.sessionId) {
          const snapshot = getSnapshotFromEditor();
          if (snapshot) {
            navigator.sendBeacon(
              `${ENV.API.BASE_URL}/api/class-session/${sessionRef.current.sessionId}/whiteboard`,
              JSON.stringify({ WhiteboardData: JSON.stringify(snapshot) })
            );
          }
        }
        if (
          connectionRef.current &&
          connectionRef.current.state === signalR.HubConnectionState.Connected &&
          sessionRef.current.sessionId &&
          peerId
        ) {
          connectionRef.current
            .invoke("LeaveSession", sessionRef.current.sessionId, peerId, userId)
            .catch((err) => console.error("LeaveSession failed:", err));
        }
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((t) => t.stop());
          localStreamRef.current = null;
        }
        Object.values(mediaElementsRef.current).forEach((els) => {
          if (els.wrapper && els.wrapper.parentNode) {
            els.wrapper.parentNode.removeChild(els.wrapper);
          }
        });
        mediaElementsRef.current = {};
        Object.values(callsRef.current).forEach((call) => call.close());
        callsRef.current = {};
      } catch (e) {
        console.error("Cleanup failed:", e);
      }
      if (connectionRef.current) connectionRef.current.stop().catch(() => {});
      if (peerRef.current) peerRef.current.destroy();
    };
  }, [peerId, userId]);

  // ✨ NEW: Send peerId to SignalR for signaling
  const sendPeerId = useCallback(
    async (myPeerId: string) => {
      if (!connectionRef.current || !sessionRef.current.sessionId) {
        console.warn("⚠️ Cannot send peerId: Not connected or not joined");
        return;
      }

      try {
        await connectionRef.current.invoke(
          "SendPeerId",
          sessionRef.current.sessionId,
          myPeerId,
          userId
        );
        console.log("✅ [SignalR] Sent peerId:", myPeerId);
      } catch (error) {
        console.error("❌ [SignalR] Failed to send peerId:", error);
      }
    },
    [userId]
  );

  // ✨ NEW: Register callback for receiving peer IDs
  const onReceivePeerId = useCallback((callback: (peerId: string, userId: string) => void) => {
    receivePeerIdCallbackRef.current = callback;
  }, []);

  return {
    isConnected,
    messages,
    peerId,
    micOn,
    camOn,
    joined,
    isJoining,
    sendChatMessage,
    joinSession,
    toggleMedia,
    handleMount,
    connection: connectionRef.current,
    // ✨ NEW: Peer signaling methods
    sendPeerId,
    onReceivePeerId,
  };
};
