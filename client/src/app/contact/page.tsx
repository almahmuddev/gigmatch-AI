import { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the GigMatch AI team.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">Get in touch</h1>
        <p className="mt-3 text-neutral-soft">
          Questions, feedback, or a gig you&apos;d like help with — send it over.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-card border border-neutral-line bg-white p-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 text-secondary" size={18} />
              <div>
                <p className="text-sm font-semibold text-primary">Email</p>
                <p className="text-sm text-neutral-soft">devalmahmud@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-0.5 text-secondary" size={18} />
              <div>
                <p className="text-sm font-semibold text-primary">Based in</p>
                <p className="text-sm text-neutral-soft">Sylhet, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
