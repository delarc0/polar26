"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { mcDisplay, mcMono, mcSans } from "./fonts";
import {
	BOILERPLATE,
	CAMPAIGN,
	COLORS,
	IMAGERY,
	LOGO_NOTE,
	LOGOS,
	MCMASSAN,
	TAGLINE_NOTE,
	TYPOGRAPHY,
	VOICE,
} from "@/data/mcmassan";

/**
 * MC-Mässan 2027 brand guide.
 *
 * This page documents McRF's identity, not Polar26's, so it deliberately runs
 * its own token set (charcoal / Mässröd / white, 6px radii) instead of the
 * site's lime-on-black, radius-0 system. Tokens are declared once on the root
 * element as `--mc-*` custom properties and never leak past it.
 */

const WRAP = "mx-auto w-full max-w-[1180px] px-6";
const MONO = "font-[family-name:var(--mc-mono)]";
const DISPLAY = "font-[family-name:var(--mc-display)]";
const LEDE = "max-w-[62ch] text-[1.05rem] text-[var(--mc-paper-dim)]";
const PANEL = "rounded-[6px] border border-[var(--mc-line)] bg-[var(--mc-ink-deep)]";
const LABEL = `${MONO} text-[11px] uppercase tracking-[0.12em] text-[var(--mc-fog)]`;
const BUTTON =
	"rounded-[3px] border border-[var(--mc-line)] transition-colors hover:border-[var(--mc-red)] hover:text-[var(--mc-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mc-red)]";
const DOWNLOAD = `${MONO} ${BUTTON} inline-block px-4 py-[10px] text-xs uppercase tracking-[0.06em] text-[var(--mc-paper)]`;

const MC_TOKENS = {
	"--mc-ink": "#221F20",
	"--mc-ink-deep": "#171516",
	"--mc-red": "#C01A32",
	"--mc-red-deep": "#7A0F20",
	"--mc-paper": "#FFFFFF",
	"--mc-paper-dim": "#E7E2DF",
	"--mc-fog": "#8C8184",
	"--mc-line": "rgba(231, 226, 223, 0.14)",
} as React.CSSProperties;

function Chapter({
	num,
	id,
	title,
	children,
}: {
	num: string;
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	// The site's shared reveal. It leaves content visible under
	// prefers-reduced-motion, which is the guarantee the source spec made.
	const ref = useScrollReveal<HTMLElement>({ y: 18, duration: 0.6 });

	return (
		<section
			ref={ref}
			id={id}
			className="border-b border-[var(--mc-line)] py-[76px] last:border-b-0"
		>
			<div className="mb-[34px] flex items-baseline gap-[14px]">
				<span className={`${MONO} text-[13px] tracking-[0.08em] text-[var(--mc-red)]`}>
					{num}
				</span>
				<h2 className="text-2xl font-semibold uppercase tracking-[0.02em] text-[var(--mc-paper)]">
					{title}
				</h2>
			</div>
			{children}
		</section>
	);
}

function CopyButton({ text }: { text: string }) {
	const [label, setLabel] = useState("Kopiera");

	const onCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(text);
			setLabel("Kopierad!");
		} catch {
			// Same fallback the Polar26 brand page uses, for browsers that refuse
			// clipboard permission.
			try {
				const ta = document.createElement("textarea");
				ta.value = text;
				ta.style.position = "fixed";
				ta.style.opacity = "0";
				document.body.appendChild(ta);
				ta.select();
				document.execCommand("copy");
				document.body.removeChild(ta);
				setLabel("Kopierad!");
			} catch {
				setLabel("Kunde inte kopiera");
			}
		}
		setTimeout(() => setLabel("Kopiera"), 1500);
	}, [text]);

	return (
		<button
			type="button"
			onClick={onCopy}
			className={`${MONO} ${BUTTON} shrink-0 px-[10px] py-[6px] text-[11px] uppercase tracking-[0.06em] text-[var(--mc-fog)]`}
		>
			{label}
		</button>
	);
}

export function McMassanContent() {
	return (
		<div
			lang="sv"
			style={MC_TOKENS}
			className={`${mcSans.variable} ${mcMono.variable} ${mcDisplay.variable} bg-[var(--mc-ink)] font-[family-name:var(--mc-sans)] text-base leading-relaxed text-[var(--mc-paper-dim)] [&_::selection]:bg-[var(--mc-red)] [&_::selection]:text-[var(--mc-paper)]`}
		>
			{/* ---------- hero ---------- */}
			<header className="relative flex min-h-[340px] items-end overflow-hidden bg-black sm:min-h-[420px]">
				<Image
					src={MCMASSAN.hero.src}
					alt={MCMASSAN.hero.alt}
					fill
					preload
					sizes="100vw"
					className="object-cover object-[35%_center]"
				/>
				{/*
				  The spec's scrim darkens the right, where its desktop hero text
				  sits. Below sm the text flips to the left (also per spec), so the
				  horizontal half of the scrim is mirrored to follow it.
				*/}
				<div
					aria-hidden
					className="absolute inset-0 bg-[linear-gradient(270deg,rgba(23,21,22,0.15)_0%,rgba(23,21,22,0.55)_42%,rgba(23,21,22,0.92)_100%),linear-gradient(0deg,rgba(23,21,22,0.85)_0%,rgba(23,21,22,0.1)_55%)] sm:bg-[linear-gradient(90deg,rgba(23,21,22,0.15)_0%,rgba(23,21,22,0.55)_42%,rgba(23,21,22,0.92)_100%),linear-gradient(0deg,rgba(23,21,22,0.85)_0%,rgba(23,21,22,0.1)_55%)]"
				/>
				<div
					className={`${WRAP} relative flex flex-col items-start gap-[14px] pb-7 pt-24 text-left sm:items-end sm:pb-10 sm:pt-32 sm:text-right`}
				>
					<Image
						src={LOGOS[0].src}
						alt="MC Mässan 2027"
						width={LOGOS[0].width}
						height={LOGOS[0].height}
						preload
						sizes="108px"
						className="mb-2 h-auto w-[108px]"
					/>
					<span
						className={`${MONO} text-xs uppercase tracking-[0.16em] text-[var(--mc-fog)]`}
					>
						{MCMASSAN.venue}
					</span>
					<h1
						className={`${DISPLAY} max-w-[14ch] text-balance text-[clamp(2.6rem,7vw,5.2rem)] font-normal leading-[0.98] tracking-[0.01em] text-[var(--mc-paper)]`}
					>
						{MCMASSAN.tagline}
					</h1>
				</div>
			</header>

			{/*
			  The source spec ran this strip above the hero. The site's Navbar is
			  fixed and would sit on top of it there, so it moves directly below
			  instead, where it still reads as the guide's context bar.
			*/}
			<div className="border-b border-[var(--mc-line)]">
				<div
					className={`${WRAP} flex flex-wrap items-center justify-between gap-4 py-4`}
				>
					<span
						className={`${MONO} text-[13px] tracking-[0.06em] text-[var(--mc-paper)]`}
					>
						{MCMASSAN.wordmark}
					</span>
					<span
						className={`${MONO} rounded-[2px] border border-[var(--mc-line)] px-[10px] py-[6px] text-[11px] uppercase tracking-[0.12em] text-[var(--mc-fog)]`}
					>
						{MCMASSAN.badge}
					</span>
				</div>
			</div>

			<main className={WRAP}>
				{/* ---------- 01 boilerplate ---------- */}
				<Chapter num="01" id="mc-massan" title="Boilerplates">
					<p className={`${LEDE} mb-7`}>{BOILERPLATE.pendingApproval}</p>
					<div className="grid gap-4">
						<div className={`${PANEL} flex flex-col gap-[14px] p-6`}>
							<span className={LABEL}>One-liner · Niklas väljer</span>
							{BOILERPLATE.oneliners.map((option) => (
								<div
									key={option.id}
									className="rounded-[4px] border border-[var(--mc-line)] p-[14px]"
								>
									<div className="flex items-center justify-between gap-3">
										<span
											className={`${MONO} text-[10px] uppercase tracking-[0.1em] text-[var(--mc-red)]`}
										>
											{option.label}
										</span>
										<CopyButton text={option.text} />
									</div>
									<p className="mt-[10px] text-base leading-[1.55] text-[var(--mc-paper-dim)]">
										{option.text}
									</p>
								</div>
							))}
						</div>

						{[BOILERPLATE.kort, BOILERPLATE.lang].map((block) => (
							<div key={block.id} className={`${PANEL} flex flex-col gap-[14px] p-6`}>
								<div className="flex items-center justify-between gap-3">
									<span className={LABEL}>{block.label}</span>
									<CopyButton text={block.paragraphs.join("\n\n")} />
								</div>
								<div>
									{block.paragraphs.map((paragraph, i) => (
										<p
											key={paragraph}
											className={`text-base leading-[1.55] text-[var(--mc-paper-dim)] ${i > 0 ? "mt-[14px]" : ""}`}
										>
											{paragraph}
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</Chapter>

				{/* ---------- 02 logo ---------- */}
				<Chapter num="02" id="logotyp" title="Logotyp">
					<div className="mb-10 grid gap-4 md:grid-cols-3">
						{LOGOS.map((logo) => (
							<div key={logo.src} className="flex flex-col">
								{/*
								  Fixed height rather than a minimum, so all three boxes match
								  and the captions below them share a baseline. The mark then
								  caps at max-h-full, which is 100% of whatever the content box
								  works out to under border-box, so the height and padding above
								  stay the only numbers anyone has to touch.
								*/}
								<div
									className={`${PANEL} flex h-[150px] items-center justify-center px-5 py-7`}
								>
									<Image
										src={logo.src}
										alt={logo.alt}
										width={logo.width}
										height={logo.height}
										sizes="(max-width: 768px) 90vw, 360px"
										className="h-auto max-h-full w-auto max-w-full object-contain"
									/>
								</div>
								<span
									className={`${MONO} mt-[14px] text-xs tracking-[0.04em] text-[var(--mc-fog)]`}
								>
									{logo.caption}
								</span>
								<a
									href={logo.src}
									download={logo.filename}
									className={`${DOWNLOAD} mt-auto self-start`}
								>
									Ladda ner (PNG)
								</a>
							</div>
						))}
					</div>
					<p className={LEDE}>{LOGO_NOTE}</p>
				</Chapter>

				{/* ---------- 03 tagline ---------- */}
				<Chapter num="03" id="tagline" title="Tagline">
					<div className={`${PANEL} mb-[22px] p-[clamp(28px,6vw,56px)]`}>
						<p
							className={`${DISPLAY} text-balance text-[clamp(2rem,6vw,3.6rem)] leading-[1.05] text-[var(--mc-paper)]`}
						>
							{MCMASSAN.tagline}
						</p>
					</div>
					<p className={LEDE}>{TAGLINE_NOTE}</p>
				</Chapter>

				{/* ---------- 04 colour ---------- */}
				<Chapter num="04" id="farg" title="Våra färger">
					<div className="grid gap-px overflow-hidden rounded-[6px] border border-[var(--mc-line)] bg-[var(--mc-line)] sm:grid-cols-3">
						{COLORS.map((colour) => (
							<div
								key={colour.hex}
								style={{ background: colour.hex }}
								className="flex aspect-[3/1] flex-col justify-end p-[18px] shadow-[inset_0_0_0_1px_var(--mc-line)] sm:aspect-[4/3]"
							>
								<span
									style={{ color: colour.nameColor }}
									className="text-[0.95rem] font-semibold"
								>
									{colour.name}
								</span>
								<span
									style={{ color: colour.hexColor }}
									className={`${MONO} mt-0.5 text-[0.85rem] opacity-85`}
								>
									{colour.hex}
								</span>
							</div>
						))}
					</div>
				</Chapter>

				{/* ---------- 05 typography ---------- */}
				<Chapter num="05" id="typografi" title="Typografi">
					<div className={`${PANEL} mb-[22px] p-[clamp(28px,6vw,56px)]`}>
						<p
							className={`${DISPLAY} mb-[18px] text-[clamp(3.6rem,12vw,7.5rem)] leading-none text-[var(--mc-paper)]`}
						>
							{TYPOGRAPHY.glyphs}
						</p>
						<p
							className={`${DISPLAY} text-[clamp(1.4rem,4vw,2.1rem)] tracking-[0.02em] text-[var(--mc-red)]`}
						>
							{TYPOGRAPHY.lockup}
						</p>
						<div
							className={`${MONO} mt-[22px] flex flex-wrap gap-7 text-xs tracking-[0.04em] text-[var(--mc-fog)]`}
						>
							{TYPOGRAPHY.meta.map((item) => (
								<span key={item}>{item}</span>
							))}
						</div>
						<a
							href={TYPOGRAPHY.file}
							download={TYPOGRAPHY.filename}
							className={`${DOWNLOAD} mt-4`}
						>
							Ladda ner typsnitt (OTF)
						</a>
					</div>
					<p className={LEDE}>{TYPOGRAPHY.note}</p>
				</Chapter>

				{/* ---------- 06 imagery ---------- */}
				<Chapter num="06" id="bildsprak" title="Bildspråk">
					<div className="mb-9 grid max-w-[760px] gap-x-8 gap-y-[14px] sm:grid-cols-2">
						{IMAGERY.rules.map((rule) => (
							<p
								key={rule}
								className="border-l-2 border-[var(--mc-red)] pl-[18px] text-[1.05rem] text-[var(--mc-paper)]"
							>
								{rule}
							</p>
						))}
					</div>
					<div className="flex flex-wrap items-start gap-4">
						{IMAGERY.gallery.map((shot) => (
							<figure key={shot.src} className="m-0">
								<Image
									src={shot.src}
									alt={shot.alt}
									width={shot.width}
									height={shot.height}
									sizes="(max-width: 640px) 90vw, 400px"
									className="h-[clamp(140px,22vw,220px)] w-auto max-w-full rounded-[4px] bg-[var(--mc-ink-deep)] object-contain"
								/>
								<figcaption
									className={`${MONO} mt-2 text-[11px] tracking-[0.03em] text-[var(--mc-fog)]`}
								>
									{shot.caption}
								</figcaption>
							</figure>
						))}
					</div>
				</Chapter>

				{/* ---------- 07 tone of voice ---------- */}
				<Chapter num="07" id="tonalitet" title="Tonalitet">
					<div className="mb-11 grid gap-px border border-[var(--mc-line)] bg-[var(--mc-line)] sm:grid-cols-2">
						{VOICE.statements.map((statement) => (
							<p
								key={statement}
								className="bg-[var(--mc-ink)] px-6 py-[26px] text-[1.15rem] font-medium leading-[1.3] text-[var(--mc-paper)]"
							>
								{statement}
							</p>
						))}
						<p className="border-t-2 border-[var(--mc-red)] bg-[var(--mc-ink-deep)] px-6 py-[26px] text-[1.05rem] leading-[1.3] text-[var(--mc-paper-dim)] sm:col-span-2">
							{VOICE.closing}
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2">
						<div className={`${PANEL} p-6`}>
							<p className={`${LABEL} mb-3`}>{VOICE.wrong.label}</p>
							<p className="text-base text-[var(--mc-fog)]">{VOICE.wrong.text}</p>
						</div>
						<div className="rounded-[6px] bg-[linear-gradient(165deg,var(--mc-red-deep),var(--mc-red))] p-6">
							<p
								className={`${MONO} mb-3 text-[11px] uppercase tracking-[0.12em] text-white/80`}
							>
								{VOICE.right.label}
							</p>
							<p className="text-base font-medium text-[var(--mc-paper)]">
								{VOICE.right.text}
							</p>
						</div>
					</div>
				</Chapter>

				{/* ---------- 08 campaign ---------- */}
				<Chapter num="08" id="kampanjmaterial" title="Kampanjmaterial">
					<p className={`${LEDE} mb-6`}>{CAMPAIGN.intro}</p>
					<div className="flex gap-2 overflow-x-auto pb-[6px]">
						{CAMPAIGN.posts.map((post) => (
							<a
								key={post.src}
								href={post.src}
								target="_blank"
								rel="noopener"
								className="h-[104px] shrink-0 sm:h-32"
							>
								<Image
									src={post.src}
									alt={post.alt}
									width={post.width}
									height={post.height}
									sizes="160px"
									className="h-full w-auto rounded-[3px] object-cover transition-transform hover:scale-[1.04]"
								/>
							</a>
						))}
					</div>
					<p className={`${MONO} mt-4 text-xs text-[var(--mc-fog)]`}>{CAMPAIGN.note}</p>
				</Chapter>
			</main>

			<div className={`${WRAP} flex flex-wrap items-center justify-between gap-[10px] py-8`}>
				<span className={`${MONO} text-xs tracking-[0.06em] text-[var(--mc-fog)]`}>
					{MCMASSAN.footerMark}
				</span>
				<span className={`${MONO} text-[11px] text-[var(--mc-fog)] opacity-70`}>
					{MCMASSAN.footerNote}
				</span>
			</div>
		</div>
	);
}
