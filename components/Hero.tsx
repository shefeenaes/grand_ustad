import Image from "next/image";
import { site } from "@/content/site";
import { RotatingBadge, Ustad, WhatsAppIcon, MailIcon } from "./Illustrations";

/** 3D ingredients drifting around the hero tiles. Each sits on a 512px transparent square. */
function Spice({ src, className, style }: { src: string; className: string; style?: React.CSSProperties }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style} aria-hidden="true">
      <Image src={src} alt="" width={512} height={512} sizes="120px" className="h-full w-full drop-shadow-[0_18px_22px_rgba(11,42,31,0.35)]" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="banner" className="relative overflow-hidden">
      <div className="gu-glow pointer-events-none absolute -left-[180px] -top-[120px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(50,74,72,0.28),rgba(50,74,72,0)_65%)]" aria-hidden="true" />
      <div className="gu-glow pointer-events-none absolute -bottom-[200px] -right-[200px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(233,222,202,0.9),rgba(233,222,202,0)_65%)] [animation-delay:-7s]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[1320px] flex-wrap items-center gap-12 px-5 pb-16 pt-3 md:px-10 md:pb-24 md:pt-4">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
          <span className="gu-up gu-d1 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.18em] text-brand">
            <span className="h-0.5 w-[30px] bg-brand" />
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
              className="gu-btn inline-flex items-center gap-2.5 rounded-full bg-brand px-[30px] py-[18px] text-base font-bold text-white no-underline"
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
          {/* Tilted deep-green panel ties the three tiles into one composition */}
          <div className="pointer-events-none absolute inset-x-[6%] inset-y-[8%] -rotate-3 rounded-[44px] bg-brand-deep/90 shadow-lift" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-[6%] inset-y-[8%] -rotate-3 rounded-[44px] border border-cream/25" aria-hidden="true" />

          <div className="gu-float gu-img absolute left-0 top-[30px] box-border h-[360px] w-[58%] overflow-hidden rounded-[28px] border-[3px] border-cream shadow-lift sm:h-[420px]">
            <Image src="/images/hero-biryani.jpeg" alt="Grand Ustad signature chicken biryani served in a copper handi" fill priority sizes="(max-width: 768px) 60vw, 400px" className="gu-zoom object-cover" />
          </div>
          <div className="gu-float-b gu-img absolute right-0 top-0 box-border h-[210px] w-[44%] overflow-hidden rounded-3xl border-[3px] border-cream shadow-lift [animation-delay:-2s] sm:h-[250px]">
            <Image src="/images/hero-table.jpeg" alt="Evening event table styled by Grand Ustad with green velvet chairs and florals" fill sizes="(max-width: 768px) 45vw, 300px" className="gu-zoom object-cover" />
          </div>
          <div className="gu-float gu-img absolute bottom-0 right-6 box-border h-[220px] w-[46%] overflow-hidden rounded-3xl border-[3px] border-cream shadow-lift [animation-delay:-4s] sm:h-[260px]">
            <Image src="/images/hero-plate.jpeg" alt="Fine dining lamb chop plated at the Grand Ustad restaurant" fill sizes="(max-width: 768px) 45vw, 300px" className="gu-zoom object-cover" />
          </div>

          {/* 3D ingredients */}
          {/* Kept well inside the tile box: its upward tumble must never carry it under the sticky nav */}
          <Spice src="/images/spice-chili.png" className="gu-tumble left-[42%] top-[64px] z-[4] h-[96px] w-[96px] sm:top-[76px] sm:h-[120px] sm:w-[120px]" />
          <Spice src="/images/spice-leaf.png" className="gu-tumble -right-3 top-[232px] z-[4] h-[80px] w-[80px] sm:top-[270px] sm:h-[100px] sm:w-[100px]" style={{ animationDelay: "-3s", animationDuration: "11s" }} />
          <Spice src="/images/spice-onion.png" className="gu-tumble left-[46%] bottom-2 z-[4] h-[76px] w-[76px] sm:h-[96px] sm:w-[96px]" style={{ animationDelay: "-6s", animationDuration: "13s" }} />

          <Ustad className="gu-up gu-d4 absolute -bottom-4 -left-6 z-[3] h-[260px] w-[230px] drop-shadow-[0_24px_30px_rgba(26,27,34,0.22)] sm:-left-12 sm:h-[340px] sm:w-[300px]" />
          <RotatingBadge className="absolute -left-2 -top-2 z-[5] h-[92px] w-[92px] sm:-left-4 sm:-top-3 sm:h-[112px] sm:w-[112px]" />
        </div>
      </div>
    </section>
  );
}
