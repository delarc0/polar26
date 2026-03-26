"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  animateChildren?: boolean;
}

export function SectionWrapper({
  children,
  className,
  stagger = 0,
  delay = 0,
  animateChildren = false,
}: SectionWrapperProps) {
  const ref = useScrollReveal<HTMLElement>({
    stagger,
    delay,
    children: animateChildren,
  });

  return (
    <section
      ref={ref}
      className={cn("py-24 sm:py-32 lg:py-40", className)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}
