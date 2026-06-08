export interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    title: "Brand Activation",
    description: "Position your brand to win.",
    icon: "Target",
    image: "/images/gallery/ferrari-street.webp",
  },
  {
    title: "Product Strategy",
    description: "Make your product the obvious choice.",
    icon: "TrendingUp",
    image: "/images/gallery/motorsport-garage.webp",
  },
  {
    title: "Strategic Partnerships",
    description: "Unforgettable live experiences.",
    icon: "Handshake",
    image: "/images/gallery/motorsport-podium.webp",
  },
  {
    title: "Athlete Management",
    description: "From athlete to icon.",
    icon: "Trophy",
    image: "/images/gallery/workshop.webp",
  },
  {
    title: "Content Production",
    description: "Speak to your audience.",
    icon: "Clapperboard",
    image: "/images/patrik-gimbal-van.jpg",
  },
];
