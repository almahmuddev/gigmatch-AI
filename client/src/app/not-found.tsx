import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-6xl font-semibold text-primary">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-primary">This gig wandered off</h1>
      <p className="mt-2 text-neutral-soft">
        The page you&apos;re looking for doesn&apos;t exist, or may have been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light"
        >
          Back to home
        </Link>
        <Link
          href="/explore"
          className="rounded-lg border border-primary px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
        >
          Explore gigs
        </Link>
      </div>
    </div>
  )
}
