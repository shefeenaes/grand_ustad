import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto flex max-w-[1320px] flex-col gap-9 px-5 pb-24 md:px-10 md:pb-32">
      <Reveal className="flex flex-col gap-3">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand">Gallery</span>
        <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[56px]">Moments we&rsquo;ve served</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {site.gallery.map((g) => (
          <Reveal key={g.src} className="gu-img relative min-h-[260px] overflow-hidden rounded-3xl border border-line sm:min-h-[420px]">
            <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="gu-zoom object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
