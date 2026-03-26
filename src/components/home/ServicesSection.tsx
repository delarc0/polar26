"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SERVICES } from "@/data/services";
import {
  Video,
  Target,
  TrendingUp,
  Calendar,
  BarChart3,
  Camera,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Video,
  Target,
  TrendingUp,
  Calendar,
  BarChart3,
  Camera,
};

export function ServicesSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.1,
  });

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={headingRef}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            What We Do
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase tracking-tight">
            Services
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <div
                key={service.title}
                className="bg-background p-8 sm:p-10 group hover:bg-card transition-colors duration-300"
              >
                {Icon && (
                  <Icon
                    size={24}
                    aria-hidden="true"
                    className="text-polar-lime mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <h3 className="text-base sm:text-lg font-display font-bold uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
