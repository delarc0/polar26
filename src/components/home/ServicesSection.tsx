"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { SERVICES } from "@/data/services";
import { RevealText } from "@/components/shared/RevealText";
import {
	Video,
	Target,
	TrendingUp,
	Handshake,
	BarChart3,
	Camera,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
	Video,
	Target,
	TrendingUp,
	Handshake,
	BarChart3,
	Camera,
};

function ServiceCard({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
	const Icon = ICON_MAP[service.icon];
	return (
		<div className="service-card flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[40vw] h-[70vh] relative group overflow-hidden">
			<Image
				src={service.image}
				alt={service.title}
				fill
				sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 40vw"
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

			<div className="absolute top-6 left-6 text-[7rem] font-display font-extrabold uppercase text-white/[0.04] leading-none select-none pointer-events-none">
				{String(index + 1).padStart(2, "0")}
			</div>

			<div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
				{Icon && (
					<div className="w-12 h-12 border border-polar-lime/40 bg-polar-lime/5 flex items-center justify-center mb-5 group-hover:bg-polar-lime/15 transition-colors duration-500">
						<Icon size={20} aria-hidden="true" className="text-polar-lime" />
					</div>
				)}
				<h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
					{service.title}
				</h3>
				<p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm">
					{service.description}
				</p>
			</div>
		</div>
	);
}

export function ServicesSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const track = trackRef.current;
		if (!section || !track) return;

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const cards = track.querySelectorAll(".service-card");
		const totalScroll = track.scrollWidth - window.innerWidth;

		const pin = gsap.to(track, {
			x: -totalScroll,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				pin: true,
				scrub: 1,
				end: () => `+=${totalScroll}`,
				invalidateOnRefresh: true,
			},
		});

		cards.forEach((card, i) => {
			gsap.fromTo(
				card,
				{ opacity: 0, scale: 0.9 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.5,
					scrollTrigger: {
						trigger: card,
						containerAnimation: pin,
						start: "left 80%",
						end: "left 50%",
						scrub: true,
					},
				}
			);
		});

		return () => {
			pin.kill();
			ScrollTrigger.getAll().forEach((t) => {
				if (t.vars.containerAnimation === pin) t.kill();
			});
		};
	}, []);

	return (
		<section ref={sectionRef} className="relative overflow-hidden">
			<div className="pt-24 sm:pt-32 lg:pt-40 pb-12 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					What We Do
				</span>
				<RevealText
					as="h2"
					className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase"
				>
					Services
				</RevealText>
			</div>

			<div ref={trackRef} className="flex gap-6 sm:gap-8 pl-6 sm:pl-8 lg:pl-12 pr-[10vw] pb-24 sm:pb-32 will-change-transform">
				{SERVICES.map((service, i) => (
					<ServiceCard key={service.title} service={service} index={i} />
				))}
			</div>
		</section>
	);
}
