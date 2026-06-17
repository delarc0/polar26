"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GOLF_PHOTOS } from "@/data/golfPhotos";

/* -------------------------------------------------------------------------- */
/*  Edit these two lines to change the event name / intro shown on the page.   */
const EVENT_TITLE = "Kungsbacka Open";
const EVENT_INTRO =
  "Photos from the day. Browse below, download the ones you like, or grab the full set in one click.";
/* -------------------------------------------------------------------------- */

const THUMB = (name: string) => `/images/golf/thumbs/${name}.webp`;
const FULL = (name: string) => `/images/golf/photos/${name}.jpg`;
const ZIP = "/images/golf/polar26-golf-photos.zip";

export function GolfGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % GOLF_PHOTOS.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + GOLF_PHOTOS.length) % GOLF_PHOTOS.length,
      ),
    [],
  );

  // Keyboard navigation + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, next, prev]);

  return (
    <section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="max-w-3xl">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            Polar26 &middot; Event Photography
          </span>
          <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-display font-bold uppercase">
            {EVENT_TITLE}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {EVENT_INTRO}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={ZIP}
              download="Polar26-Golf-Photos.zip"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              Download all
            </a>
            <span className="text-sm text-muted-foreground">
              {GOLF_PHOTOS.length} photos
            </span>
          </div>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            On iPhone: tap the photo you want, press Download, then press and
            hold the image to get the &ldquo;Save Photo&rdquo; option.
          </p>
        </header>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {GOLF_PHOTOS.map((name, i) => (
            <div
              key={name}
              className="group relative aspect-[2/3] overflow-hidden bg-secondary cursor-pointer"
              onClick={() => setActive(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMB(name)}
                alt={`${EVENT_TITLE} photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              {/* Quick per-photo download */}
              <a
                href={FULL(name)}
                download={`${name}.jpg`}
                onClick={(e) => e.stopPropagation()}
                aria-label="Download this photo"
                className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 focus-visible:opacity-100"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          ))}
        </div>

        {/* Credit */}
        <div className="mt-20 border-t border-border pt-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
            Shot by Polar26
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 z-10 inline-flex h-11 w-11 items-center justify-center bg-secondary/70 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 z-10 inline-flex h-11 w-11 items-center justify-center bg-secondary/70 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>

          {/* Image + download */}
          <div
            className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FULL(GOLF_PHOTOS[active])}
              alt={`${EVENT_TITLE} photo ${active + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground tracking-[0.1em]">
                {active + 1} / {GOLF_PHOTOS.length}
              </span>
              <a
                href={FULL(GOLF_PHOTOS[active])}
                download={`${GOLF_PHOTOS[active]}.jpg`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
