"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { Lightbox } from "@/components/shared/Lightbox";
import {
	GALLERY_ITEMS,
	type GalleryItem,
	type GalleryVideo,
} from "@/data/gallery";

function VideoSlide({
	item,
	onClick,
}: { item: GalleryVideo; onClick: () => void }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<button
			type="button"
			className="relative flex-shrink-0 h-[55vh] sm:h-[65vh] lg:h-[70vh] rounded-sm overflow-hidden cursor-pointer group border-0 p-0 bg-transparent text-left"
			style={{ aspectRatio: `${item.width}/${item.height}` }}
			aria-label={item.category}
			onClick={onClick}
			onMouseEnter={() => {
				videoRef.current?.play();
				setIsPlaying(true);
			}}
			onMouseLeave={() => {
				const v = videoRef.current;
				if (v) {
					v.pause();
					v.currentTime = 0;
				}
				setIsPlaying(false);
			}}
		>
			<video
				ref={videoRef}
				src={item.src}
				poster={item.poster}
				muted
				loop
				playsInline
				preload="none"
				className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					className={`w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isPlaying ? "opacity-0 scale-75" : "opacity-100"}`}
				>
					<Play
						size={22}
						className="text-white ml-0.5"
						fill="white"
						aria-hidden="true"
					/>
				</div>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			<span className="absolute bottom-4 left-4 text-[11px] font-medium tracking-[0.2em] uppercase text-polar-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500">
				{item.category}
			</span>
		</button>
	);
}

function ImageSlide({
	item,
	onClick,
}: { item: GalleryItem & { type: "image" }; onClick: () => void }) {
	return (
		<button
			type="button"
			className="relative flex-shrink-0 h-[55vh] sm:h-[65vh] lg:h-[70vh] rounded-sm overflow-hidden cursor-pointer group border-0 p-0 bg-transparent text-left"
			style={{ aspectRatio: `${item.width}/${item.height}` }}
			aria-label={item.category}
			onClick={onClick}
		>
			<Image
				src={item.src}
				alt={item.alt}
				fill
				sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			<span className="absolute bottom-4 left-4 text-[11px] font-medium tracking-[0.2em] uppercase text-polar-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500">
				{item.category}
			</span>
		</button>
	);
}

export function PhotoGrid() {
	const sectionRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	// useLayoutEffect so ctx.revert() runs BEFORE React removes DOM nodes.
	// ScrollTrigger pin reparents elements into a wrapper div; if React
	// tries removeChild first, it crashes with "not a child of this node".
	useLayoutEffect(() => {
		const section = sectionRef.current;
		const track = trackRef.current;
		const heading = headingRef.current;
		const progress = progressRef.current;
		if (!section || !track) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		const ctx = gsap.context(() => {
			if (heading) {
				gsap.from(heading, {
					y: 40,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
					},
				});
			}

			const getScrollDistance = () => {
				return Math.max(0, track.scrollWidth - section.offsetWidth);
			};

			gsap.to(track, {
				x: () => -getScrollDistance(),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${getScrollDistance()}`,
					pin: true,
					scrub: true,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					onUpdate: (self) => {
						if (progress) {
							progress.style.transform = `scaleX(${self.progress})`;
						}
					},
				},
			});
		}, section);

		let lastWidth = track.scrollWidth;
		const ro = new ResizeObserver(() => {
			const newWidth = track.scrollWidth;
			if (newWidth !== lastWidth) {
				lastWidth = newWidth;
				ScrollTrigger.refresh();
			}
		});
		ro.observe(track);

		const images = track.querySelectorAll("img");
		let settled = 0;
		const onSettle = () => {
			settled++;
			if (settled === images.length) ScrollTrigger.refresh();
		};
		images.forEach((img) => {
			if (img.complete) {
				settled++;
			} else {
				img.addEventListener("load", onSettle, { once: true });
				img.addEventListener("error", onSettle, { once: true });
			}
		});

		return () => {
			ro.disconnect();
			ctx.revert();
		};
	}, []);

	return (
		<>
			<section
				ref={sectionRef}
				className="relative h-screen overflow-hidden"
			>
				<div
					ref={headingRef}
					className="absolute top-10 sm:top-14 left-6 sm:left-8 lg:left-12 z-10"
				>
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Selected Work
					</span>
					<h2 className="mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-display font-bold uppercase leading-[0.95]">
						Through
						<br />
						the Lens
					</h2>
				</div>

				<div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />
				<div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />

				<div
					ref={trackRef}
					className="absolute inset-0 flex items-center gap-4 sm:gap-5 will-change-transform"
					style={{ paddingLeft: "max(12rem, 22vw)" }}
				>
					{GALLERY_ITEMS.map((item, i) =>
						item.type === "video" ? (
							<VideoSlide
								key={item.src}
								item={item}
								onClick={() => setLightboxIndex(i)}
							/>
						) : (
							<ImageSlide
								key={item.src}
								item={item}
								onClick={() => setLightboxIndex(i)}
							/>
						),
					)}
					<div
						className="flex-shrink-0 w-16 sm:w-24"
						aria-hidden="true"
					/>
				</div>

				<div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-8 lg:left-12 right-6 sm:right-8 lg:right-12 z-10">
					<div className="h-px bg-white/[0.08]">
						<div
							ref={progressRef}
							className="h-full bg-polar-lime origin-left"
							style={{ transform: "scaleX(0)" }}
						/>
					</div>
					<div className="flex justify-between mt-3">
						<span className="text-[11px] tracking-[0.2em] uppercase text-white/25">
							Scroll to explore
						</span>
						<span className="text-[11px] tracking-[0.2em] uppercase text-white/25">
							{GALLERY_ITEMS.length} pieces
						</span>
					</div>
				</div>
			</section>

			{lightboxIndex !== null && (
				<Lightbox
					items={GALLERY_ITEMS}
					activeIndex={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
					onNavigate={setLightboxIndex}
				/>
			)}
		</>
	);
}
