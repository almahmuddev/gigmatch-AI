import { MetadataRoute } from 'next'

interface GigSummary {
  _id: string
  updatedAt?: string
}

async function getGigUrls(base: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs?limit=50`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.gigs || []).map((g: GigSummary) => ({
      url: `${base}/gigs/${g._id}`,
      lastModified: g.updatedAt ? new Date(g.updatedAt) : new Date(),
    }))
  } catch {
    // sitemap generation shouldn't fail the whole build if the API happens to be down
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticRoutes = ['', '/explore', '/about', '/contact', '/help', '/terms', '/login', '/register'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  )

  const gigRoutes = await getGigUrls(base)

  return [...staticRoutes, ...gigRoutes]
}
