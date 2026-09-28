"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap-config";

// Silent looping clip that plays only while on screen. Started from JS rather
// than the autoPlay attribute so reduced-motion visitors keep the still poster
// frame, and retried on every entry because a play() made in a background tab
// is refused.
export function LoopVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;

    let onScreen = false;
    const play = () => {
      if (onScreen && !document.hidden) video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
      else video.pause();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", play);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
