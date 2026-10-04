/* -------------------------------------------------------------------------- */
/*  Unlisted partner page: polar26.com/upcoming                                */
/*  All copy and prices live in PROJECTS below. Prices are EUR excl. VAT.      */
/*  Images: drop files in /public/images/upcoming/ and set `image` per project.*/
/* -------------------------------------------------------------------------- */

import type { ReactNode } from "react";
import { LoopVideo } from "./loop-video";
import { PartnerOption } from "./partner-option";

type MediaShape = "landscape" | "square" | "portrait";

type Project = {
  id: string;
  number: string;
  title: string;
  withWho: string;
  when: string;
  where?: string;
  story: string;
  produce: string[];
  reach: string[];
  audience: { value: string; label: string }[];
  price: string;
  // `caption` labels photos that aren't ours, e.g. "Reference".
  image?: { src: string; alt: string; shape?: MediaShape; caption?: string };
  // Desktop only: fills the media column beside the longer copy.
  secondImage?: { src: string; alt: string };
  // Silent loop shown in place of `image`.
  video?: { src: string; poster: string; label: string; shape?: MediaShape };
  link?: { href: string; caption: string; label: string };
};

const PARTNER_OPTIONS = [
  { title: "Product placement", text: "Your gear on the riders and in the shots." },
  { title: "Co-branded short assets", text: "Reels and clips cut for your own channels." },
  { title: "Custom deliverables", text: "Extra assets made for you on the same shoot days." },
  { title: "Collab posts", text: "Published together with the riders' accounts." },
];

const PROJECTS: Project[] = [
  {
    id: "skoovby",
    number: "01",
    title: "Skoovby does the Toprak Challenge",
    withWho: "with Skoovby",
    when: "19 October 2026",
    where: "Uppsala / Stockholm",
    story:
      "Toprak Razgatlıoğlu posted a trick. Skoovby recreates it and challenges him back, and the community tags Toprak. The caption reveals Skoovby as headliner of the MC Mässan 2027 stunt show.",
    produce: ["Challenge reel on Skoovby's Instagram", "Behind-the-scenes clips", "Photos"],
    reach: [
      "Skoovby: 675k followers on Instagram",
      "Part of the MC Mässan 2027 campaign (January 2027, Elmia, Jönköping)",
    ],
    audience: [
      { value: "30M+", label: "Monthly views worldwide" },
      { value: "Core markets", label: "US, Germany, France, Spain and Sweden" },
      { value: "18 to 35", label: "Core audience, men" },
    ],
    price: "From €2,000",
    image: {
      src: "/images/upcoming/skoovby-rider.webp",
      alt: "Skoovby with his supermoto",
      shape: "square",
    },
    link: {
      href: "https://www.instagram.com/reel/CrBdQ6SIDnO/",
      caption: "The original",
      label: "Watch Toprak's original reel on Instagram",
    },
  },
  {
    id: "gotland",
    number: "02",
    title: "Gotland Grand National",
    withWho: "with Jens Byggmark",
    when: "21 to 24 October 2026",
    where: "Gotland, Sweden",
    story:
      "Jens Byggmark races Gotland Grand National again, and we go with him as ambassadors for Yamaha Motor Europe. The trip over, the crew, the pits and race day. The whole experience around the race, not just the results.",
    produce: [
      "1 YouTube episode, “The Gotland Experience”",
      "Reels and short clips",
      "Photos",
    ],
    reach: [
      "Our YouTube channel",
      "Riders' Instagram accounts",
    ],
    audience: [
      { value: "8k to 60k", label: "Views per YouTube episode" },
      { value: "70k", label: "Average views per organic post" },
      { value: "35 to 54", label: "Core audience, men and women" },
      { value: "Household name", label: "In Sweden, from TV, sport and entertainment" },
    ],
    price: "From €1,500",
    image: { src: "/images/upcoming/gotland-jens.webp", alt: "Jens Byggmark in his garage" },
    secondImage: { src: "/images/upcoming/gotland-patrik-jens.webp", alt: "Patrik Nordström and Jens Byggmark laughing outside Jens's house" },
  },
  {
    id: "speedway",
    number: "03",
    title: "Testing Speedway",
    withWho: "with Kim Nilsson",
    when: "Early November 2026",
    where: "Eskilstuna, Sweden",
    story:
      "Patrik tries speedway as an amateur, coached by Kim Nilsson, the only Swede to qualify for the 2027 Speedway GP. No brakes, no gears, one very fast teacher.",
    produce: ["YouTube episode on our channel", "Short-format assets for partners", "Photos"],
    reach: [
      "Our YouTube channel",
      "Kim Nilsson and Patrik's Instagram",
      "Partner channels",
    ],
    audience: [
      { value: "8k to 60k", label: "Views per YouTube episode" },
      { value: "Global stage", label: "Kim races the 2027 world championship" },
      { value: "Booming niche", label: "A rare chance for brand activation in a fast-growing sport" },
    ],
    price: "From €2,000",
    video: {
      src: "/images/upcoming/speedway-loop.mp4",
      poster: "/images/upcoming/speedway-loop-poster.webp",
      label: "Kim Nilsson at the start gate, then racing into the first corner",
      shape: "portrait",
    },
  },
];

// Not date-confirmed yet: shown under "In development", with a season instead of a date.
const IN_DEVELOPMENT: Project[] = [
  {
    id: "kb-bomberleague",
    number: "04",
    title: "Sportbike community activation",
    withWho: "with Karl Bryngelsson and Sporthoj of Sweden",
    when: "Late Q4 2026 · date TBD",
    where: "Gothenburg, Sweden",
    story:
      "A photoshoot with Karl Bryngelsson (KB_bomberleague), the most respected and engaging name in the community, activated on the Sporthoj forum. A way to reach a new audience that puts a high demand on authenticity.",
    produce: [
      "Photoshoot with Karl Bryngelsson",
      "Behind-the-scenes reels for social media",
      "Forum activation on Sporthoj",
    ],
    reach: [
      "Sporthoj of Sweden, on Facebook and website",
      "Karl Bryngelsson on Facebook",
      "KB_bomberleague on Instagram",
    ],
    audience: [
      { value: "Most respected", label: "Name in the community" },
      { value: "Authenticity first", label: "An audience that ignores classic ads" },
    ],
    price: "From €1,500",
    image: {
      src: "/images/upcoming/kb-bomberleague.webp",
      alt: "Karl Bryngelsson leaning over his Honda CBR on an autumn park path",
      shape: "portrait",
    },
  },
  {
    id: "sprinter",
    number: "05",
    title: "Sprinter race van build",
    withWho: "with Tom Söderström, Jens Byggmark and North of Normal TV",
    when: "Q4 2026 · date TBD",
    where: "Stockholm, Sweden",
    story:
      "We turn a Mercedes Sprinter into a race and production van, with room for two motorcycles, a bed and a workstation. The build becomes a YouTube episode, and the van becomes our base for shoots and race weekends after it.",
    produce: ["YouTube episode on the build", "Build content for social media"],
    reach: ["Our YouTube channel", "Patrik's Instagram", "Partner channels"],
    audience: [{ value: "8k to 60k", label: "Views per YouTube episode" }],
    price: "From €1,000",
    image: {
      src: "/images/upcoming/sprinter-reference.webp",
      alt: "Converted Mercedes Sprinter with the rear doors open, showing a bike bay under a raised bed",
      caption: "Reference",
    },
  },
];

// Caps the title size so its longest word (e.g. the handle "KB_bomberleague",
// which must never break) fits the phone's width. The uppercase display face
// runs about 0.81em per character; 0.82 leaves a little room. Below sm the
// column is the viewport minus 3rem of padding; wider screens never hit the cap.
function titleFontSize(title: string) {
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length));
  return `min(clamp(1.75rem, 4vw, 2.75rem), calc((100vw - 3rem) / ${(longest * 0.82).toFixed(2)}))`;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">{children}</p>
  );
}

// Audience cards sit three across, or two across for an even count (2 or 4).
// They stack in the lg range, where the copy column is too narrow for side-by-side cards.
const AUDIENCE_GRID = {
  three: {
    grid: "sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3",
    cell: "sm:px-4 sm:first:pl-0 lg:px-0 xl:px-4 xl:first:pl-0",
  },
  two: {
    grid: "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
    cell: "sm:px-4 sm:odd:pl-0 lg:px-0 xl:px-4 xl:odd:pl-0",
  },
};

function ProjectBlock({ p }: { p: Project }) {
  const audienceGrid = p.audience.length % 2 === 0 ? AUDIENCE_GRID.two : AUDIENCE_GRID.three;
  const shape = (p.video ?? p.image)?.shape;
  const portrait = shape === "portrait";
  const aspectClass =
    shape === "portrait"
      ? "aspect-[4/5]"
      : shape === "square"
        ? "aspect-square"
        : "aspect-[3/2]";
  return (
    <article
      id={p.id}
      className="grid gap-8 lg:gap-14 border-t border-border pt-12 sm:pt-16 lg:grid-cols-12"
    >
      {/* Media */}
      <div className={portrait ? "lg:col-span-4" : "lg:col-span-6"}>
        {p.video ? (
          <LoopVideo
            src={p.video.src}
            poster={p.video.poster}
            label={p.video.label}
            className={`w-full object-cover bg-secondary ${aspectClass}`}
          />
        ) : p.image ? (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image.src}
              alt={p.image.alt}
              loading="lazy"
              className={`w-full object-cover bg-secondary ${aspectClass}`}
            />
            {p.image.caption && (
              <figcaption className="mt-2 text-xs text-muted-foreground">{p.image.caption}</figcaption>
            )}
          </figure>
        ) : (
          <div className="flex aspect-[3/2] w-full items-end bg-secondary p-6">
            <span className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none text-foreground/10">
              {p.number}
            </span>
          </div>
        )}
        {p.secondImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.secondImage.src}
            alt={p.secondImage.alt}
            loading="lazy"
            className="mt-4 hidden w-full object-cover bg-secondary aspect-[3/2] lg:block"
          />
        )}
      </div>

      {/* Copy */}
      <div className={portrait ? "lg:col-span-8" : "lg:col-span-6"}>
        <Eyebrow>
          {p.number} &middot; {p.when}
        </Eyebrow>
        <h2
          className="mt-4 font-display font-bold uppercase leading-[1.05]"
          style={{ fontSize: titleFontSize(p.title) }}
        >
          {p.title}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          {p.withWho}
          {p.where && <> &middot; {p.where}</>}
        </p>
        <p className="mt-6 text-base sm:text-lg leading-relaxed">{p.story}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
              What we make
            </p>
            <ul className="mt-3 space-y-2 text-sm sm:text-base">
              {p.produce.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-polar-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
              Where it runs
            </p>
            <ul className="mt-3 space-y-2 text-sm sm:text-base">
              {p.reach.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-polar-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
            Who&apos;s watching
          </p>
          <div className={`mt-3 grid gap-px bg-border ${audienceGrid.grid}`}>
            {p.audience.map((a) => (
              <div key={a.label} className={`bg-background py-4 ${audienceGrid.cell}`}>
                <p className="font-display text-base sm:text-lg font-bold uppercase leading-tight text-polar-lime">
                  {a.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y border-border py-4">
          <dt>
            <a
              href={`/contact?project=${encodeURIComponent(p.title)}`}
              className="text-sm text-foreground underline underline-offset-4 hover:text-polar-lime transition-colors"
            >
              Get involved&nbsp;&rarr;
            </a>
          </dt>
          <dd className="font-display text-lg sm:text-xl font-bold uppercase text-polar-lime">{p.price}</dd>
        </dl>

        {p.link && (
          <div className="mt-10">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
              {p.link.caption}
            </p>
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-base sm:text-lg text-foreground underline underline-offset-4 hover:text-polar-lime transition-colors"
            >
              {p.link.label}&nbsp;&rarr;
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export function UpcomingProjects() {
  return (
    <section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="max-w-3xl">
          <Eyebrow>Polar26 &middot; Fall 2026</Eyebrow>
          <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-display font-bold uppercase leading-[1.02]">
            Upcoming projects
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Moto productions we&apos;re shooting this fall, and a few we&apos;re developing next. The
            riders, crew and channels are
            already booked, so partners can come in for extra exposure without paying for a full
            production.
          </p>
        </header>

        {/* Partner options */}
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_OPTIONS.map((o, i) => (
            <PartnerOption key={o.title} title={o.title} text={o.text} index={i} />
          ))}
        </div>

        {/* Projects */}
        <div className="mt-20 space-y-20 sm:space-y-28">
          {PROJECTS.map((p) => (
            <ProjectBlock key={p.id} p={p} />
          ))}
        </div>

        {/* In development */}
        <section className="mt-24 sm:mt-32">
          <header className="max-w-3xl">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold uppercase leading-[1.02]">
              In development
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Projects we&apos;re still shaping. Come in early and have a say in how they turn out.
            </p>
          </header>
          <div className="mt-12 sm:mt-16 space-y-20 sm:space-y-28">
            {IN_DEVELOPMENT.map((p) => (
              <ProjectBlock key={p.id} p={p} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-24 border-t border-border pt-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold uppercase">Patrik Nordstr&ouml;m</p>
            <p className="text-sm text-muted-foreground">Founder &amp; CEO, Polar26</p>
            <a
              href="mailto:hello@polar26.com"
              className="mt-2 inline-block text-sm text-foreground underline underline-offset-4 hover:text-polar-lime transition-colors"
            >
              hello@polar26.com
            </a>
          </div>
          <p className="text-xs text-muted-foreground">All prices in EUR, excl. VAT.</p>
        </div>
      </div>
    </section>
  );
}
