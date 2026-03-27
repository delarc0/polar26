import Link from "next/link";

export default function NotFound() {
	return (
		<section className="flex min-h-screen items-center justify-center px-6">
			<div className="text-center">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					404
				</span>
				<h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold uppercase">
					Page not found
				</h1>
				<p className="mt-4 text-sm text-muted-foreground">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link
					href="/"
					className="mt-8 inline-block bg-polar-lime text-[#0A0A0A] px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-polar-lime/90 transition-colors"
				>
					Go Home
				</Link>
			</div>
		</section>
	);
}
