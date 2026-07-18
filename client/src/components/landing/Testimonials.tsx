const testimonials = [
  {
    name: 'Rakib H.',
    role: 'Full-Stack Developer',
    quote:
      'The fit score saved me hours of scrolling through gigs I was never going to land. I only apply to the ones I actually match now.',
  },
  {
    name: 'Farzana A.',
    role: 'UI/UX Designer',
    quote:
      'Posted a logo gig on a Friday and had three genuinely relevant applicants by Monday. No back-and-forth about scope, either.',
  },
  {
    name: 'Tanvir K.',
    role: 'Content Writer',
    quote:
      'The assistant helped me rewrite a proposal that had been ignored for a week. Got a reply within a day of sending the new one.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary">From people using it</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-card border border-neutral-line bg-neutral-bg p-6">
              <blockquote className="flex-1 text-sm leading-relaxed text-neutral">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 border-t border-neutral-line pt-4">
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-neutral-soft">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
