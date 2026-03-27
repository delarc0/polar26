"use client";

export default function ErrorPage({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<section className="flex min-h-screen items-center justify-center px-6">
			<div className="text-center">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					Error
				</span>
				<h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold uppercase">
					Something went wrong
				</h1>
				<p className="mt-4 text-sm text-muted-foreground">
					An unexpected error occurred. Please try again.
				</p>
				<button
					onClick={reset}
					className="mt-8 bg-polar-lime text-[#0A0A0A] px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-polar-lime/90 transition-colors cursor-pointer"
				>
					Try Again
				</button>
			</div>
		</section>
	);
}
