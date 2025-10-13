import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import Peer from "peerjs";
import { Tldraw, getSnapshot } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export default function WhiteboardTldraw({ initialSessionId = "" }) {
  const [sessionId, setSessionId] = useState(initialSessionId || "");
  const [userIdInput, setUserIdInput] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const API_BASE = "https://localhost:7221";
  const connectionRef = useRef(null);
  const peerRef = useRef(null);
  const editorRef = useRef(null);
  const sendSnapshotDebounceRef = useRef(null);
  const saveDebounceRef = useRef(null);
  const isLoadingSnapshot = useRef(false);
  const sessionRef = useRef({ sessionId: "", joined: false });
  const currentVersionRef = useRef(0);
  const localStreamRef = useRef(null);
  const mediaElementsRef = useRef({});
  const callsRef = useRef({});

  // --- Helper: Check snapshot valid for tldraw ---
  function isLikelyTldrawSnapshot(snapshot) {
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
  }

  // --- SignalR setup ---
  useEffect(() => {
    console.log("Setting up SignalR connection...");
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE}/chatHub`)
      .withAutomaticReconnect([0, 3000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    conn.onclose((err) => {
      console.error("SignalR connection closed:", err);
      setJoined(false);
      setMicOn(false);
      setCamOn(false);
      alert("Kết nối SignalR bị ngắt");
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
      console.log("\n🎨 === NHẬN CẬP NHẬT WHITEBOARD TỪ SIGNALR ===");
      console.log("🔌 Event: ReceiveWhiteboardUpdate");
      console.log("👤 Client gửi:", meta?.ClientId);
      console.log("📌 Version:", meta?.Version);

      if (meta && meta.ClientId === userIdInput) {
        console.log("⏭️ Bỏ qua update từ chính mình");
        return;
      }
      if (meta.Version <= currentVersionRef.current) {
        console.log(
          "⏭️ Bỏ qua snapshot cũ, currentVersion:",
          currentVersionRef.current,
          "received:",
          meta.Version
        );
        return;
      }
      try {
        const snapshot = typeof snapshotJson === "string" ? JSON.parse(snapshotJson) : snapshotJson;
        console.log("📊 Snapshot data:", JSON.stringify(snapshot, null, 2));
        if (!snapshot.document?.schema || !snapshot.document.schema.schemaVersion) {
          console.warn("❌ Invalid snapshot from SignalR:", snapshot);
          return;
        }
        console.log("✅ Đang load snapshot vào editor...");
        loadSnapshotIntoEditor(snapshot);
        currentVersionRef.current = meta.Version;
        console.log("✅ Đã cập nhật whiteboard\n");
      } catch (e) {
        console.error("❌ ReceiveWhiteboardUpdate: invalid snapshotJson", e, snapshotJson);
      }
    });

    conn.on("ReceiveShapeUpdate", (shapeData, meta) => {
      console.log("SignalR.ReceiveShapeUpdate meta:", meta);
      if (meta && meta.ClientId === userIdInput) {
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

    conn.on("ReceiveMessage", (userId, message) => {
      console.log("\n📨 === NHẬN TIN NHẮN TỪ SIGNALR ===");
      console.log("👤 Người gửi:", userId);
      console.log("📝 Nội dung:", message);
      console.log("🔌 Event: ReceiveMessage");
      console.log("✅ Đang cập nhật UI...\n");
      setMessages((prev) => [...prev, { userId, message }]);
    });

    conn.on("ReceivePeerId", (newPeerId, remoteUserId) => {
      console.log("Received peerId:", newPeerId, "from user:", remoteUserId);
      if (newPeerId !== peerId) {
        const call = peerRef.current.call(newPeerId, localStreamRef.current);
        callsRef.current[newPeerId] = call;
        call.on("stream", (remoteStream) => {
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
        call.on("error", (err) => {
          console.error("WebRTC call error for peer:", newPeerId, err);
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
      if (targetUserId !== userIdInput) return;
      const call = peerRef.current.call(senderUserId, localStreamRef.current);
      callsRef.current[senderUserId] = call;
      call.answer(offer);
      call.on("stream", (remoteStream) => {
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
      call.on("error", (err) => {
        console.error("WebRTC call error for offer:", senderUserId, err);
      });
    });

    conn.on("ReceiveAnswer", (targetUserId, answer, senderConnectionId) => {
      console.log("Received answer for:", targetUserId, "from:", senderConnectionId);
      // Xử lý answer nếu cần
    });

    conn.on("ReceiveIceCandidate", (targetUserId, candidate, senderConnectionId) => {
      console.log("Received ICE candidate for:", targetUserId, "from:", senderConnectionId);
      // Xử lý ICE candidate nếu cần
    });

    conn
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("SignalR connection error:", err));

    connectionRef.current = conn;
    return () => {
      console.log("Cleaning up SignalR connection...");
      conn.stop().catch((err) => console.error("Stop failed in cleanup:", err));
    };
  }, []);

  // --- PeerJS setup ---
  useEffect(() => {
    console.log("🔄 Initializing PeerJS...");

    // Thử kết nối với local PeerJS server trước
    const tryPeerConnection = () => {
      console.log("🔄 Trying local PeerJS server on port 9000...");

      // Cách 1: Sử dụng local server
      peerRef.current = new Peer(undefined, {
        host: "localhost",
        port: 9000,
        path: "/",
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
      const fallbackTimeout = setTimeout(() => {
        console.warn("⚠️ Local server timeout, trying cloud server...");
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

    const attachPeerEventListeners = (fallbackTimeout) => {
      peerRef.current.on("open", (id) => {
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
        clearTimeout(timeout);
        console.log("✅ PeerJS connected! My Peer ID:", id);
        setPeerId(id);
      });

      peerRef.current.on("error", (err) => {
        console.error("❌ PeerJS error:", err);
        if (err.type === "network" || err.type === "server-error") {
          console.log("🔄 Network error, will try fallback...");
        }
      });
    };

    const fallbackTimeout = tryPeerConnection();

    // Set timeout để không đợi quá lâu
    const timeout = setTimeout(() => {
      console.warn("⏰ PeerJS connection timeout - proceeding without video calls");
      setPeerId("fallback-no-video");
    }, 10000); // 10 giây timeout

    // Attach event listeners cho lần đầu
    attachPeerEventListeners(fallbackTimeout);

    peerRef.current.on("disconnected", () => {
      console.warn("⚠️ PeerJS disconnected");
    });

    peerRef.current.on("call", (call) => {
      console.log("Received call from peer:", call.peer);
      call.answer(localStreamRef.current);
      callsRef.current[call.peer] = call;
      call.on("stream", (remoteStream) => {
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
      call.on("error", (err) => {
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

    peerRef.current.on("error", (err) => {
      console.error("❌ PeerJS error:", err);
      console.error("Error type:", err.type);
      console.error("Error message:", err.message);

      // Thử khởi tạo lại PeerJS sau 3 giây nếu gặp lỗi
      if (err.type === "network" || err.type === "server-error") {
        console.log("🔄 Retrying PeerJS connection in 3 seconds...");
        setTimeout(() => {
          if (peerRef.current) {
            peerRef.current.destroy();
          }
          peerRef.current = new Peer();
          // Re-attach event listeners
          peerRef.current.on("open", (id) => {
            console.log("✅ PeerJS reconnected! My Peer ID:", id);
            setPeerId(id);
          });
        }, 3000);
      }
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(fallbackTimeout);
      if (peerRef.current) peerRef.current.destroy();
    };
  }, []);

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
          document.getElementById("local-preview").appendChild(v);
          localPreview = v;
        }
        if (localPreview) localPreview.srcObject = stream;
      })
      .catch((e) => console.error("Initial getUserMedia failed:", e));
  }, []);

  // --- End session ---
  async function endSession() {
    setIsEnding(true);
    try {
      const response = await fetch(`${API_BASE}/api/class-session/${sessionId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userIdInput }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      alert("Kết thúc buổi học thành công");
    } catch (e) {
      console.error("End session failed:", e);
      alert(`Lỗi kết thúc session: ${e.message}`);
    } finally {
      setIsEnding(false);
    }
  }

  // --- Toggle mic/camera ---
  function toggleMedia({ audio = !micOn, video = !camOn } = {}) {
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
            document.getElementById("local-preview").appendChild(v);
            localPreview = v;
          }
          if (localPreview) localPreview.srcObject = stream;
          if (peerId) {
            connectionRef.current.invoke(
              "SendPeerId",
              sessionRef.current.sessionId,
              peerId,
              userIdInput
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
  }

  // --- Get snapshot from editor ---
  function getSnapshotFromEditor() {
    const editor = editorRef.current;
    if (!editor) return null;
    try {
      return getSnapshot(editor.store);
    } catch (e) {
      console.warn("getSnapshotFromEditor error", e);
      return null;
    }
  }

  // --- Load snapshot into editor ---
  function loadSnapshotIntoEditor(snapshot) {
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
        !Object.keys(snapshot.document.store).some((key) => key.startsWith("shape:"))
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
    } catch (err) {
      console.error("Failed to load snapshot:", err.message, snapshot);
    } finally {
      isLoadingSnapshot.current = false;
    }
  }

  // --- Send shape update to SignalR hub ---
  function sendShapeUpdateToHub(shape) {
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
      ClientId: userIdInput,
      Timestamp: Date.now(),
    };
    connectionRef.current
      .invoke("BroadcastShapeUpdate", dto)
      .catch((err) => console.error("BroadcastShapeUpdate failed", err));
  }

  // --- Send snapshot to SignalR hub ---
  function sendSnapshotToHub(snapshot) {
    console.log("\n🎨 === GỬI CẬP NHẬT WHITEBOARD ===");
    console.log("🔌 Phương thức: SignalR invoke - BroadcastWhiteboard");
    console.log("👤 User:", userIdInput);
    console.log("📌 Version:", Date.now());

    const currentSession = sessionRef.current;
    if (
      !connectionRef.current ||
      connectionRef.current.state !== signalR.HubConnectionState.Connected ||
      !currentSession.sessionId ||
      !currentSession.joined
    ) {
      console.log("⚠️ Không gửi được - connection chưa sẵn sàng");
      return;
    }
    const dto = {
      SessionId: currentSession.sessionId,
      SnapshotJson: JSON.stringify(snapshot),
      Version: Date.now(),
      ClientId: userIdInput,
      Timestamp: Date.now(),
    };
    console.log("📊 Snapshot size:", dto.SnapshotJson.length, "characters");
    connectionRef.current
      .invoke("BroadcastWhiteboard", dto)
      .then(() => {
        console.log("✅ Đã gửi snapshot qua SignalR");
        console.log("⏳ Chờ server broadcast đến các clients khác...\n");
      })
      .catch((err) => console.error("❌ BroadcastWhiteboard failed", err));
  }

  // --- Save snapshot to server ---
  async function saveSnapshotToServer(snapshot) {
    const currentSession = sessionRef.current;
    if (!currentSession.sessionId || !currentSession.joined) return;
    try {
      const payload = JSON.stringify({
        WhiteboardData: JSON.stringify(snapshot),
      });
      await fetch(`${API_BASE}/api/class-session/${currentSession.sessionId}/whiteboard`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    } catch (e) {
      console.warn("Save snapshot to server failed", e);
    }
  }

  // --- Handle store change ---
  function handleStoreChange(changes) {
    if (isLoadingSnapshot.current || changes.source !== "user") {
      return;
    }

    console.log("\n✏️ === PHÁT HIỆN THAY ĐỔI TRÊN WHITEBOARD ===");
    console.log("📝 Source:", changes.source);
    console.log("➕ Added:", changes.added?.length || 0);
    console.log("✏️ Updated:", changes.updated?.length || 0);
    console.log("🗑️ Removed:", changes.removed?.length || 0);

    let hasShapeUpdate = false;
    let updatedShapes = [];
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
      console.log("🎨 Có thay đổi shape, gửi shape update...");
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
  }

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
  }, [editorRef.current, joined]);

  // --- Handle mount ---
  function handleMount(editor) {
    editorRef.current = editor;
    console.log("Editor mounted");
  }

  // --- Join session ---
  async function joinSession(roomId) {
    console.log("=== 🚀 BẮT ĐẦU JOIN SESSION ===");
    console.log("📋 Session ID:", roomId);
    console.log("👤 User ID:", userIdInput);
    console.log("🎓 Role:", isTutor ? "Tutor" : "Student");

    if (!roomId || !userIdInput) {
      alert("Vui lòng nhập session ID và user ID");
      return;
    }

    if (!peerId) {
      const proceed = window.confirm(
        "PeerJS chưa sẵn sàng (video call sẽ không hoạt động). Bạn có muốn tiếp tục chỉ với whiteboard và chat không?"
      );
      if (!proceed) {
        return;
      }
      console.log("⚠️ Proceeding without PeerJS - video calls will not work");
    }
    setIsJoining(true);
    const conn = connectionRef.current;
    if (!conn) {
      alert("SignalR chưa sẵn sàng. Vui lòng reload trang.");
      setIsJoining(false);
      return;
    }
    try {
      console.log("\n📡 BƯỚC 1: Call REST API - POST /api/class-session/join");
      const body = { userId: userIdInput, isTutor };
      console.log("   Request body:", JSON.stringify(body, null, 2));

      const response = await fetch(`${API_BASE}/api/class-session/${roomId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      console.log("   ✅ Response:", JSON.stringify(json, null, 2));

      if (!json.success) throw new Error(json.message);

      console.log("\n🔌 BƯỚC 2: SignalR invoke - JoinSession");
      console.log(
        "   Tham số: roomId =",
        roomId,
        ", userId =",
        userIdInput,
        ", isTutor =",
        isTutor
      );
      await conn.invoke("JoinSession", roomId, userIdInput, isTutor);
      console.log("   ✅ Đã join SignalR group");

      if (peerId && peerId !== "fallback-no-video") {
        console.log("\n🔌 BƯỚC 3: SignalR invoke - SendPeerId");
        console.log("   Tham số: roomId =", roomId, ", peerId =", peerId);
        await conn.invoke("SendPeerId", roomId, peerId, userIdInput);
        console.log("   ✅ Đã gửi PeerId cho WebRTC");
      } else {
        console.log("\n⚠️ BƯỚC 3: Bỏ qua SendPeerId (PeerJS không khả dụng hoặc fallback)");
      }

      sessionRef.current = { sessionId: roomId, joined: true };
      setJoined(true);

      console.log("\n📡 BƯỚC 4: Call REST API - GET /whiteboard (lấy dữ liệu đã lưu)");
      const whiteboardRes = await fetch(`${API_BASE}/api/class-session/${roomId}/whiteboard`);
      const whiteboardJson = await whiteboardRes.json();
      console.log(
        "   Response:",
        whiteboardJson.success ? "✅ Có dữ liệu whiteboard" : "⚠️ Không có dữ liệu"
      );

      if (whiteboardJson && whiteboardJson.success && whiteboardJson.data) {
        try {
          const snapshot = JSON.parse(whiteboardJson.data);
          console.log("   📝 Đang load snapshot vào editor...");
          setTimeout(() => {
            loadSnapshotIntoEditor(snapshot);
            currentVersionRef.current = Date.now();
            console.log("   ✅ Đã load whiteboard data");
          }, 500);
        } catch (e) {
          console.warn("   ❌ Failed to parse saved snapshot", e);
        }
      }

      console.log("\n📡 BƯỚC 5: Call REST API - GET /chat (lấy lịch sử chat)");
      const chatRes = await fetch(`${API_BASE}/api/class-session/${roomId}/chat`);
      const chatJson = await chatRes.json();
      console.log("   Response:", chatJson.Success ? "✅ Có lịch sử chat" : "⚠️ Không có lịch sử");

      if (chatJson && chatJson.Success && chatJson.Data) {
        try {
          const chatHistory = JSON.parse(chatJson.Data);
          setMessages(
            chatHistory.map((msg) => ({
              userId: msg.UserId,
              message: msg.Message,
              timestamp: msg.Timestamp,
            }))
          );
          console.log("   ✅ Đã load", chatHistory.length, "tin nhắn");
        } catch (e) {
          console.warn("   ❌ Failed to parse chat history", e);
        }
      }

      console.log("\n✅ === HOÀN THÀNH JOIN SESSION ===\n");
    } catch (e) {
      console.error("❌ joinSession failed:", e);
      sessionRef.current = { sessionId: "", joined: false };
      setJoined(false);
      alert(`Lỗi khi join: ${e.message}`);
    } finally {
      setIsJoining(false);
    }
  }

  // --- Send chat message ---
  async function sendChatMessage() {
    console.log("\n💬 === GỬI TIN NHẮN CHAT ===");
    console.log("📝 Nội dung:", chatText);
    console.log("👤 Người gửi:", userIdInput);
    console.log("🔌 Phương thức: SignalR invoke - SendMessage");

    if (!chatText || !sessionRef.current.sessionId) return;
    try {
      await connectionRef.current.invoke(
        "SendMessage",
        sessionRef.current.sessionId,
        userIdInput,
        chatText
      );
      console.log("✅ Tin nhắn đã gửi qua SignalR");
      console.log("⏳ Chờ server broadcast đến tất cả clients...\n");
      setChatText("");
    } catch (e) {
      console.error("❌ SendMessage invoke failed", e);
    }
  }

  // --- Cleanup ---
  useEffect(() => {
    return () => {
      try {
        if (editorRef.current && sessionRef.current.sessionId) {
          const snapshot = getSnapshotFromEditor();
          if (snapshot) {
            navigator.sendBeacon(
              `${API_BASE}/api/class-session/${sessionRef.current.sessionId}/whiteboard`,
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
            .invoke("LeaveSession", sessionRef.current.sessionId, peerId, userIdInput)
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
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 8, background: "#f5f5f5", display: "flex", gap: 8 }}>
        <input
          placeholder="Enter user ID (UUID)"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          style={{ padding: 6 }}
          disabled={isJoining || joined}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={isTutor}
            onChange={(e) => setIsTutor(e.target.checked)}
            disabled={isJoining || joined}
          />
          Tutor
        </label>
        <input
          placeholder="Enter session ID (UUID)"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          style={{ padding: 16 }}
          disabled={isJoining || joined}
        />
        <button
          onClick={() => joinSession(sessionId)}
          disabled={!sessionId || !userIdInput || isJoining || joined}
        >
          {isJoining ? "Joining..." : joined ? "Joined" : "Join"}
        </button>
        <button onClick={() => toggleMedia()} disabled={isJoining || !joined}>
          {micOn || camOn ? "Tắt Mic/Camera" : "Bật Mic/Camera"}
        </button>
        <div style={{ marginLeft: "auto" }}>
          User: {userIdInput || "Chưa nhập"} | Role: {isTutor ? "Tutor" : "Student"} | Status:{" "}
          {joined ? "Connected" : "Disconnected"} | PeerJS:{" "}
          {peerId === "fallback-no-video" ? "No Video" : peerId ? "Ready" : "Loading..."}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <Tldraw onMount={handleMount} />
        </div>
        <div
          style={{
            width: 360,
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <h4 style={{ margin: 4 }}>Chat</h4>
            <div
              style={{
                maxHeight: 200,
                overflowY: "auto",
                border: "1px solid #eee",
                padding: 8,
              }}
            >
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <b
                    style={{
                      color: msg.userId === userIdInput ? "#0a66c2" : "#333",
                    }}
                  >
                    {msg.userId === userIdInput ? "You" : msg.userId}
                  </b>
                  : {msg.message}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <input
                style={{ flex: 1, padding: 6 }}
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendChatMessage();
                }}
                placeholder="Type a message and press Enter"
                disabled={isJoining || !joined}
              />
              <button onClick={sendChatMessage} disabled={isJoining || !joined}>
                Send
              </button>
            </div>
          </div>
          <div style={{ padding: 8, background: "red" }}>
            <button onClick={endSession} disabled={isEnding || !joined}>
              {isEnding ? "Đang kết thúc..." : "Kết thúc buổi học"}
            </button>
          </div>
          <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <h4 style={{ margin: 4 }}>Local preview</h4>
            <div id="local-preview" />
            <div style={{ marginTop: 8 }}>
              Mic: {micOn ? "On" : "Off"} | Camera: {camOn ? "On" : "Off"}
            </div>
          </div>
          <div style={{ padding: 8, overflowY: "auto", flex: 1 }}>
            <h4 style={{ margin: 4 }}>Remote participants</h4>
            <div id="remote-media-list" />
          </div>
        </div>
      </div>
    </div>
  );
}
