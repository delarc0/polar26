"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.75,
  });

  gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
    gsap.globalTimeline.pause();
    ScrollTrigger.defaults({ animation: undefined });
  });
}

export { gsap, ScrollTrigger };
