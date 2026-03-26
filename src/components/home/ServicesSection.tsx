"use client";

import { SERVICES } from "@/data/services";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/shared/RevealText";
import { ArrowUpRight, Video, Target, TrendingUp, Handshake, BarChart3, Camera } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
	Video,
	Target,
	TrendingUp,
	Handshake,
	BarChart3,
	Camera,
};

function ServiceRow({ service }: { service: (typeof SERVICES)[number] }) {
	const Icon = ICON_MAP[service.icon];

	return (
		<div className="group border-b border-white/[0.06] last:border-b-0 cursor-default">
			<div className="relative py-6 sm:py-8 px-0 sm:px-4 flex items-center gap-5 sm:gap-8 transition-colors duration-300 hover:bg-white/[0.02]">
				{Icon && (
					<div className="w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 border border-white/[0.08] flex items-center justify-center group-hover:border-polar-lime/30 group-hover:bg-polar-lime/[0.06] transition-all duration-400">
						<Icon size={20} aria-hidden="true" className="text-white/25 group-hover:text-polar-lime transition-colors duration-400" />
					</div>
				)}

				<div className="flex-1 min-w-0">
					<h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors duration-300">
						{service.title}
					</h3>
					<p className="mt-1 text-sm text-white/25 group-hover:text-white/50 transition-colors duration-300 max-w-md">
						{service.description}
					</p>
				</div>

				<ArrowUpRight
					size={20}
					className="flex-shrink-0 text-white/0 group-hover:text-polar-lime transition-all duration-300 translate-y-1 group-hover:translate-y-0"
					aria-hidden="true"
				/>
			</div>
		</div>
	);
}

export function ServicesSection() {
	const headingRef = useScrollReveal<HTMLDivElement>();
	const listRef = useScrollReveal<HTMLDivElement>({
		children: true,
		stagger: 0.08,
		y: 20,
	});

	return (
		<section className="py-24 sm:py-32 lg:py-40">
			<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				<div ref={headingRef}>
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

				<div ref={listRef} className="mt-12 sm:mt-16 border-t border-white/[0.06]">
					{SERVICES.map((service) => (
						<ServiceRow key={service.title} service={service} />
					))}
				</div>
			</div>
		</section>
	);
}
