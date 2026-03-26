"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

export function Marquee({
  text,
  reverse = false,
  className,
  speed = 30,
}: MarqueeProps) {
  const items = Array(4).fill(text);
  const animationStyle = {
    animationDuration: `${speed}s`,
  };

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap py-6 sm:py-8",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={animationStyle}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase tracking-[-0.03em] leading-none mx-4 sm:mx-8 text-foreground/10"
            aria-hidden={i > 0}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
