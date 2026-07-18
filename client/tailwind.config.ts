import type { Config } from 'tailwindcss'

// design tokens for GigMatch AI
// concept: a "match signal" - deep ink navy (trust, professionalism) with a
// teal thread (the AI connection/match) and a warm amber spark (the CTA moment
// when a match is found). paper neutral keeps everything else quiet.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16213E', // ink navy - nav, footer, headings
          light: '#2A3A66',
        },
        secondary: {
          DEFAULT: '#0F8B8D', // match teal - links, tags, secondary actions
          light: '#3DB0B2',
        },
        accent: {
          DEFAULT: '#E8A33D', // signal amber - primary CTAs, highlights
          dark: '#C6841F',
        },
        neutral: {
          DEFAULT: '#1A1F2B', // body text
          soft: '#5B6472', // secondary text
          bg: '#F4F5F1', // page background (paper, not cream)
          line: '#E4E6E1', // borders/dividers
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}

export default config
