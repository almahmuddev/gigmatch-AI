export interface Gig {
  _id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  budget: number
  skills: string[]
  deadline: string
  location: 'remote' | 'onsite'
  imageUrl?: string
  status: 'open' | 'closed'
  views: number
  postedBy: { _id: string; name: string; avatar?: string }
  createdAt: string
}

export interface GigsResponse {
  gigs: Gig[]
  total: number
  page: number
  totalPages: number
}
