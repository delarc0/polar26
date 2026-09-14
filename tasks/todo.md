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

**Not committed**: `.claude/launch.json` (dev-server convenience for Claude
Code sessions), plus the pre-existing dirty files, which were left alone.
