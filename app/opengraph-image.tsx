import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Inline the logo so the image renders at build time without a network fetch
  const logo = await readFile(path.join(process.cwd(), "public/images/logo-removebg-preview.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, background: "#F7F7F4", padding: 64, fontFamily: "sans-serif" }}>
        {/* Logo on a white card so the gold reads cleanly in link previews */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 440, height: 440, borderRadius: 40, background: "#fff", boxShadow: "0 30px 60px rgba(26,27,34,0.14)" }}>
          <img src={logoSrc} width={380} height={322} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#8C5E12", letterSpacing: 4, textTransform: "uppercase" }}>{site.legalName}</div>
          <div style={{ fontSize: 96, fontWeight: 800, color: "#1A1B22", letterSpacing: -4, lineHeight: 1.02, marginTop: 12 }}>Grand Ustad</div>
          <div style={{ fontSize: 34, color: "#4F5260", marginTop: 14 }}>{site.tagline}</div>
          <div style={{ display: "flex", background: "#F2A93B", color: "#1A1B22", padding: "14px 28px", borderRadius: 999, fontSize: 24, fontWeight: 700, alignSelf: "flex-start", marginTop: 36 }}>
            Abu Dhabi, UAE · {site.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
