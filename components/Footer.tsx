import { site, keepTogether } from "@/content/site";
import Reveal from "./Reveal";
import FooterPlayground from "./FooterPlayground";
import { UstadHead } from "./Illustrations";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate bg-brand-deep text-cream">
      {/* The Ustad peeks over the top edge, hands on the ledge */}
      <Reveal className="gu-peek pointer-events-none absolute left-[8%] top-0 z-20 h-[82px] w-[84px] -translate-y-full">
        <div className="absolute inset-0 overflow-hidden">
          <UstadHead className="gu-peek-head absolute -bottom-[20px] left-1.5 h-[102px] w-[72px]" />
        </div>
        <span aria-hidden="true" className="gu-peek-hand absolute -bottom-[7px] left-0.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-ink bg-skin" />
        <span aria-hidden="true" className="gu-peek-hand absolute -bottom-[7px] right-0.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-ink bg-skin [transition-delay:0.75s]" />
      </Reveal>

      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Reveal className="grid gap-10 pt-14 md:grid-cols-[1.5fr_1fr] md:gap-16 md:pt-20">
          {/* Sign-off */}
          <div className="flex flex-col items-start gap-7">
            <h2 className="m-0 text-[48px] font-extrabold leading-[0.95] tracking-[-0.04em] text-cream sm:text-[60px] lg:text-[76px]">
              {site.footer.lead}{" "}
              <em className="font-accent text-[1.12em] font-normal tracking-[-0.01em] text-cream-deep">{site.footer.accent}</em>
            </h2>
            <a
              href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="gu-link text-base font-semibold text-cream no-underline sm:text-lg"
            >
              {site.footer.cta} <span aria-hidden="true">&#8599;</span>
            </a>
          </div>

          {/* Links + contact, quiet and text-only */}
          <div className="grid grid-cols-2 gap-8 text-[15px] md:grid-cols-[0.8fr_1.2fr] md:pt-3">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-cream/50">Explore</span>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {site.nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="gu-link text-cream/80 no-underline transition-colors hover:text-cream">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <address className="flex flex-col gap-3 not-italic">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-cream/50">Visit us</span>
              <a href={`tel:${site.phoneHref}`} className="text-cream/80 no-underline transition-colors hover:text-cream">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] text-cream/80 no-underline transition-colors hover:text-cream">
                {site.email}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener" className="leading-snug text-cream/80 no-underline transition-colors hover:text-cream">
                {keepTogether(site.address)}
              </a>
            </address>
          </div>
        </Reveal>

        {/* Playground: "Ustad" in Arabic script, centred behind the ingredients */}
        <div className="relative h-[150px] overflow-hidden sm:h-[190px] lg:h-[220px]">
          <span
            aria-hidden="true"
            lang="ar"
            dir="rtl"
            className="font-arabic pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap text-[64px] font-bold leading-none text-cream/[0.2] sm:text-[110px] lg:text-[150px]"
          >
            {site.footer.watermark}
          </span>
          <span aria-hidden="true" className="absolute left-0 top-6 text-xs font-medium tracking-wide text-cream/35">
            {site.footer.hint}
          </span>
        </div>

        <div data-gu-floor className="flex flex-col items-center gap-2 border-t border-cream/15 py-6 text-center text-sm text-cream/55 md:flex-row md:justify-between md:text-left">
          <span>&copy; {year} {site.legalName}. All rights reserved.</span>
          <span>
            Made with <span aria-label="love">&#9829;</span> in Abu&nbsp;Dhabi
          </span>
        </div>
      </div>

      <FooterPlayground />
    </footer>
  );
}
