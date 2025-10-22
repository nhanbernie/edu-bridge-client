import { useState, useEffect, useCallback, useRef } from "react";
import { usePeerConnection } from "./usePeerConnection";
import { useMediaDevices } from "./useMediaDevices";

export interface Participant {
  peerId: string;
  userId: string;
  stream: MediaStream;
  isMuted: boolean;
  isVideoOff: boolean;
}

export interface UseWebRTCOptions {
  sessionId: string;
  userId: string;
  autoStartMedia?: boolean;
  onPeerJoined?: (peerId: string, userId: string) => void;
  onPeerLeft?: (peerId: string, userId: string) => void;
  onSendPeerId?: (peerId: string) => void;
}

export interface UseWebRTCReturn {
  // Media devices
  localStream: MediaStream | null;
  micOn: boolean;
  camOn: boolean;
  toggleMic: () => void;
  toggleCamera: () => void;

  // Peer connection
  peerId: string | null;
  isConnected: boolean;

  // Remote participants
  participants: Map<string, Participant>;
  remoteStreams: Map<string, MediaStream>;

  // Actions
  callPeer: (remotePeerId: string, userId: string) => Promise<void>;
  removePeer: (peerId: string) => void;

  // State
  isReady: boolean;
  error: Error | null;
}

/**
 * Main WebRTC hook that orchestrates media devices and peer connections
 * Combines useMediaDevices + usePeerConnection with participant management
 *
 * @example
 * const {
 *   localStream,
 *   micOn,
 *   camOn,
 *   toggleMic,
 *   toggleCamera,
 *   participants,
 *   callPeer
 * } = useWebRTC({
 *   sessionId: 'abc-123',
 *   userId: 'user-456',
 *   autoStartMedia: true
 * });
 */
export function useWebRTC(options: UseWebRTCOptions): UseWebRTCReturn {
  const {
    sessionId,
    userId,
    autoStartMedia = false,
    onPeerJoined,
    onPeerLeft,
    onSendPeerId,
  } = options;

  // State for participants
  const [participants, setParticipants] = useState<Map<string, Participant>>(new Map());
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [error, setError] = useState<Error | null>(null);

  // Refs for user ID mapping (peerId -> userId)
  const peerUserMapRef = useRef<Map<string, string>>(new Map());

  // Media devices hook
  const {
    localStream,
    micOn,
    camOn,
    toggleMic,
    toggleCamera,
    isLoading: isMediaLoading,
    error: mediaError,
  } = useMediaDevices({
    autoStart: autoStartMedia,
    initialAudioEnabled: true,
    initialVideoEnabled: true,
  });

  // Handle incoming call (remote stream)
  const handleIncomingCall = useCallback(
    (peerId: string, remoteStream: MediaStream) => {
      // Update remote streams map
      setRemoteStreams((prev) => {
        const newMap = new Map(prev);
        newMap.set(peerId, remoteStream);
        return newMap;
      });

      // Get userId from mapping
      const mappedUserId = peerUserMapRef.current.get(peerId) || peerId;

      // Update participants
      setParticipants((prev) => {
        const newMap = new Map(prev);
        newMap.set(peerId, {
          peerId,
          userId: mappedUserId,
          stream: remoteStream,
          isMuted: false,
          isVideoOff: false,
        });
        return newMap;
      });

      onPeerJoined?.(peerId, mappedUserId);
    },
    [onPeerJoined]
  );

  // Handle peer disconnection
  const handlePeerDisconnected = useCallback(
    (peerId: string) => {
      const mappedUserId = peerUserMapRef.current.get(peerId) || peerId;

      // Remove from remote streams
      setRemoteStreams((prev) => {
        const newMap = new Map(prev);
        newMap.delete(peerId);
        return newMap;
      });

      // Remove from participants
      setParticipants((prev) => {
        const newMap = new Map(prev);
        newMap.delete(peerId);
        return newMap;
      });

      // Remove from mapping
      peerUserMapRef.current.delete(peerId);

      onPeerLeft?.(peerId, mappedUserId);
    },
    [onPeerLeft]
  );

  // Peer connection hook
  const {
    peerId,
    isConnected,
    callPeer: peerCallPeer,
    error: peerError,
  } = usePeerConnection({
    localStream,
    onIncomingCall: handleIncomingCall,
    onPeerDisconnected: handlePeerDisconnected,
  });

  /**
   * Call a remote peer with userId mapping
   */
  const callPeer = useCallback(
    async (remotePeerId: string, remoteUserId: string) => {
      try {
        // Store userId mapping
        peerUserMapRef.current.set(remotePeerId, remoteUserId);

        // Call using PeerJS
        await peerCallPeer(remotePeerId);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to call peer");
        setError(error);
        throw error;
      }
    },
    [peerCallPeer]
  );

  /**
   * Remove a peer manually
   */
  const removePeer = useCallback(
    (peerId: string) => {
      handlePeerDisconnected(peerId);
    },
    [handlePeerDisconnected]
  );

  /**
   * Send peerId to SignalR when connected
   */
  useEffect(() => {
    if (peerId && isConnected) {
      onSendPeerId?.(peerId);
    }
  }, [peerId, isConnected, onSendPeerId]);

  /**
   * Update error state from hooks
   */
  useEffect(() => {
    if (mediaError) {
      setError(mediaError);
    } else if (peerError) {
      setError(peerError);
    }
  }, [mediaError, peerError]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      // Cleanup participants
      participants.forEach((participant) => {
        if (participant.stream) {
          participant.stream.getTracks().forEach((track) => track.stop());
        }
      });
    };
  }, []);
  // }, [participants]);

  const isReady = !isMediaLoading && isConnected && !!localStream;

  return {
    // Media devices
    localStream,
    micOn,
    camOn,
    toggleMic,
    toggleCamera,

    // Peer connection
    peerId,
    isConnected,

    // Remote participants
    participants,
    remoteStreams,

    // Actions
    callPeer,
    removePeer,

    // State
    isReady,
    error,
  };
}
