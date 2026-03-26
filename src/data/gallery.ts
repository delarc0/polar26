export type GalleryImage = {
  type: "image";
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

export type GalleryVideo = {
  type: "video";
  src: string;
  poster: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

export type GalleryItem = GalleryImage | GalleryVideo;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    type: "image",
    src: "/images/gallery/surf-windblown.webp",
    alt: "Surfer with windblown hair carrying a board",
    category: "Lifestyle",
    width: 1600,
    height: 900,
  },
  {
    type: "image",
    src: "/images/gallery/motorsport-garage.webp",
    alt: "Yamaha rider preparing in the garage",
    category: "Motorsport",
    width: 1080,
    height: 1920,
  },
  {
    type: "video",
    src: "/videos/yamaha-edvin.mp4",
    poster: "/videos/yamaha-edvin-poster.webp",
    alt: "Yamaha rider Edvin on track",
    category: "Motorsport",
    width: 720,
    height: 1280,
  },
  {
    type: "image",
    src: "/images/gallery/bmx-air.webp",
    alt: "BMX rider catching air at a skatepark event",
    category: "Action Sports",
    width: 1080,
    height: 1920,
  },
  {
    type: "image",
    src: "/images/gallery/motorsport-podium.webp",
    alt: "Race winners celebrating on the podium",
    category: "Motorsport",
    width: 1600,
    height: 2000,
  },
  {
    type: "video",
    src: "/videos/stivian-slowmo.mp4",
    poster: "/videos/stivian-slowmo-poster.webp",
    alt: "Stivian slow motion ramp jump",
    category: "Action Sports",
    width: 720,
    height: 1280,
  },
  {
    type: "image",
    src: "/images/gallery/ferrari-street.webp",
    alt: "Red Ferrari on a European street",
    category: "Automotive",
    width: 1080,
    height: 1920,
  },
  {
    type: "image",
    src: "/images/gallery/surf-golden-hour.webp",
    alt: "Surfer holding board at golden hour",
    category: "Lifestyle",
    width: 1600,
    height: 2844,
  },
{
    type: "image",
    src: "/images/gallery/dirtbike-model.webp",
    alt: "Model on a green dirtbike in the forest",
    category: "Action Sports",
    width: 1080,
    height: 1920,
  },
  {
    type: "image",
    src: "/images/gallery/workshop.webp",
    alt: "Patrik leading a creative workshop",
    category: "Events",
    width: 1600,
    height: 2133,
  },
  {
    type: "video",
    src: "/videos/tinyridr-helmet.mp4",
    poster: "/videos/tinyridr-helmet-poster.webp",
    alt: "TinyRidR helmet close-up",
    category: "Motorsport",
    width: 720,
    height: 1280,
  },
  {
    type: "image",
    src: "/images/gallery/motorsport-pitlane.webp",
    alt: "Motorcycle rider in a wet pit lane",
    category: "Motorsport",
    width: 1080,
    height: 1920,
  },
  {
    type: "image",
    src: "/images/gallery/surf-celebration.webp",
    alt: "Surfer celebrating in the waves at sunset",
    category: "Lifestyle",
    width: 1600,
    height: 2844,
  },
];
