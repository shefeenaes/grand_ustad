import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

/** Grid span and responsive `sizes` for each tile shape in the mosaic. */
const tiles = {
  feature: { span: "col-span-2 row-span-2", sizes: "(max-width: 1024px) 100vw, 640px" },
  tall: { span: "row-span-2", sizes: "(max-width: 1024px) 50vw, 320px" },
  wide: { span: "col-span-2", sizes: "(max-width: 1024px) 100vw, 640px" },
} as const;

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto flex max-w-[1320px] flex-col gap-9 px-5 pb-24 md:px-10 md:pb-32">
      <Reveal className="flex flex-col gap-3">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand">Gallery</span>
        <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[56px]">Moments we&rsquo;ve served</h2>
      </Reveal>
      <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
        {site.gallery.map((g) => (
          <Reveal key={g.src} className={`gu-img relative overflow-hidden rounded-2xl border border-line sm:rounded-3xl ${tiles[g.size].span}`}>
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes={tiles[g.size].sizes}
              quality={85}
              className="gu-zoom object-cover"
              style={"focus" in g ? { objectPosition: g.focus } : undefined}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
