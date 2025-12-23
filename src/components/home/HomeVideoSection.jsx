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
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  /* ▶️ Auto play + sound ON when visible */
  useEffect(() => {
    if (!videoRef.current) return;

    if (inView) {
      videoRef.current.muted = false; // 🔊 sound ON
      setMuted(false);

      videoRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setMuted(true);
      setPlaying(false);
    }
  }, [inView]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section
      ref={ref}
      className="relative w-full max-h-[400px] overflow-hidden bg-black"
    >
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        src={rsVideo}
        loop
        playsInline
        className="w-full h-[400px] object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex items-end px-2 md:px-10 pb-4">
        <div className="w-full flex items-end justify-between gap-6">
          {/* TEXT — LEFT */}
          <div className="max-w-xl text-white">
            <h2 className="text-2xl md:text-3xl font-serif tracking-wide leading-tight">
              {title}
            </h2>
            <p className="mt-1 text-xs md:text-sm text-white/70 tracking-widest uppercase">
              {subtitle}
            </p>
          </div>

          {/* CONTROLS — RIGHT */}
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
