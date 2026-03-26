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
    title: "Content Strategy",
    description: "Content that drives real results.",
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
    title: "Digital Marketing",
    description: "Data-driven campaigns that convert.",
    icon: "BarChart3",
    image: "/images/gallery/workshop.webp",
  },
  {
    title: "Commercial Photography",
    description: "Images that stop the scroll.",
    icon: "Camera",
    image: "/images/gallery/dirtbike-model.webp",
  },
  {
    title: "Videography",
    description: "Cinematic content that tells your story.",
    icon: "Video",
    image: "/images/patrik-gimbal-van.jpg",
  },
];
