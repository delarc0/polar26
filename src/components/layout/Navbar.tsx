"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 h-16 sm:h-20 grid grid-cols-3 items-center">
        {/* Desktop Nav - Left */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:text-polar-lime",
                  pathname === link.href
                    ? "text-polar-lime"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden" />

        {/* Logo - Center */}
        <Link href="/" className="justify-self-center block">
          <Image
            src="/polar26logo.webp"
            alt={SITE.name}
            width={320}
            height={86}
            className="w-[100px] sm:w-[120px] h-auto"
            priority
          />
        </Link>

        {/* Mobile Toggle - Right */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden justify-self-end text-foreground p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:text-polar-lime"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:block" />
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.06]">
          <ul className="flex flex-col items-center gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-lg font-medium tracking-[0.1em] uppercase transition-colors focus-visible:outline-none focus-visible:text-polar-lime",
                    pathname === link.href
                      ? "text-polar-lime"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
