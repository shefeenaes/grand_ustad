import { site } from "@/content/site";
import { Spoon } from "./Illustrations";

export default function Ticker() {
  const items = site.services.map((s) => s.title);
  const row = [...items, ...items];
  return (
    <div className="-mx-5 -rotate-[1.2deg] overflow-hidden bg-brand py-4 text-cream" aria-hidden="true">
      <div className="gu-ticker flex w-max items-center gap-12 whitespace-nowrap pl-12 font-display text-xl font-bold">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-12">
            {t}
            <Spoon />
          </span>
        ))}
      </div>
    </div>
  );
}
