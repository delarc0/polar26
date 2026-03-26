"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/shared/RevealText";

export function AboutPreview() {
  const leftRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const rightRef = useScrollReveal<HTMLDivElement>({ delay: 0.2 });

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div ref={leftRef}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
              About Us
            </span>
            <RevealText
              as="h2"
              className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-display font-bold uppercase"
            >
              Bold ideas deserve bold execution
            </RevealText>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded by Patrik Nordstrom, Polar26 is a creative agency built on
              the belief that great work comes from the intersection of strategy
              and raw creative energy. From brand films to full-scale digital
              campaigns, we make things that people actually remember.
            </p>
          </div>

          {/* Photo */}
          <div
            ref={rightRef}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src="/images/patrik-portrait.webp"
              alt="Patrik Nordstrom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
