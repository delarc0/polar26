"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export function ContactPageContent() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
  const infoRef = useScrollReveal<HTMLDivElement>({ delay: 0.3 });

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div ref={headingRef} className="mb-12 sm:mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
              Contact
            </span>
            <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-display font-bold uppercase tracking-tight">
              Let&apos;s Talk
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Have a project in mind? We would love to hear about it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div ref={formRef} className="lg:col-span-3">
              <ContactForm />
            </div>
            <div ref={infoRef} className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
