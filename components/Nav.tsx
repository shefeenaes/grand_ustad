"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { ArrowIcon } from "./Illustrations";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(site.nav[0].href);
  const links = site.nav.slice(0, -1);
  const contact = site.nav[site.nav.length - 1];

  // Condense into a floating island once the hero scrolls away
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently in view
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = site.nav
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`gu-nav sticky top-0 z-40 ${scrolled || open ? "is-scrolled" : ""}`}>
      {/* Brand accent stripe, mirrors the footer */}
      <span aria-hidden="true" className="gu-nav-stripe block h-[3px] bg-[linear-gradient(90deg,#F2A93B,#E3452F_55%,#F2A93B)]" />

      <div className="gu-nav-shell px-3 md:px-6">
        <nav aria-label="Main" className="gu-navbar flex items-center justify-between gap-5 px-3 py-3 md:px-5 md:py-3">
          <a href="#banner" aria-label={`${site.name} — home`} className="gu-up gu-brand flex items-center no-underline">
            <Image
              src="/images/logo-without-tagline-removebg-preview.png"
              alt={site.name}
              width={602}
              height={414}
              priority
              sizes="(max-width: 768px) 70px, 84px"
              className="gu-logo-img h-12 w-auto md:h-16"
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`gu-burger flex h-11 w-11 items-center justify-center rounded-full border border-saffron/40 bg-saffron/15 md:hidden ${open ? "is-open" : ""}`}
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span className="gu-burger-line top-0" />
              <span className="gu-burger-line top-1/2 -translate-y-1/2" />
              <span className="gu-burger-line bottom-0" />
            </span>
          </button>

          <div className="gu-up gu-d1 hidden items-center gap-3 md:flex">
            <ul className="m-0 flex list-none items-center gap-1 p-0 text-[15px] font-semibold">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "location" : undefined}
                    className={`gu-navlink rounded-full px-4 py-2 no-underline ${active === l.href ? "is-active text-ink" : "text-muted"}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={contact.href} className="gu-btn gu-contact inline-flex h-12 items-center gap-2.5 rounded-full pl-6 pr-2 font-bold text-ink no-underline">
              {contact.label}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
        </nav>
      </div>

      <div id="mobile-menu" className={`gu-mobile-menu md:hidden ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {/* Collapsible wrapper carries no margin, so the closed menu is exactly 0px tall */}
        <div>
        <div className="mx-4 mb-4 flex flex-col gap-1 rounded-[28px] border border-saffron/30 bg-white p-3 shadow-lift">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={`gu-mobile-item flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold no-underline ${
                active === l.href ? "bg-saffron/15 text-ink" : "text-muted"
              }`}
            >
              {l.label}
              <ArrowIcon className="h-4 w-4 text-saffron" />
            </a>
          ))}
          <a
            href={contact.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${60 + links.length * 40}ms` : "0ms" }}
            className="gu-mobile-item gu-btn gu-contact mt-2 flex h-[52px] items-center justify-center gap-2 rounded-full text-base font-bold text-ink no-underline"
          >
            {contact.label}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
        </div>
      </div>
    </header>
  );
}
