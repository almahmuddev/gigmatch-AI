'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const sections = [
  {
    title: 'For Freelancers',
    items: [
      {
        q: 'How do I get better recommendations?',
        a: 'Add or update your skills when you register, and browse a few gigs in the categories you care about — recent views feed into your match quality too.',
      },
      {
        q: 'Why did a gig get a low fit score?',
        a: 'The AI compares the gig\u2019s required skills and description against your profile. A low score usually means limited skill overlap — check the reason text for specifics.',
      },
      {
        q: 'Can I browse without an account?',
        a: 'Yes, Explore and gig details pages are public. You\u2019ll need an account only to post a gig, manage your postings, or see AI-matched recommendations.',
      },
    ],
  },
  {
    title: 'For Clients',
    items: [
      {
        q: 'How do I post a gig?',
        a: 'Log in, then go to "Post a Gig" from the navbar. Fill in the title, description, budget, deadline, and skills — it goes live immediately, no approval queue.',
      },
      {
        q: 'How do I remove a gig I posted?',
        a: 'Go to "My Gigs", find it, and click Delete. Only the account that posted a gig can remove it.',
      },
      {
        q: 'Can I see how many people viewed my gig?',
        a: 'Yes — view counts and a couple of charts (views per gig, budget by category) are on the "My Gigs" page.',
      },
    ],
  },
  {
    title: 'Account & Security',
    items: [
      {
        q: 'Is my password stored safely?',
        a: 'Passwords are hashed before they\u2019re ever stored — we never keep or can see your plain-text password.',
      },
      {
        q: 'Do I have to use Google to sign in?',
        a: 'No, email and password works fine. Google sign-in is there as a faster option if you\u2019d rather skip creating a new password.',
      },
    ],
  },
]

export default function HelpAccordion() {
  const [open, setOpen] = useState<string | null>('For Freelancers-0')

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-lg font-semibold text-primary">{section.title}</h2>
          <div className="mt-4 divide-y divide-neutral-line rounded-card border border-neutral-line bg-white">
            {section.items.map((item, i) => {
              const key = `${section.title}-${i}`
              const isOpen = open === key
              return (
                <div key={key}>
                  <button
                    onClick={() => setOpen(isOpen ? null : key)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-primary">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-neutral-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && <p className="px-6 pb-4 text-sm text-neutral-soft">{item.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
