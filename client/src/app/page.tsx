import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import BrowseCategories from '@/components/landing/BrowseCategories'
import LiveStats from '@/components/landing/LiveStats'
import FeaturedGigs from '@/components/landing/FeaturedGigs'
import WhyGigMatch from '@/components/landing/WhyGigMatch'
import Testimonials from '@/components/landing/Testimonials'
import Faq from '@/components/landing/Faq'
import FinalCta from '@/components/landing/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BrowseCategories />
      <LiveStats />
      <FeaturedGigs />
      <WhyGigMatch />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
