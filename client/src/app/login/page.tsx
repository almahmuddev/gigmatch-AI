'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import AuthShell from '@/components/auth/AuthShell'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'

const DEMO_EMAIL = 'demo@gigmatch.ai'
const DEMO_PASSWORD = 'Demo@123'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const doLogin = async (loginEmail: string, loginPassword: string) => {
    setError('')

    if (!loginEmail || !loginPassword) {
      setError('please enter both email and password')
      return
    }

    setLoading(true)
    try {
      await login(loginEmail, loginPassword)
      router.push('/explore')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'could not log in, check your credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    doLogin(email, password)
  }

  const handleDemoLogin = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    doLogin(DEMO_EMAIL, DEMO_PASSWORD)
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to keep matching with the right gigs.">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full rounded-lg border border-accent px-4 py-2.5 text-sm font-medium text-accent-dark transition hover:bg-accent/10 disabled:opacity-60"
        >
          Try demo account
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-neutral-soft">
        <div className="h-px flex-1 bg-neutral-line" />
        or
        <div className="h-px flex-1 bg-neutral-line" />
      </div>

      <GoogleSignInButton />

      <p className="mt-6 text-center text-sm text-neutral-soft">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-secondary hover:underline">
          Sign up
        </Link>
      </p>
    </AuthShell>
  )
}