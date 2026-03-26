"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WorkGrid } from "@/components/work/WorkGrid";
import { CTASection } from "@/components/home/CTASection";

export function WorkPageContent() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div
          ref={headingRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            Portfolio
          </span>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-display font-bold uppercase tracking-tight">
            Our Work
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg">
            Selected projects across film, brand, and digital.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <WorkGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
