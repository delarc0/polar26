"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface UseScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  children?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    duration = 0.75,
    delay = 0,
    stagger = 0,
    ease = "power3.out",
    start = "top 85%",
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;

    gsap.set(targets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease,
        });
      },
    });

    return () => trigger.kill();
  }, [y, duration, delay, stagger, ease, start, children]);

  return ref;
}
