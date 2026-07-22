import { Metadata } from 'next'
import { Suspense } from 'react'
import ExploreClient from '@/components/explore/ExploreClient'

export const metadata: Metadata = {
  title: 'Explore Gigs',
  description: 'Search and filter open freelance gigs on GigMatch AI.',
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 text-neutral-soft">Loading gigs...</div>}>
      <ExploreClient />
    </Suspense>
  )
}
