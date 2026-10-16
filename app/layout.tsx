import type { Metadata, Viewport } from "next";
import { Outfit, Figtree, Instrument_Serif, Cairo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

// Footer watermark only, so it is not preloaded
const cairo = Cairo({
  subsets: ["arabic"],
  weight: "700",
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline} in Abu Dhabi, UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Grand Ustad",
    "catering services Abu Dhabi",
    "outdoor events UAE",
    "wedding events Abu Dhabi",
    "corporate events Abu Dhabi",
    "event management and decor Abu Dhabi",
    "party and meal orders Abu Dhabi",
    "fine dining restaurant Musaffah",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.png", apple: "/icon-192.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#324a48",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  description: site.description,
  servesCuisine: ["Indian", "South Indian", "Kerala", "Multi-cuisine"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressParts.street,
    addressLocality: site.addressParts.locality,
    addressRegion: site.addressParts.region,
    addressCountry: site.addressParts.country,
  },
  hasMap: site.mapsUrl,
  areaServed: "United Arab Emirates",
  makesOffer: site.services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.description },
  })),
  sameAs: [`https://wa.me/${site.whatsapp}`],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${figtree.variable} ${instrumentSerif.variable} ${cairo.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
