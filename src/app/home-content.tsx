"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogoMarquee } from "@/components/home/ClientLogoMarquee";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PhotoGrid } from "@/components/home/PhotoGrid";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CTASection } from "@/components/home/CTASection";

export function HomeContent() {
  return (
    <>
      <HeroSection />
      <ClientLogoMarquee />
      <ServicesSection />
      <PhotoGrid />
<AboutPreview />
      <CTASection />
    </>
  );
}
