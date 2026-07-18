import Link from 'next/link'
import GigCard from '@/components/gigs/GigCard'
import { Gig } from '@/types'

async function getFeaturedGigs(): Promise<Gig[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs?limit=4&sort=newest`, {
      next: { revalidate: 30 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.gigs || []
  } catch {
    return []
  }
}

export default async function FeaturedGigs() {
  const gigs = await getFeaturedGigs()

  if (gigs.length === 0) return null

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-primary">Freshly posted gigs</h2>
            <p className="mt-2 text-neutral-soft">Real gigs, live from the database, updated as clients post them.</p>
          </div>
          <Link href="/explore" className="text-sm font-medium text-secondary hover:underline">
            View all gigs →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      </div>
    </section>
  )
}
