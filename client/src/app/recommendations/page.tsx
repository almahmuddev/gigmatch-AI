'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { api } from '@/lib/api'
import { Gig } from '@/types'

interface Recommendation {
  gig: Gig
  fitScore: number
  reason: string
}

function fitColor(score: number) {
  if (score >= 80) return 'text-secondary bg-secondary/10'
  if (score >= 60) return 'text-accent-dark bg-accent/10'
  return 'text-neutral-soft bg-neutral-bg'
}

function RecommendationsContent() {
  const queryClient = useQueryClient()
  const [categoryFilter, setCategoryFilter] = useState('')
  const [minScore, setMinScore] = useState(0)

  const { data, isLoading, isFetching } = useQuery<{ recommendations: Recommendation[] }>({
    queryKey: ['recommendations'],
    queryFn: async () => (await api.get('/recommendations')).data,
    staleTime: 5 * 60 * 1000,
  })

  const recommendations = data?.recommendations || []
  const categories = Array.from(new Set(recommendations.map((r) => r.gig.category)))

  const filtered = recommendations.filter(
    (r) => (!categoryFilter || r.gig.category === categoryFilter) && r.fitScore >= minScore
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary">Recommended for you</h1>
          <p className="mt-2 text-neutral-soft">Matched against your skills and what you&apos;ve been browsing.</p>
        </div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['recommendations'] })}
          disabled={isFetching}
          className="flex items-center gap-2 rounded-lg border border-neutral-line px-4 py-2 text-sm font-medium text-neutral transition hover:bg-neutral-bg disabled:opacity-60"
        >
          <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
          Refresh matches
        </button>
      </div>

      {!isLoading && recommendations.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card border border-neutral-line bg-white p-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-neutral-line px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-neutral-soft">
            Min fit score: {minScore}
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-card border border-neutral-line bg-white" />
          ))}

        {!isLoading && recommendations.length === 0 && (
          <p className="rounded-card border border-neutral-line bg-white p-8 text-center text-neutral-soft">
            No open gigs to match against right now — check back soon.
          </p>
        )}

        {!isLoading && recommendations.length > 0 && filtered.length === 0 && (
          <p className="rounded-card border border-neutral-line bg-white p-8 text-center text-neutral-soft">
            Nothing matches those filters — try lowering the minimum fit score.
          </p>
        )}

        {filtered.map((r) => (
          <div
            key={r.gig._id}
            className="flex flex-col gap-3 rounded-card border border-neutral-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${fitColor(r.fitScore)}`}>
                  {r.fitScore}% fit
                </span>
                <span className="text-xs text-neutral-soft">{r.gig.category}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold text-primary">{r.gig.title}</h3>
              <p className="mt-1 text-sm text-neutral-soft">{r.reason}</p>
            </div>
            <Link
              href={`/gigs/${r.gig._id}`}
              className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-primary-light"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RecommendationsPage() {
  return (
    <ProtectedRoute>
      <RecommendationsContent />
    </ProtectedRoute>
  )
}
