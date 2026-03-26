"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PortfolioCard } from "@/components/shared/PortfolioCard";
import { PROJECTS } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function WorkPreview() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.15,
  });

  const featured = PROJECTS.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div
          ref={headingRef}
          className="flex items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
              Selected Work
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase tracking-tight">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-polar-lime transition-colors group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {featured.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>

        <Link
          href="/work"
          className="sm:hidden mt-8 flex items-center justify-center gap-2 text-sm font-medium text-polar-lime"
        >
          View All Work
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
