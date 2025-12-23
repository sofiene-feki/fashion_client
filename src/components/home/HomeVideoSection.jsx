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
  const [muted, setMuted] = useState(false); // 🔊 SOUND ON

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [inView]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
    setPlaying(!videoRef.current.paused);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section ref={ref} className="relative w-full h-auto bg-black">
      {/* 🎥 VIDEO */}
      <div className="absolute inset-0 h-full">
        <video
          ref={videoRef}
          src={rsVideo}
          muted={muted}
          loop
          playsInline
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* 📌 CONTENT */}
      <div className="relative h-full">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl z-10">
            <h2 className="text-white text-4xl md:text-6xl font-light tracking-wide">
              {title}
            </h2>
            <p className="text-white/80 text-base md:text-lg">{subtitle}</p>
          </div>

          {/* 🎛️ VERTICAL CONTROLS – RIGHT */}
          <div className="absolute right-6 bottom-4 flex flex-row gap-2 z-20">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full
              bg-white/20 backdrop-blur-xl border border-white/30
              text-white hover:bg-white/30 transition"
            >
              {playing ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-3 rounded-full
              bg-white/20 backdrop-blur-xl border border-white/30
              text-white hover:bg-white/30 transition"
            >
              {muted ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
