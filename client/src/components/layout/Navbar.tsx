'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const links = [
  { href: '/explore', label: 'Explore Gigs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const authedLinks = [
  { href: '/recommendations', label: 'Recommended' },
  { href: '/items/add', label: 'Post a Gig' },
  { href: '/items/manage', label: 'My Gigs' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const allLinks = user ? [...links, ...authedLinks] : links

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-line bg-neutral-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold text-primary" onClick={() => setMobileOpen(false)}>
          GigMatch<span className="text-accent">AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral md:flex">
          {allLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-secondary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-light md:block"
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
                className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-primary transition hover:bg-accent-dark sm:block"
              >
                Sign up
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-primary md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-line bg-neutral-bg px-4 py-3 text-sm font-medium text-neutral md:hidden">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-white hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-neutral-line pt-3">
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setMobileOpen(false)
                }}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-center font-medium text-white"
              >
                Log out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-primary px-4 py-2.5 text-center font-medium text-primary"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-accent px-4 py-2.5 text-center font-medium text-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
