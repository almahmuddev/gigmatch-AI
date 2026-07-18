import Image from 'next/image'
import Link from 'next/link'
import { Gig } from '@/types'

function formatBudget(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

function daysLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'closing soon'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

export default function GigCard({ gig }: { gig: Gig }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-card border border-neutral-line bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full shrink-0 bg-neutral-bg">
        {gig.imageUrl ? (
          <Image src={gig.imageUrl} alt={gig.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-soft">No image</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-primary">
          {gig.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-primary">{gig.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-soft">{gig.shortDescription}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-soft">
          <span className="font-semibold text-secondary">৳{formatBudget(gig.budget)}</span>
          <span>•</span>
          <span className="capitalize">{gig.location}</span>
          <span>•</span>
          <span>{daysLeft(gig.deadline)}</span>
        </div>

        <Link
          href={`/gigs/${gig._id}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
