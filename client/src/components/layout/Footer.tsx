import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-line bg-primary text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-display text-lg font-semibold text-white">GigMatch AI</h3>
            <p className="text-sm text-slate-400">
              An AI-powered freelance marketplace connecting clients with the right talent, faster.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link href="/items/add" className="hover:text-white">
                  Post a Gig
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">Contact</h4>
            <p className="text-sm text-slate-400">devalmahmud@gmail.com</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href="https://github.com/almahmuddev" target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} GigMatch AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
