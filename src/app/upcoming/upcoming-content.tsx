/* -------------------------------------------------------------------------- */
/*  Unlisted partner page: polar26.com/upcoming                                */
/*  All copy and prices live in PROJECTS below. Prices are EUR excl. VAT.      */
/*  Images: drop files in /public/images/upcoming/ and set `image` per project.*/
/* -------------------------------------------------------------------------- */

import type { ReactNode } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  withWho: string;
  when: string;
  where: string;
  story: string;
  produce: string[];
  reach: string[];
  prices: { label: string; value: string }[];
  image?: { src: string; alt: string; shape?: "landscape" | "square" | "portrait" };
  embed?: { src: string; caption: string };
};

const PARTNER_OPTIONS = [
  { title: "Product placement", text: "Your gear on the riders and in the shots." },
  { title: "Co-branded short assets", text: "Reels and clips cut for your own channels." },
  { title: "Custom deliverables", text: "Extra assets made for you on the same shoot days." },
  { title: "Collab posts", text: "Published together with the riders' accounts." },
];

const PROJECTS: Project[] = [
  {
    id: "gotland",
    number: "01",
    title: "Gotland Grand National",
    withWho: "with Jens Byggmark",
    when: "21 to 24 October 2026",
    where: "Gotland, Sweden",
    story:
      "Jens Byggmark races Gotland Grand National again, and we go with him. The trip over, the crew, the pits and race day. The whole experience around the race, not just the results.",
    produce: [
      "1 YouTube episode, “The Gotland Experience” (about 20 min)",
      "Reels and short clips",
      "Photos",
    ],
    reach: [
      "Our YouTube channel: 5k to 60k views per episode",
      "Riders' Instagram accounts: about 40k views per post on average",
    ],
    prices: [{ label: "Silent exposure or content for your own channels", value: "From €1,000" }],
    image: { src: "/images/upcoming/gotland-jens.webp", alt: "Jens Byggmark in his garage" },
  },
  {
    id: "skoovby",
    number: "02",
    title: "Skoovby does the Toprak Challenge",
    withWho: "with Skoovby",
    when: "Around 19 October 2026",
    where: "Uppsala / Stockholm",
    story:
      "Toprak Razgatlıoğlu posted a trick. Skoovby recreates it and challenges him back, and the community tags Toprak. The caption reveals Skoovby as headliner of the MC Mässan 2027 stunt show.",
    produce: ["Challenge reel on Skoovby's Instagram", "Behind-the-scenes clips", "Photos"],
    reach: [
      "Skoovby: 675k followers on Instagram",
      "Part of the MC Mässan 2027 campaign (January 2027, Elmia, Jönköping)",
    ],
    prices: [
      { label: "Appearance in the reel", value: "From €1,500" },
      { label: "Photo and clip pack (organic and internal use only)", value: "From €1,500" },
      { label: "Collab posts", value: "On request" },
    ],
    image: {
      src: "/images/upcoming/skoovby-rider.webp",
      alt: "Skoovby with his supermoto",
      shape: "square",
    },
    embed: {
      src: "https://www.instagram.com/reel/CrBdQ6SIDnO/embed",
      caption: "The original",
    },
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
      "Kim Nilsson and Speedway GP on Instagram",
      "Possible release on the Speedway GP YouTube channel (pending)",
    ],
    prices: [{ label: "Basic exposure", value: "From €2,000 + products" }],
    image: { src: "/images/upcoming/speedway-kim-wheelie.webp", alt: "Kim Nilsson wheelie on a speedway track" },
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">{children}</p>
  );
}

function ProjectBlock({ p }: { p: Project }) {
  const portrait = p.image?.shape === "portrait";
  const aspectClass =
    p.image?.shape === "portrait"
      ? "aspect-[4/5]"
      : p.image?.shape === "square"
        ? "aspect-square"
        : "aspect-[3/2]";
  return (
    <article
      id={p.id}
      className="grid gap-8 lg:gap-14 border-t border-border pt-12 sm:pt-16 lg:grid-cols-12"
    >
      {/* Media */}
      <div className={portrait ? "lg:col-span-4" : "lg:col-span-6"}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            className={`w-full object-cover bg-secondary ${aspectClass}`}
          />
        ) : (
          <div className="flex aspect-[3/2] w-full items-end bg-secondary p-6">
            <span className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none text-foreground/10">
              {p.number}
            </span>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className={portrait ? "lg:col-span-8" : "lg:col-span-6"}>
        <Eyebrow>
          {p.number} &middot; {p.when}
        </Eyebrow>
        <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-display font-bold uppercase leading-[1.05]">
          {p.title}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground">
          {p.withWho} &middot; {p.where}
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

        <dl className="mt-8 divide-y divide-border border-y border-border">
          {p.prices.map((price) => (
            <div key={price.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <dt className="text-sm text-muted-foreground">{price.label}</dt>
              <dd className="font-display text-lg sm:text-xl font-bold uppercase text-polar-lime">
                {price.value}
              </dd>
            </div>
          ))}
        </dl>

        {p.embed && (
          <div className="mt-10 max-w-[360px]">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
              {p.embed.caption}
            </p>
            <iframe
              src={p.embed.src}
              title={`${p.title}: ${p.embed.caption}`}
              loading="lazy"
              allowFullScreen
              className="mt-3 h-[640px] w-full border-0 bg-white"
            />
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
            Three moto productions we&apos;re shooting this fall. The riders, crew and channels are
            already booked, so partners can come in for extra exposure without paying for a full
            production.
          </p>
        </header>

        {/* Partner options */}
        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_OPTIONS.map((o) => (
            <div key={o.title} className="bg-background p-6">
              <p className="font-display text-base font-bold uppercase">{o.title}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mt-20 space-y-20 sm:space-y-28">
          {PROJECTS.map((p) => (
            <ProjectBlock key={p.id} p={p} />
          ))}
        </div>

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
