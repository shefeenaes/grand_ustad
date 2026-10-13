import Image from "next/image";
import { site } from "@/content/site";
import { Handi, Spices, RotatingBadge, Ustad, WhatsAppIcon, MailIcon } from "./Illustrations";

export default function Hero() {
  return (
    <section id="banner" className="relative overflow-hidden">
      <div className="gu-glow pointer-events-none absolute -left-[180px] -top-[120px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.45),rgba(242,169,59,0)_65%)]" aria-hidden="true" />
      <div className="gu-glow pointer-events-none absolute -bottom-[200px] -right-[200px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(227,69,47,0.28),rgba(227,69,47,0)_65%)] [animation-delay:-7s]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1320px] flex-wrap items-center gap-12 px-5 pb-16 pt-3 md:px-10 md:pb-24 md:pt-4">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
          <span className="gu-up gu-d1 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.18em] text-saffron">
            <span className="h-0.5 w-[30px] bg-saffron" />
            {site.legalName}
          </span>
          <h1 className="gu-up gu-d2 m-0 text-[64px] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-[84px] lg:text-[108px]">
            Grand
            <br />
            Ustad
          </h1>
          <p className="gu-up gu-d3 m-0 text-xl font-medium leading-snug text-muted sm:text-[26px]">{site.tagline}</p>
          <div className="gu-up gu-d4 flex flex-wrap gap-3.5 pt-2">
            <a
              href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="gu-btn inline-flex items-center gap-2.5 rounded-full bg-saffron px-[30px] py-[18px] text-base font-bold text-ink no-underline"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="gu-btn inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-field bg-white px-[30px] py-[17px] text-base font-bold text-ink no-underline"
            >
              <MailIcon />
              Mail
            </a>
          </div>
        </div>

        <div className="relative h-[480px] min-w-0 flex-[1_1_480px] sm:h-[560px]">
          <div className="gu-float gu-img absolute left-0 top-[30px] box-border flex h-[360px] w-[58%] items-end rounded-[28px] border border-line p-4 shadow-lift sm:h-[420px]">
            <Image src="/images/hero-biryani.svg" alt="Signature biryani from Grand Ustad" fill priority sizes="(max-width: 768px) 60vw, 400px" className="gu-zoom rounded-[28px] object-cover" />
            <Handi className="absolute left-1/2 top-1/2 h-[218px] w-[240px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="gu-float-b gu-img absolute right-0 top-0 box-border h-[210px] w-[44%] overflow-hidden rounded-3xl border border-line shadow-lift [animation-delay:-2s] sm:h-[250px]">
            <Image src="/images/hero-buffet.svg" alt="Catering buffet by Grand Ustad" fill sizes="(max-width: 768px) 45vw, 300px" className="gu-zoom object-cover" />
          </div>
          <div className="gu-float gu-img absolute bottom-0 right-6 box-border h-[220px] w-[46%] overflow-hidden rounded-3xl border border-line shadow-lift [animation-delay:-4s] sm:h-[260px]">
            <Image src="/images/hero-event.svg" alt="Outdoor event catered by Grand Ustad at night" fill sizes="(max-width: 768px) 45vw, 300px" className="gu-zoom object-cover" />
          </div>
          <Spices />
          <Ustad className="gu-up gu-d4 absolute -bottom-4 -left-6 z-[3] h-[260px] w-[230px] drop-shadow-[0_24px_30px_rgba(26,27,34,0.22)] sm:-left-12 sm:h-[340px] sm:w-[300px]" />
          <RotatingBadge className="absolute right-2 top-[240px] z-[2] h-[110px] w-[110px]" />
        </div>
      </div>
    </section>
  );
}
