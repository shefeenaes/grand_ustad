import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F7F7F4", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: 36, background: "#fff", color: "#E3452F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800 }}>GU</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1A1B22" }}>{site.legalName}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 132, fontWeight: 800, color: "#1A1B22", letterSpacing: -6, lineHeight: 1 }}>Grand Ustad</div>
            <div style={{ fontSize: 40, color: "#4F5260", marginTop: 16 }}>{site.tagline}</div>
          </div>
          <div style={{ display: "flex", background: "#F2A93B", color: "#1A1B22", padding: "14px 28px", borderRadius: 999, fontSize: 26, fontWeight: 700, alignSelf: "flex-start" }}>Abu Dhabi, UAE · {site.phone}</div>
        </div>
      </div>
    ),
    size,
  );
}
