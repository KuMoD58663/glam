import Navbar from '@/components/Navbar'
import HeroBanner from '@/components/HeroBanner'
import WhySection from '@/components/WhySection'
import CategoriesSection from '@/components/CategoriesSection'
import IngredientCheckerTeaser from '@/components/IngredientCheckerTeaser'
import BlogsSection from '@/components/BlogsSection'
import TopDealsSection from '@/components/TopDealsSection'
import TrialKitSection from '@/components/TrialKitSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <Navbar />
      <main>
        <HeroBanner />
        <WhySection />
        <CategoriesSection />
        <IngredientCheckerTeaser />
        <BlogsSection />
        <TopDealsSection />
        <TrialKitSection />
      </main>
      <Footer />
    </div>
  )
}
