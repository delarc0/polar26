import { SITE } from "@/data/site";
import { Mail, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-display font-bold uppercase">
          Get In Touch
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Have a project in mind? We would love to hear about it. Drop us a
          message and we will get back to you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-polar-lime flex-shrink-0" aria-hidden="true" />
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-muted-foreground hover:text-polar-lime transition-colors focus-visible:outline-none focus-visible:text-polar-lime"
          >
            {SITE.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-polar-lime flex-shrink-0" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">
            {SITE.location}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06]">
        <p className="text-xs tracking-[0.1em] uppercase text-polar-lime font-medium">
          Follow Us
        </p>
        <div className="mt-3 flex items-center gap-4">
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

      <div className="pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-muted-foreground">
          Currently accepting projects for Q2 2026.
        </p>
      </div>
    </div>
  );
}
