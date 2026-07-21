import { Response } from 'express'
import Gig from '../models/Gig'
import { AuthRequest } from '../middleware/auth'
import { aiClient, AI_MODEL } from '../utils/aiClient'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

async function buildSystemPrompt(user?: any) {
  const [categories, gigCount] = await Promise.all([
    Gig.distinct('category', { status: 'open' }),
    Gig.countDocuments({ status: 'open' }),
  ])

  const personalization = user
    ? `The person chatting with you is logged in as ${user.name}, with these skills listed: ${
        (user.skills || []).join(', ') || 'none listed'
      }. Tailor advice to them when it's relevant.`
    : 'The person chatting with you is not logged in.'

  return `You are the GigMatch AI assistant, built into a freelance marketplace where clients post gigs
and freelancers get matched to them by an AI fit score instead of a plain keyword search.

Site map you can point people to:
- /explore - browse and filter open gigs (search, category, budget, location, sort, pagination)
- /gigs/:id - a single gig's full details
- /items/add - post a new gig (requires login)
- /items/manage - manage gigs you've posted, with charts (requires login)
- /recommendations - AI-matched gigs based on your skills (requires login)
- /login and /register - auth pages, with a one-click demo login and Google sign-in

Current platform data: ${gigCount} open gigs across categories: ${categories.join(', ') || 'none yet'}.

${personalization}

Answer questions about the platform, help people navigate to the right page, and give practical,
concrete advice (e.g. how to write a stronger gig description, or how to make a proposal stand out).
Keep answers conversational and to 2-4 sentences unless the person clearly wants more detail. If you
don't know something platform-specific, say so plainly instead of guessing.`
}

export const chat = async (req: AuthRequest, res: Response) => {
  const { messages } = req.body as { messages: ChatMessage[] }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'messages array is required' })
  }

  const systemPrompt = await buildSystemPrompt(req.user)

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  try {
    const stream = await aiClient.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.6,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        // keep the payload bounded - recent turns matter far more than the full history
        ...messages.slice(-12),
      ],
    })

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || ''
      if (token) res.write(`data: ${JSON.stringify({ token })}\n\n`)
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    console.error('chat stream failed:', err)
    res.write(
      `data: ${JSON.stringify({ error: "sorry, the assistant is unavailable right now, try again in a moment" })}\n\n`
    )
    res.end()
  }
}
