# /brand/mcmassan — MC-Mässan 2027 varumärkesguide

Source spec: `~/Documents/Claude/Projects/Susan/McRF MC Mässan/brand-page-build/`
(`index.html` = 890-line static reference + `BUILD-NOTES.md` + final assets)

Target route: `polar26.com/brand/mcmassan`

## Approach

Port the static spec into the site's own conventions rather than dropping raw
HTML/CSS in: `page.tsx` (metadata + JSON-LD) + `mcmassan-content.tsx` (client),
Tailwind v4 with the MC tokens as CSS custom properties on the page root, and
the site's `useScrollReveal` in place of the spec's IntersectionObserver script.
Nothing in this repo uses CSS modules; a lone one here would drift.

## Steps

- [ ] 1. Copy assets
      - 10 images → `public/images/brand-mcmassan/`
      - `designer.otf` → `public/fonts/mcmassan/Designer.otf` (needs to be both
        a downloadable file and the page's display face)
- [ ] 2. Fonts, no external stylesheet
      - The spec `<link>`s fonts.googleapis.com. CSP in `next.config.ts` allows
        `style-src 'self'` only, so that link would be **blocked**. Use
        `next/font/google` (IBM Plex Sans/Mono) + `next/font/local` (Designer),
        both self-hosted at build → passes CSP, no config change.
      - Scope the font consts to the route so they don't load site-wide.
- [ ] 3. `src/app/brand/mcmassan/page.tsx`
      - Swedish metadata, canonical `https://polar26.com/brand/mcmassan`
      - `robots: { index: false, follow: false }` — partner-only guide, same
        treatment as `/byggmarkracing`
- [ ] 4. `src/app/brand/mcmassan/mcmassan-content.tsx` — 8 chapters, verbatim copy
      01 MC-Mässan (boilerplate) · 02 Logotyp · 03 Tagline · 04 Våra färger
      05 Typografi · 06 Bildspråk · 07 Tonalitet · 08 Kampanjmaterial
- [ ] 5. Swap the two Artifact-only behaviours (flagged in BUILD-NOTES)
      - Copy buttons: `navigator.clipboard.writeText` → keep as-is, works
      - Download buttons: `window.claude.use("downloads")` → plain
        `<a href="..." download>`, which is already the pattern in
        `src/app/brand/brand-content.tsx`. Drop the `hidden` attribute and the
        whole feature-detect IIFE — the links are always live on a real site.
- [ ] 6. `lang="sv"` on the page root (site root is `lang="en"`)
- [ ] 7. Verify: `npm run build` + `lint` clean, then dev server and a visual
      diff of every section against the original `index.html` in the browser,
      desktop + 375px. Check the font downloads actually deliver the file.
- [ ] 8. Commit. **Do not push** until Patrik has seen it — master auto-deploys
      to polar26.com via Vercel. Commit only the new files; leave the existing
      dirty `CLAUDE.md` / `tasks/lessons.md` / `docs/` / `_handoff.tgz` alone.

## Decisions taken (flag if wrong)

1. **Page chrome.** The spec has its own topbar and footer; this site puts a
   fixed Navbar and a Footer on every route via `PageShell`. Keeping both would
   collide (the topbar would sit under the fixed nav) and double the footer.
   → Fold the topbar's two lines ("MC-MÄSSAN 2027", "Varumärkesguide · Endast
   för partners") into the hero, which already carries logo + kicker + tagline.
   Keep the spec's footer strip as the page's last band, with the Polar26
   footer below it. Site nav stays, so partners can get back.
2. **Missing hero image.** The spec's hero CSS calls `bildsprak-portrait.jpg`,
   which was never shipped in the folder. `bildsprak-crop-v2.jpg` is the same
   photograph in a different crop and *is* shipped → use it for the hero.
3. **6px radii.** Polar26's own system is radius-0, but this page documents
   McRF's identity, not Polar26's. Carry the spec's radii over unchanged.
4. **Unapproved copy stays marked.** Boilerplate is still a draft pending
   Niklas Kristoffersson. Keep "Förslag, skall godkännas av Niklas" and both
   one-liner options (Alternativ A/B) exactly as the notes instruct.
5. **Campaign showcase is fixed.** Section 08 is 5 hard-coded posts, not a feed.

## Review

Built and verified. All 8 steps done.

**Files added**
- `src/app/brand/mcmassan/page.tsx` — metadata, noindex
- `src/app/brand/mcmassan/mcmassan-content.tsx` — the page
- `src/app/brand/mcmassan/fonts.ts` — route-scoped IBM Plex Sans/Mono + Designer
- `src/data/mcmassan.ts` — all copy, separated so the pending approval is a
  one-file edit
- `public/images/brand-mcmassan/*` (10 files), `public/fonts/mcmassan/Designer.otf`

**Two problems found that the build notes had not flagged**
1. The spec `<link>`s fonts.googleapis.com, but the CSP in `next.config.ts`
   allows `style-src 'self'` only. That stylesheet would have been blocked in
   production with no visible error, dropping the page to system fonts. All
   three faces now go through `next/font`, self-hosted, no CSP change.
2. `priority` on `<Image>` is deprecated in Next 16 (this repo is on 16.2.6);
   the parent `Web/CLAUDE.md` still tells you to use it. Hero uses `preload`.

**Verification**
- `tsc --noEmit` clean; `eslint` clean on all new files. The 8 problems
  `npm run lint` reports are pre-existing, in files this change does not touch.
- `npm run build` passes, `/brand/mcmassan` prerenders as static.
- Copy diffed mechanically against the spec: 486 of 489 words identical. The
  only delta is the spec's `<title>` text (now metadata) and the topbar moving
  below the hero. No copy dropped or reworded.
- All 4 downloads verified over HTTP: 200, correct content-type and length,
  filenames exactly as the spec's `data-filename` values.
- Copy buttons verified by click: label flips to "Kopierad!".
- Checked at 1440px and 375px, every section. No horizontal overflow.
- Reveal-on-scroll verified by sampling: hidden at rest, fades 0 → 1 with the
  translate easing when scrolled in.

**Deviations from the plan**
- The topbar was going to fold into the hero. At 375px that pushed the logo up
  into the bright part of the photo. Instead the topbar is intact as its own
  strip directly below the hero, and the hero matches the spec exactly.
- The spec's horizontal scrim darkens the right, where its desktop hero text
  sits; below `sm` the text flips left (also per spec), so the scrim is
  mirrored there to follow it.
- Did not use the shared `useScrollReveal`. See below.

**Flagged, not fixed — shared `useScrollReveal` under reduced motion**
`hooks/useScrollReveal.ts` hides its target with `gsap.set({opacity: 0})` and
un-hides it with a tween, while `lib/gsap-config.ts` calls
`gsap.globalTimeline.pause()` under `prefers-reduced-motion`. A paused global
timeline does not render its children, so those sections look like they would
stay at zero opacity for reduced-motion viewers — on `/`, `/about`,
`/causeframe` and anything else using the hook. Not verified on those pages and
not changed here: it is shared code, outside this page's scope, and the fix
wants its own visual pass. This page uses a local IntersectionObserver reveal
that keeps the spec's guarantee (visible unless JS has confirmed it can
animate). Worth a separate task.

> Resolved. See "Reduced-motion reveals" below. The hook itself turned out to
> be accidentally safe; the same root cause was breaking four other components.

**Not committed**: `.claude/launch.json` (dev-server convenience for Claude
Code sessions), plus the pre-existing dirty files, which were left alone.


# Reduced-motion reveals (shared GSAP config)

Follow-up to the item flagged during the `/brand/mcmassan` build.

## What was actually wrong

`lib/gsap-config.ts` called `gsap.globalTimeline.pause()` under
`prefers-reduced-motion`. A paused global timeline never renders its children,
so no tween runs, but the DOM those tweens were meant to change is left exactly
as it was. Anything already sitting at `opacity: 0` stays there forever.

Verified with Puppeteer against `next dev`, using
`page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])`,
scrolling each page top to bottom and then listing every element with a
non-trivial box, real text and computed opacity 0. Baseline run, before any
change:

- `/`: the four "4 P's" cards, permanently blank.
- `/about`: the three value cards and all five capability rows, blank.
- `/causeframe`: the three Ghana impact steps, blank.
- `/`: the pillar counters showed a full-opacity white `00` instead of their
  faint final number, found while fixing the above.

The suspect hook, `useScrollReveal`, was **not** broken: the pause also
swallows its `gsap.set()`, so its targets simply never got hidden. Correct by
accident, and it would have broken the moment the pause went away. Everything
that did break hides itself with a bare `opacity-0` class in the markup, which
the pause cannot swallow.

## Fix

- [x] `lib/gsap-config.ts`: dropped the global pause and the
      `ScrollTrigger.defaults({ animation: undefined })` that went with it.
      Exports `prefersReducedMotion()` as the one canonical check. A global
      kill switch that silences tweens without touching their DOM will keep
      breaking every reveal-shaped animation anyone adds later.
- [x] `globals.css`: added `.reveal-init`, a reveal start state that resolves
      to `opacity: 1` under reduced motion. Replaces bare `opacity-0` in the
      markup, so the content is safe from CSS alone, with no flash of visible
      content for everyone else.
- [x] Opted the previously unguarded call sites out explicitly, each leaving
      its element in the final visible state: `useScrollReveal`, `RevealText`,
      `Lightbox` (guard wraps only the tweens, the close-button focus still
      runs), `about-content` (ValueCard, CapabilityItem, bio paragraphs),
      `MarketingFramework` (PillarCard, FourPCard), `ghana-impact-steps`
      (StepCard). PillarCard also writes its final number, since the count-up
      tween is what used to set the text.
- [x] Left the eight components that already had their own `matchMedia` check
      alone. They were correct and stay correct without the pause.

## Review

- Re-ran the probe over all 12 routes in both modes. Reduced motion and normal
  motion now report an identical set of zero-opacity elements, and every one of
  them is a hover-revealed label that is meant to be hidden at rest.
- Frame-by-frame trace of a reveal on `/causeframe`: normal motion still starts
  at `opacity 0` with a 40px offset and eases in over ~700ms; reduced motion
  sits at `opacity 1`, `transform: none`, unchanged across 14 samples.
- Idle check on `/`, `/about`, `/causeframe`, `/contact` under reduced motion:
  no computed transform or opacity anywhere on the page changes, at rest or
  after scrolling. The decorative pulse dot on the connection lines is now
  correctly hidden rather than parked mid-track.
- Pillar counters under reduced motion now read `01`/`02`/`03` at 0.04 opacity.
- Screenshots of all three previously blank sections, reduced motion on: fully
  rendered.
- `npm run build` clean, 21 routes. `npx eslint` clean on all touched files.
  Console output identical in both modes (only the pre-existing dev-mode CSP
  `eval()` notice from Turbopack).
