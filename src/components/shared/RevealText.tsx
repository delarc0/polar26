"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  duration = 1,
  stagger = 0.08,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".reveal-word");

    gsap.set(words, {
      y: "110%",
      opacity: 0,
    });

    const tween = gsap.to(words, {
      y: "0%",
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
    };
  }, [delay, duration, stagger]);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Tag className={cn(className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <span className="reveal-word inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
