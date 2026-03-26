"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CTASection } from "@/components/home/CTASection";

const VALUES = [
  {
    title: "Bold Over Safe",
    description:
      "Playing it safe is the riskiest thing a brand can do. We push creative boundaries because that is where the magic happens.",
  },
  {
    title: "Strategy Meets Story",
    description:
      "Every project starts with a clear strategy. Then we wrap it in a story that makes people feel something.",
  },
  {
    title: "Every Frame Matters",
    description:
      "Whether it is a 15-second reel or a full brand film, we obsess over the details that separate good from unforgettable.",
  },
];

const CAPABILITIES = [
  "Videography",
  "Advertising",
  "Brand Consulting",
  "Content Strategy",
  "Event Production",
  "Content Marketing",
  "Digital Marketing",
  "Commercial Photography",
];

export function AboutPageContent() {
  const heroRef = useScrollReveal<HTMLDivElement>();
  const bioRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
  const bioImageRef = useScrollReveal<HTMLDivElement>({ delay: 0.3 });
  const valuesHeadingRef = useScrollReveal<HTMLDivElement>();
  const valuesGridRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.15,
  });
  const capsRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div
          ref={heroRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            About
          </span>
          <h1 className="mt-4 text-[clamp(2rem,6vw,5rem)] font-display font-bold uppercase tracking-tight">
            About Polar26
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-display uppercase tracking-tight">
            We believe in creative that moves people.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={bioRef}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
                The Founder
              </span>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-display font-bold uppercase tracking-tight">
                Patrik Nordstrom
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Patrik is a videographer, brand consultant, and content
                  strategist with nearly two decades of experience in creative
                  production. From advertising campaigns to large-scale event
                  production, he has built brands and told stories across every
                  medium.
                </p>
                <p>
                  With a background in branding and digital communication from
                  BAU in Barcelona, and deep roots in Swedish creative culture,
                  Patrik brings a unique blend of strategic thinking and raw
                  creative instinct to every project.
                </p>
                <p>
                  Outside work, he is a former Swedish 3x3 Basketball Champion
                  (gold 2016, 2017) and a dedicated basketball coach.
                </p>
              </div>
            </div>

            <div
              ref={bioImageRef}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/patrik-truck-cab.jpg"
                alt="Patrik Nordstrom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div ref={valuesHeadingRef}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
              Our Approach
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase tracking-tight">
              Values
            </h2>
          </div>

          <div
            ref={valuesGridRef}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {VALUES.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-display font-bold uppercase tracking-tight text-polar-lime">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div
          ref={capsRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            What We Do
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase tracking-tight">
            Capabilities
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-3 py-3 border-b border-white/[0.06]"
              >
                <div className="h-1.5 w-1.5 bg-polar-lime flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
