import Link from 'next/link'

export default function FinalCta() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-card bg-primary px-8 py-14 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ready to find your next gig?</h2>
          <p className="mt-2 text-white/70">Join freelancers and clients already matching on GigMatch AI.</p>
        </div>
        <Link
          href="/register"
          className="shrink-0 rounded-lg bg-accent px-6 py-3 font-medium text-primary transition hover:bg-accent-dark"
        >
          Create your account
        </Link>
      </div>
    </section>
  )
}
