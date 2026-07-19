import { Response } from 'express'
import Gig, { IGig } from '../models/Gig'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'
import { aiClient, AI_MODEL } from '../utils/aiClient'

function overlapScore(gigSkills: string[], userSkills: string[]) {
  const gigSet = gigSkills.map((s) => s.toLowerCase())
  const userSet = userSkills.map((s) => s.toLowerCase())
  return gigSet.filter((s) => userSet.includes(s)).length
}

function buildPrompt(skills: string[], bio: string, recentCategories: string[], gigs: IGig[]) {
  const gigList = gigs
    .map(
      (g) =>
        `- id: ${g._id}, title: "${g.title}", category: ${g.category}, skills: [${g.skills.join(', ')}], budget: ${g.budget}`
    )
    .join('\n')

  return `Freelancer skills: ${skills.join(', ') || 'none listed'}
Freelancer bio: ${bio || 'none provided'}
Recently viewed gig categories (interest signal, most recent last): ${recentCategories.join(', ') || 'none yet'}

Open gigs:
${gigList}

Return the JSON array now.`
}

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id).populate<{ recentViews: { category: string }[] }>(
    'recentViews',
    'category'
  )

  const openGigs = await Gig.find({ status: 'open' }).sort({ createdAt: -1 }).limit(40)

  if (openGigs.length === 0) {
    return res.json({ recommendations: [] })
  }

  const userSkills = user?.skills || []

  // quick local pre-filter so we only ever send a small, cheap shortlist to the model
  const shortlist = [...openGigs]
    .sort((a, b) => overlapScore(b.skills, userSkills) - overlapScore(a.skills, userSkills))
    .slice(0, 12)

  const recentCategories = (user?.recentViews || []).map((v) => v.category).filter(Boolean)

  try {
    const completion = await aiClient.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You are a matching engine for a freelance marketplace. Given a freelancer profile and a list of open gigs, return ONLY a JSON array (no markdown, no extra text) of objects: {"gigId": string, "fitScore": number 0-100, "reason": string (max 20 words)}. Rank by fitScore descending, and only include gigs that are a reasonable fit, at most 8 entries.',
        },
        { role: 'user', content: buildPrompt(userSkills, user?.bio || '', recentCategories, shortlist) },
      ],
    })

    const raw = completion.choices[0]?.message?.content || '[]'
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const parsed: { gigId: string; fitScore: number; reason: string }[] = JSON.parse(cleaned)

    const gigMap = new Map(shortlist.map((g) => [g._id.toString(), g]))
    const recommendations = parsed
      .filter((p) => gigMap.has(p.gigId))
      .map((p) => ({ gig: gigMap.get(p.gigId), fitScore: p.fitScore, reason: p.reason }))

    res.json({ recommendations })
  } catch (err) {
    console.error('recommendation generation failed, falling back to skill-overlap ranking:', err)
    // the feature should still work even if the AI call errors or the key is missing
    const fallback = shortlist.slice(0, 8).map((g) => ({
      gig: g,
      fitScore: userSkills.length ? Math.min(95, 40 + overlapScore(g.skills, userSkills) * 15) : 50,
      reason: 'Ranked by shared skills (AI explanation unavailable right now).',
    }))
    res.json({ recommendations: fallback })
  }
}
