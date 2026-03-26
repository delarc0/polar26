"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = ["Film", "Brand", "Digital", "Events", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      reset();
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg font-display font-bold uppercase text-polar-lime">
          Message sent
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Name *
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Your name"
          className="mt-1.5 bg-secondary border-white/[0.06] text-foreground placeholder:text-muted-foreground"
        />
        {errors.name && (
          <p role="alert" className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm text-muted-foreground">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          className="mt-1.5 bg-secondary border-white/[0.06] text-foreground placeholder:text-muted-foreground"
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company" className="text-sm text-muted-foreground">
          Company
        </Label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Your company"
          className="mt-1.5 bg-secondary border-white/[0.06] text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div>
        <Label htmlFor="projectType" className="text-sm text-muted-foreground">
          Project Type
        </Label>
        <select
          id="projectType"
          {...register("projectType")}
          className={cn(
            "mt-1.5 flex h-10 w-full border border-white/[0.06] bg-secondary px-3 py-2 text-sm text-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          )}
        >
          <option value="">Select a type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="text-sm text-muted-foreground">
          Message *
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us about your project"
          rows={4}
          className="mt-1.5 bg-secondary border-white/[0.06] text-foreground placeholder:text-muted-foreground resize-none"
        />
        {errors.message && (
          <p role="alert" className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-polar-lime text-[#0A0A0A] px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-polar-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-polar-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
