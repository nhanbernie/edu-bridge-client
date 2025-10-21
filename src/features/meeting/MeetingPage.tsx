"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import Peer from "peerjs";
import { Tldraw, getSnapshot } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useUserId } from "@/hooks/useUserId";
import { ENV } from "@/utils/env";
import ChatPanel from "./components/ChatPanel";
import WhiteboardPanel from "./components/WhiteboardPanel";
import { VideoGrid, MediaControls } from "./components";
import type { Participant } from "./components/VideoGrid";

interface MeetingPageProps {
  sessionId: string;
}

const MeetingPage: React.FC<MeetingPageProps> = ({ sessionId: initialSessionId }) => {
  // Get userId from hook
  const { userId: userIdFromHook, userRole } = useUserId();
  const userIdInput = userIdFromHook || "";
  const isTutor = userRole === "TUTOR";

  // -------- UI state --------
  const [sessionId] = useState(initialSessionId || "");
  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [messages, setMessages] = useState<{ userId: string; message: string }[]>([]);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // UI controls
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [participants, setParticipants] = useState<Map<string, Participant>>(new Map());
  const [localStreamVersion, setLocalStreamVersion] = useState(0); // Force re-render khi stream change
  const [remoteScreenShareUserId, setRemoteScreenShareUserId] = useState<string | null>(null);

  // -------- constants --------
  const API_BASE = ENV.API.BASE_URL;

  // -------- refs (singletons) --------
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const peerRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const sendSnapshotDebounceRef = useRef<any>(null);
  const saveDebounceRef = useRef<any>(null);
  const isLoadingSnapshot = useRef(false);
  const sessionRef = useRef({ sessionId: "", joined: false });
  const currentVersionRef = useRef(0);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const callsRef = useRef<Record<string, any>>({});

  // live refs for stable SignalR handlers
  const userIdRef = useRef("");
  const peerIdRef = useRef<string | null>(null);
  const isTutorRef = useRef(false);
  useEffect(() => {
    userIdRef.current = userIdInput;
  }, [userIdInput]);
  useEffect(() => {
    peerIdRef.current = peerId;
  }, [peerId]);
  useEffect(() => {
    isTutorRef.current = isTutor;
  }, [isTutor]);

  // -------- helpers --------
  function isLikelyTldrawSnapshot(snapshot: any) {
    if (!snapshot || typeof snapshot !== "object") return false;
    if (snapshot.document?.store?.storeVersion != null) return true;
    if (snapshot.document?.schema?.schemaVersion != null) return true;
    if (snapshot.document != null) return true;
    if (snapshot.session?.pageStates != null) return true;
    return false;
  }

  const handleMount = useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);

  async function fetchIceServers(userId: string) {
    const res = await fetch(`${API_BASE}/api/turn/credentials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("TURN credentials fetch failed");
    const json = await res.json();
    return json.iceServers;
  }

  // -------- local media (camera+mic) --------
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        setMicOn(true);
        setCamOn(true);
      })
      .catch((e) => console.error("getUserMedia failed:", e));

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // -------- toggle mic/camera --------
  const toggleMic = useCallback(() => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !micOn;
      });
      setMicOn(!micOn);
    }
  }, [micOn]);

  const toggleCamera = useCallback(async () => {
    if (!localStreamRef.current) return;

    const videoTracks = localStreamRef.current.getVideoTracks();

    if (camOn) {
      videoTracks.forEach((track) => {
        track.enabled = false;
      });
      setCamOn(false);
      console.log("Camera disabled");
    } else {
      videoTracks.forEach((track) => {
        track.enabled = true;
      });

      // Force re-render để video element cập nhật
      setLocalStreamVersion((v) => {
        console.log("Incrementing localStreamVersion:", v + 1);
        return v + 1;
      });

      setCamOn(true);
      console.log("Camera enabled");

      // Kiểm tra track có còn hoạt động không sau 100ms
      setTimeout(() => {
        const tracks = localStreamRef.current?.getVideoTracks();
        console.log("Track check after enable:", tracks?.[0]?.readyState, tracks?.[0]?.enabled);
      }, 100);
    }
  }, [camOn]);

  // -------- screen share --------
  async function startScreenShare() {
    try {
      if (isScreenSharing) return;
      const scr = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" } as any,
        audio: true,
      });
      screenStreamRef.current = scr;

      // Replace outgoing media in all calls
      for (const pid of Object.keys(callsRef.current)) {
        const call = callsRef.current[pid];
        if (!call) continue;

        if (typeof call.replaceStream === "function") {
          call.replaceStream(scr);
        } else if (call.peerConnection) {
          const senders = call.peerConnection.getSenders();
          const videoTrack = scr.getVideoTracks()[0];
          const vSender = senders.find((s: any) => s.track && s.track.kind === "video");
          if (vSender && videoTrack) await vSender.replaceTrack(videoTrack);
          const aTrack = scr.getAudioTracks()[0];
          const aSender = senders.find((s: any) => s.track && s.track.kind === "audio");
          if (aSender && aTrack) await aSender.replaceTrack(aTrack);
        }
      }

      setIsScreenSharing(true);

      // Broadcast screen share status qua SignalR
      if (connectionRef.current && sessionRef.current.sessionId) {
        connectionRef.current
          .invoke("BroadcastScreenShareStatus", sessionRef.current.sessionId, userIdInput, true)
          .catch((err) => console.error("BroadcastScreenShareStatus failed", err));
      }

      // Auto-stop when user ends sharing from browser UI
      const vTrack = scr.getVideoTracks()[0];
      if (vTrack) {
        vTrack.addEventListener("ended", () => {
          stopScreenShare();
        });
      }
    } catch (e) {
      console.error("startScreenShare failed:", e);
    }
  }

  async function stopScreenShare() {
    try {
      if (!isScreenSharing) return;

      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
      }

      const cam = localStreamRef.current;
      if (cam) {
        for (const pid of Object.keys(callsRef.current)) {
          const call = callsRef.current[pid];
          if (!call) continue;

          if (typeof call.replaceStream === "function") {
            call.replaceStream(cam);
          } else if (call.peerConnection) {
            const senders = call.peerConnection.getSenders();
            const vTrack = cam.getVideoTracks()[0];
            const vSender = senders.find((s: any) => s.track && s.track.kind === "video");
            if (vSender && vTrack) await vSender.replaceTrack(vTrack);
            const aTrack = cam.getAudioTracks()[0];
            const aSender = senders.find((s: any) => s.track && s.track.kind === "audio");
            if (aSender && aTrack) await aSender.replaceTrack(aTrack);
          }
        }
      }

      screenStreamRef.current = null;
      setIsScreenSharing(false);

      // Broadcast screen share stopped qua SignalR
      if (connectionRef.current && sessionRef.current.sessionId) {
        connectionRef.current
          .invoke("BroadcastScreenShareStatus", sessionRef.current.sessionId, userIdInput, false)
          .catch((err) => console.error("BroadcastScreenShareStatus failed", err));
      }
    } catch (e) {
      console.error("stopScreenShare failed:", e);
    }
  }

  // -------- SignalR: init ONCE, reconnect-safe --------
  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/chatHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([0, 3000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    conn.onreconnecting((err) => {
      console.warn("SignalR reconnecting...", err);
    });
    conn.onreconnected(async () => {
      console.info("SignalR reconnected");
      const s = sessionRef.current;
      const uid = userIdRef.current;
      const pid = peerIdRef.current;
      const tutor = isTutorRef.current;
      if (s.joined && s.sessionId && uid) {
        try {
          await conn.invoke("JoinSession", s.sessionId, uid, tutor);
          if (pid && localStreamRef.current) {
            await conn.invoke("SendPeerId", s.sessionId, pid, uid);
          }
          console.info("Rejoined group & re-sent PeerId");
        } catch (e) {
          console.error("Failed to rejoin after reconnect", e);
        }
      }
    });
    conn.onclose((err) => {
      console.error("SignalR closed:", err);
      setJoined(false);
    });

    // hub handlers
    conn.on("UserJoined", (uid, role) => console.log("UserJoined:", uid, role));

    conn.on("UserLeft", (leftPeerId, uid) => {
      console.log("UserLeft:", leftPeerId, uid);

      // Xóa participant khỏi state
      setParticipants((prev) => {
        const newMap = new Map(prev);
        newMap.delete(leftPeerId);
        return newMap;
      });

      // Đóng peer connection
      if (callsRef.current[leftPeerId]) {
        try {
          callsRef.current[leftPeerId].close();
        } catch (e) {
          console.error("Error closing call:", e);
        }
        delete callsRef.current[leftPeerId];
      }
    });

    conn.on("ReceiveWhiteboardUpdate", (snapshotJson, meta) => {
      const me = userIdRef.current;
      if (meta && meta.ClientId === me) return;
      if (meta?.Version <= currentVersionRef.current) return;
      try {
        const snapshot = typeof snapshotJson === "string" ? JSON.parse(snapshotJson) : snapshotJson;
        if (!snapshot.document?.schema?.schemaVersion) return;
        loadSnapshotIntoEditor(snapshot);
        currentVersionRef.current = meta.Version;
      } catch (e) {
        console.error("ReceiveWhiteboardUpdate error:", e);
      }
    });

    conn.on("ReceiveShapeUpdate", (shapeData, meta) => {
      const me = userIdRef.current;
      if (meta && meta.ClientId === me) return;
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

    conn.on("ReceiveMessage", (uid, message) => {
      console.log("ReceiveMessage from:", uid, "Message:", message);
      // Chỉ thêm tin nhắn từ người khác, không thêm tin nhắn của chính mình
      // (vì đã thêm optimistically khi gửi)
      if (uid !== userIdRef.current) {
        setMessages((prev) => [...prev, { userId: uid, message }]);
        if (!isChatOpen) {
          setUnreadMessages((count) => count + 1);
        }
      }
    });

    conn.on("ReceiveScreenShareStatus", (userId: string, isSharing: boolean) => {
      console.log("ReceiveScreenShareStatus:", userId, isSharing);
      if (userId !== userIdRef.current) {
        setRemoteScreenShareUserId(isSharing ? userId : null);
      }
    });

    conn.on("ReceivePeerId", (newPeerId, remoteUserId) => {
      console.log("ReceivePeerId:", newPeerId, remoteUserId);
      if (!localStreamRef.current || !peerRef.current) return;
      if (newPeerId === peerIdRef.current) return;

      // Tránh tạo duplicate call - chỉ người join sau gọi đến người join trước
      if (callsRef.current[newPeerId]) {
        console.log("Call already exists for peerId:", newPeerId);
        return;
      }

      const call = peerRef.current.call(newPeerId, localStreamRef.current);
      callsRef.current[newPeerId] = call;

      call.on("stream", (remoteStream: MediaStream) => {
        console.log("Received remote stream from:", newPeerId);
        setParticipants((prev) => {
          const newMap = new Map(prev);
          newMap.set(newPeerId, {
            peerId: newPeerId,
            userId: remoteUserId,
            stream: remoteStream,
            isMuted: false,
            isVideoOff: false,
          });
          return newMap;
        });
      });

      call.on("close", () => {
        console.log("Call closed:", newPeerId);
        delete callsRef.current[newPeerId];
      });
      call.on("error", (e: any) => {
        console.error("Call error:", e);
        delete callsRef.current[newPeerId];
      });
    });

    conn
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("SignalR start error:", err));
    connectionRef.current = conn;
    return () => {
      conn.stop().catch(() => { });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // init once

  // -------- PeerJS: init khi có userId (để xin ICE) --------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!userIdInput) return;
        const iceServers = await fetchIceServers(userIdInput);
        const peer = new Peer({ debug: 2, config: { iceServers } });

        peer.on("open", (id) => {
          if (mounted) setPeerId(id);
        });

        peer.on("call", (call) => {
          console.log("Incoming call from:", call.peer);
          if (!localStreamRef.current) return;

          // Tránh answer duplicate call
          if (callsRef.current[call.peer]) {
            console.log("Call already exists, closing duplicate:", call.peer);
            call.close();
            return;
          }

          call.answer(localStreamRef.current);
          callsRef.current[call.peer] = call;

          call.on("stream", (remoteStream: MediaStream) => {
            console.log("Received remote stream in answer from:", call.peer);
            setParticipants((prev) => {
              const newMap = new Map(prev);
              newMap.set(call.peer, {
                peerId: call.peer,
                userId: call.peer,
                stream: remoteStream,
                isMuted: false,
                isVideoOff: false,
              });
              return newMap;
            });
          });

          call.on("close", () => {
            console.log("Answered call closed:", call.peer);
            delete callsRef.current[call.peer];
          });
          call.on("error", (e: any) => {
            console.error("Answered call error:", e);
            delete callsRef.current[call.peer];
          });
        });

        peer.on("error", (err) => console.error("PeerJS error:", err));

        peerRef.current = peer;
      } catch (e) {
        console.error("Peer init failed:", e);
      }
    })();
    return () => {
      mounted = false;
      if (peerRef.current) peerRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdInput]);

  // -------- whiteboard sync --------
  function getSnapshotFromEditor() {
    const editor = editorRef.current;
    try {
      return editor ? getSnapshot(editor.store) : null;
    } catch {
      return null;
    }
  }
  function loadSnapshotIntoEditor(snapshot: any) {
    const editor = editorRef.current;
    if (!editor || !snapshot || isLoadingSnapshot.current || !isLikelyTldrawSnapshot(snapshot))
      return;
    isLoadingSnapshot.current = true;
    try {
      editor.loadSnapshot(snapshot);
    } catch (err) {
      console.error("loadSnapshot failed:", err);
    } finally {
      isLoadingSnapshot.current = false;
    }
  }
  function handleStoreChange(changes: any) {
    if (isLoadingSnapshot.current || changes.source !== "user") return;
    const snapshot = getSnapshotFromEditor();
    if (!snapshot) return;
    if (sendSnapshotDebounceRef.current) clearTimeout(sendSnapshotDebounceRef.current);
    if (saveDebounceRef.current) clearTimeout(saveDebounceRef.current);
    sendSnapshotDebounceRef.current = setTimeout(() => sendSnapshotToHub(snapshot), 200);
    saveDebounceRef.current = setTimeout(() => saveSnapshotToServer(snapshot), 3000);
  }
  function sendSnapshotToHub(snapshot: any) {
    const s = sessionRef.current;
    if (
      !connectionRef.current ||
      connectionRef.current.state !== signalR.HubConnectionState.Connected ||
      !s.sessionId ||
      !s.joined
    )
      return;
    const dto = {
      SessionId: s.sessionId,
      SnapshotJson: JSON.stringify(snapshot),
      Version: Date.now(),
      ClientId: userIdRef.current,
      Timestamp: Date.now(),
    };
    connectionRef.current
      .invoke("BroadcastWhiteboard", dto)
      .catch((err) => console.error("BroadcastWhiteboard failed", err));
  }
  async function saveSnapshotToServer(snapshot: any) {
    const s = sessionRef.current;
    if (!s.sessionId || !s.joined) return;
    try {
      const payload = JSON.stringify({ WhiteboardData: JSON.stringify(snapshot) });
      await fetch(`${API_BASE}/api/class-session/${s.sessionId}/whiteboard`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    } catch (e) {
      console.warn("Save snapshot failed", e);
    }
  }
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !joined) return;
    const cleanup = editor.store.listen(handleStoreChange, { source: "user", scope: "all" });
    return () => {
      cleanup();
      clearTimeout(sendSnapshotDebounceRef.current);
      clearTimeout(saveDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);

  // -------- actions --------
  async function joinSessionAction(roomId: string) {
    if (!roomId || !peerId || !userIdInput) {
      alert("Nhập userId, sessionId và đợi Peer khởi tạo xong.");
      return;
    }
    setIsJoining(true);
    try {
      await connectionRef.current?.invoke("JoinSession", roomId, userIdInput, isTutor);
      if (localStreamRef.current) {
        await connectionRef.current?.invoke("SendPeerId", roomId, peerId, userIdInput);
      }
      sessionRef.current = { sessionId: roomId, joined: true };
      setJoined(true);
    } catch (e) {
      console.error("joinSession failed:", e);
      sessionRef.current = { sessionId: "", joined: false };
      setJoined(false);
      alert("Lỗi khi join");
    } finally {
      setIsJoining(false);
    }
  }

  const sendChatMessage = useCallback(
    async (message: string) => {
      if (!message || !sessionRef.current.sessionId) return;
      try {
        // Thêm tin nhắn vào UI ngay lập tức (optimistic update)
        setMessages((prev) => [...prev, { userId: userIdInput, message }]);

        // Gửi tin nhắn lên server
        await connectionRef.current?.invoke(
          "SendMessage",
          sessionRef.current.sessionId,
          userIdInput,
          message
        );
      } catch (e) {
        console.error("SendMessage failed", e);
        // Nếu lỗi, có thể rollback message (optional)
        // setMessages((prev) => prev.filter((m) => !(m.userId === userIdInput && m.message === message)));
      }
    },
    [userIdInput]
  );

  async function endSession() {
    try {
      const res = await fetch(`${API_BASE}/api/class-session/${sessionId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userIdInput }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      alert("Kết thúc buổi học thành công");
    } catch (e) {
      console.error("endSession failed:", e);
      alert("Lỗi kết thúc session");
    }
  }

  // -------- auto-join when ready --------
  useEffect(() => {
    if (sessionId && userIdInput && peerId && !joined && !isJoining && connectionRef.current) {
      const timer = setTimeout(() => {
        joinSessionAction(sessionId);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, userIdInput, peerId, joined, isJoining]);

  // -------- cleanup on unmount --------
  useEffect(() => {
    return () => {
      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected &&
        sessionRef.current.sessionId &&
        peerIdRef.current
      ) {
        connectionRef.current
          .invoke(
            "LeaveSession",
            sessionRef.current.sessionId,
            peerIdRef.current,
            userIdRef.current
          )
          .catch(() => { });
      }
      if (localStreamRef.current) localStreamRef.current.getTracks().forEach((t) => t.stop());
      if (screenStreamRef.current) screenStreamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // -------- chat open handler --------
  useEffect(() => {
    if (isChatOpen) {
      setUnreadMessages(0);
    }
  }, [isChatOpen]);

  // -------- render --------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Main Content Area */}
      <main className="relative h-screen w-full flex">
        <div className="flex-1 relative flex flex-col">
          <div className="flex-1 relative">
            <VideoGrid
              key={`video-grid-${localStreamVersion}`}
              localStream={localStreamRef.current}
              screenStream={screenStreamRef.current}
              participants={participants}
              userId={userIdInput || ""}
              remoteScreenShareUserId={remoteScreenShareUserId}
              micOn={micOn}
              camOn={camOn}
              isScreenSharing={isScreenSharing}
              layout="grid"
              showLocalPreview={true}
            >
              <WhiteboardPanel onMount={handleMount} />
            </VideoGrid>
          </div>

          <MediaControls
            micOn={micOn}
            camOn={camOn}
            isScreenSharing={isScreenSharing}
            isHandRaised={isHandRaised}
            unreadMessages={unreadMessages}
            isSomeoneElseSharing={!!remoteScreenShareUserId}
            onToggleMic={toggleMic}
            onToggleCamera={toggleCamera}
            onToggleScreenShare={() => (isScreenSharing ? stopScreenShare() : startScreenShare())}
            onToggleHand={() => setIsHandRaised(!isHandRaised)}
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
            onEndCall={endSession}
            disabled={!joined}
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
              currentUserId={userIdInput || ""}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingPage;
