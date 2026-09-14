"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.75,
  });
}

/**
 * Canonical reduced-motion check. Every GSAP call site opts out through this.
 *
 * Deliberately NOT a global kill switch. This file used to call
 * `gsap.globalTimeline.pause()` under `prefers-reduced-motion`, which silences
 * tweens but leaves the DOM they were supposed to change untouched, so any
 * element parked at `opacity: 0`, by a class or by an earlier tween, stayed
 * invisible forever for exactly the readers who asked for less motion.
 *
 * The rule instead: an animation that hides something is responsible for
 * checking this and leaving its element in the final, visible state.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger };
