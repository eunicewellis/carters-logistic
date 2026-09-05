# Carters Logistics 🚚

A complete, USA-based **consignment & logistics** website with real-time shipment
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

Copy `.env.example` to `.env.local` to change the admin credentials:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## How data is stored

Data is persisted as JSON files under the `data/` directory (shipments, settings, and
auth), and uploaded product images are stored in `public/uploads/`. This keeps the app
zero-config — no external database required. For production, swap the helpers in
`src/lib/db.ts` for a real database (Postgres, MySQL, etc.).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons
- Google Fonts: Poppins + Inter
