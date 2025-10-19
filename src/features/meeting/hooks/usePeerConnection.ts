import { useState, useRef, useEffect, useCallback } from "react";
import Peer, { DataConnection, MediaConnection } from "peerjs";

export interface UsePeerConnectionOptions {
  localStream: MediaStream | null;
  onIncomingCall?: (peerId: string, stream: MediaStream) => void;
  onPeerDisconnected?: (peerId: string) => void;
  config?: {
    host?: string;
    port?: number;
    path?: string;
    debug?: number;
  };
}

export interface UsePeerConnectionReturn {
  peerId: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  callPeer: (remotePeerId: string) => Promise<void>;
  answerCall: (call: MediaConnection) => void;
  closePeer: () => void;
  peerInstance: Peer | null;
}

/**
 * Hook to manage PeerJS connections for WebRTC
 * Extracted from App.js with improvements:
 * - TypeScript types
 * - Better error handling & retry logic
 * - Fallback to cloud PeerJS server
 * - Cleanup on unmount
 *
 * @example
 * const { peerId, callPeer, answerCall } = usePeerConnection({
 *   localStream,
 *   onIncomingCall: (peerId, stream) => console.log('Incoming call from:', peerId)
 * });
 */
export function usePeerConnection(options: UsePeerConnectionOptions): UsePeerConnectionReturn {
  const { localStream, onIncomingCall, onPeerDisconnected, config } = options;

  const [peerId, setPeerId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const peerRef = useRef<Peer | null>(null);
  const callsRef = useRef<Map<string, MediaConnection>>(new Map());
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Initialize PeerJS with cloud or self-hosted server
   */
  const initializePeer = useCallback(
    (useCloud = true) => {
      // Changed default to true (use cloud)
      try {
        setIsConnecting(true);
        setError(null);

        const peerConfig =
          useCloud || !config?.host
            ? {
                // Cloud PeerJS (0.peerjs.com) - Free tier
                debug: 2,
                config: {
                  iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" },
                    { urls: "stun:stun2.l.google.com:19302" },
                  ],
                },
              }
            : {
                // Self-hosted PeerJS server
                host: config.host,
                port: config.port || 9000,
                path: config.path || "/",
                debug: config?.debug || 2,
                config: {
                  iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" },
                  ],
                },
              };

        console.log(
          useCloud ? "🌐 Initializing PeerJS (Cloud)" : "🏠 Initializing PeerJS (Local)",
          peerConfig
        );

        const peer = new Peer(peerConfig);

        // Connection opened
        peer.on("open", (id) => {
          console.log("✅ PeerJS connected! Peer ID:", id);
          setPeerId(id);
          setIsConnected(true);
          setIsConnecting(false);
          setError(null);
        });

        // Incoming call
        peer.on("call", (call) => {
          console.log("📞 Incoming call from peer:", call.peer);

          if (!localStream) {
            console.warn("⚠️ No local stream to answer call");
            return;
          }

          // Answer the call with local stream
          call.answer(localStream);
          callsRef.current.set(call.peer, call);

          // Listen for remote stream
          call.on("stream", (remoteStream) => {
            console.log("📹 Received remote stream from:", call.peer);
            onIncomingCall?.(call.peer, remoteStream);
          });

          call.on("close", () => {
            console.log("❌ Call closed:", call.peer);
            callsRef.current.delete(call.peer);
            onPeerDisconnected?.(call.peer);
          });

          call.on("error", (err) => {
            console.error("❌ Call error:", call.peer, err);
            callsRef.current.delete(call.peer);
          });
        });

        // Error handling
        peer.on("error", (err) => {
          console.error("❌ PeerJS error:", err.type, err.message);
          setError(err);
          setIsConnecting(false);

          // If using self-hosted and it fails, fallback to cloud
          if (!useCloud && (err.type === "network" || err.type === "server-error")) {
            console.log("🔄 Self-hosted server failed, falling back to cloud in 3s...");
            retryTimeoutRef.current = setTimeout(() => {
              peer.destroy();
              initializePeer(true); // Retry with cloud
            }, 3000);
          }
        });

        // Disconnected
        peer.on("disconnected", () => {
          console.warn("⚠️ PeerJS disconnected");
          setIsConnected(false);
        });

        peerRef.current = peer;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to initialize PeerJS");
        console.error("❌ PeerJS initialization error:", error);
        setError(error);
        setIsConnecting(false);
      }
    },
    [localStream, onIncomingCall, onPeerDisconnected, config]
  );

  /**
   * Call a remote peer
   */
  const callPeer = useCallback(
    async (remotePeerId: string) => {
      if (!peerRef.current) {
        throw new Error("PeerJS not initialized");
      }

      if (!localStream) {
        throw new Error("No local stream available");
      }

      console.log("📞 Calling peer:", remotePeerId);

      try {
        const call = peerRef.current.call(remotePeerId, localStream);
        callsRef.current.set(remotePeerId, call);

        call.on("stream", (remoteStream) => {
          console.log("📹 Received remote stream from:", remotePeerId);
          onIncomingCall?.(remotePeerId, remoteStream);
        });

        call.on("close", () => {
          console.log("❌ Call closed:", remotePeerId);
          callsRef.current.delete(remotePeerId);
          onPeerDisconnected?.(remotePeerId);
        });

        call.on("error", (err) => {
          console.error("❌ Call error:", remotePeerId, err);
          callsRef.current.delete(remotePeerId);
        });
      } catch (err) {
        console.error("❌ Failed to call peer:", err);
        throw err;
      }
    },
    [localStream, onIncomingCall, onPeerDisconnected]
  );

  /**
   * Answer an incoming call
   */
  const answerCall = useCallback(
    (call: MediaConnection) => {
      if (!localStream) {
        console.warn("⚠️ No local stream to answer call");
        return;
      }

      call.answer(localStream);
      callsRef.current.set(call.peer, call);
    },
    [localStream]
  );

  /**
   * Close peer connection
   */
  const closePeer = useCallback(() => {
    // Close all active calls
    callsRef.current.forEach((call, peerId) => {
      console.log("🛑 Closing call with:", peerId);
      call.close();
    });
    callsRef.current.clear();

    // Destroy peer instance
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
      console.log("🛑 Peer connection destroyed");
    }

    setPeerId(null);
    setIsConnected(false);
  }, []);

  /**
   * Initialize peer on mount
   * Default to cloud (useCloud = true) unless config.host is provided
   */
  useEffect(() => {
    const useCloudByDefault = !config?.host;
    initializePeer(useCloudByDefault);

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      closePeer();
    };
  }, []);
  // [config?.host, initializePeer, closePeer]);

  return {
    peerId,
    isConnected,
    isConnecting,
    error,
    callPeer,
    answerCall,
    closePeer,
    peerInstance: peerRef.current,
  };
}
