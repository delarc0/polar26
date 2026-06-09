"use client";

import Image from "next/image";

type ImageClient = {
	type: "image";
	name: string;
	src: string;
	width: number;
	height: number;
	className: string;
	color?: boolean;
};

type TextClient = {
	type: "text";
	name: string;
	className: string;
};

type Client = ImageClient | TextClient;

const CLIENTS: Client[] = [
	{ type: "image", name: "Pirelli", src: "/images/clients/pirelli.webp", width: 377, height: 80, className: "h-8 sm:h-10" },
	{ type: "image", name: "Nordea", src: "/images/clients/Nordea_logo16.png", width: 790, height: 180, className: "h-7 sm:h-9" },
	{ type: "image", name: "Mekonomen Company", src: "/images/clients/mekonomen-company.webp", width: 300, height: 170, className: "h-9 sm:h-11" },
	{ type: "image", name: "Yamaha", src: "/images/clients/yamaha.webp", width: 500, height: 107, className: "h-8 sm:h-10" },
	{ type: "image", name: "Speedway GP", src: "/images/clients/220301-SGP-Logo.webp", width: 600, height: 189, className: "h-8 sm:h-10" },
	{ type: "image", name: "MC Mässan 2027", src: "/images/clients/mcmassan-2027.webp", width: 472, height: 133, className: "h-8 sm:h-10" },
	{ type: "image", name: "Fysiolollo", src: "/images/clients/fysiolollo.webp", width: 166, height: 80, className: "h-8 sm:h-10" },
	{ type: "image", name: "Son of a Coder", src: "/images/clients/sonofacoder.webp", width: 226, height: 80, className: "h-8 sm:h-10" },
	{ type: "image", name: "PSB Pro Superbike", src: "/images/clients/psb-logo-clean.png", width: 570, height: 251, className: "h-8 sm:h-10" },
];

const PRIORITY_CLIENTS = new Set(["Pirelli", "Nordea", "Yamaha", "Speedway GP", "MC Mässan 2027"]);

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
					className={client.color ? `${client.className} w-auto opacity-90` : `${client.className} w-auto brightness-0 invert opacity-40`}
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
