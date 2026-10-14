# Grand Ustad — website

Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript rebuild of grandustad.com.
Light theme, original site content, animated "Ustad" chef illustrations, SEO and performance focused.

## Run locally (Windows)

1. Install Node.js 20 LTS or newer from https://nodejs.org
2. Open a terminal in this folder (`C:\Users\user\Desktop\grand ustad`) and run:

```
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```
npm run build
npm start
```

Deploy to Vercel, Netlify, or Cloudflare Pages by connecting the repository, or run `npm run build` on any Node server.

## Where things live

| What | Where |
|---|---|
| All website text (about, services, address, phone, email) | `content/site.ts` |
| Page sections | `components/*.tsx` |
| Animated illustrations (Ustad chef, handi, icons) | `components/Illustrations.tsx` |
| Animations and theme colours | `app/globals.css` |
| SEO metadata, fonts, JSON-LD schema | `app/layout.tsx` |
| Open Graph share image (auto-generated) | `app/opengraph-image.tsx` |
| Sitemap, robots, web manifest | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |
| Contact-form endpoint | `app/api/contact/route.ts` |
| Placeholder images (replace with real photos) | `public/images/*.svg` |

## Replace the placeholder images

Drop your photos into `public/images/` and update the paths in `content/site.ts`
(or keep the same names and use `.jpg`/`.webp`, then change the extension in `site.ts`).
Recommended sizes: hero 1200×800, services 1200×800, gallery 1200×1200 / 1600×800.
Add your real logo as `public/images/logo.svg` and swap the "GU" mark in `components/Nav.tsx` and `components/About.tsx`.

## Forms

- The **Contact us** form posts to `/api/contact`. Without configuration the server logs submissions.
  Set `CONTACT_WEBHOOK_URL` in `.env.local` to forward them to an email/CRM webhook (n8n, Zapier, Make, ERPNext).
- **Contact Us** opens WhatsApp or your email client with the message pre-filled.

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your live domain so canonical links, sitemap and Open Graph tags are correct.

## Performance and SEO checklist built in

- Self-hosted Google Fonts via `next/font` (no layout shift, no third-party request)
- `next/image` with AVIF/WebP, lazy loading, hero image prioritised
- CSS-only animations, scroll reveal via IntersectionObserver, all motion disabled for `prefers-reduced-motion`
- Semantic HTML, skip link, keyboard focus styles, labelled form fields
- Metadata, canonical URL, Open Graph + Twitter cards, generated OG image
- Schema.org JSON-LD (Restaurant / LocalBusiness with services)
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, security headers
