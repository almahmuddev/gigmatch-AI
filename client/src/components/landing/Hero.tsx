import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative flex min-h-[64vh] items-center overflow-hidden bg-neutral-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-8">
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-medium text-secondary">
            AI-matched, not just keyword-searched
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">
            Find the gig that actually fits your skills.
          </h1>
          <p className="mt-5 text-lg text-neutral-soft">
            Post a project or browse open gigs — GigMatch AI reads your skills and the gig&apos;s
            requirements, then tells you how well you fit before you spend an hour writing a proposal.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/explore"
              className="rounded-lg bg-accent px-6 py-3 font-medium text-primary transition hover:bg-accent-dark"
            >
              Explore Gigs
            </Link>
            <Link
              href="/items/add"
              className="rounded-lg border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Post a Gig
            </Link>
          </div>
        </div>

        {/* signature element: a match "arriving" between a freelancer and a gig */}
        <div className="relative h-64 w-full max-w-md shrink-0">
          <div className="absolute left-0 top-2 w-44 rounded-card border border-neutral-line bg-white p-4 shadow-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15 text-sm font-semibold text-secondary">
              S
            </div>
            <p className="mt-2 text-sm font-semibold text-primary">Sarah R.</p>
            <p className="text-xs text-neutral-soft">React · Tailwind · Next.js</p>
          </div>

          <div className="absolute bottom-2 right-0 w-48 rounded-card border border-neutral-line bg-white p-4 shadow-md">
            <p className="text-xs font-medium text-secondary">Web Development</p>
            <p className="mt-1 text-sm font-semibold text-primary">SaaS Landing Page</p>
            <p className="text-xs text-neutral-soft">৳15,000 budget</p>
          </div>

          <div className="absolute left-1/2 top-1/2 h-px w-[220px] -translate-x-1/2 -translate-y-1/2">
            <div className="h-px w-full border-t-2 border-dashed border-secondary/40" />
            <div className="match-dot absolute top-0 h-3 w-3 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(232,163,61,0.25)]" />
            <div className="match-badge absolute left-1/2 top-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
              ✓ 94% match
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
