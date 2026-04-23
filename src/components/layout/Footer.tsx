"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

const FOOTER_NAV = [
	{ label: "Home", href: "/" },
	...NAV_LINKS,
];

const SOCIAL_LINKS = [
	{ label: "Instagram", href: SITE.social.instagram },
	{ label: "LinkedIn", href: SITE.social.linkedin },
];

const PARTNER_LOGOS = [
	{ name: "Pirelli", src: "/images/clients/pirelli.webp", width: 377, height: 80 },
	{ name: "Yamaha", src: "/images/clients/yamaha.webp", width: 500, height: 107 },
	{ name: "Fysiolollo", src: "/images/clients/fysiolollo.webp", width: 166, height: 80 },
	{ name: "Son of a Coder", src: "/images/clients/sonofacoder.webp", width: 226, height: 80 },
];

export function Footer() {
	const footerRef = useRef<HTMLElement>(null);
	const riderRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const buttonRef = useMagnetic<HTMLAnchorElement>(0.25);
	const isContactPage = pathname === "/contact";

	const leftNavRef = useScrollReveal<HTMLDivElement>({
		children: true,
		stagger: 0.06,
		y: 20,
	});
	const rightNavRef = useScrollReveal<HTMLDivElement>({
		children: true,
		stagger: 0.06,
		y: 20,
		delay: 0.15,
	});
	const statementRef = useScrollReveal<HTMLDivElement>({
		y: 40,
		duration: 1,
		delay: 0.2,
	});

	useEffect(() => {
		const footer = footerRef.current;
		const rider = riderRef.current;
		const marquee = marqueeRef.current;
		if (!footer) return;

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			const video = videoRef.current;
			if (video) {
				video.pause();
				video.removeAttribute("autoplay");
			}
			return;
		}

		const tweens: gsap.core.Tween[] = [];
		const triggers: ScrollTrigger[] = [];

		if (rider) {
			const riderTween = gsap.to(rider, {
				yPercent: -8,
				ease: "none",
				scrollTrigger: {
					trigger: footer,
					start: "top bottom",
					end: "bottom bottom",
					scrub: true,
				},
			});
			tweens.push(riderTween);
		}

		if (marquee) {
			const marqueeTrack = marquee.querySelector(".animate-marquee");
			if (marqueeTrack) {
				const marqueeTrigger = ScrollTrigger.create({
					trigger: footer,
					start: "top bottom",
					end: "bottom bottom",
					onUpdate: (self) => {
						const speed = 30 - self.getVelocity() / 200;
						const clamped = Math.max(5, Math.min(60, speed));
						(marqueeTrack as HTMLElement).style.animationDuration = `${clamped}s`;
					},
				});
				triggers.push(marqueeTrigger);
			}
		}

		return () => {
			tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
			triggers.forEach((t) => t.kill());
		};
	}, []);

	const logoSet = PARTNER_LOGOS.map((logo) => (
		<div key={logo.name} className="flex-shrink-0 flex items-center px-6 sm:px-10">
			<Image
				src={logo.src}
				alt={logo.name}
				width={logo.width}
				height={logo.height}
				className="h-6 sm:h-8 w-auto [filter:url(#polar-lime-tint)] opacity-60"
			/>
		</div>
	));

	return (
		<footer ref={footerRef} className="relative">
			<svg width="0" height="0" className="absolute" aria-hidden="true">
				<filter id="polar-lime-tint">
					<feColorMatrix type="matrix" values="0 0 0 0 0.741  0 0 0 0 1  0 0 0 0 0  0 0 0 1 0" />
				</filter>
			</svg>

			<div className="footer-mask relative overflow-hidden bg-[#111] min-h-[45vh]">
				<div className="footer-topo absolute inset-0 opacity-[0.07]" />

				<div ref={marqueeRef} className="absolute inset-x-0 bottom-[8%] sm:bottom-[10%] z-[1] pointer-events-none select-none">
					<div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#111] to-transparent z-10" />
					<div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#111] to-transparent z-10" />

					<div className="overflow-hidden">
						<div className="flex w-max animate-marquee" style={{ animationDuration: "30s" }}>
							{logoSet}
							{logoSet}
						</div>
					</div>
				</div>

				<div
					ref={statementRef}
					className="absolute inset-x-0 top-[8%] sm:top-[5%] z-[2] flex flex-col items-center text-center px-6 pointer-events-none"
				>
					<h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-extrabold uppercase leading-[0.85]">
						Ready to
						<br />
						<span className="text-polar-lime">stand out?</span>
					</h2>
				</div>

				<div ref={riderRef} className="absolute left-1/2 -translate-x-1/2 -bottom-[64%] w-[120%] sm:w-[105%] lg:w-[90%] h-[160%] z-[3] pointer-events-none select-none will-change-transform">
					<video
						ref={videoRef}
						src="/videos/footer-rider.mp4"
						poster="/images/footer-rider.webp"
						autoPlay
						muted
						loop
						playsInline
						preload="metadata"
						aria-hidden="true"
						className="footer-video-mask absolute inset-0 w-full h-full object-contain object-bottom"
					/>
					<div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#111] to-transparent" />
				</div>

				<div className="relative z-[4] min-h-[45vh] flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-[12vh]">
					<div ref={leftNavRef}>
						<p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">
							Pages
						</p>
						<ul className="flex flex-col gap-1">
							{FOOTER_NAV.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="block text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white/60 hover:text-polar-lime transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div ref={rightNavRef} className="text-right">
						<p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">
							Follow On
						</p>
						<ul className="flex flex-col gap-1">
							{SOCIAL_LINKS.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white/60 hover:text-polar-lime transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{!isContactPage && (
				<div className="relative z-10 flex justify-center -mt-6 pt-2 pb-4">
					<a
						ref={buttonRef}
						href={`mailto:${SITE.email}`}
						className="inline-flex items-center gap-3 px-6 py-3 text-xs sm:text-sm font-display font-bold tracking-[0.15em] uppercase bg-polar-lime text-[#111] hover:bg-white transition-colors rounded-full cursor-pointer group"
					>
						Business Enquiries
						<span className="block w-4 h-px bg-current transition-all duration-300 group-hover:w-8" />
					</a>
				</div>
			)}

			<div className="bg-[#0A0A0A]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
					<p className="text-[11px] text-white/20">
						&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<Link href="/privacy" className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
							Privacy Policy
						</Link>
						<Link href="/terms" className="text-[11px] text-white/20 hover:text-white/50 transition-colors">
							Terms
						</Link>
						<a
							href="https://lab37.io"
							target="_blank"
							rel="noopener noreferrer"
							className="group text-[11px] text-white/20 hover:text-white/50 transition-colors"
						>
							Design by <span className="group-hover:text-polar-lime transition-colors">LAB37</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
