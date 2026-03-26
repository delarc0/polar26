"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ParallaxBreakProps {
  src: string;
  alt: string;
}

export function ParallaxBreak({ src, alt }: ParallaxBreakProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const tween = gsap.to(image, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[50vh] sm:h-[60vh] overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[30px] -bottom-[30px]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 z-10 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
