import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import StatsBar from '@/components/StatsBar'
import USPCards from '@/components/USPCards'
import WhySection from '@/components/WhySection'
import CategoriesSection from '@/components/CategoriesSection'
import IngredientCheckerTeaser from '@/components/IngredientCheckerTeaser'
import EarnAsYouGlow from '@/components/EarnAsYouGlow'
import BlogsSection from '@/components/BlogsSection'
import TopDealsSection from '@/components/TopDealsSection'
import TrialKitSection from '@/components/TrialKitSection'
import Footer from '@/components/Footer'
import CheckInNudge from '@/components/CheckInNudge'

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <Navbar />
      <main>
        <HeroCarousel />
        <StatsBar />
        <USPCards />
        <CategoriesSection />
        <WhySection />
        <IngredientCheckerTeaser />
        <EarnAsYouGlow />
        <BlogsSection />
        <TopDealsSection />
        <TrialKitSection />
      </main>
      <Footer />
      <CheckInNudge />
    </div>
  )
}
