import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Inline the sticker so the image renders at build time without a network fetch
  const sticker = await readFile(path.join(process.cwd(), "public/images/stickerr.png"));
  const stickerSrc = `data:image/png;base64,${sticker.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, background: "#F7F7F4", padding: 64, fontFamily: "sans-serif" }}>
        {/* Sticker on a cream card so the deep green reads cleanly in link previews */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 440, height: 440, borderRadius: 40, background: "#E9DECA", boxShadow: "0 30px 60px rgba(11,42,31,0.18)" }}>
          <img src={stickerSrc} width={360} height={360} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#324A48", letterSpacing: 4, textTransform: "uppercase" }}>{site.legalName}</div>
          <div style={{ fontSize: 96, fontWeight: 800, color: "#1A1B22", letterSpacing: -4, lineHeight: 1.02, marginTop: 12 }}>Grand Ustad</div>
          <div style={{ fontSize: 34, color: "#4F5260", marginTop: 14 }}>{site.tagline}</div>
          <div style={{ display: "flex", background: "#324A48", color: "#FFFFFF", padding: "14px 28px", borderRadius: 999, fontSize: 24, fontWeight: 700, alignSelf: "flex-start", marginTop: 36 }}>
            Abu Dhabi, UAE · {site.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
