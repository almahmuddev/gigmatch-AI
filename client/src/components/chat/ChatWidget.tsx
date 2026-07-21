'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_PROMPTS = ['How does AI matching work?', 'How do I post a gig?', 'Tips for writing a good proposal']

const FOLLOW_UP_PROMPTS = ['Tell me more about that', 'What should I do next?']

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    const history = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('gigmatch_token') : null

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.body) throw new Error('no response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let streaming = true

      while (streaming) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const parts = buffer.split('\n\n')
        buffer = parts.pop() || ''

        for (const part of parts) {
          if (!part.startsWith('data: ')) continue
          const payload = part.slice(6).trim()
          if (payload === '[DONE]') {
            streaming = false
            continue
          }

          try {
            const parsed = JSON.parse(payload)
            const token = parsed.token || parsed.error || ''
            if (token) {
              setMessages((prev) => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                updated[updated.length - 1] = { ...last, content: last.content + token }
                return updated
              })
            }
          } catch {
            // an occasional malformed frame from a mid-chunk split isn't worth failing over
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I couldn't reach the assistant just now. Try again in a moment.",
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const lastMessage = messages[messages.length - 1]
  const showTyping = isStreaming && lastMessage?.role === 'assistant' && lastMessage.content === ''

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-card border border-neutral-line bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span className="font-display text-sm font-semibold">GigMatch Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div>
                <p className="text-sm text-neutral-soft">
                  Hi! I can help you navigate GigMatch AI, explain how matching works, or give advice on
                  gigs and proposals. Ask me anything.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STARTER_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="rounded-full border border-neutral-line px-3 py-1.5 text-xs text-neutral transition hover:border-secondary hover:text-secondary"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isLastEmptyWhileStreaming =
                i === messages.length - 1 && m.role === 'assistant' && m.content === '' && isStreaming
              if (isLastEmptyWhileStreaming) return null

              return (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user' ? 'ml-auto bg-primary text-white' : 'bg-neutral-bg text-neutral'
                  }`}
                >
                  {m.content}
                </div>
              )
            })}

            {showTyping && (
              <div className="flex w-fit gap-1 rounded-2xl bg-neutral-bg px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-soft [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-soft [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-soft" />
              </div>
            )}

            {!isStreaming && messages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {FOLLOW_UP_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="rounded-full border border-neutral-line px-3 py-1.5 text-xs text-neutral transition hover:border-secondary hover:text-secondary"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-neutral-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-lg border border-neutral-line px-3 py-2 text-sm focus:border-secondary focus:outline-none"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="flex items-center justify-center rounded-lg bg-accent px-3 text-primary transition hover:bg-accent-dark disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-light"
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
