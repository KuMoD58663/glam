import Navbar from './Navbar'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'
import FeatureStrip from './FeatureStrip'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Split panel */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left — dark forest green */}
        <div className="bg-forest flex flex-col w-full md:w-[55%]">
          <Navbar />
          <HeroLeft />
        </div>

        {/* Right — warm cream */}
        <div className="w-full md:w-[45%]">
          <HeroRight />
        </div>
      </div>

      {/* Bottom feature strip — spans full width */}
      <FeatureStrip />
    </section>
  )
}
