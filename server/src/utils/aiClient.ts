import OpenAI from 'openai'

// groq exposes an openai-compatible endpoint, so we can reuse the official sdk.
// swapping providers later (openai/gemini) just means changing baseURL + apiKey here.
export const aiClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

export const AI_MODEL = 'llama-3.3-70b-versatile'
