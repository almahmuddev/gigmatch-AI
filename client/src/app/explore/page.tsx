'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { api } from '@/lib/api'
import GigCard from '@/components/gigs/GigCard'
import GigCardSkeleton from '@/components/gigs/GigCardSkeleton'
import { GigsResponse } from '@/types'

interface Category {
  name: string
  count: number
}

export default function ExplorePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // draft filter state, seeded from the current URL so refresh / back-forward keeps filters intact
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [minBudget, setMinBudget] = useState(searchParams.get('minBudget') || '')
  const [maxBudget, setMaxBudget] = useState(searchParams.get('maxBudget') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')

  const sort = searchParams.get('sort') || 'newest'
  const page = Number(searchParams.get('page') || '1')

  const buildParams = (overrides: Record<string, string> = {}) => {
    const next = new URLSearchParams()
    const values: Record<string, string> = {
      search,
      category,
      minBudget,
      maxBudget,
      location,
      sort,
      page: '1',
      ...overrides,
    }
    Object.entries(values).forEach(([key, value]) => {
      if (value) next.set(key, value)
    })
    return next
  }

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/explore?${buildParams().toString()}`)
  }

  const updateSort = (value: string) => {
    router.push(`/explore?${buildParams({ sort: value, page: '1' }).toString()}`)
  }

  const goToPage = (targetPage: number) => {
    router.push(`/explore?${buildParams({ page: String(targetPage) }).toString()}`)
  }

  const { data: categoryData } = useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/gigs/categories/summary')).data,
  })

  const queryString = searchParams.toString()

  const { data, isLoading, isError } = useQuery<GigsResponse>({
    queryKey: ['gigs', queryString],
    queryFn: async () => (await api.get(`/gigs?${queryString}&limit=8`)).data,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary">Explore Gigs</h1>
          <p className="mt-2 text-neutral-soft">{data ? `${data.total} open gigs found` : 'Loading gigs...'}</p>
        </div>

        <select
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          className="rounded-lg border border-neutral-line px-3 py-2 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="budget_high">Budget: High to low</option>
          <option value="budget_low">Budget: Low to high</option>
          <option value="deadline">Deadline: Soonest</option>
        </select>
      </div>

      <form
        onSubmit={applyFilters}
        className="mt-8 grid gap-4 rounded-card border border-neutral-line bg-white p-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="relative lg:col-span-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-soft" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gigs by title or skill..."
            className="w-full rounded-lg border border-neutral-line py-2 pl-9 pr-3 text-sm"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-neutral-line px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {categoryData?.categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-lg border border-neutral-line px-3 py-2 text-sm"
        >
          <option value="">Any location</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>

        <div className="flex gap-2">
          <input
            type="number"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            placeholder="Min ৳"
            className="w-1/2 rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
          <input
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            placeholder="Max ৳"
            className="w-1/2 rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light lg:col-span-5"
        >
          Apply filters
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && Array.from({ length: 8 }).map((_, i) => <GigCardSkeleton key={i} />)}

        {!isLoading && isError && (
          <p className="col-span-full text-center text-neutral-soft">
            Couldn&apos;t load gigs right now, try again in a moment.
          </p>
        )}

        {!isLoading && data && data.gigs.length === 0 && (
          <p className="col-span-full text-center text-neutral-soft">No gigs match those filters yet.</p>
        )}

        {!isLoading && data?.gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className="rounded-lg border border-neutral-line px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-neutral-soft">
            Page {page} of {data.totalPages}
          </span>
          <button
            disabled={page >= data.totalPages}
            onClick={() => goToPage(page + 1)}
            className="rounded-lg border border-neutral-line px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
