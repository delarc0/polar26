"use client";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/shared/RevealText";
import { Lightbox } from "@/components/shared/Lightbox";
import { GALLERY_ITEMS, type GalleryItem, type GalleryVideo } from "@/data/gallery";

function VideoCard({ item, onClick }: { item: GalleryVideo; onClick: () => void }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const playVideo = useCallback(() => {
		videoRef.current?.play();
		setIsPlaying(true);
	}, []);

	const pauseVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;
		video.pause();
		video.currentTime = 0;
		setIsPlaying(false);
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		},
		[onClick]
	);

	return (
		<div
			className="mb-4 sm:mb-6 break-inside-avoid group relative overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-polar-lime"
			role="button"
			tabIndex={0}
			aria-label={`View: ${item.alt}`}
			onClick={onClick}
			onMouseEnter={playVideo}
			onMouseLeave={pauseVideo}
			onKeyDown={handleKeyDown}
		>
			<video
				ref={videoRef}
				src={item.src}
				poster={item.poster}
				width={item.width}
				height={item.height}
				muted
				loop
				playsInline
				preload="none"
				className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
			/>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
					<Play size={20} className="text-white ml-0.5" fill="white" aria-hidden="true" />
				</div>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			<span className="absolute bottom-4 left-4 text-xs font-medium tracking-[0.15em] uppercase text-polar-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				{item.category}
			</span>
		</div>
	);
}

function ImageCard({ item, onClick }: { item: GalleryItem & { type: "image" }; onClick: () => void }) {
	return (
		<div
			className="mb-4 sm:mb-6 break-inside-avoid group relative overflow-hidden cursor-pointer"
			role="button"
			tabIndex={0}
			aria-label={`View: ${item.alt}`}
			onClick={onClick}
			onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
		>
			<Image
				src={item.src}
				alt={item.alt}
				width={item.width}
				height={item.height}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			<span className="absolute bottom-4 left-4 text-xs font-medium tracking-[0.15em] uppercase text-polar-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				{item.category}
			</span>
		</div>
	);
}

export function PhotoGrid() {
	const gridRef = useScrollReveal<HTMLDivElement>({
		children: true,
		stagger: 0.1,
	});
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	return (
		<>
			<section className="py-24 sm:py-32 lg:py-40">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div>
						<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
							Selected Work
						</span>
						<RevealText
							as="h2"
							className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase"
						>
							Through the Lens
						</RevealText>
					</div>

					<div
						ref={gridRef}
						className="mt-12 sm:mt-16 columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6"
					>
						{GALLERY_ITEMS.map((item, i) =>
							item.type === "video" ? (
								<VideoCard key={item.src} item={item} onClick={() => setLightboxIndex(i)} />
							) : (
								<ImageCard key={item.src} item={item} onClick={() => setLightboxIndex(i)} />
							)
						)}
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
