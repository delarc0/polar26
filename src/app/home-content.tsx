"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogoMarquee } from "@/components/home/ClientLogoMarquee";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PhotoGrid } from "@/components/home/PhotoGrid";
import { AboutPreview } from "@/components/home/AboutPreview";
import { MarketingFramework } from "@/components/home/MarketingFramework";
export function HomeContent() {
  return (
    <>
      <HeroSection />
      <ClientLogoMarquee />
      <ServicesSection />
      <MarketingFramework />
      <PhotoGrid />
      <AboutPreview />
    </>
  );
}
