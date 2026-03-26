import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="block">
              <Image
                src="/polar26logo.webp"
                alt={SITE.name}
                width={320}
                height={86}
                className="w-[90px] h-auto"
              />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Creative agency. Sweden.
            </p>
          </div>

          {/* Nav */}
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase focus-visible:outline-none focus-visible:text-polar-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-polar-lime transition-colors focus-visible:outline-none focus-visible:text-polar-lime"
            >
              Instagram
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-polar-lime transition-colors focus-visible:outline-none focus-visible:text-polar-lime"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
