# Aashutosh Sharma — Portfolio

Modern personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- Next.js App Router
- React 19
- Tailwind CSS v4
- EmailJS contact form
- next-themes (dark / light)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and adjust if needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |

Fallback EmailJS values match the previous static site so the form keeps working without a local env file.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: **Next.js**.
4. Add the `NEXT_PUBLIC_*` env vars from `.env.example` (optional if using defaults).
5. Deploy.

## Project structure

- `src/app` — App Router pages, layout, SEO routes
- `src/components` — UI sections
- `src/data/portfolio.ts` — content source of truth
- `public` — images, resume, project visuals
