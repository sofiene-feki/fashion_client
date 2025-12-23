import React, { useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import rsVideo from "../../assets/rs.mp4";

export default function HomeVideoSection({
  title = "RS MODE EXPERIENCE",
  subtitle = "Scroll to discover our universe",
}) {
  const videoRef = useRef(null);

  // UI mirror state (video is source of truth)
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  /* ----------------------------------------
     🔄 SYNC STATE FROM VIDEO
  ---------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlay = () => setPlaying(!video.paused);
    const syncMute = () => setMuted(video.muted);

    video.addEventListener("play", syncPlay);
    video.addEventListener("pause", syncPlay);
    video.addEventListener("volumechange", syncMute);

    // Initial sync (page reload safe)
    syncPlay();
    syncMute();

    return () => {
      video.removeEventListener("play", syncPlay);
      video.removeEventListener("pause", syncPlay);
      video.removeEventListener("volumechange", syncMute);
    };
  }, []);

  /* ----------------------------------------
     ▶️ AUTO PLAY + SOUND ON
  ---------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.muted = false; // 🔊 SOUND ON
      setMuted(false);

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser blocked sound autoplay → fallback
          video.muted = true;
          setMuted(true);
          video.play().catch(() => {});
        });
      }
    } else {
      // ⬇️ When scrolled past
      video.pause();
      video.muted = true;
      setMuted(true);
    }
  }, [inView]);

  /* ----------------------------------------
     🎛 CONTROLS
  ---------------------------------------- */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
  };

  return (
    <section
      ref={ref}
      className="relative w-full max-h-[400px] overflow-hidden bg-black"
    >
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src={rsVideo}
        loop
        playsInline
        preload="metadata"
        className="w-full h-[400px] object-cover"
      />

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* 📌 CONTENT */}
      <div className="absolute inset-0 z-10 flex items-end px-4 md:px-10 pb-4">
        <div className="w-full flex items-end justify-between gap-6">
          {/* TEXT */}
          <div className="max-w-xl text-white">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide">
              {title}
            </h2>
            <p className="mt-1 text-xs md:text-sm text-white/70 tracking-widest uppercase">
              {subtitle}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="
                flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/20 backdrop-blur-xl
                border border-white/30 text-white
                hover:bg-white/30 transition
              "
            >
              {playing ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
              <span className="hidden md:inline">
                {playing ? "Pause" : "Play"}
              </span>
            </button>

            <button
              onClick={toggleMute}
              className="
                p-2.5 rounded-full
                bg-white/20 backdrop-blur-xl
                border border-white/30 text-white
                hover:bg-white/30 transition
              "
            >
              {muted ? (
                <SpeakerXMarkIcon className="w-4 h-4" />
              ) : (
                <SpeakerWaveIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
