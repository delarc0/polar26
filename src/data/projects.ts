export interface Project {
  slug: string;
  title: string;
  category: "film" | "brand" | "digital" | "events";
  description: string;
  year: number;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "nordic-trails",
    title: "Nordic Trails",
    category: "film",
    description: "A cinematic brand film for Scandinavia's premier outdoor brand.",
    year: 2025,
  },
  {
    slug: "forma-rebrand",
    title: "Forma Rebrand",
    category: "brand",
    description: "Complete visual identity overhaul for a design-forward furniture company.",
    year: 2025,
  },
  {
    slug: "summit-digital",
    title: "Summit Digital",
    category: "digital",
    description: "Multi-channel digital campaign that tripled engagement in 90 days.",
    year: 2024,
  },
  {
    slug: "winter-gala",
    title: "Winter Gala 2024",
    category: "events",
    description: "Full creative direction for a 500-guest corporate celebration.",
    year: 2024,
  },
  {
    slug: "atlas-coffee",
    title: "Atlas Coffee Co.",
    category: "brand",
    description: "Brand identity and packaging for a specialty coffee roaster.",
    year: 2024,
  },
  {
    slug: "pulse-campaign",
    title: "Pulse Campaign",
    category: "digital",
    description: "Performance marketing campaign with 4.2x ROAS.",
    year: 2023,
  },
];
