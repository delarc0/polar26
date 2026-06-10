"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMG = "/images/patrik-portrait-bw.webp";
const RADIUS = 130;
const FEATHER = 38;

export function FounderReveal() {
	const wrapRef = useRef<HTMLDivElement>(null);
	const maskRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
	const rafRef = useRef<number | null>(null);
	const [enhanced, setEnhanced] = useState(false);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const fine = window.matchMedia("(pointer: fine)").matches;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		setEnhanced(fine && !reduced);
	}, []);

	useEffect(() => {
		if (!enhanced) return;
		const wrap = wrapRef.current;
		if (!wrap) return;

		const apply = () => {
			const p = pos.current;
			const grad = `radial-gradient(circle ${RADIUS}px at ${p.x.toFixed(1)}px ${p.y.toFixed(
				1
			)}px, transparent 0px, transparent ${RADIUS - FEATHER}px, #000 ${RADIUS + 6}px)`;
			if (maskRef.current) {
				maskRef.current.style.maskImage = grad;
				maskRef.current.style.webkitMaskImage = grad;
			}
			if (frameRef.current) {
				frameRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
			}
		};

		const r = wrap.getBoundingClientRect();
		pos.current.x = pos.current.tx = r.width / 2;
		pos.current.y = pos.current.ty = r.height * 0.42;
		apply();

		const tick = () => {
			const p = pos.current;
			p.x += (p.tx - p.x) * 0.2;
			p.y += (p.ty - p.y) * 0.2;
			apply();
			rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [enhanced]);

	const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const wrap = wrapRef.current;
		if (!wrap) return;
		const r = wrap.getBoundingClientRect();
		pos.current.tx = e.clientX - r.left;
		pos.current.ty = e.clientY - r.top;
		if (!active) setActive(true);
	};

	return (
		<div
			ref={wrapRef}
			onPointerMove={enhanced ? handleMove : undefined}
			onPointerLeave={enhanced ? () => setActive(false) : undefined}
			className={`relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[460px] overflow-hidden w-full max-w-sm mx-auto lg:max-w-none lg:mx-0 select-none ${
				enhanced ? "cursor-none" : ""
			}`}
		>
			{/* Base sharp photo */}
			<Image
				src={IMG}
				alt="Patrik Nordstrom"
				fill
				priority
				sizes="(max-width: 1024px) 100vw, 50vw"
				className="object-cover object-[center_32%]"
			/>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent" />

			{enhanced && (
				<>
					{/* Obscuring layer, masked away around the cursor */}
					<div
						ref={maskRef}
						aria-hidden="true"
						className="absolute inset-0 z-10"
						style={{
							maskImage:
								"radial-gradient(circle 130px at -300px -300px, transparent 0, #000 100px)",
							WebkitMaskImage:
								"radial-gradient(circle 130px at -300px -300px, transparent 0, #000 100px)",
						}}
					>
						<Image
							src={IMG}
							alt=""
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-cover object-[center_32%] brightness-[0.28] blur-[2px] grayscale"
						/>
						<div className="absolute inset-0 bg-[#0A0A0A]/55" />
						<div
							className="absolute inset-0 opacity-50 mix-blend-overlay"
							style={{
								backgroundImage:
									"repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
							}}
						/>
					</div>

					{/* Viewfinder frame following the cursor */}
					<div
						ref={frameRef}
						aria-hidden="true"
						className={`pointer-events-none absolute left-0 top-0 z-20 transition-opacity duration-300 ${
							active ? "opacity-100" : "opacity-60"
						}`}
						style={{ width: 260, height: 260 }}
					>
						<span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-polar-lime" />
						<span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-polar-lime" />
						<span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-polar-lime" />
						<span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-polar-lime" />
						<span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-polar-lime/70" />
						<span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-polar-lime/70" />
						<span className="absolute -top-6 left-0 flex items-center gap-1.5 text-[9px] font-display font-bold tracking-[0.25em] text-polar-lime">
							<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A5A] animate-pulse" />
							REC
						</span>
					</div>

					{/* Hint */}
					<div
						className={`pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center transition-opacity duration-500 ${
							active ? "opacity-0" : "opacity-100"
						}`}
					>
						<span className="bg-black/50 px-3 py-1.5 text-[10px] font-display font-bold uppercase tracking-[0.25em] text-polar-lime backdrop-blur-sm">
							Drag to reveal
						</span>
					</div>
				</>
			)}
		</div>
	);
}
