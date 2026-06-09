"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Check, Copy, Download } from "lucide-react";
import { EmailSignature } from "@/components/brand/EmailSignature";

const COLORS = [
	{ hex: "#BDFF00", name: "Polar Lime", role: "Signature accent" },
	{ hex: "#0A0A0A", name: "Ink", role: "Primary background" },
	{ hex: "#121212", name: "Surface", role: "Cards / elevated" },
	{ hex: "#262626", name: "Edge", role: "Borders / dividers" },
	{ hex: "#9A9A9A", name: "Body", role: "Secondary text" },
	{ hex: "#FAFAFA", name: "Pure", role: "Headlines / on-dark" },
] as const;

const TYPOGRAPHY = [
	{
		key: "display",
		label: "Display \u00B7 Headlines",
		sample: "FROM BRAND TO BUSINESS.",
		meta: "Syne \u00B7 Extra Bold 800 \u00B7 ALL CAPS \u00B7 -2% tracking",
		fontClass: "font-display font-extrabold uppercase",
		sizeClass: "text-3xl sm:text-4xl leading-none tracking-[-0.02em]",
		stack: "Syne, system-ui, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
	},
	{
		key: "body",
		label: "Body \u00B7 Long-form",
		sample:
			"Bold ideas deserve bold execution. We push creative boundaries because that is where the magic happens, and we obsess over the details that separate good from unforgettable.",
		meta: "Space Grotesk \u00B7 Medium 500 / Regular 400 \u00B7 Sentence case",
		fontClass: "font-body font-medium",
		sizeClass: "text-base leading-relaxed",
		stack:
			"'Space Grotesk', system-ui, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
	},
] as const;

const VALUES = [
	{
		num: "01",
		title: "Bold Over Safe",
		body: "Playing it safe is the riskiest thing a brand can do. We push creative boundaries because that is where the magic happens.",
	},
	{
		num: "02",
		title: "Strategy Meets Story",
		body: "Every project starts with a clear strategy. Then we wrap it in a story that makes people feel something.",
	},
	{
		num: "03",
		title: "Every Action Matters",
		body: "From the negotiating table to the final deadline, nothing is wasted. We move fast, decide sharply, and make every action count.",
	},
] as const;

const VOICE_DO = [
	"From brand to business.",
	"Position your brand to win.",
	"From athlete to icon.",
	"Speak to your audience.",
	"No fluff. Just a real conversation.",
] as const;

const VOICE_DONT = [
	"Synergies, leverage, ideation.",
	"We\u2019re a passionate team of creatives\u2026",
	"Award-winning, world-class, best-in-class.",
	"Cookie-cutter campaigns or recycled decks.",
	"Anything a boardroom would write.",
] as const;

const LOGO_VARIANTS = [
	{
		key: "lime",
		label: "Primary",
		note: "Default on dark backgrounds",
		swatchClass: "bg-[#0A0A0A]",
		previewSrc: "/brand-assets/polar26-logo-lime.png",
		png: "/brand-assets/polar26-logo-lime.png",
		svg: "/brand-assets/polar26-logo-lime.svg",
		zip: "/brand-assets/polar26-logo-lime.zip",
	},
	{
		key: "white",
		label: "Mono \u00B7 Light",
		note: "For dark photography & video",
		swatchClass: "bg-[#262626]",
		previewSrc: "/brand-assets/polar26-logo-white.png",
		png: "/brand-assets/polar26-logo-white.png",
		svg: "/brand-assets/polar26-logo-white.svg",
		zip: "/brand-assets/polar26-logo-white.zip",
	},
	{
		key: "black",
		label: "Mono \u00B7 Dark",
		note: "For light backgrounds & print",
		swatchClass: "bg-[#FAFAFA]",
		previewSrc: "/brand-assets/polar26-logo-black.png",
		png: "/brand-assets/polar26-logo-black.png",
		svg: "/brand-assets/polar26-logo-black.svg",
		zip: "/brand-assets/polar26-logo-black.zip",
	},
] as const;

const MARK_VARIANTS = [
	{
		key: "natural",
		label: "Natural",
		note: "Full-tone illustration",
		swatchClass: "bg-[#0A0A0A]",
		previewSrc: "/brand-assets/polar26-mark-natural.png",
		png: "/brand-assets/polar26-mark-natural.png",
		svg: null,
		zip: "/brand-assets/polar26-mark-natural.zip",
	},
	{
		key: "lime",
		label: "Lime",
		note: "Silhouette on dark",
		swatchClass: "bg-[#0A0A0A]",
		previewSrc: "/brand-assets/polar26-mark-lime.png",
		png: "/brand-assets/polar26-mark-lime.png",
		svg: "/brand-assets/polar26-mark-lime.svg",
		zip: "/brand-assets/polar26-mark-lime.zip",
	},
	{
		key: "white",
		label: "Mono \u00B7 Light",
		note: "For dark photography & video",
		swatchClass: "bg-[#262626]",
		previewSrc: "/brand-assets/polar26-mark-white.png",
		png: "/brand-assets/polar26-mark-white.png",
		svg: "/brand-assets/polar26-mark-white.svg",
		zip: "/brand-assets/polar26-mark-white.zip",
	},
	{
		key: "black",
		label: "Mono \u00B7 Dark",
		note: "For light backgrounds & print",
		swatchClass: "bg-[#FAFAFA]",
		previewSrc: "/brand-assets/polar26-mark-black.png",
		png: "/brand-assets/polar26-mark-black.png",
		svg: "/brand-assets/polar26-mark-black.svg",
		zip: "/brand-assets/polar26-mark-black.zip",
	},
] as const;

const PROCESS = [
	{
		num: "01",
		phase: "Research",
		name: "Insight",
		body: "Market, audience, competitor. Before a single pixel.",
	},
	{
		num: "02",
		phase: "Strategy",
		name: "Direction",
		body: "Positioning, roadmap, channels. Every choice has a reason.",
	},
	{
		num: "03",
		phase: "Communication",
		name: "Execution",
		body: "Visual identity, campaigns, the work people remember.",
	},
	{
		num: "04",
		phase: "Launch & Evolve",
		name: "Impact",
		body: "Go-live, measure, optimise. We do not disappear.",
	},
] as const;

const BOILERPLATE = [
	{
		key: "oneliner",
		label: "One-liner",
		text: "Polar26 is a creative agency that grows businesses through sharp strategy and striking content.",
	},
	{
		key: "tagline",
		label: "Tagline",
		text: "From brand to business.",
	},
	{
		key: "short",
		label: "Short bio",
		text: "Polar26 is a Swedish creative agency specializing in brand activation, product strategy, athlete management, and content production. We help brands stand out and grow.",
	},
	{
		key: "long",
		label: "Long bio",
		text: "Polar26 is a full-service creative agency built on the belief that great work comes from the intersection of strategy and raw creative energy. From brand activation and product strategy to athlete management and content production, we help brands stand out and grow. Founded by Patrik Nordstrom, we work with clients across motorsport, lifestyle, and consumer goods, bringing a perspective no boardroom can replicate.",
	},
] as const;

const TEMPLATES = [
	{
		name: "Report",
		note: "Branded report / proposal document",
		format: "DOCX",
		href: "",
	},
	{
		name: "Pitch Deck",
		note: "Presentation template, on-brand slides",
		format: "PPTX",
		href: "",
	},
	{
		name: "Letterhead",
		note: "Official letterhead for documents",
		format: "DOCX",
		href: "",
	},
] as const;

export function BrandPageContent() {
	const [toast, setToast] = useState<string | null>(null);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);

	const copy = useCallback(async (text: string, key: string, toastMsg: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedKey(key);
			setToast(toastMsg);
		} catch {
			// Fallback for environments without clipboard permission
			try {
				const ta = document.createElement("textarea");
				ta.value = text;
				ta.style.position = "fixed";
				ta.style.opacity = "0";
				document.body.appendChild(ta);
				ta.select();
				document.execCommand("copy");
				document.body.removeChild(ta);
				setCopiedKey(key);
				setToast(toastMsg);
			} catch {
				setToast("Copy failed");
			}
		}
	}, []);

	useEffect(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(null), 1600);
		return () => clearTimeout(t);
	}, [toast]);

	useEffect(() => {
		if (!copiedKey) return;
		const t = setTimeout(() => setCopiedKey(null), 900);
		return () => clearTimeout(t);
	}, [copiedKey]);

	return (
		<>
			{/* HERO */}
			<section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Brand Sheet &middot; v1 &middot; 2026
					</span>
					<h1 className="mt-4 text-[clamp(2.5rem,9vw,8rem)] font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.9]">
						From Brand
						<br />
						<span className="text-polar-lime">To Business.</span>
					</h1>
					<p className="mt-8 text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
						A full-service creative agency that{" "}
						<span className="text-polar-lime">grows businesses</span>, through sharp strategy,
						striking visual content, and a perspective no boardroom can replicate.
					</p>
					<p className="mt-4 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
						Born from the field &middot; Built for bold brands
					</p>
				</div>
			</section>

			{/* COLOR PALETTE */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Color Palette
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Colors
					</h2>
					<div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
						{COLORS.map((c) => {
							const key = `color-${c.hex}`;
							const isCopied = copiedKey === key;
							return (
								<button
									key={c.hex}
									type="button"
									onClick={() => copy(c.hex, key, `${c.name} ${c.hex} copied`)}
									aria-label={`Copy ${c.name} hex value ${c.hex}`}
									className={`group relative text-left border bg-card transition-all duration-150 hover:-translate-y-0.5 ${
										isCopied ? "border-polar-lime" : "border-white/10 hover:border-polar-lime"
									}`}
								>
									<div
										className="h-20 border-b border-white/[0.06]"
										style={{ background: c.hex }}
									/>
									<div className="p-3">
										<div className="text-[11px] font-display font-bold uppercase tracking-[0.14em] text-foreground">
											{c.name}
										</div>
										<div className="mt-0.5 text-xs text-muted-foreground font-mono tracking-wider">
											{c.hex}
										</div>
										<div className="mt-1 text-[10px] text-muted-foreground">{c.role}</div>
									</div>
									<span
										className={`absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 transition-opacity ${
											isCopied
												? "bg-polar-lime text-background opacity-100"
												: "bg-black/60 text-foreground opacity-0 group-hover:opacity-100"
										}`}
									>
										{isCopied ? (
											<Check className="h-3 w-3" strokeWidth={3} />
										) : (
											<Copy className="h-3 w-3" strokeWidth={2.5} />
										)}
										{isCopied ? "Copied" : "Copy"}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* TYPOGRAPHY + VALUES */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16">
						{/* Typography column */}
						<div>
							<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
								Typography
							</span>
							<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
								Type System
							</h2>
							<div className="mt-10 space-y-4">
								{TYPOGRAPHY.map((t) => {
									const key = `type-${t.key}`;
									const isCopied = copiedKey === key;
									return (
										<button
											key={t.key}
											type="button"
											onClick={() => copy(t.stack, key, "Font stack copied")}
											aria-label={`Copy ${t.label} font stack`}
											className={`w-full text-left block border bg-card p-5 transition-colors ${
												isCopied ? "border-polar-lime" : "border-white/10 hover:border-polar-lime"
											}`}
										>
											<div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
												{t.label}
											</div>
											<div className={`${t.fontClass} ${t.sizeClass}`}>{t.sample}</div>
											<div className="mt-4 flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
												<span className="flex-1 min-w-0 truncate">{t.meta}</span>
												<span
													className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 border ${
														isCopied
															? "bg-polar-lime text-background border-polar-lime"
															: "border-white/10 text-muted-foreground"
													}`}
												>
													{isCopied ? "Copied" : "Copy stack"}
												</span>
											</div>
										</button>
									);
								})}
							</div>
						</div>

						{/* Values column */}
						<div>
							<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
								Way of Thinking
							</span>
							<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
								Values
							</h2>
							<div className="mt-10 space-y-3">
								{VALUES.map((v) => (
									<div key={v.num} className="border border-white/10 bg-card p-5">
										<div className="font-display font-bold text-polar-lime text-xs tracking-[0.18em]">
											{v.num} &middot; {v.title.toUpperCase()}
										</div>
										<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
											{v.body}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* VOICE & TONE */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Voice &amp; Tone
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						How We Speak
					</h2>
					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* We Say */}
						<div className="border border-white/10 bg-card p-6">
							<div className="flex items-center gap-3 mb-5">
								<span className="h-2.5 w-2.5 rounded-full bg-polar-lime" />
								<span className="font-display font-bold text-sm tracking-[0.18em] uppercase">
									We Say
								</span>
							</div>
							<ul className="space-y-1.5">
								{VOICE_DO.map((phrase) => {
									const key = `say-${phrase}`;
									const isCopied = copiedKey === key;
									return (
										<li key={phrase}>
											<button
												type="button"
												onClick={() => copy(phrase, key, "Phrase copied")}
												aria-label={`Copy phrase: ${phrase}`}
												className={`w-full text-left text-sm leading-snug px-3 py-2 border transition-colors ${
													isCopied
														? "border-polar-lime bg-polar-lime/[0.08]"
														: "border-transparent hover:border-white/10 hover:bg-polar-lime/[0.04]"
												}`}
											>
												<span className="text-polar-lime font-bold">&ldquo;</span>
												{phrase}
												<span className="text-polar-lime font-bold">&rdquo;</span>
											</button>
										</li>
									);
								})}
							</ul>
						</div>

						{/* We Don't Say */}
						<div className="border border-white/10 bg-card p-6">
							<div className="flex items-center gap-3 mb-5">
								<span className="h-2.5 w-2.5 rounded-full bg-[#FF5A5A]" />
								<span className="font-display font-bold text-sm tracking-[0.18em] uppercase">
									We Don&rsquo;t Say
								</span>
							</div>
							<ul className="space-y-1.5">
								{VOICE_DONT.map((phrase) => (
									<li
										key={phrase}
										className="text-sm leading-snug px-3 py-2 text-foreground/90"
									>
										<span className="text-[#FF5A5A] font-bold">&ldquo;</span>
										{phrase}
										<span className="text-[#FF5A5A] font-bold">&rdquo;</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* BOILERPLATE */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Messaging
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Boilerplate
					</h2>
					<p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
						Approved copy for bios, intros, and press. Click any block to copy.
					</p>
					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
						{BOILERPLATE.map((b) => {
							const key = `bp-${b.key}`;
							const isCopied = copiedKey === key;
							return (
								<button
									key={b.key}
									type="button"
									onClick={() => copy(b.text, key, `${b.label} copied`)}
									aria-label={`Copy ${b.label}`}
									className={`group text-left border bg-card p-5 transition-colors ${
										isCopied ? "border-polar-lime" : "border-white/10 hover:border-polar-lime"
									}`}
								>
									<div className="flex items-center justify-between mb-3">
										<span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
											{b.label}
										</span>
										<span
											className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 border ${
												isCopied
													? "bg-polar-lime text-background border-polar-lime"
													: "border-white/10 text-muted-foreground"
											}`}
										>
											{isCopied ? (
												<Check className="h-3 w-3" strokeWidth={3} />
											) : (
												<Copy className="h-3 w-3" strokeWidth={2.5} />
											)}
											{isCopied ? "Copied" : "Copy"}
										</span>
									</div>
									<p className="text-sm text-foreground/90 leading-relaxed">{b.text}</p>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* LOGO & ELEMENTS */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div>
						<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
							Logo &amp; Elements
						</span>
						<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
							Download Assets
						</h2>
						<p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
							Wordmark &amp; symbol in multiple colour treatments. SVG for web &amp; screen, PNG at 1x / 2x / 4x for everything else. Grab the ZIP for the full set.
						</p>
					</div>

					{/* Wordmark */}
					<div className="mt-12">
						<div className="flex items-baseline justify-between gap-4 flex-wrap">
							<h3 className="font-display font-extrabold uppercase text-base tracking-[0.12em]">
								Wordmark
							</h3>
							<span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
								Primary lockup
							</span>
						</div>
						<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
							{LOGO_VARIANTS.map((v) => (
								<div
									key={`logo-${v.key}`}
									className="group bg-card border border-white/10 flex flex-col"
								>
									<div
										className={`${v.swatchClass} relative aspect-[320/140] flex items-center justify-center p-10 overflow-hidden`}
									>
										<Image
											src={v.previewSrc}
											alt={`Polar26 wordmark, ${v.label}`}
											width={640}
											height={172}
											className="w-full max-w-[220px] h-auto object-contain"
											unoptimized
										/>
									</div>
									<div className="p-5 border-t border-white/[0.06] flex flex-col gap-4">
										<div>
											<div className="font-display font-extrabold uppercase text-sm tracking-[0.04em]">
												{v.label}
											</div>
											<div className="mt-1 text-xs text-muted-foreground leading-snug">
												{v.note}
											</div>
										</div>
										<div className="grid grid-cols-3 gap-2">
											<a
												href={v.svg}
												download
												className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-display font-bold tracking-[0.12em] uppercase border border-white/10 hover:border-polar-lime hover:text-polar-lime transition-colors"
											>
												<Download size={12} aria-hidden="true" /> SVG
											</a>
											<a
												href={v.png}
												download
												className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-display font-bold tracking-[0.12em] uppercase border border-white/10 hover:border-polar-lime hover:text-polar-lime transition-colors"
											>
												<Download size={12} aria-hidden="true" /> PNG
											</a>
											<a
												href={v.zip}
												download
												className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-display font-bold tracking-[0.12em] uppercase bg-polar-lime/10 text-polar-lime border border-polar-lime/30 hover:bg-polar-lime hover:text-background transition-colors"
											>
												<Download size={12} aria-hidden="true" /> ZIP
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Symbol / Mark */}
					<div className="mt-12">
						<div className="flex items-baseline justify-between gap-4 flex-wrap">
							<h3 className="font-display font-extrabold uppercase text-base tracking-[0.12em]">
								Symbol
							</h3>
							<span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
								Standalone mark
							</span>
						</div>
						<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
							{MARK_VARIANTS.map((v) => (
								<div
									key={`mark-${v.key}`}
									className="group bg-card border border-white/10 flex flex-col"
								>
									<div
										className={`${v.swatchClass} relative aspect-square flex items-center justify-center p-8 overflow-hidden`}
									>
										<Image
											src={v.previewSrc}
											alt={`Polar26 symbol, ${v.label}`}
											width={600}
											height={378}
											className="w-full max-w-[140px] h-auto object-contain"
											unoptimized
										/>
									</div>
									<div className="p-4 border-t border-white/[0.06] flex flex-col gap-3">
										<div>
											<div className="font-display font-extrabold uppercase text-sm tracking-[0.04em]">
												{v.label}
											</div>
											<div className="mt-1 text-[11px] text-muted-foreground leading-snug">
												{v.note}
											</div>
										</div>
										<div className={`grid ${v.svg ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
											{v.svg && (
												<a
													href={v.svg}
													download
													className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-display font-bold tracking-[0.1em] uppercase border border-white/10 hover:border-polar-lime hover:text-polar-lime transition-colors"
												>
													<Download size={11} aria-hidden="true" /> SVG
												</a>
											)}
											<a
												href={v.png}
												download
												className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-display font-bold tracking-[0.1em] uppercase border border-white/10 hover:border-polar-lime hover:text-polar-lime transition-colors"
											>
												<Download size={11} aria-hidden="true" /> PNG
											</a>
											<a
												href={v.zip}
												download
												className="flex items-center justify-center gap-1 px-2 py-2 text-[10px] font-display font-bold tracking-[0.1em] uppercase bg-polar-lime/10 text-polar-lime border border-polar-lime/30 hover:bg-polar-lime hover:text-background transition-colors"
											>
												<Download size={11} aria-hidden="true" /> ZIP
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<p className="mt-8 text-[11px] text-white/30 leading-relaxed max-w-xl">
						Vector files are auto-traced from the master PNG, fine for web &amp; screen use, pixel-perfect only at screen scale. For large-format print or merch, request the native vector from hello@polar26.com.
					</p>
				</div>
			</section>

			{/* STICKERS */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Merch &amp; Extras
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Stickers
					</h2>
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-[16rem_1fr] gap-6 items-center border border-white/10 bg-card p-6 max-w-3xl">
						<div className="aspect-[3/2] bg-[#0A0A0A] flex items-center justify-center p-6 overflow-hidden">
							<Image
								src="/brand-assets/stickers/patrik-pov_sticker_regular_lime-pov.png"
								alt="Polar26 sticker example"
								width={400}
								height={267}
								className="w-full h-auto max-h-full object-contain"
								unoptimized
							/>
						</div>
						<div className="flex flex-col gap-4">
							<p className="text-sm text-muted-foreground leading-relaxed">
								A full sticker set in PNG, SVG and PDF. Eleven designs across
								wordmark, signature, and viewfinder styles, in lime and mono.
							</p>
							<a
								href="/brand-assets/stickers/patrik-pov-stickers.zip"
								download
								className="self-start inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-display font-bold tracking-[0.12em] uppercase bg-polar-lime/10 text-polar-lime border border-polar-lime/30 hover:bg-polar-lime hover:text-background transition-colors"
							>
								<Download size={13} aria-hidden="true" /> Download pack (ZIP)
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* EMAIL SIGNATURE */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Tools
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Email Signature
					</h2>
					<p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
						Generate a consistent, on-brand signature for the whole team in
						seconds.
					</p>
					<div className="mt-10">
						<EmailSignature />
					</div>
				</div>
			</section>

			{/* TEMPLATES */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Documents
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Templates
					</h2>
					<p className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
						Ready-to-use document templates so everything your team sends stays
						on-brand.
					</p>
					<div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
						{TEMPLATES.map((t) => (
							<div key={t.name} className="bg-card border border-white/10 p-6 flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="font-display font-extrabold uppercase text-lg tracking-[0.04em]">
										{t.name}
									</div>
									<span className="text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1">
										{t.format}
									</span>
								</div>
								<p className="text-xs text-muted-foreground leading-snug flex-1">
									{t.note}
								</p>
								{t.href ? (
									<a
										href={t.href}
										download
										className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] font-display font-bold tracking-[0.12em] uppercase bg-polar-lime/10 text-polar-lime border border-polar-lime/30 hover:bg-polar-lime hover:text-background transition-colors"
									>
										<Download size={13} aria-hidden="true" /> Download
									</a>
								) : (
									<a
										href="mailto:hello@polar26.com?subject=Template%20request"
										className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] font-display font-bold tracking-[0.12em] uppercase border border-white/10 text-muted-foreground hover:border-polar-lime hover:text-polar-lime transition-colors"
									>
										Request
									</a>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* HOW WE WORK */}
			<section className="py-16 sm:py-24 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						How We Work
					</span>
					<h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-display font-bold uppercase">
						Process
					</h2>
					<div className="mt-10 grid grid-cols-1 lg:grid-cols-4 border border-white/10 bg-card">
						{PROCESS.map((s, i) => (
							<div
								key={s.num}
								className={`p-6 ${i > 0 ? "border-t lg:border-t-0 border-white/[0.06]" : ""} ${
									i < PROCESS.length - 1 ? "lg:border-r lg:border-white/[0.06]" : ""
								}`}
							>
								<div className="font-display font-bold text-polar-lime text-[11px] tracking-[0.2em]">
									{s.num} &middot; {s.phase.toUpperCase()}
								</div>
								<div className="mt-2 font-display font-extrabold uppercase text-lg tracking-[0.04em]">
									{s.name}
								</div>
								<div className="mt-3 text-sm text-muted-foreground leading-relaxed">
									{s.body}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* TOAST */}
			<div
				aria-live="polite"
				className={`fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-50 transition-all duration-200 ${
					toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
				}`}
			>
				<div className="bg-polar-lime text-background font-display font-extrabold text-xs tracking-[0.1em] uppercase px-4 py-3 shadow-[0_10px_30px_rgba(189,255,0,0.25)]">
					{toast ?? ""}
				</div>
			</div>
		</>
	);
}
