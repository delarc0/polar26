"use client";

import Image from "next/image";

type ImageClient = {
	type: "image";
	name: string;
	src: string;
	width: number;
	height: number;
	className: string;
};

type TextClient = {
	type: "text";
	name: string;
	className: string;
};

type Client = ImageClient | TextClient;

const CLIENTS: Client[] = [
	{ type: "image", name: "Pirelli", src: "/images/clients/pirelli.webp", width: 377, height: 80, className: "h-8 sm:h-10" },
	{ type: "image", name: "Yamaha", src: "/images/clients/yamaha.webp", width: 500, height: 107, className: "h-8 sm:h-10" },
	{ type: "image", name: "Fysiolollo", src: "/images/clients/fysiolollo.webp", width: 166, height: 80, className: "h-8 sm:h-10" },
	{ type: "image", name: "Son of a Coder", src: "/images/clients/sonofacoder.webp", width: 226, height: 80, className: "h-8 sm:h-10" },
];

const PRIORITY_CLIENTS = new Set(["Pirelli", "Yamaha"]);

export function ClientLogoMarquee() {
	const set = CLIENTS.map((client) => (
		<div
			key={client.name}
			className="flex-shrink-0 flex items-center px-8 sm:px-12"
		>
			{client.type === "image" ? (
				<Image
					src={client.src}
					alt={client.name}
					width={client.width}
					height={client.height}
					priority={PRIORITY_CLIENTS.has(client.name)}
					className={`${client.className} w-auto brightness-0 invert opacity-40`}
				/>
			) : (
				<span className={`${client.className} text-white/40 whitespace-nowrap`}>
					{client.name}
				</span>
			)}
		</div>
	));

	return (
		<section className="border-y border-white/[0.06] overflow-hidden py-8 sm:py-10">
			<div className="relative">
				<div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

				<div className="flex w-max animate-marquee">
					{set}
					<div aria-hidden="true" className="flex">
						{set}
					</div>
				</div>
			</div>
		</section>
	);
}
