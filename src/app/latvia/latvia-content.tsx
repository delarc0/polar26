"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LATVIA_PHOTOS } from "@/data/latviaPhotos";

/* -------------------------------------------------------------------------- */
/*  Edit these two lines to change the event name / intro shown on the page.   */
const EVENT_TITLE = "Latvia";
const EVENT_INTRO =
  "Photos from the day. Browse below and save the ones you like.";
/* -------------------------------------------------------------------------- */

const THUMB = (name: string) => `/images/latvia/thumbs/${name}.webp`;
const FULL = (name: string) => `/images/latvia/photos/${name}.jpg`;

export function LatviaGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % LATVIA_PHOTOS.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + LATVIA_PHOTOS.length) % LATVIA_PHOTOS.length,
      ),
    [],
  );

  // Save a single photo. On iPhone/iPad this opens the native share sheet
  // (with a one-tap "Save Image" to Photos). On desktop it downloads the file.
  const savePhoto = useCallback(async (name: string) => {
    const url = FULL(name);
    const filename = `${name}.jpg`;
    let blob: Blob;
    try {
      const res = await fetch(url);
      blob = await res.blob();
    } catch {
      window.location.href = url; // last resort
      return;
    }
    const file = new File([blob], filename, {
      type: blob.type || "image/jpeg",
    });

    // Mobile (iOS/Android): native share sheet -> "Save Image" / "Save to Photos".
    const nav = navigator as Navigator & {
      canShare?: (data?: unknown) => boolean;
    };
    if (nav.canShare && nav.canShare({ files: [file] })) {
      try {
        await nav.share({ files: [file] });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        // otherwise fall through to a normal download
      }
    }

    // Desktop / unsupported: trigger a standard download.
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objUrl), 1000);
  }, []);

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
            Polar26 &middot; Creative Agency
          </span>
          <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-display font-bold uppercase">
            {EVENT_TITLE}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {EVENT_INTRO}
          </p>

          <p className="mt-8 text-sm font-medium tracking-[0.1em] uppercase text-muted-foreground">
            {LATVIA_PHOTOS.length} photos
          </p>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            On iPhone: tap a photo, press Save photo, then choose &ldquo;Save
            Image&rdquo; to send it straight to your Photos.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Photographer: Patrik Nordström &middot;{" "}
            <a
              href="https://www.instagram.com/patrik.pov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-polar-lime transition-colors"
            >
              @patrik.pov
            </a>
          </p>
        </header>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {LATVIA_PHOTOS.map((name, i) => (
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
              {/* Quick per-photo download / save */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  savePhoto(name);
                }}
                aria-label="Save this photo"
                className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center bg-background/80 text-foreground opacity-100 backdrop-blur-sm transition-opacity duration-200 hover:bg-primary hover:text-primary-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
              </button>
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
              src={FULL(LATVIA_PHOTOS[active])}
              alt={`${EVENT_TITLE} photo ${active + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground tracking-[0.1em]">
                {active + 1} / {LATVIA_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={() => savePhoto(LATVIA_PHOTOS[active])}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" strokeWidth={2} />
                Save photo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
