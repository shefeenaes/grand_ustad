import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import { NewsletterForm } from "./ContactForms";
import { PinIcon, MailIcon, PhoneIcon } from "./Illustrations";

function ContactLine({ icon, href, children, className = "" }: { icon: React.ReactNode; href?: string; children: React.ReactNode; className?: string }) {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-saffron-deep shadow-[0_4px_12px_rgba(26,27,34,0.08)] [&_svg]:h-[18px] [&_svg]:w-[18px]">
        {icon}
      </span>
      <span className="leading-snug">{children}</span>
    </>
  );
  const base = `flex items-center gap-3 text-[15px] text-muted ${className}`;
  return href ? (
    <a href={href} className={`${base} no-underline transition-colors hover:text-ink`}>
      {inner}
    </a>
  ) : (
    <span className={base}>{inner}</span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#ECEDE9]">
      {/* Saffron accent line */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#F2A93B,#E3452F_55%,#F2A93B)]" />
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 px-5 pb-8 pt-14 md:gap-14 md:px-10 md:pt-20">
        <Reveal className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-12">
          {/* Brand + newsletter */}
          <div className="flex max-w-[520px] flex-col gap-4">
            <a href="#banner" aria-label={`${site.name} — home`} className="flex items-center no-underline">
              <Image src="/images/logo-mark-hd.png" alt={site.name} width={862} height={593} quality={95} sizes="280px" className="gu-logo-img h-[72px] w-auto" />
            </a>
            <h2 className="m-0 text-[32px] font-extrabold leading-none tracking-[-0.03em] md:text-[36px]">{site.newsletter.title}</h2>
            <p className="m-0 text-base leading-relaxed text-muted">{site.newsletter.text}</p>
            <NewsletterForm />
          </div>

          {/* Explore (desktop only) */}
          <nav aria-label="Footer" className="hidden flex-col gap-3 md:flex">
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">Explore</span>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="gu-link text-[15px] font-semibold text-muted no-underline hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit us — phone + email on mobile, full address on desktop */}
          <address className="flex flex-col gap-3 not-italic">
            <span className="hidden text-[13px] font-bold uppercase tracking-[0.16em] text-faint md:block">Visit us</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col">
              <ContactLine icon={<PhoneIcon />} href={`tel:${site.phoneHref}`}>
                {site.phone}
              </ContactLine>
              <ContactLine icon={<MailIcon />} href={`mailto:${site.email}`}>
                {site.email}
              </ContactLine>
              <ContactLine icon={<PinIcon />} className="hidden md:flex">
                {site.address}
              </ContactLine>
            </div>
          </address>
        </Reveal>

        <div className="flex flex-col items-center gap-3 border-t border-line pt-6 text-center text-sm text-faint md:flex-row md:justify-between md:text-left">
          <span>&copy; {year} {site.legalName}. All rights reserved.</span>
          <span className="hidden items-center gap-2 md:flex">
            Made with
            <span aria-label="love" className="text-chili">&#9829;</span>
            in Abu Dhabi
          </span>
        </div>
      </div>
    </footer>
  );
}
