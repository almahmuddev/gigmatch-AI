import { Sparkles, Target, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="rounded-full bg-secondary/10 px-4 py-1 text-sm font-medium text-secondary">
          About GigMatch AI
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold text-primary">
          Matching should save you time, not cost you more of it.
        </h1>
        <p className="mt-4 text-lg text-neutral-soft">
          GigMatch AI is a freelance marketplace built around one idea: instead of scrolling through
          hundreds of gigs hoping something fits, an AI reads the actual requirements against your
          actual skills and tells you where you genuinely stand a chance.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Target size={20} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-primary">Why we exist</h2>
          <p className="mt-2 text-sm text-neutral-soft">
            Most freelance platforms optimize for volume — more listings, more noise. We optimize for
            fit: fewer, better-matched gigs beat a wall of results you&apos;ll never apply to.
          </p>
        </div>

        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Sparkles size={20} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-primary">How the matching works</h2>
          <p className="mt-2 text-sm text-neutral-soft">
            Every open gig is compared against your skills and recent activity, then scored and
            explained in plain language — not just a keyword count, but a reason you can act on.
          </p>
        </div>

        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <ShieldCheck size={20} />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-primary">Built for real use</h2>
          <p className="mt-2 text-sm text-neutral-soft">
            Real authentication, a real database, and a real AI pipeline — this is a fully working
            application, not a static mockup.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-card border border-neutral-line bg-white p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-primary">Have questions or feedback?</h2>
        <p className="mt-2 text-neutral-soft">We&apos;d genuinely like to hear it.</p>
        <a
          href="/contact"
          className="mt-5 inline-flex rounded-lg bg-accent px-6 py-3 font-medium text-primary transition hover:bg-accent-dark"
        >
          Get in touch
        </a>
      </div>
    </div>
  )
}
