"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(".hero-overline", {
      opacity: 0,
      y: 20,
      duration: 0.6,
    })
      .from(
        ".hero-title .line",
        {
          y: "110%",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.3"
      )
      .from(
        ".hero-tagline",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        ".hero-scroll",
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-20"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-banner-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-banner.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

      <div className="relative z-[3] mx-auto max-w-7xl w-full">
        {/* Overline */}
        <p className="hero-overline text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-polar-lime mb-6 sm:mb-8">
          Creative Agency
        </p>

        {/* Title */}
        <div className="hero-title overflow-hidden">
          <div className="overflow-hidden">
            <h1 className="line text-[clamp(3.5rem,10vw,10rem)] font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.85]">
              Polar26
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline mt-6 sm:mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg">
          We turn bold ideas into visual stories that cut through the noise.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
        <ArrowDown size={16} className="text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
