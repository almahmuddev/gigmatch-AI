import { Gauge, MessageCircleMore, ShieldCheck, Zap } from 'lucide-react'

const features = [
  {
    icon: Gauge,
    title: 'A fit score, not a wall of text',
    body: 'Every match comes with a plain-language score and reason, so you know why a gig showed up before you click into it.',
  },
  {
    icon: MessageCircleMore,
    title: 'An assistant that knows the platform',
    body: 'Ask the built-in AI assistant anything \u2014 from "which gigs need React" to "help me tighten this proposal."',
  },
  {
    icon: ShieldCheck,
    title: 'Verified sign-in, real accounts',
    body: 'Google sign-in and JWT-secured sessions keep gig postings and applications tied to real, accountable users.',
  },
  {
    icon: Zap,
    title: 'Posting takes two minutes',
    body: 'No approval queues, no walls of required fields \u2014 describe the work, set a budget, and it\u2019s live.',
  },
]

export default function WhyGigMatch() {
  return (
    <section className="bg-neutral-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary">Why GigMatch AI</h2>
          <p className="mt-3 text-neutral-soft">Built around one idea: matching should save you time, not cost you more of it.</p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-card border border-neutral-line bg-white p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                <f.icon size={20} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-primary">{f.title}</h3>
                <p className="mt-1 text-sm text-neutral-soft">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
