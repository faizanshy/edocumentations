# E DOCUMENTATIONS — Print, Design & Digital

A responsive React + TypeScript + Vite starter built from the supplied project brief. It includes a branded multi-page frontend, print catalogue, service pages, quote/order form, customer auth UI, order tracking UI, an admin workflow starter, and a Supabase SQL schema.

## Requirements

- Node.js 20 or newer recommended
- npm
- A Supabase project for database-backed submissions, auth, customer files and admin operations

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite. On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

## Connect Supabase

1. Create a Supabase project.
2. Copy the Project URL and anon/public key into `.env.local`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Open the Supabase SQL Editor and run `supabase/schema.sql`.
4. In Storage, create a **private** bucket named `order-files`. Review and add appropriate Storage RLS policies before accepting uploads.
5. In Supabase Auth, configure your sign-in options and allowed redirect URLs.
6. Create the first admin account in Auth, then assign its UUID using the SQL comment at the bottom of `schema.sql`.
7. Configure server-side Edge Functions for rate limiting, email notifications, signed file URLs, stronger validation, status history, CSV export and other privileged actions.

**Never put a Supabase service-role key in frontend environment variables.** The frontend uses only the anon key and relies on RLS. The included guest order insert policy is a starting point and should be protected with rate limiting/abuse controls before public launch.

## Important implementation notes

- Without Supabase environment variables, the order form clearly reports that a request was **not submitted**; it does not fake success.
- Prices are not invented. Products without configured pricing should be quoted individually.
- The WhatsApp button is intentionally not shown because no business WhatsApp number was supplied. Email and Instagram links are configured.
- Portfolio entries are explicitly labelled concept work.
- Legal pages are placeholders and need review before production.
- The admin UI is only an interface starter; security is enforced by Supabase RLS and the `user_roles` table, not by hiding a page.
- Customer order tracking requires the customer to be signed in and orders linked to their user ID. Guest-order secure lookup should be implemented with a rate-limited server-side function before public launch.
- The schema includes core tables for profiles, roles, categories, products, options, pricing, orders, files, quotations, status history, enquiries, portfolio, FAQs, packages and settings. Additional Edge Functions and admin UI screens are still needed for full production operation.
- The 3D hero is a lightweight CSS illustration with motion rather than a large WebGL scene. This keeps the first load fast and mobile friendly.

## Build for production

```bash
npm run build
npm run preview
```

Deploy the built `dist/` directory to a static host such as Vercel or Netlify. Configure SPA fallback rewrites for client-side routes. Replace the placeholder sitemap domain with the final production domain.

## Brand contact

- Business: E DOCUMENTATIONS
- Email: faizanshy7@gmail.com
- Instagram: https://www.instagram.com/edocumentations/
