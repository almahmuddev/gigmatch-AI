'use client'

import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !message) {
      setError('please fill in all fields')
      return
    }

    const subject = encodeURIComponent(`GigMatch AI contact form: ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:devalmahmud@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

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

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-card border border-neutral-line bg-white p-6 lg:col-span-3"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-neutral-line px-3 py-2 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {sent && (
            <p className="text-sm text-secondary">
              Your email client should have opened with this pre-filled — just hit send there.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light sm:w-auto"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
