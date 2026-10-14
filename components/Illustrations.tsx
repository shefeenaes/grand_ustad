// Hand-drawn SVG illustrations. All motion is CSS (see globals.css) and respects prefers-reduced-motion.

import Image from "next/image";

const INK = "#1A1B22";
const SAFFRON = "#F2A93B";
const CHILI = "#E3452F";
const SKIN = "#F6E2CF";
const STEAM = "#9A9DAA";
// Mascot palette (matches the logo): gold outlines, red fez, brown moustache
const GOLD = "#B8862E";
const GOLD_DARK = "#8C5E12";
const BROWN = "#4A2E0E";
const FEZ = "#D7352B";

export function Steam({ paths, width = 3 }: { paths: string[]; width?: number }) {
  return (
    <g className="gu-steam" fill="none" stroke={STEAM} strokeWidth={width} strokeLinecap="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

/** Copper biryani handi with rising steam (hero tile). */
export function Handi({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 200" className={className}>
      <Steam paths={["M82 70c-7-9 7-16 0-26", "M110 64c-7-9 7-16 0-26", "M138 70c-7-9 7-16 0-26"]} width={4} />
      <ellipse cx="110" cy="176" rx="76" ry="9" fill="rgba(26,27,34,0.12)" />
      <path d="M44 98 Q44 168 110 168 Q176 168 176 98 Z" fill="#C9743A" />
      <path d="M52 110 Q60 150 110 152 Q160 150 168 110" fill="none" stroke="#E0905A" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="110" cy="98" rx="70" ry="13" fill="#E0905A" />
      <g className="gu-sizzle">
        <ellipse cx="110" cy="90" rx="58" ry="11" fill={SAFFRON} />
        <rect x="104" y="72" width="12" height="12" rx="4" fill={CHILI} />
      </g>
      <path d="M30 100 h-12 M202 100 h-12" stroke="#C9743A" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/** Drifting spices around the hero. */
export function Spices() {
  return (
    <>
      <div className="gu-drift absolute left-[46%] -top-1 h-11 w-11" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <path d="M10 34 C12 16 24 8 36 6 C34 20 26 32 10 34 Z" fill={CHILI} />
          <path d="M36 6 c-3-2-6 0-7 3" stroke="#1FA67E" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="gu-drift absolute left-[52%] bottom-[300px] h-10 w-10 [animation-delay:-3s]" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <path d="M20 2 L24 14 L37 14 L27 22 L31 35 L20 27 L9 35 L13 22 L3 14 L16 14 Z" fill="#8C5E12" />
        </svg>
      </div>
      <div className="gu-drift absolute right-[42%] top-[270px] h-9 w-9 [animation-delay:-5s]" aria-hidden="true">
        <svg viewBox="0 0 36 36">
          <path d="M6 30 C6 14 14 6 30 6 C30 22 22 30 6 30 Z" fill="#1FA67E" />
          <path d="M8 28 L26 10" stroke="#DDEBE3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

/** Rotating "Restaurant · Catering · Events" ring. */
export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    // Caller positions the badge (absolute); that also makes it the containing block for the ring and head
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="gu-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="gu-circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#F7F7F4" stroke={SAFFRON} strokeWidth="1" />
        <text fontFamily="var(--font-outfit), sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="2.6" fill={INK}>
          <textPath href="#gu-circ">RESTAURANT · CATERING · EVENTS · UAE ·</textPath>
        </text>
      </svg>
      {/* Mascot head stays still while the ring spins around it */}
      <Image src="/images/mascot-head.png" alt="" width={199} height={213} sizes="60px" className="absolute left-1/2 top-1/2 h-[44%] w-auto -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

/** The Ustad: master chef presenting a dish and waving (hero). */
export function Ustad({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 340" className={className}>
      <ellipse cx="150" cy="330" rx="96" ry="9" fill="rgba(26,27,34,0.12)" />
      <path d="M86 326 V220 Q86 180 150 180 Q214 180 214 220 V326 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3.5" />
      <path d="M86 326 H214" stroke={INK} strokeWidth="3.5" />
      <path d="M120 215 h60 M120 248 h60" stroke="#E3E4E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="136" cy="232" r="4" fill={INK} />
      <circle cx="164" cy="232" r="4" fill={INK} />
      <rect x="96" y="268" width="108" height="14" rx="7" fill={SAFFRON} stroke={INK} strokeWidth="3" />
      <path d="M86 226 L38 250" stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="252" r="10" fill={SKIN} stroke={INK} strokeWidth="3.5" />
      <g transform="translate(0,-6)">
        <ellipse cx="34" cy="240" rx="30" ry="6" fill={INK} />
        <circle cx="34" cy="235" r="7" fill={CHILI} />
        <g className="gu-cloche">
          <path d="M8 232 A26 26 0 0 1 60 232 Z" fill={SAFFRON} stroke={INK} strokeWidth="3" />
          <circle cx="34" cy="204" r="4" fill={INK} />
        </g>
        <Steam paths={["M22 200c-4-6 4-10 0-16", "M34 196c-4-6 4-10 0-16", "M46 200c-4-6 4-10 0-16"]} />
      </g>
      <g className="gu-wave">
        <path d="M214 222 L262 172" stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="266" cy="168" r="10" fill={SKIN} stroke={INK} strokeWidth="3.5" />
      </g>
      {/* Head, styled after the logo mascot: gold outline, wink, handlebar moustache, red fez */}
      <circle cx="150" cy="130" r="44" fill={SKIN} stroke={GOLD} strokeWidth="3.5" />
      <g className="gu-blink">
        <circle cx="134" cy="128" r="4.2" fill={BROWN} />
      </g>
      <path d="M158 128 q8-7 16 0" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M124 116 q8-6 16 0 M158 112 q8-7 18 1" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path
        d="M150 148 C160 142 174 144 184 152 C190 148 194 142 192 136 C195 146 190 160 176 162 C166 164 156 160 150 156 C144 160 134 164 124 162 C110 160 105 146 108 136 C106 142 110 148 116 152 C126 144 140 142 150 148 Z"
        fill={GOLD}
        stroke={GOLD_DARK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M140 163 Q150 171 160 163" stroke={BROWN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M114 96 L121 46 Q150 32 179 46 L186 96 Z" fill={FEZ} stroke={GOLD_DARK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M108 92 Q150 80 192 92 L192 102 Q150 116 108 102 Z" fill="#FFFFFF" stroke={GOLD} strokeWidth="3" strokeLinejoin="round" />
      {/* Tassel, drawn over the fez: outlined cord from the crown, band, teardrop bundle with highlight and fringe */}
      <path d="M144 38 Q114 42 106 70" stroke={GOLD_DARK} strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M144 38 Q114 42 106 70" stroke={FEZ} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Head knob, wrapped band, then a skirt of loose strands with ragged ends */}
      <ellipse cx="106" cy="74" rx="5" ry="4.5" fill={FEZ} stroke={GOLD_DARK} strokeWidth="1.4" />
      <path d="M101 81 H111 L114 104 L111 103 L109 106 L106 103 L103 106 L101 103 L98 104 Z" fill={FEZ} stroke={GOLD_DARK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M103 82 L100 103 M105 82 L104 104 M107 82 L108 104 M109 82 L112 103" stroke="#A8241C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <rect x="100.5" y="77" width="11" height="4.5" rx="2" fill={GOLD} stroke={GOLD_DARK} strokeWidth="1" />
    </svg>
  );
}

/** Smaller waving chef (Get in Touch). */
export function Chef({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 240" className={className}>
      <ellipse cx="120" cy="224" rx="70" ry="9" fill="rgba(26,27,34,0.12)" />
      <path d="M70 220 V150 Q70 120 120 120 Q170 120 170 150 V220 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <path d="M96 150 h48 M96 175 h48" stroke="#E3E4E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="160" r="3.5" fill={INK} />
      <circle cx="130" cy="160" r="3.5" fill={INK} />
      <path d="M70 160 L40 190" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="193" r="8" fill={SKIN} stroke={INK} strokeWidth="3" />
      <g className="gu-wave">
        <path d="M170 150 L205 115" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="208" cy="112" r="8" fill={SKIN} stroke={INK} strokeWidth="3" />
      </g>
      {/* Same mascot head as Ustad, scaled to this figure */}
      <circle cx="120" cy="86" r="34" fill={SKIN} stroke={GOLD} strokeWidth="3" />
      <g className="gu-blink">
        <circle cx="108" cy="84.5" r="3.4" fill={BROWN} />
      </g>
      <path d="M126 84 q6-5 12 0" stroke={BROWN} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M100 75 q6-5 12 0 M126 72 q6-5 14 1" stroke={BROWN} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path
        d="M120 99.9 C127.7 95.2 138.5 96.8 146.2 102.9 C150.8 99.9 153.9 95.2 152.3 90.6 C154.7 98.3 150.8 109.1 140 110.6 C132.3 112.2 124.6 109.1 120 106 C115.4 109.1 107.7 112.2 100 110.6 C89.2 109.1 85.3 98.3 87.7 90.6 C86.1 95.2 89.2 99.9 93.8 102.9 C101.5 96.8 112.3 95.2 120 99.9 Z"
        fill={GOLD}
        stroke={GOLD_DARK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M112 111 Q120 117 128 111" stroke={BROWN} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M92 60 L97 21 Q120 10 143 21 L148 60 Z" fill={FEZ} stroke={GOLD_DARK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M88 57 Q120 47 152 57 L152 64 Q120 75 88 64 Z" fill="#FFFFFF" stroke={GOLD} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M115 15 Q92 18 86 40" stroke={GOLD_DARK} strokeWidth="4.4" strokeLinecap="round" fill="none" />
      <path d="M115 15 Q92 18 86 40" stroke={FEZ} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <ellipse cx="86" cy="43" rx="3.9" ry="3.5" fill={FEZ} stroke={GOLD_DARK} strokeWidth="1.1" />
      <path d="M82.3 48.3 H90 L92.3 66 L90 65.2 L88.4 67.5 L86.1 65.2 L83.8 67.5 L82.3 65.2 L80 66 Z" fill={FEZ} stroke={GOLD_DARK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M83.8 49 L81.5 65 M85.4 49 L84.6 66 M86.9 49 L87.7 66 M88.4 49 L90.7 65" stroke="#A8241C" strokeWidth="1" strokeLinecap="round" fill="none" />
      <rect x="81.8" y="45.3" width="8.5" height="3.4" rx="1.5" fill={GOLD} stroke={GOLD_DARK} strokeWidth="0.8" />
    </svg>
  );
}

/** Animated service icons. */
export function ServiceIcon({ kind }: { kind: string }) {
  const common = { viewBox: "0 0 48 48", className: "h-10 w-10", "aria-hidden": true as const };
  switch (kind) {
    case "tent":
      return (
        <svg {...common}>
          <path d="M4 40 L24 12 L44 40 Z" fill={SAFFRON} />
          <path d="M16 40 L24 24 L32 40 Z" fill="#F7F7F4" />
          <path d="M24 12 V4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <path className="gu-flag" d="M24 4 L36 7 L24 10 Z" fill={CHILI} />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="18" cy="29" r="11" fill="none" stroke={SAFFRON} strokeWidth="4" />
          <circle cx="30" cy="29" r="11" fill="none" stroke={INK} strokeWidth="4" />
          <path className="gu-flag" d="M30 18 L26 12 L30 6 L34 12 Z" fill={CHILI} />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <path d="M18 14 V9 a2 2 0 0 1 2-2 h8 a2 2 0 0 1 2 2 V14" fill="none" stroke={INK} strokeWidth="3" />
          <rect x="5" y="14" width="38" height="26" rx="4" fill={SAFFRON} />
          <rect x="5" y="24" width="38" height="4" fill={INK} />
          <rect x="21" y="22" width="6" height="8" rx="1.5" fill={CHILI} />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <g className="gu-gear">
            <circle cx="24" cy="24" r="9" fill="none" stroke={INK} strokeWidth="4" />
            <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          </g>
          <circle cx="24" cy="24" r="4" fill={SAFFRON} />
        </svg>
      );
    case "trays":
      return (
        <svg {...common}>
          <Steam paths={["M18 18c-3-4 3-7 0-11", "M30 18c-3-4 3-7 0-11", "M24 16c-3-4 3-7 0-11"]} width={2.5} />
          <rect x="6" y="20" width="36" height="9" rx="2" fill={SAFFRON} />
          <rect x="6" y="32" width="36" height="9" rx="2" fill={CHILI} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <ellipse cx="24" cy="38" rx="20" ry="4" fill={INK} />
          <circle cx="24" cy="34" r="5" fill={CHILI} />
          <g className="gu-cloche">
            <path d="M6 32 A18 18 0 0 1 42 32 Z" fill={SAFFRON} />
            <circle cx="24" cy="12" r="3" fill={INK} />
          </g>
        </svg>
      );
  }
}

export function ForkKnife() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5" />
      <path d="M16 3c-2 2-2 8 0 10v8" />
    </svg>
  );
}

export function Spoon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill={INK}>
      <ellipse cx="12" cy="7" rx="5" ry="6.5" />
      <rect x="10.5" y="12" width="3" height="11" rx="1.5" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
