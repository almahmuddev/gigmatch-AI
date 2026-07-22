'use client'

import { useState } from 'react'

export default function ContactForm() {
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
  )
}
