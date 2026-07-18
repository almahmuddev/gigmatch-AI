'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How does the AI matching actually work?',
    a: 'When you post a gig or update your skill profile, GigMatch AI compares the gig\u2019s requirements against a freelancer\u2019s listed skills and gig history, then generates a fit score with a short explanation \u2014 not just a keyword count.',
  },
  {
    q: 'Is it free to post a gig?',
    a: 'Yes. Posting a gig is free. There\u2019s no approval queue \u2014 fill in the details and it goes live right away.',
  },
  {
    q: 'Do I need a Google account to sign up?',
    a: 'No. You can register with an email and password, or sign in with Google if you\u2019d rather skip creating a new password.',
  },
  {
    q: 'Can I try it without creating an account?',
    a: 'Yes \u2014 use the demo login on the login page to explore the platform with a pre-filled sample account.',
  },
  {
    q: 'How do I remove a gig I posted?',
    a: 'Go to "My Gigs" from the navbar, find the gig, and delete it directly from there. Only the person who posted a gig can remove it.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-neutral-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-primary">Frequently asked questions</h2>
        </div>

        <div className="mt-10 divide-y divide-neutral-line rounded-card border border-neutral-line bg-white">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-primary">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-neutral-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && <p className="px-6 pb-5 text-sm text-neutral-soft">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
