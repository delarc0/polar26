"use client";

import Image from "next/image";

const CLIENTS = [
  { name: "Pirelli", src: "/images/clients/pirelli.webp", width: 307, height: 80 },
  { name: "Nordea", src: "/images/clients/nordea.webp", width: 187, height: 80 },
  { name: "Honda HRC", src: "/images/clients/honda-hrc.webp", width: 66, height: 80 },
  { name: "Yamaha", src: "/images/clients/yamaha.webp", width: 231, height: 80 },
  { name: "Mekonomen", src: "/images/clients/mekonomen.webp", width: 161, height: 80 },
  { name: "Fysiolollo", src: "/images/clients/fysiolollo.webp", width: 166, height: 80 },
  { name: "Son of a Coder", src: "/images/clients/sonofacoder.webp", width: 226, height: 80 },
];

export function ClientLogoMarquee() {
  const set = CLIENTS.map((client) => (
    <div
      key={client.name}
      className="flex-shrink-0 flex items-center px-8 sm:px-12"
    >
      <Image
        src={client.src}
        alt={client.name}
        width={client.width}
        height={client.height}
        className="h-6 sm:h-8 w-auto brightness-0 invert opacity-40"
      />
    </div>
  ));

  return (
    <section className="border-y border-white/[0.06] overflow-hidden py-8 sm:py-10">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {set}
          {set}
        </div>
      </div>
    </section>
  );
}
