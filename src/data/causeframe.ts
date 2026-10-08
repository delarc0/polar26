export const CAUSEFRAME = {
  name: "CauseFrame",
  founders: [
    {
      name: "Patrik Nordström",
      role: "Co-Founder",
      image: "/images/causeframe/team/patrik-nordstrom.png",
      focus: "50% 50%",
      linkedin: "https://www.linkedin.com/in/patriknordstrm/",
    },
    {
      name: "Nathaniel Fleischmann",
      role: "Co-Founder",
      image: "/images/causeframe/team/nate-fleischmann.jpg",
      focus: "80% 25%",
      linkedin: "https://www.linkedin.com/in/nathaniel-fleischmann-64aa45102/",
    },
  ],
  pastWork: [
    { name: "Protect Me Albania", location: "Albania" },
    { name: "Bear Sanctuary Pristina", location: "Kosovo" },
    { name: "Kids Academy", location: "Kosovo" },
    { name: "Society Biliki", location: "Gori, Georgia" },
    { name: "Boys & Girls Club of Ghana", location: "Ekumfi, Ghana" },
  ],
} as const;

export const GEORGIA_PHOTOS = [
  { file: "kids-playing-soccer.jpg", alt: "Kids playing soccer in a courtyard in Gori, Georgia" },
  { file: "kids-playing-soccer-2.jpg", alt: "Kids playing soccer in Gori, Georgia" },
  { file: "happy-boys.jpg", alt: "Boys laughing together at Society Biliki" },
  { file: "happy-girls.jpg", alt: "Girls high-fiving at Society Biliki" },
  { file: "kid-receives-art.jpg", alt: "A boy handing over a drawing at Society Biliki" },
  { file: "table-football.jpg", alt: "Kids playing table football at Society Biliki" },
  { file: "woman-with-doll.jpg", alt: "A young girl with a doll at Society Biliki" },
  { file: "building.jpg", alt: "The Society Biliki building in Gori, Georgia" },
] as const;

export const GEORGIA_VIDEO_ID = "eXlI276GCjc";

export const GHANA_STATS = [
  { value: "30", label: "Bikes delivered" },
  { value: "3", label: "Communities" },
  { value: "10", label: "Soccer balls" },
] as const;

export const GHANA_PARTNERS = [
  {
    name: "Boys & Girls Club of Ghana",
    role: "Our partner on the ground, bringing together the kids and communities.",
  },
  {
    name: "Village Bicycle Project",
    role: "Sourced the bikes we bought, then serviced and delivered them.",
  },
] as const;

export const GHANA_HERO = {
  file: "hero-founders.webp",
  alt: "Patrik and Nathaniel with the kids and bikes on handover day in Ghana",
} as const;

export const GHANA_PHOTOS = [
  { file: "bikes-lined-up.webp", alt: "Rows of bicycles lined up under a pavilion, ready for handover" },
  { file: "bike-handover.webp", alt: "Kids gathering around the bikes as they are handed out" },
  { file: "girl-speech.webp", alt: "A girl giving a speech in front of the bikes" },
  { file: "handshake.webp", alt: "Two women shaking hands during the handover ceremony" },
  { file: "speech-laughing.webp", alt: "A young woman laughing as she speaks into a microphone" },
  { file: "kids-gathering.webp", alt: "Kids and adults gathered outside for the handover" },
] as const;

export const GHANA_PORTRAITS = [
  { file: "friends-hugging.webp", alt: "Two smiling girls hugging" },
  { file: "soccer-kick.webp", alt: "A boy kicking a soccer ball on a dirt pitch" },
  { file: "kids-with-camera.webp", alt: "Two young kids holding an action camera" },
  { file: "boy-at-window.webp", alt: "A boy leaning out of a green window frame" },
] as const;

export const COMMUNITY_NEEDS = [
  {
    id: "toilets",
    title: "Toilet facilities",
    cta: "Fund the toilets",
    cost: "€2,000",
    body: "Proper, clean toilets for the kids and families who gather there every day.",
  },
  {
    id: "water-pump",
    title: "Drinking water pump",
    cta: "Fund the water pump",
    cost: "€1,500",
    body: "A new pump for safe, reliable drinking water.",
  },
] as const;

export const CORPORATE_PILLARS = [
  {
    title: "Real, traceable impact",
    body: "Every project is concrete, costed and delivered in person. You know exactly what your money did, down to the last bike.",
  },
  {
    title: "Documented, not staged",
    body: "Polar26 photographs and films every delivery, so you get content worth publishing, not stock photos.",
  },
  {
    title: "PR and CSR, handled",
    body: "Press, social and CSR reporting built around the project, so your stakeholders see the work, not just a logo.",
  },
] as const;
