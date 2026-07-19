'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { api } from '@/lib/api'
import { Gig } from '@/types'

const COLORS = ['#16213E', '#0F8B8D', '#E8A33D', '#5B6472', '#2A3A66', '#3DB0B2']

function ManageGigsContent() {
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading } = useQuery<{ gigs: Gig[] }>({
    queryKey: ['my-gigs'],
    queryFn: async () => (await api.get('/gigs/mine')).data,
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/gigs/${id}`),
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-gigs'] })
    },
    onSettled: () => setDeletingId(null),
  })

  const gigs = data?.gigs || []

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This can't be undone.`)) {
      deleteMutation.mutate(id)
    }
  }

  const viewsChartData = gigs.map((g) => ({
    name: g.title.length > 18 ? g.title.slice(0, 18) + '...' : g.title,
    views: g.views,
  }))

  const budgetByCategory = Object.values(
    gigs.reduce((acc: Record<string, { name: string; value: number }>, g) => {
      if (!acc[g.category]) acc[g.category] = { name: g.category, value: 0 }
      acc[g.category].value += g.budget
      return acc
    }, {})
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary">My Gigs</h1>
          <p className="mt-2 text-neutral-soft">
            {gigs.length} gig{gigs.length !== 1 ? 's' : ''} posted
          </p>
        </div>
        <Link
          href="/items/add"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-accent-dark"
        >
          + Post a new gig
        </Link>
      </div>

      {!isLoading && gigs.length > 0 && (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-neutral-line bg-white p-6">
            <h2 className="font-display text-base font-semibold text-primary">Views per gig</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsChartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#0F8B8D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-card border border-neutral-line bg-white p-6">
            <h2 className="font-display text-base font-semibold text-primary">Budget posted by category</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetByCategory}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {budgetByCategory.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `৳${new Intl.NumberFormat('en-US').format(v)}`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 overflow-x-auto rounded-card border border-neutral-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-neutral-line bg-neutral-bg text-xs uppercase tracking-wide text-neutral-soft">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Budget</th>
              <th className="px-5 py-3">Deadline</th>
              <th className="px-5 py-3">Views</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-neutral-soft">
                  Loading your gigs...
                </td>
              </tr>
            )}

            {!isLoading && gigs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-neutral-soft">
                  You haven&apos;t posted any gigs yet.
                </td>
              </tr>
            )}

            {gigs.map((gig) => (
              <tr key={gig._id} className="border-b border-neutral-line last:border-0">
                <td className="max-w-xs truncate px-5 py-4 font-medium text-primary">{gig.title}</td>
                <td className="px-5 py-4 text-neutral-soft">{gig.category}</td>
                <td className="px-5 py-4 text-neutral-soft">৳{new Intl.NumberFormat('en-US').format(gig.budget)}</td>
                <td className="px-5 py-4 text-neutral-soft">{new Date(gig.deadline).toLocaleDateString()}</td>
                <td className="px-5 py-4 text-neutral-soft">{gig.views}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3">
                    <Link href={`/gigs/${gig._id}`} className="font-medium text-secondary hover:underline">
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(gig._id, gig.title)}
                      disabled={deletingId === gig._id}
                      className="font-medium text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deletingId === gig._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ManageGigsPage() {
  return (
    <ProtectedRoute>
      <ManageGigsContent />
    </ProtectedRoute>
  )
}
