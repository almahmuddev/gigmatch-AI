# GigMatch AI

An AI-powered freelance marketplace. Clients post gigs, freelancers browse and get
matched to the ones that actually fit their skills — not just a keyword search — and
an AI assistant helps people navigate the site and write better proposals.


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


## Build workflow (step-by-step)

Each step is delivered as its own zip, building directly on the last one.

- [x] **Step 1 — Foundation**: backend fully scaffolded (auth incl. Google verify, Gig
      model + CRUD with filter/sort/pagination, error handling, seed script) + frontend
      scaffolded (Next.js/TS/Tailwind, theme tokens, layout, Navbar/Footer shells, auth
      context, query provider, API client, types)
- [x] **Step 2 — Landing page**: Hero (animated "match" signature element) + How It Works
      + Browse by Category (live) + Live Platform Stats (live) + Featured Gigs (live,
      reusable `GigCard`) + Why GigMatch AI + Testimonials + FAQ (interactive accordion)
      + closing CTA. Added `/api/gigs/stats/summary` and `/api/gigs/categories/summary`
      endpoints to power the live sections.
- [x] **Step 3 — Auth pages**: login/register UI, demo login autofill, Google Sign-In button
- [x] **Step 4 — Explore page**: search, filter (category + budget + location), sort,
      pagination, skeleton loaders, card grid
- [x] **Step 5 — Details page**: full gig view, skills, honest "no reviews yet" note,
      related gigs, mailto contact CTA
- [x] **Step 6 — Protected Add Gig page** (`/items/add`)
- [x] **Step 7 — Protected Manage Gigs page** (`/items/manage`) + Recharts dashboard
      (views per gig, budget by category)
- [x] **Step 8 — AI Recommendation Engine**: skill-overlap shortlist → Groq scores and
      explains fit → falls back gracefully if the AI call fails. Tracks recent views to
      improve matches over time. Filtering/refinement by category and min fit score.
- [x] **Step 9 — AI Chat Assistant**: floating widget on every page, streamed token-by-token,
      typing indicator, conversation memory, suggested starter/follow-up prompts, aware of
      live platform data and the logged-in user's profile
- [x] **Step 10 — Additional pages**: About, Contact (working mailto form), Help Center
      (categorized FAQ), Terms & Privacy
- [x] **Step 11 — Polish**: mobile nav menu (was a real gap — nav links were `hidden md:flex`
      with no mobile fallback), per-page SEO metadata, dynamic sitemap.xml + robots.txt,
      custom 404 page, deployment config for Vercel + Render

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

- **MongoDB**: a free MongoDB Atlas cluster — copy the connection string into `MONGO_URI`.
- **Google Client ID**: create an OAuth 2.0 Client ID (Web application) in the
  [Google Cloud Console](https://console.cloud.google.com/apis/credentials), add
  `http://localhost:3000` as an authorized JavaScript origin.
- **Groq API key**: free at [console.groq.com](https://console.groq.com) — needed from Step 8 onward.

## Notes

- Demo login credentials (after seeding): `demo@gigmatch.ai` / `Demo@123`
