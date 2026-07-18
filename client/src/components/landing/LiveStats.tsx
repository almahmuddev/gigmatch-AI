import { Briefcase, Users, LayoutGrid, Wallet } from 'lucide-react'

interface Stats {
  totalGigs: number
  totalFreelancers: number
  totalCategories: number
  totalBudgetPosted: number
}

async function getStats(): Promise<Stats | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gigs/stats/summary`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function formatBudget(n: number) {
  if (n >= 100000) return `৳${(n / 100000).toFixed(1)}L`
  return `৳${new Intl.NumberFormat('en-US').format(n)}`
}

export default async function LiveStats() {
  const stats = await getStats()

  if (!stats) return null

  const items = [
    { label: 'Open gigs right now', value: stats.totalGigs, icon: Briefcase },
    { label: 'Registered members', value: stats.totalFreelancers, icon: Users },
    { label: 'Active categories', value: stats.totalCategories, icon: LayoutGrid },
    { label: 'Total budget posted', value: formatBudget(stats.totalBudgetPosted), icon: Wallet },
  ]

  return (
    <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="text-center text-white">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <item.icon size={20} />
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{item.value}</p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
