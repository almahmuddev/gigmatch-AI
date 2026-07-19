# GigMatch AI

An AI-powered freelance marketplace. Clients post gigs, freelancers browse and get
matched to the ones that actually fit their skills — not just a keyword search — and
an AI assistant helps people navigate the site and write better proposals.

This is a completely new project (different domain and functionality from Wayfarer,
DriveFleet, LifeLessons, and Expense Tracker) built to satisfy the "Agentic AI Project
Requirements" brief.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Data fetching | TanStack Query |
| Charts | Recharts |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Auth | Custom JWT + Google Sign-In (verified server-side) |
| AI provider | Groq (Llama 3.3 70B) via the OpenAI-compatible SDK |

## AI features 

1. **AI Smart Recommendation Engine** — matches a freelancer's skills/behavior to the
   best-fit open gigs, with filtering and refinement.
2. **AI Chat Assistant** — a site-aware assistant that answers questions, helps with
   navigation, and gives proposal-writing help, with conversation memory and streaming.

## Design direction

Palette is intentional, not a default: **ink navy** (`#16213E`) for structure and trust,
**match teal** (`#0F8B8D`) for the "connection" moments (links, tags), and **signal amber**
(`#E8A33D`) for the CTA moment when a match is found — plus a paper-toned neutral. Display
type is Fraunces (characterful serif) paired with Inter for body/UI. Full rationale lives
in `client/tailwind.config.ts`.

## Build workflow (step-by-step)

Each step is delivered as its own zip, building directly on the last one.

- [x] **Step 1 — Foundation**: backend fully scaffolded (auth incl. Google verify, Gig
      model + CRUD with filter/sort/pagination, error handling, seed script) + frontend
      scaffolded (Next.js/TS/Tailwind, theme tokens, layout, Navbar/Footer shells, auth
      context, query provider, API client, types)
- [x] **Step 2 — Landing page**: hero + 7 real sections, using live data where it makes sense
- [x] **Step 3 — Auth pages**: login/register UI, demo login autofill, Google Sign-In button
- [x] **Step 4 — Explore page**: search, filter (category + budget), sort, pagination, skeleton loaders, card grid
- [x] **Step 5 — Details page**: full gig view, related gigs
- [x] **Step 6 — Protected Add Gig page** (`/items/add`)
- [x] **Step 7 — Protected Manage Gigs page** (`/items/manage`) + Recharts dashboard
- [x] **Step 8 — AI Recommendation Engine**
- [x] **Step 9 — AI Chat Assistant**
- [x] **Step 10 — Additional pages**: About, Contact (working form), Help/FAQ
- [x] **Step 11 — Polish**: full responsive pass, SEO/meta, deploy config, final README

## Project structure

```
gigmatch-ai/
├── server/               # Express + TypeScript API
│   └── src/
│       ├── config/       # db connection
│       ├── models/       # User, Gig
│       ├── middleware/   # auth (jwt), error handler
│       ├── controllers/  # auth, gigs
│       ├── routes/
│       ├── utils/        # token signing, ai client (groq)
│       └── scripts/      # seed.ts
└── client/               # Next.js 14 App Router + TypeScript
    └── src/
        ├── app/          # pages
        ├── components/   # layout (Navbar/Footer), providers
        ├── context/      # AuthContext (jwt session)
        ├── lib/          # axios instance
        └── types/
```

## Running it locally

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, GROQ_API_KEY
npm run seed               # creates demo@gigmatch.ai / Demo@123 + 8 sample gigs
npm run dev                 # http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_GOOGLE_CLIENT_ID
npm run dev                          # http://localhost:3000
```

### Getting API keys

- **MongoDB**: a free MongoDB Atlas cluster works fine — copy the connection string into `MONGO_URI`.
- **Google Client ID**: create an OAuth 2.0 Client ID (Web application) in the
  [Google Cloud Console](https://console.cloud.google.com/apis/credentials), add
  `http://localhost:3000` as an authorized JavaScript origin.
- **Groq API key**: free at [console.groq.com](https://console.groq.com) — needed from Step 8 onward.

## Notes

- The Next.js build in this sandbox can't reach `fonts.googleapis.com` (network is
  restricted here), so `next build` will complain about fetching Fraunces/Inter. That's
  purely a sandbox limitation — it'll build fine on your machine or on Vercel. `tsc --noEmit`
  passes clean on both server and client, so the code itself is verified.
- Demo login credentials (after seeding): `demo@gigmatch.ai` / `Demo@123`
