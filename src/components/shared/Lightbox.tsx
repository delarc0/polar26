"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap-config";
import type { GalleryItem } from "@/data/gallery";

interface LightboxProps {
	items: GalleryItem[];
	activeIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
	const backdropRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const item = items[activeIndex];

	const goNext = useCallback(() => {
		onNavigate((activeIndex + 1) % items.length);
	}, [activeIndex, items.length, onNavigate]);

	const goPrev = useCallback(() => {
		onNavigate((activeIndex - 1 + items.length) % items.length);
	}, [activeIndex, items.length, onNavigate]);

	useEffect(() => {
		gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
		gsap.fromTo(contentRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
	}, []);

	useEffect(() => {
		gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
	}, [activeIndex]);

	useEffect(() => {
		if (item?.type === "video" && videoRef.current) {
			videoRef.current.play();
		}
	}, [item, activeIndex]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") goNext();
			if (e.key === "ArrowLeft") goPrev();
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [onClose, goNext, goPrev]);

	if (!item) return null;

	return (
		<div ref={backdropRef} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
			<button
				onClick={onClose}
				className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
				aria-label="Close lightbox"
			>
				<X size={28} />
			</button>

			<button
				onClick={(e) => { e.stopPropagation(); goPrev(); }}
				className="absolute left-4 sm:left-8 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
				aria-label="Previous"
			>
				<ChevronLeft size={32} />
			</button>

			<button
				onClick={(e) => { e.stopPropagation(); goNext(); }}
				className="absolute right-4 sm:right-8 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
				aria-label="Next"
			>
				<ChevronRight size={32} />
			</button>

			<div ref={contentRef} className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
				{item.type === "video" ? (
					<video
						ref={videoRef}
						src={item.src}
						poster={item.poster}
						controls
						autoPlay
						muted
						loop
						playsInline
						className="max-w-[90vw] max-h-[85vh] object-contain"
					/>
				) : (
					<Image
						src={item.src}
						alt={item.alt}
						width={item.width}
						height={item.height}
						className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
						sizes="90vw"
						priority
					/>
				)}

				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
					<span className="text-xs font-medium tracking-[0.15em] uppercase text-polar-lime">
						{item.category}
					</span>
					<p className="text-sm text-white/60 mt-1">{item.alt}</p>
				</div>
			</div>

			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-[0.15em] uppercase">
				{activeIndex + 1} / {items.length}
			</div>
		</div>
	);
}
