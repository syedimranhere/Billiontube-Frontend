import { useRef, useEffect, useState, useCallback } from "react";

export default function UseVideoControls() {
  const videoRef = useRef(null);

  // UI-driven states (React needs these to re-render)
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Frequent values (NO RE-RENDERS, just refs)
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);

  // Add state versions for UI updates (only update when needed)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Use refs to avoid re-renders for hover state
  const isHoveringControlsRef = useRef(false);
  const controlsTimeoutRef = useRef(null);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      currentTimeRef.current = newTime;
      // Only update state occasionally to avoid too many re-renders
      if (Math.abs(newTime - currentTime) > 0.5) {
        setCurrentTime(newTime);
      }
    }
  }, [currentTime]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      const newDuration = videoRef.current.duration;
      durationRef.current = newDuration;
      setDuration(newDuration);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * durationRef.current;

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      currentTimeRef.current = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  }, [isFullscreen]);

  const handleMouseEnter = useCallback(() => {
    if (isHoveringControlsRef.current === true) return;
    isHoveringControlsRef.current = true;

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }

    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isHoveringControlsRef.current === false) return;
    isHoveringControlsRef.current = false;

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle playing state changes for auto-hide controls
  useEffect(() => {
    if (isPlaying && !isHoveringControlsRef.current) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = null;
      }
    };
  }, [isPlaying]);

  return {
    videoRef,
    // UI states
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullscreen,
    showControls,
    setIsPlaying,
    handleMouseEnter,
    handleMouseLeave,
    // Handlers
    handleTimeUpdate,
    handleLoadedMetadata,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleFullscreen,
  };
}
