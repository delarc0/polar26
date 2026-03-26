"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface PortfolioCardProps {
  project: Project;
  className?: string;
}

export function PortfolioCard({ project, className }: PortfolioCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden bg-card cursor-pointer",
        className
      )}
    >
      {/* Project image or placeholder */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-400 ease-[cubic-bezier(0.65,0.05,0,1)] group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-polar-lime/5 to-transparent" />
      )}

      {/* Clip-path reveal overlay */}
      <div className="clip-reveal absolute inset-0 bg-polar-lime/10 z-10" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
        <span className="text-xs font-medium tracking-[0.15em] uppercase text-polar-lime mb-2">
          {project.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-foreground group-hover:text-polar-lime transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {project.description}
        </p>
      </div>

      {/* Year badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-xs font-medium text-muted-foreground">
          {project.year}
        </span>
      </div>
    </div>
  );
}
