"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { SendIcon } from "./Illustrations";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "gu-field h-[54px] rounded-[14px] border-[1.5px] border-field bg-white px-4 text-base text-ink placeholder:text-faint";
const area = "gu-field rounded-[14px] border-[1.5px] border-field bg-white px-4 py-3.5 text-base text-ink placeholder:text-faint resize-y";
const label = "flex flex-col gap-2 text-sm font-semibold text-muted";

async function send(form: HTMLFormElement, source: string): Promise<boolean> {
  const data = Object.fromEntries(new FormData(form).entries());
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source }),
  });
  return res.ok;
}

function Notice({ status }: { status: Status }) {
  if (status === "sent") return <p role="status" className="m-0 text-sm font-semibold text-[#1F7A5A]">Message sent. We&rsquo;ll get back to you soon.</p>;
  if (status === "error") return <p role="alert" className="m-0 text-sm font-semibold text-chili">Couldn&rsquo;t send right now. Please try WhatsApp or email instead.</p>;
  return null;
}

/** Contact form: Name, Email, Phone, Message (max 100 words). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await send(form, "contact");
      setStatus(ok ? "sent" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid min-w-0 gap-[18px] sm:grid-cols-2" noValidate={false}>
      <label className={label}>
        Name
        <input name="name" type="text" placeholder="Your name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" placeholder="you@example.com" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Phone
        <input name="phone" type="tel" placeholder="+971 5X XXX XXXX" autoComplete="tel" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Message (max 100 words)
        <textarea name="message" rows={5} placeholder="Tell us about your event, camp or facility…" required maxLength={700} className={area} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="gu-btn h-14 rounded-full bg-saffron px-[30px] text-base font-bold text-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Message"}
        </button>
        <Notice status={status} />
      </div>
    </form>
  );
}

/** Newsletter: "Join our family". */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await send(form, "newsletter");
      setStatus(ok ? "sent" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 pt-1.5">
      <label htmlFor="newsletter-email" className="text-[13px] text-faint">
        Email address
      </label>
      {/* Send button sits inside the pill so field and action read as one control */}
      <div className="relative">
        <input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" className="gu-field h-[56px] w-full rounded-full border-[1.5px] border-field bg-white pl-5 pr-[64px] text-base text-ink placeholder:text-faint" />
        {/* Positioned via a wrapper: .gu-btn forces position: relative for its shine */}
        <span className="absolute inset-y-0 right-[6px] flex items-center">
          <button
            type="submit"
            aria-label="Subscribe"
            disabled={status === "sending"}
            className="gu-btn flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-ink disabled:opacity-60"
          >
            {/* Nudged down-left: the plane's tip pulls the eye up-right */}
            <span className="flex -translate-x-px translate-y-px">
              <SendIcon />
            </span>
          </button>
        </span>
      </div>
      {status === "sent" ? <p role="status" className="m-0 text-sm font-semibold text-[#1F7A5A]">You&rsquo;re on the list.</p> : <Notice status={status} />}
    </form>
  );
}
