"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

export interface Track {
  id: string;
  number: string;
  title: string;
  tag: string;
  artist: string;
  src: string;
  coverImage: string;
  defaultDuration: number;
}

const TRACKS: Track[] = [
  {
    id: "95-retro",
    number: "01",
    title: "95' Retro",
    tag: "SINGLE RELEASE",
    artist: "Dhruv Kanda // Original Composition",
    src: "/audio/95retro.wav",
    coverImage: "/images/95retro.png",
    defaultDuration: 147,
  },
  {
    id: "crisis",
    number: "02",
    title: "Crisis",
    tag: "EP TITLE TRACK",
    artist: "Dhruv Kanda // Darkwave Production",
    src: "/audio/crisis.wav",
    coverImage: "/images/crisis.jpeg",
    defaultDuration: 183,
  },
];

const BAR_COUNT = 32;
const BAR_INDICES = Array.from({ length: BAR_COUNT }, (_, i) => i);
const RESTING_SCALE = 0.2;

export default function SoundArchive() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedAudio, setHasLoadedAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].defaultDuration);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const activeTrack = TRACKS[activeTrackIndex];

  // Audio element, DOM refs & Web Audio references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pendingSeekRef = useRef<number | null>(null);

  // Initialize Web Audio API Analyser on first explicit user playback
  const setupAnalyser = () => {
    if (!audioRef.current || analyserRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // 32 frequency bins
      analyser.smoothingTimeConstant = 0.82;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
    } catch (err) {
      // Browser may restrict createMediaElementSource in certain security contexts; audio still plays normally
      console.warn("Web Audio Analyser fallback active:", err);
    }
  };

  // Switch Track
  const handleSelectTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    setActiveTrackIndex(index);
    setCurrentTime(0);
    setDuration(TRACKS[index].defaultDuration);
    setIsLoading(true);
    setHasLoadedAudio(true);
    pendingSeekRef.current = null;

    if (audio) {
      setupAnalyser();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }

      audio.src = TRACKS[index].src;
      audio.load();
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn("Track play deferred/interrupted:", err);
          setIsLoading(false);
        });
    }
  }, []);

  // Next Track
  const handleNextTrack = useCallback(() => {
    const nextIdx = (activeTrackIndex + 1) % TRACKS.length;
    handleSelectTrack(nextIdx);
  }, [activeTrackIndex, handleSelectTrack]);

  // Previous Track
  const handlePrevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prevIdx = (activeTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    handleSelectTrack(prevIdx);
  }, [activeTrackIndex, handleSelectTrack]);

  // Toggle Play / Pause
  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      if (!hasLoadedAudio || !audio.getAttribute("src")) {
        audio.src = activeTrack.src;
        setHasLoadedAudio(true);
      }

      // Connect Web Audio Analyser on user gesture
      setupAnalyser();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (err) {
      console.warn("Primary audio play rejected, trying direct play:", err);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err2) {
        console.error("Audio playback failed:", err2);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Timeline Scrubber Seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetDuration = duration || activeTrack.defaultDuration;
    const targetTime = percentage * targetDuration;

    const audio = audioRef.current;
    if (!hasLoadedAudio || !audio.getAttribute("src")) {
      audio.src = activeTrack.src;
      setHasLoadedAudio(true);
      pendingSeekRef.current = targetTime;
      audio.load();
    } else if (audio.readyState >= 1) {
      audio.currentTime = targetTime;
    } else {
      pendingSeekRef.current = targetTime;
    }
    setCurrentTime(targetTime);
  };

  // Volume & Mute Controls
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
    }
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Ref-driven FFT Waveform Engine (zero React re-renders; stops completely when idle)
  useEffect(() => {
    const setRestingBars = () => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (bar) {
          bar.style.transform = `scaleY(${RESTING_SCALE})`;
        }
      }
    };

    if (!isPlaying) {
      setRestingBars();
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (bar) {
          const staticScale = 0.35 + ((i * 7) % 5) * 0.1;
          bar.style.transform = `scaleY(${staticScale.toFixed(2)})`;
        }
      }
      return;
    }

    const dataArray = new Uint8Array(BAR_COUNT);

    const updateWaveform = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        for (let i = 0; i < BAR_COUNT; i++) {
          const bar = barRefs.current[i];
          if (bar) {
            const scale = Math.max(RESTING_SCALE, Math.min(1, dataArray[i] / 255));
            bar.style.transform = `scaleY(${scale.toFixed(3)})`;
          }
        }
      } else {
        const now = Date.now() / 140;
        for (let i = 0; i < BAR_COUNT; i++) {
          const bar = barRefs.current[i];
          if (bar) {
            const scale = Math.max(
              RESTING_SCALE,
              Math.min(1, (Math.sin(i * 0.35 + now) * 0.35 + 0.55)),
            );
            bar.style.transform = `scaleY(${scale.toFixed(3)})`;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    animFrameRef.current = requestAnimationFrame(updateWaveform);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isPlaying]);

  // Audio Element Setup & Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const onPlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onCanPlay = () => setIsLoading(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
      }
      if (pendingSeekRef.current !== null) {
        audio.currentTime = pendingSeekRef.current;
        pendingSeekRef.current = null;
      }
      setIsLoading(false);
    };
    const onEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [handleNextTrack, volume]);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section
      id="archive"
      className="py-20 lg:py-28 relative border-t border-white/[0.03]"
    >
      {/* Standard same-origin HTML5 Audio Element — zero preload until user interaction */}
      <audio
        ref={audioRef}
        src={hasLoadedAudio ? activeTrack.src : undefined}
        preload="none"
      />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#e6202e] uppercase mb-3.5">
            {"// 02 // AUDIO CONSOLE"}
          </div>
          <h2 className="font-serif tracking-tight leading-none text-4xl sm:text-5xl lg:text-[3.5rem]">
            <span className="font-normal text-[#f1f5f9] mr-3">THE SOUND</span>
            <span className="font-normal italic text-[#e6202e]">ARCHIVE.</span>
          </h2>
          <p className="font-sans text-slate-400 text-xs sm:text-[13px] leading-relaxed mt-4 max-w-lg mx-auto">
            Synthesized real-time Web Audio player with dynamic crimson waveform
            engine.
          </p>
        </div>

        {/* Main Audio Console Card */}
        <div className="max-w-[880px] mx-auto border border-[#1f2438] bg-[#0c0e18]/95 p-6 sm:p-8 rounded-[2px] shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Vinyl Mockup + Dynamic Crimson Waveform */}
            <div className="md:col-span-5 flex flex-col justify-between h-full">
              {/* Vinyl Art Container */}
              <div className="border border-[#751b25] bg-[#080911] p-2.5 rounded-[2px] relative group overflow-hidden shadow-[0_0_20px_rgba(117,27,37,0.2)]">
                <div className="relative aspect-[199/276] w-full overflow-hidden bg-black/60 rounded-[1px]">
                  <Image
                    src={activeTrack.coverImage}
                    alt={`${activeTrack.title} - Vinyl release art`}
                    fill
                    className={`object-cover transition-transform duration-700 ${isPlaying ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  {isPlaying && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded-[2px] border border-[#e6202e]/50 shadow-[0_0_10px_rgba(230,32,46,0.4)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e6202e] animate-ping" />
                      <span className="font-mono text-[8px] text-[#e6202e] tracking-widest uppercase font-semibold">
                        PLAYING
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Crimson Waveform Engine */}
              <div className="border border-[#1f2438] bg-[#080911] px-3 py-2.5 rounded-[2px] mt-4 h-14 flex items-end justify-between gap-[2px] overflow-hidden">
                {BAR_INDICES.map((i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    style={{ transform: `scaleY(${RESTING_SCALE})` }}
                    className="flex-1 h-9 origin-bottom bg-[#e6202e] rounded-t-[1px] opacity-90 hover:opacity-100 will-change-transform"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Player Metadata, Scrubber, Controls & Tracklist */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              {/* Active Track Metadata */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9.5px] tracking-[0.2em] text-[#e6202e] uppercase block mb-1.5 font-medium">
                    {activeTrack.tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal leading-tight">
                    {activeTrack.title}
                  </h3>
                  <p className="font-mono text-[11px] text-[#71788c] tracking-wider mt-1.5">
                    {activeTrack.artist}
                  </p>
                </div>

                {/* Volume / Mute Quick Toggle */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="text-[#71788c] hover:text-white transition-colors cursor-pointer p-1"
                    title={isMuted ? "Unmute" : "Mute"}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <svg
                        className="w-4 h-4 fill-current text-[#e6202e]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
                    className="w-14 h-1 bg-[#1a2034] accent-[#e6202e] rounded-lg cursor-pointer"
                    aria-label="Volume slider"
                  />
                </div>
              </div>

              {/* Scrubber Timeline */}
              <div className="space-y-1.5">
                <div
                  ref={progressBarRef}
                  onClick={handleSeek}
                  className="relative w-full h-1.5 bg-[#1a2034] rounded-[1px] overflow-hidden cursor-pointer group"
                >
                  <div
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    }}
                    className="absolute top-0 left-0 h-full bg-[#e6202e] transition-all duration-100"
                  />
                  <div
                    style={{
                      left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-opacity pointer-events-none"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[9.5px] text-[#71788c] tracking-wider select-none">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 py-1">
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Previous track"
                  title="Previous track"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  disabled={isLoading}
                  className="w-11 h-11 rounded-full bg-[#e6202e] hover:bg-[#ff2535] text-white flex items-center justify-center shadow-[0_0_24px_rgba(230,32,46,0.65)] hover:shadow-[0_0_32px_rgba(230,32,46,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-80"
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                  title={isPlaying ? "Pause track" : "Play track"}
                >
                  {isLoading ? (
                    <svg
                      className="w-4 h-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : isPlaying ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 fill-current translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Next track"
                  title="Next track"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>

              {/* Tracklist Table */}
              <div className="space-y-1.5 pt-2 border-t border-[#1a2034]">
                {TRACKS.map((track, idx) => {
                  const isActive = idx === activeTrackIndex;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handleSelectTrack(idx)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-all cursor-pointer text-xs ${
                        isActive
                          ? "border border-[#8b1e28] bg-[#140e18]/80 text-white shadow-[inset_0_0_15px_rgba(139,30,40,0.15)]"
                          : "border border-transparent hover:border-[#1e2438] hover:bg-[#080911]/60 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[10px] tracking-wider ${
                            isActive
                              ? "text-[#e6202e] font-semibold"
                              : "text-[#586074]"
                          }`}
                        >
                          {track.number}
                        </span>
                        <span
                          className={`font-medium ${isActive ? "text-white" : "text-slate-300"}`}
                        >
                          {track.title}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[9px] tracking-[0.16em] uppercase ${
                          isActive
                            ? "text-[#e6202e] font-medium"
                            : "text-[#586074]"
                        }`}
                      >
                        {track.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
