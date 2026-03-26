"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PortfolioCard } from "@/components/shared/PortfolioCard";
import { PROJECTS } from "@/data/projects";

export function WorkGrid() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.1,
  });

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
    >
      {PROJECTS.map((project) => (
        <PortfolioCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
