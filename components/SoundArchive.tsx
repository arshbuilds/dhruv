"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Track {
  id: string;
  number: string;
  title: string;
  tag: string;
  artist: string;
  duration: number; // seconds
  chordFrequencies: number[];
}

const TRACKS: Track[] = [
  {
    id: "midnight-echoes",
    number: "01",
    title: "Midnight Echoes",
    tag: "SINGLE RELEASE",
    artist: "Dhruv Kanda // Original Composition",
    duration: 30,
    chordFrequencies: [216, 256.87, 324, 384.87, 432], // 432 Hz neo-soul minor 9th
  },
  {
    id: "neon-pulse",
    number: "02",
    title: "Neon Pulse",
    tag: "EP TITLE TRACK",
    artist: "Dhruv Kanda // Darkwave Production",
    duration: 45,
    chordFrequencies: [192, 288, 360, 432, 576], // Cyberpunk atmospheric pad
  },
  {
    id: "silent-storms",
    number: "03",
    title: "Silent Storms",
    tag: "ACOUSTIC STRIPPED",
    artist: "Dhruv Kanda // Acoustic & Strings",
    duration: 36,
    chordFrequencies: [216, 270, 324, 432, 486], // Ambient resonant acoustic chord
  },
];

export default function SoundArchive() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(
    Array.from({ length: 32 }, () => 12)
  );

  const activeTrack = TRACKS[activeTrackIndex];
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Stop current Web Audio oscillators cleanly
  const stopAudio = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      } catch {}
    }
    setTimeout(() => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscillatorsRef.current = [];
    }, 350);
  };

  // Start real-time synthesized neo-soul chord using Web Audio API
  const startAudio = (track: Track) => {
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.6);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2.5, now);

      masterGain.connect(filter);
      filter.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const newOscs: OscillatorNode[] = [];
      track.chordFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Subtle slow vibrato for warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(3.5, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.25 / track.chordFrequencies.length, now);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(activeTrack);
      setIsPlaying(true);
    }
  };

  // Switch Track
  const handleSelectTrack = (index: number) => {
    setActiveTrackIndex(index);
    setCurrentTime(0);
    if (isPlaying) {
      startAudio(TRACKS[index]);
    }
  };

  // Next / Previous Track
  const handlePrevTrack = () => {
    const nextIdx = (activeTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  const handleNextTrack = () => {
    const nextIdx = (activeTrackIndex + 1) % TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  const activeTrackDuration = activeTrack.duration;

  // Progress timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= activeTrackDuration) {
          setActiveTrackIndex((current) => (current + 1) % TRACKS.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, activeTrackDuration]);

  // Dynamic waveform animation engine
  useEffect(() => {
    let phase = 0;
    const updateWaveform = () => {
      phase += 0.08;
      if (isPlaying) {
        setWaveformBars(() =>
          Array.from({ length: 32 }, (_, i) => {
            const base = Math.sin(i * 0.35 + phase) * 18 + 24;
            const harmonic = Math.cos(i * 0.7 - phase * 1.5) * 12;
            const noise = (Math.random() - 0.5) * 8;
            return Math.max(6, Math.min(52, Math.round(base + harmonic + noise)));
          })
        );
      } else {
        setWaveformBars((prev) =>
          prev.map((val) => Math.max(8, Math.round(val * 0.92)))
        );
      }
      animFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    animFrameRef.current = requestAnimationFrame(updateWaveform);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section id="archive" className="py-20 lg:py-28 relative border-t border-white/[0.03]">
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
            Synthesized real-time Web Audio player with dynamic crimson waveform engine.
          </p>
        </div>

        {/* Main Audio Console Card */}
        <div className="max-w-[880px] mx-auto border border-[#1f2438] bg-[#0c0e18]/95 p-6 sm:p-8 rounded-[2px] shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Vinyl Mockup + Waveform */}
            <div className="md:col-span-5 flex flex-col justify-between h-full">
              {/* Vinyl Art Container */}
              <div className="border border-[#751b25] bg-[#080911] p-2.5 rounded-[2px] relative group overflow-hidden shadow-[0_0_20px_rgba(117,27,37,0.2)]">
                <div className="relative aspect-[199/276] w-full overflow-hidden bg-black/60 rounded-[1px]">
                  <Image
                    src="/images/vinyl.png"
                    alt="Vinyl release art - Dhruv Kanda The Act"
                    fill
                    className={`object-cover transition-transform duration-700 ${isPlaying ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 768px) 100vw, 350px"
                    priority
                  />
                  {isPlaying && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-[2px] border border-[#e6202e]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e6202e] animate-ping" />
                      <span className="font-mono text-[8px] text-[#e6202e] tracking-widest uppercase">LIVE 432HZ</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Crimson Waveform Engine */}
              <div className="border border-[#1f2438] bg-[#080911] px-3 py-2.5 rounded-[2px] mt-4 h-14 flex items-end justify-between gap-[2px] overflow-hidden">
                {waveformBars.map((height, i) => (
                  <span
                    key={i}
                    style={{ height: `${height}px` }}
                    className="flex-1 bg-[#e6202e] rounded-t-[1px] transition-all duration-100 opacity-90 hover:opacity-100"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Player Metadata, Scrubber, Controls & Tracklist */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              {/* Active Track Metadata */}
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

              {/* Scrubber Timeline */}
              <div className="space-y-1.5">
                <div className="relative w-full h-1 bg-[#1a2034] rounded-[1px] overflow-hidden cursor-pointer">
                  <div
                    style={{ width: `${(currentTime / activeTrack.duration) * 100}%` }}
                    className="absolute top-0 left-0 h-full bg-[#e6202e] transition-all duration-200"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[9.5px] text-[#71788c] tracking-wider">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(activeTrack.duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 py-1">
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Previous track"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-11 h-11 rounded-full bg-[#e6202e] hover:bg-[#ff2535] text-white flex items-center justify-center shadow-[0_0_24px_rgba(230,32,46,0.65)] hover:shadow-[0_0_32px_rgba(230,32,46,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Next track"
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
                          ? "border border-[#8b1e28] bg-[#140e18]/80 text-white"
                          : "border border-transparent hover:border-[#1e2438] hover:bg-[#080911]/60 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[10px] tracking-wider ${isActive ? "text-[#e6202e] font-semibold" : "text-[#586074]"}`}>
                          {track.number}
                        </span>
                        <span className={`font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                          {track.title}
                        </span>
                      </div>
                      <span className={`font-mono text-[9px] tracking-[0.16em] uppercase ${isActive ? "text-[#e6202e]" : "text-[#586074]"}`}>
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
