import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

const spans: Record<string, string> = {
  large: "sm:col-span-2 sm:row-span-2 min-h-[260px] sm:min-h-0",
  small: "min-h-[220px]",
  wide: "sm:col-span-2 min-h-[220px]",
};

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto flex max-w-[1320px] flex-col gap-9 px-5 pb-24 md:px-10 md:pb-32">
      <Reveal className="flex flex-col gap-3">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-saffron">Gallery</span>
        <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[56px]">Moments we&rsquo;ve served</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-4 sm:auto-rows-[220px]">
        {site.gallery.map((g, i) => (
          <Reveal key={g.src} className={`gu-img relative overflow-hidden rounded-3xl border border-line ${spans[g.span]}`}>
            <a href={g.src} target="_blank" rel="noopener" className="block h-full w-full" aria-label={`View image: ${g.alt}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="gu-zoom object-cover" />
              {i === 0 && (
                <span className="absolute bottom-[18px] right-[18px] rounded-full bg-white px-3.5 py-2 text-[13px] font-bold text-ink">View Image</span>
              )}
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
