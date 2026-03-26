"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { RevealText } from "@/components/shared/RevealText";
import { Search, Compass, Megaphone, ArrowRight } from "lucide-react";

const PILLARS = [
	{
		title: "Research",
		description: "Data-driven insights that inform every decision. We dig deep into markets, audiences, and competitors before a single pixel is placed.",
		icon: Search,
		number: "01",
		details: ["Market Analysis", "Audience Mapping", "Competitor Audit"],
	},
	{
		title: "Strategy",
		description: "Clear plans that turn vision into action. Every creative choice is backed by a strategic reason.",
		icon: Compass,
		number: "02",
		details: ["Brand Positioning", "Content Roadmap", "Channel Strategy"],
	},
	{
		title: "Communication",
		description: "Creative execution that reaches and resonates. The work people actually remember.",
		icon: Megaphone,
		number: "03",
		details: ["Visual Identity", "Campaign Execution", "Performance Tracking"],
	},
];

const FOUR_PS = [
	{
		label: "Product",
		description: "What you offer",
		detail: "Defining what makes your product irresistible. We shape the story around what matters.",
		color: "from-polar-lime/20 to-transparent",
	},
	{
		label: "Price",
		description: "What it costs",
		detail: "Positioning your value so the price feels like a steal. Perception is everything.",
		color: "from-polar-lime/15 to-transparent",
	},
	{
		label: "Place",
		description: "Where it lives",
		detail: "Putting your brand exactly where your audience already is. Right channel, right time.",
		color: "from-polar-lime/10 to-transparent",
	},
	{
		label: "Promotion",
		description: "How it spreads",
		detail: "Making noise that matters. Creative campaigns that cut through and convert.",
		color: "from-polar-lime/20 to-transparent",
	},
];

function ConnectionLine() {
	const lineRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = lineRef.current;
		if (!svg) return;
		const path = svg.querySelector("path");
		if (!path) return;

		const length = path.getTotalLength();
		gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

		const trigger = ScrollTrigger.create({
			trigger: svg,
			start: "top 75%",
			once: true,
			onEnter: () => {
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 1.5,
					ease: "power2.inOut",
				});
			},
		});

		return () => trigger.kill();
	}, []);

	return (
		<svg
			ref={lineRef}
			className="hidden md:block absolute top-[3.5rem] left-[16.66%] right-[16.66%] h-[2px] z-0 overflow-visible"
			preserveAspectRatio="none"
		>
			<path
				d="M0,1 L1000,1"
				stroke="url(#line-gradient)"
				strokeWidth="2"
				fill="none"
				vectorEffect="non-scaling-stroke"
			/>
			<defs>
				<linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#BDFF00" stopOpacity="0.6" />
					<stop offset="50%" stopColor="#BDFF00" stopOpacity="1" />
					<stop offset="100%" stopColor="#BDFF00" stopOpacity="0.6" />
				</linearGradient>
			</defs>
		</svg>
	);
}

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[number]; index: number }) {
	const Icon = pillar.icon;
	const cardRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const el = cardRef.current;
		const counter = counterRef.current;
		if (!el || !counter) return;

		const targetNum = parseInt(pillar.number, 10);
		const obj = { val: 0 };

		gsap.set(counter, { opacity: 0, scale: 0.5, y: 30 });

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 80%",
			once: true,
			onEnter: () => {
				gsap.to(counter, {
					opacity: 0.04,
					scale: 1,
					y: 0,
					duration: 1.2,
					delay: index * 0.2,
					ease: "power3.out",
				});
				gsap.to(obj, {
					val: targetNum,
					duration: 1.5,
					delay: index * 0.2,
					ease: "power2.out",
					onUpdate: () => {
						counter.textContent = String(Math.round(obj.val)).padStart(2, "0");
					},
				});
			},
		});

		return () => trigger.kill();
	}, [index, pillar.number]);

	return (
		<div ref={cardRef} className="relative group z-[1]">
			<span ref={counterRef} className="absolute -top-8 -left-2 text-[8rem] sm:text-[10rem] font-display font-extrabold uppercase text-white select-none pointer-events-none leading-none">
				00
			</span>

			<div className="relative">
				<div className="flex items-center gap-4 mb-6">
					<div className="relative flex items-center justify-center w-14 h-14 border border-polar-lime/40 bg-polar-lime/5 group-hover:bg-polar-lime/10 transition-colors duration-500">
						<Icon size={22} className="text-polar-lime" />
						<div className="absolute inset-0 border border-polar-lime/20 scale-[1.3] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
					</div>
					{index < PILLARS.length - 1 && (
						<ArrowRight size={16} className="hidden md:block text-polar-lime/40 ml-auto" />
					)}
				</div>

				<h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase">
					{pillar.title}
				</h3>
				<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
					{pillar.description}
				</p>

				<ul className="mt-5 space-y-2">
					{pillar.details.map((detail) => (
						<li key={detail} className="flex items-center gap-2 text-xs text-white/50">
							<div className="h-px w-3 bg-polar-lime/50" />
							{detail}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function FourPCard({ p, index }: { p: typeof FOUR_PS[number]; index: number }) {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = cardRef.current;
		if (!el) return;

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			once: true,
			onEnter: () => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 40, scale: 0.95 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.12, ease: "power3.out" }
				);
			},
		});

		return () => trigger.kill();
	}, [index]);

	return (
		<div
			ref={cardRef}
			className="relative overflow-hidden bg-background p-8 sm:p-10 group cursor-pointer opacity-0"
		>
			<div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

			<div className="relative">
				<span className="block text-[5rem] sm:text-[6rem] font-display font-extrabold uppercase text-polar-lime/10 leading-none group-hover:text-polar-lime/20 transition-colors duration-500 select-none">
					{p.label.charAt(0)}
				</span>
				<div className="-mt-8 sm:-mt-10">
					<h4 className="text-lg sm:text-xl font-display font-bold uppercase">
						{p.label}
					</h4>
					<p className="mt-1 text-xs text-polar-lime/70 uppercase tracking-[0.15em]">
						{p.description}
					</p>
					<p className="mt-3 text-sm text-muted-foreground leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
						{p.detail}
					</p>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-polar-lime/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
		</div>
	);
}

export function MarketingFramework() {
	return (
		<section className="py-24 sm:py-32 lg:py-40 border-t border-white/[0.06] overflow-hidden">
			<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				<div className="text-center max-w-3xl mx-auto">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Our Framework
					</span>
					<RevealText
						as="h2"
						className="mt-4 text-[clamp(2rem,5vw,4rem)] font-display font-extrabold uppercase"
					>
						How We Work
					</RevealText>
					<p className="mt-4 text-muted-foreground max-w-xl mx-auto">
						Three pillars. One mission. Every project follows the same proven path from insight to impact.
					</p>
				</div>

				<div className="relative mt-20 sm:mt-24">
					<ConnectionLine />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
						{PILLARS.map((pillar, i) => (
							<PillarCard key={pillar.title} pillar={pillar} index={i} />
						))}
					</div>
				</div>

				<div className="mt-24 sm:mt-32">
					<div className="text-center mb-12">
						<span className="text-xs font-medium tracking-[0.2em] uppercase text-white/30">
							The Marketing Mix
						</span>
						<h3 className="mt-3 text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold uppercase">
							The 4 P&apos;s
						</h3>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
						{FOUR_PS.map((p, i) => (
							<FourPCard key={p.label} p={p} index={i} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
