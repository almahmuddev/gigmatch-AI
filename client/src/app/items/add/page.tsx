'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { api } from '@/lib/api'
import { CATEGORIES } from '@/lib/categories'

function AddGigForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [location, setLocation] = useState<'remote' | 'onsite'>('remote')
  const [skills, setSkills] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !shortDescription || !fullDescription || !budget || !deadline) {
      setError('please fill in all the required fields')
      return
    }
    if (Number(budget) <= 0) {
      setError('budget needs to be more than 0')
      return
    }
    if (new Date(deadline) <= new Date()) {
      setError('deadline needs to be a future date')
      return
    }

    setLoading(true)
    try {
      const res = await api.post('/gigs', {
        title,
        shortDescription,
        fullDescription,
        category,
        budget: Number(budget),
        deadline,
        location,
        skills: skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        imageUrl: imageUrl || undefined,
      })
      router.push(`/gigs/${res.data.gig._id}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'could not post this gig, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-primary">Post a Gig</h1>
      <p className="mt-2 text-neutral-soft">Describe the work clearly — the more specific, the better the matches.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-card border border-neutral-line bg-white p-6 sm:p-8"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build a responsive landing page for a SaaS product"
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Short description *</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One or two sentences shown on the gig card"
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Full description *</label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            rows={5}
            placeholder="Full scope, deliverables, anything a freelancer needs to know before applying"
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as 'remote' | 'onsite')}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            >
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Budget (৳) *</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="15000"
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Deadline *</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Skills (comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Tailwind CSS, Next.js"
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Image URL (optional)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-60 sm:w-auto"
        >
          {loading ? 'Posting...' : 'Submit Gig'}
        </button>
      </form>
    </div>
  )
}

export default function AddGigPage() {
  return (
    <ProtectedRoute>
      <AddGigForm />
    </ProtectedRoute>
  )
}
