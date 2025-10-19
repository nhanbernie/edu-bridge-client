import { useState, useRef, useEffect, useCallback } from "react";

export interface UseMediaDevicesOptions {
  autoStart?: boolean;
  initialAudioEnabled?: boolean;
  initialVideoEnabled?: boolean;
}

export interface UseMediaDevicesReturn {
  localStream: MediaStream | null;
  micOn: boolean;
  camOn: boolean;
  isLoading: boolean;
  error: Error | null;
  toggleMic: () => void;
  toggleCamera: () => void;
  startMedia: (options?: { audio?: boolean; video?: boolean }) => Promise<void>;
  stopMedia: () => void;
}

/**
 * Hook to manage local media devices (camera & microphone)
 * Extracted from App.js with improvements:
 * - TypeScript types
 * - Better error handling
 * - Cleanup on unmount
 * - Separate audio/video controls
 *
 * @example
 * const { localStream, micOn, camOn, toggleMic, toggleCamera } = useMediaDevices({
 *   autoStart: true,
 *   initialAudioEnabled: true,
 *   initialVideoEnabled: true
 * });
 */
export function useMediaDevices(options: UseMediaDevicesOptions = {}): UseMediaDevicesReturn {
  const { autoStart = false, initialAudioEnabled = false, initialVideoEnabled = false } = options;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(initialAudioEnabled);
  const [camOn, setCamOn] = useState(initialVideoEnabled);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);

  /**
   * Start capturing media devices
   */
  const startMedia = useCallback(
    async (constraints: { audio?: boolean; video?: boolean } = {}) => {
      const audio = constraints.audio ?? micOn;
      const video = constraints.video ?? camOn;

      setIsLoading(true);
      setError(null);

      try {
        // Stop existing stream first
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        // Request new stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio, video });

        localStreamRef.current = stream;
        setLocalStream(stream);
        setMicOn(audio);
        setCamOn(video);

        console.log("✅ Media devices started:", { audio, video });
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to access media devices");
        console.error("❌ getUserMedia error:", error);
        setError(error);

        // Fallback: try audio only if video fails
        if (video && !audio) {
          console.log("🔄 Retrying with audio only...");
          try {
            const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            localStreamRef.current = audioOnlyStream;
            setLocalStream(audioOnlyStream);
            setMicOn(true);
            setCamOn(false);
          } catch (audioErr) {
            console.error("❌ Audio-only fallback also failed:", audioErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [micOn, camOn]
  );

  /**
   * Stop all media tracks
   */
  const stopMedia = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("🛑 Stopped track:", track.kind);
      });
      localStreamRef.current = null;
      setLocalStream(null);
      setMicOn(false);
      setCamOn(false);
    }
  }, []);

  /**
   * Toggle microphone on/off
   */
  const toggleMic = useCallback(() => {
    if (!localStreamRef.current) {
      // If no stream, start with mic only
      startMedia({ audio: true, video: camOn });
      return;
    }

    const audioTracks = localStreamRef.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const newState = !micOn;
      audioTracks.forEach((track) => {
        track.enabled = newState;
      });
      setMicOn(newState);
      console.log("🎤 Mic:", newState ? "ON" : "OFF");
    } else {
      // No audio track, need to restart stream
      startMedia({ audio: true, video: camOn });
    }
  }, [micOn, camOn, startMedia]);

  /**
   * Toggle camera on/off
   */
  const toggleCamera = useCallback(() => {
    if (!localStreamRef.current) {
      // If no stream, start with camera only
      startMedia({ audio: micOn, video: true });
      return;
    }

    const videoTracks = localStreamRef.current.getVideoTracks();
    if (videoTracks.length > 0) {
      const newState = !camOn;
      videoTracks.forEach((track) => {
        track.enabled = newState;
      });
      setCamOn(newState);
    } else {
      // No video track, need to restart stream
      startMedia({ audio: micOn, video: true });
    }
  }, [micOn, camOn, startMedia]);

  useEffect(() => {
    if (autoStart) {
      startMedia({
        audio: initialAudioEnabled,
        video: initialVideoEnabled,
      });
    }

    // Cleanup on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [autoStart]);

  return {
    localStream,
    micOn,
    camOn,
    isLoading,
    error,
    toggleMic,
    toggleCamera,
    startMedia,
    stopMedia,
  };
}
