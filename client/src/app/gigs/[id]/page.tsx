import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Wallet, MapPin, Calendar, Eye } from 'lucide-react'
import GigCard from '@/components/gigs/GigCard'
import { Gig } from '@/types'

interface GigDetailsResponse {
  gig: Gig
  related: Gig[]
}

async function getGig(id: string): Promise<GigDetailsResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatBudget(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

export default async function GigDetailsPage({ params }: { params: { id: string } }) {
  const data = await getGig(params.id)

  if (!data) notFound()

  const { gig, related } = data

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/explore" className="text-sm font-medium text-secondary hover:underline">
        ← Back to Explore
      </Link>

      <div className="mt-4 overflow-hidden rounded-card border border-neutral-line bg-white">
        <div className="relative h-72 w-full bg-neutral-bg sm:h-96">
          {gig.imageUrl ? (
            <Image src={gig.imageUrl} alt={gig.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-soft">No image</div>
          )}
        </div>

        <div className="p-6 sm:p-10">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {gig.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary">{gig.title}</h1>
          <p className="mt-2 text-sm text-neutral-soft">
            Posted by {gig.postedBy?.name || 'a GigMatch member'} on {formatDate(gig.createdAt)}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-card bg-neutral-bg p-5 sm:grid-cols-4">
            <div>
              <Wallet className="text-secondary" size={18} />
              <p className="mt-1 text-sm font-semibold text-primary">৳{formatBudget(gig.budget)}</p>
              <p className="text-xs text-neutral-soft">Budget</p>
            </div>
            <div>
              <MapPin className="text-secondary" size={18} />
              <p className="mt-1 text-sm font-semibold capitalize text-primary">{gig.location}</p>
              <p className="text-xs text-neutral-soft">Location</p>
            </div>
            <div>
              <Calendar className="text-secondary" size={18} />
              <p className="mt-1 text-sm font-semibold text-primary">{formatDate(gig.deadline)}</p>
              <p className="text-xs text-neutral-soft">Deadline</p>
            </div>
            <div>
              <Eye className="text-secondary" size={18} />
              <p className="mt-1 text-sm font-semibold text-primary">{gig.views}</p>
              <p className="text-xs text-neutral-soft">Views</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-primary">Overview</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-neutral-soft">
              {gig.fullDescription}
            </p>
          </div>

          {gig.skills?.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-primary">Skills required</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {gig.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-neutral-line px-3 py-1 text-xs text-neutral"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-primary">Reviews</h2>
            <p className="mt-2 text-sm text-neutral-soft">
              No reviews yet — reviews will appear here once a gig is marked complete.
            </p>
          </div>

          {gig.postedBy?.email && (
            <a
              href={`mailto:${gig.postedBy.email}?subject=Interested in: ${gig.title}`}
              className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 font-medium text-primary transition hover:bg-accent-dark"
            >
              Contact about this gig
            </a>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-primary">Related gigs</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <GigCard key={r._id} gig={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
