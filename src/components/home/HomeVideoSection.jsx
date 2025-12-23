import {
  PlayIcon,
  PauseIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import rsVideo from "../../assets/rs.mp4";
import React from "react";

export default function HomeVideoSection({ src, poster, title, subtitle }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={rsVideo}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {title && (
          <h2 className="text-white text-3xl md:text-5xl font-luxury tracking-wide mb-2">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="text-white/80 max-w-xl mx-auto mb-6">{subtitle}</p>
        )}

        {/* GLASS CONTROL */}
        <button
          onClick={togglePlay}
          className="
            flex items-center gap-2 px-5 py-2 rounded-full
            bg-white/20 backdrop-blur-xl
            border border-white/30
            text-white
            hover:bg-white/30
            transition-all duration-300
          "
        >
          {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}
