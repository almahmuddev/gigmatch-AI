import Link from 'next/link'
import { Code2, Palette, Server, PenLine, Smartphone, Globe, Film, Sheet } from 'lucide-react'

const categoryIcons: Record<string, any> = {
  'Web Development': Code2,
  Design: Palette,
  'Backend Development': Server,
  'Content Writing': PenLine,
  'UI/UX Design': Smartphone,
  WordPress: Globe,
  'Video Editing': Film,
  'Data Entry': Sheet,
}

interface Category {
  name: string
  count: number
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/categories/summary`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.categories || []
  } catch {
    // api might not be running yet during a fresh setup - fail quietly, section just won't render
    return []
  }
}

export default async function BrowseCategories() {
  const categories = await getCategories()

  if (categories.length === 0) return null

  return (
    <section className="bg-neutral-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary">Browse by category</h2>
          <p className="mt-3 text-neutral-soft">Real open gigs, grouped by what they actually need.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Code2
            return (
              <Link
                key={cat.name}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 rounded-card border border-neutral-line bg-white p-6 text-center transition hover:border-secondary hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-semibold text-primary">{cat.name}</p>
                <p className="text-xs text-neutral-soft">{cat.count} open gig{cat.count !== 1 ? 's' : ''}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
