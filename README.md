# Eggconomics

Eggconomics is a Next.js app for exploring egg prices across 2850+ U.S. store locations, focusing on egg pricing trends, location and product data with interactive maps, historical charts, and store-level detail pages to help users compare egg prices and spot trends.

The project was originally created during the rise in egg prices in early 2025 as a way to track regional pricing trends and explore whether "eggflation" was reflected consistently across different stores and locations.

Pricing and product data were gathered from Kroger's public-facing API and aggregated into a historical dataset for analysis and visualization. Data gathering was discontinued after a few months.

Inspired by [camelcamelcamel.com](https://camelcamelcamel.com/) and [mccheapest.com](https://pantryandlarder.com/mccheapest).


## Live Demo

View the live app here: [eggconomics.vercel.app](https://eggconomics.vercel.app/)


## Tech stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase SSR client
- Leaflet and React Leaflet for maps
- D3 and TopoJSON for the homepage U.S. map
- Recharts for trend visualizations
- Radix UI primitives for shared UI components

## Environment variables

Create a local `.env` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These variables are required by the server-side Supabase client in [`utils/supabase/server.ts`](/home/pc/Projects/Eggconomics/app/utils/supabase/server.ts:1).

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Add the required environment variables to `.env`.

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
```

## Project structure

```text
app/
  page.tsx                     # Homepage
  layout.tsx                   # Global layout, metadata, nav, footer, theme provider
  locations/
    page.tsx                   # Full-screen map page
    [location]/page.tsx        # Location detail page
  about/
    page.tsx                   # FAQ and contact page
components/
  LocationMap.tsx              # Leaflet map implementation
  ui/                          # Shared UI primitives
utils/supabase/
  locations.ts                 # Location list query
  fredData.ts                  # Historical market trend query
  locationDetails.ts           # Store detail query
  productDetails.ts            # Product list query
  priceHistory.ts              # Product history query
```

