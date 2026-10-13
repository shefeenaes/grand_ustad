"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const links = site.nav.slice(0, -1);
  const contact = site.nav[site.nav.length - 1];

  return (
    <header className="relative z-20">
      <nav aria-label="Main" className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-5 px-5 py-5 md:px-10 md:py-6">
        <a href="#banner" className="gu-up flex items-center gap-3 text-ink no-underline">
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white font-display text-base font-extrabold text-chili shadow-card">
            GU
          </span>
          <span className="font-display text-[22px] font-bold tracking-tight">{site.name}</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white md:hidden"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>

        <div className="gu-up gu-d1 hidden items-center gap-8 text-[15px] font-semibold md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="gu-link text-ink no-underline">
              {l.label}
            </a>
          ))}
          <a href={contact.href} className="gu-btn rounded-full bg-saffron px-[22px] py-3 font-bold text-ink no-underline">
            {contact.label}
          </a>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-5 mb-4 flex flex-col gap-1 rounded-3xl border border-line bg-white p-3 shadow-card md:hidden"
      >
        {site.nav.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-3 text-base font-semibold text-ink no-underline hover:bg-ground"
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
