"use client";

import { Marquee } from "@/components/shared/Marquee";

interface MarqueeSectionProps {
  text?: string;
  reverse?: boolean;
}

export function MarqueeSection({
  text = "Film \u00b7 Strategy \u00b7 Brand \u00b7 Content \u00b7 Events \u00b7 ",
  reverse = false,
}: MarqueeSectionProps) {
  return (
    <div className="border-y border-white/[0.06] overflow-hidden">
      <Marquee text={text} reverse={reverse} />
    </div>
  );
}
