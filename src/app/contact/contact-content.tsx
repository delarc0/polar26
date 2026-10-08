"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export type FundNeed = { title: string; cost: string };

export function ContactPageContent({ project, need }: { project?: string; need?: FundNeed }) {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
  const infoRef = useScrollReveal<HTMLDivElement>({ delay: 0.3 });

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div ref={headingRef} className="mb-12 sm:mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
              {project ? "Partnership" : need ? "Fund a Need" : "Contact"}
            </span>
            <h1 className="mt-4 text-[clamp(2rem,6vw,5rem)] font-display font-bold uppercase">
              Let&apos;s Talk
            </h1>
            {project ? (
              <>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                  Interested in <span className="text-foreground">{project}</span>?
                </p>
                <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">
                  Tell us which brand you represent and what you&apos;d like to get out of it, and
                  we&apos;ll come back with options that fit.
                </p>
              </>
            ) : need ? (
              <>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                  Interested in funding the{" "}
                  <span className="text-foreground">{need.title.toLowerCase()}</span> ({need.cost}) in
                  Ekumfi, Ghana?
                </p>
                <p className="mt-6 text-sm text-muted-foreground max-w-xl leading-relaxed">
                  Let us know if you&apos;d like to cover all of it or part of it, and we&apos;ll
                  come back to you with how to contribute.
                </p>
              </>
            ) : (
              <>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                  Have a project in mind? We would love to hear about it.
                </p>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground max-w-xl leading-relaxed">
                  <p>
                    Whether you are launching a new brand, producing a commercial
                    campaign, planning a major event, or simply need a strategic
                    partner to sharpen your creative direction, we are here to help.
                  </p>
                  <p>
                    Tell us about your project using the form and we will get back
                    to you within 24 hours with an initial plan. We work with brands
                    of all sizes, from emerging startups to established international
                    names across motorsport, lifestyle, and consumer goods.
                  </p>
                  <p>
                    Prefer to reach out directly? Drop us a line at{" "}
                    <a
                      href="mailto:hello@polar26.com"
                      className="text-polar-lime hover:underline"
                    >
                      hello@polar26.com
                    </a>
                    . We are based in Sweden and work with clients across Europe and
                    beyond.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-20">
            <div ref={formRef} className="lg:col-span-3">
              <ContactForm project={project} need={need?.title} />
            </div>
            <div ref={infoRef} className="lg:col-span-2">
              <ContactInfo partnership={!!project || !!need} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
