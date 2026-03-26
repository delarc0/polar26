# POLAR26

**Creative agency website for Polar26 — videography, brand strategy, and content that cuts through the noise.**

[polar26.com](https://polar26.com)

---

## Overview

Polar26 is a Sweden-based creative agency founded by Patrik Nordstrom. This is the agency's portfolio and brand site — a dark, high-energy experience built to match the work: bold, cinematic, and impossible to scroll past.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| UI Primitives | shadcn/ui |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Deployment | Vercel |
| Language | TypeScript 5 (strict) |

## Features

- **GSAP-driven animations** — scroll-triggered reveals, parallax layers, horizontal scroll pinning, clip-path wipes, number counters, and magnetic button effects
- **Lenis smooth scrolling** — silky scroll with GSAP ScrollTrigger sync
- **Film grain overlay** — SVG noise texture for cinematic texture
- **Horizontal scroll services** — pinned section with cards that scroll sideways
- **Fullscreen lightbox** — keyboard-navigable gallery with GSAP entrance animations
- **Scroll-reactive marquee** — client logos that speed up and slow down with scroll velocity
- **Floating label forms** — CSS-only animated input labels
- **Comprehensive SEO** — sitemap, robots.txt, Open Graph, JSON-LD structured data
- **Security hardened** — CSP headers, HSTS, XSS protection, input sanitization
- **Accessible** — `prefers-reduced-motion` support, focus states, semantic HTML, ARIA labels
- **Dark-only design** — sharp edges, zero border-radius, neon lime (#BDFF00) accent

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero video, services, marketing framework, photo grid, about preview |
| `/about` | Founder story, values, capabilities list |
| `/work` | Portfolio grid with hover reveals |
| `/contact` | Floating label contact form (Resend integration) |

## Design System

**Typography** — Syne (display/headings) + Space Grotesk (body)

**Palette**
| Token | Value | Usage |
|-------|-------|-------|
| `polar-lime` | `#BDFF00` | Accent, CTAs, highlights |
| `background` | `#0A0A0A` | Page background |
| `foreground` | `#FAFAFA` | Primary text |
| `card` | `#121212` | Card surfaces |
| `border` | `rgba(255,255,255,0.06)` | Subtle dividers |

**Rules** — All uppercase headings. Zero border-radius. Tight letter-spacing. Everything sharp.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```
RESEND_API_KEY=       # Required for contact form
```

## Project Structure

```
src/
├── app/              # Routes + layouts + API
├── components/
│   ├── home/         # Hero, Services, PhotoGrid, MarketingFramework, ...
│   ├── layout/       # Navbar, Footer, PageShell
│   ├── shared/       # RevealText, Lightbox, Marquee
│   ├── providers/    # SmoothScrollProvider (Lenis)
│   └── ui/           # shadcn primitives
├── data/             # Static content (site, services, projects, gallery)
├── hooks/            # useScrollReveal, useMagnetic
└── lib/              # GSAP config, utils, fonts, sanitize
```

## Deployment

Auto-deploys to Vercel on push to `main`.

---

Built by [LAB37](https://lab37.io)
