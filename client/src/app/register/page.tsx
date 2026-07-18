'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import AuthShell from '@/components/auth/AuthShell'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('please fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('password should be at least 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register(name, email, password)
      router.push('/explore')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'could not create your account, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Post gigs or get matched to the ones that fit you.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-neutral-soft">
        <div className="h-px flex-1 bg-neutral-line" />
        or
        <div className="h-px flex-1 bg-neutral-line" />
      </div>

      <GoogleSignInButton />

      <p className="mt-6 text-center text-sm text-neutral-soft">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-secondary hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  )
}