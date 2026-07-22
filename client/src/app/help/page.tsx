import { Metadata } from 'next'
import HelpAccordion from '@/components/help/HelpAccordion'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Answers for freelancers, clients, and account questions on GigMatch AI.',
}

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">Help Center</h1>
        <p className="mt-3 text-neutral-soft">Answers organized by what you&apos;re trying to do.</p>
      </div>

      <div className="mt-12">
        <HelpAccordion />
      </div>
    </div>
  )
}
