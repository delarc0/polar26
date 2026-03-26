"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTASection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 sm:py-32 lg:py-40 border-t border-white/[0.06]">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center"
      >
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-bold uppercase tracking-tight leading-[0.9]">
          Ready to
          <br />
          <span className="text-polar-lime">stand out?</span>
        </h2>
        <Link
          href="/contact"
          className="mt-8 sm:mt-12 inline-flex items-center justify-center bg-polar-lime text-[#0A0A0A] px-8 py-4 text-sm font-bold tracking-[0.1em] uppercase hover:bg-polar-lime/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-polar-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
        >
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
