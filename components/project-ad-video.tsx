'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function ProjectAdVideo({
  src,
  poster,
  label,
  className = '',
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      video.pause();
    }
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <div className={`project-ad-video ${className}`.trim()}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        className="project-ad-toggle"
        type="button"
        aria-label={playing ? 'Pause Image-to-3D advertisement' : 'Play Image-to-3D advertisement'}
        aria-pressed={playing}
        onClick={togglePlayback}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{playing ? 'Pause' : 'Play'}</span>
      </button>
    </div>
  );
}
