"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

// Reveals the card's content, not the card itself: the grid draws its divider
// lines with a gap-px over bg-border, so fading the cell would flash a grey block.
export function PartnerOption({ title, text, index }: { title: string; text: string; index: number }) {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 24, delay: index * 0.08 });

  return (
    <div className="group relative overflow-hidden bg-background p-6">
      <div ref={contentRef}>
        <p className="font-display text-base font-bold uppercase group-hover:text-polar-lime transition-colors duration-500">
          {title}
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-polar-lime/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}
