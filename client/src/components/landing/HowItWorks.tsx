import { FileEdit, Sparkles, Target } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileEdit,
    title: 'Tell us what you need or what you can do',
    body: 'Clients post a gig with the real budget and skills required. Freelancers keep a skill profile up to date instead of rewriting the same intro every time.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'The AI reads both sides',
    body: 'GigMatch AI compares the gig requirements against a freelancer\u2019s skills and history \u2014 not just matching keywords, but understanding what the work actually needs.',
  },
  {
    number: '03',
    icon: Target,
    title: 'You get a ranked fit, not just a list',
    body: 'Instead of scrolling hundreds of gigs, freelancers see the ones they\u2019re genuinely a strong fit for, with a plain-language reason why.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary">How GigMatch AI works</h2>
          <p className="mt-3 text-neutral-soft">Three steps, from posting a gig to landing the right one.</p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-display text-5xl font-semibold text-neutral-line">{step.number}</span>
              <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <step.icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-neutral-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
