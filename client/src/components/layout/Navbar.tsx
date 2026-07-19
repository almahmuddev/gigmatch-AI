'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-line bg-neutral-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold text-primary">
          GigMatch<span className="text-accent">AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral md:flex">
          <Link href="/explore" className="hover:text-secondary">
            Explore Gigs
          </Link>
          <Link href="/about" className="hover:text-secondary">
            About
          </Link>
          <Link href="/contact" className="hover:text-secondary">
            Contact
          </Link>
          {user && (
            <Link href="/recommendations" className="hover:text-secondary">
              Recommended
            </Link>
          )}
          {user && (
            <Link href="/items/add" className="hover:text-secondary">
              Post a Gig
            </Link>
          )}
          {user && (
            <Link href="/items/manage" className="hover:text-secondary">
              My Gigs
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-neutral hover:text-secondary sm:block"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-primary transition hover:bg-accent-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
