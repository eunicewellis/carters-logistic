# Carters Logistics 🚚

A complete, worldwide **consignment & logistics** website with real-time shipment
tracking and a full admin dashboard. Built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**.

## Features

### Public website
- **Home** — hero with live tracking search, services, stats, process, testimonials, and CTA
- **About**, **Services**, **FAQ**, **Contact**, **Get a Quote**, **Privacy**, **Terms**
- **Track Shipment** — enter a tracking number to see the product image/name,
  destination address, current status (e.g. *"In Transit"*) with a timeline, and a
  **"Contact Customer Care"** button that opens an email to the company

### Admin dashboard (`/admin`)
- Secure login (username/password with hashed credentials + signed session cookie)
- **Dashboard** — stats and a table of all shipments
- **Add Shipment** — upload a product image (or paste a URL), enter the product name
  and the address it's being shipped to; a **random tracking number is generated automatically**
- **Edit Shipment** — update any detail, including the editable **status/process text**
- **Settings** — edit the company details, tracking page text, the "Contact Customer Care"
  button text, and the **status/timeline step labels** shown to customers

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

### Demo credentials
- **Admin:** http://localhost:3000/admin/login
- Username: `admin`
- Password: `admin123`

A sample shipment with tracking number **`CL-DEMO12345`** is seeded on first run so you
can try the tracking page immediately.

## Configuration

Set these environment variables — in a `.env.local` file locally, or in
**Vercel → Project Settings → Environment Variables**:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_SECRET=change-me-to-a-long-random-string
```

> **Admin login:** username `admin`, password `admin123` by default. Change these
> before going live by setting `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

## Deploying to Vercel

The app is fully wired for production. In **Vercel → Project Settings → Environment
Variables**, add these (the code auto-detects them and falls back to local JSON/files in
development):

- `POSTGRES_URL` — Vercel Postgres (or Neon). Stores shipments, settings, and the admin password.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob. Stores uploaded product images.
- `RESEND_API_KEY` + `EMAIL_FROM` — Resend. Sends the tracking number to the client's email automatically.
- `NEXT_PUBLIC_SITE_URL` — your public domain (e.g. `https://carterslogistic.com`), used in emails.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET` — admin login.

Without these variables the app still runs locally (JSON files + on-disk uploads), so
you can develop and preview everything before connecting services.

## How data is stored

- **Production (Vercel):** Postgres (shipments, settings, admin password) + Vercel Blob (images).
- **Local development:** JSON files under `data/` + images under `public/uploads/`.

The data layer lives in `src/lib/store.ts` (Postgres ↔ JSON switch) and
`src/lib/uploads.ts` (Blob ↔ disk switch).


## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons
- Google Fonts: Poppins + Inter
