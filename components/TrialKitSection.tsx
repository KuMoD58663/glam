import AnimateIn from './AnimateIn'

export default function TrialKitSection() {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        <AnimateIn>
          <a href="/trial-kit" className="block group">
            <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[400px] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,114,55,0.08)] group-hover:shadow-[0_8px_32px_rgba(0,114,55,0.16)] transition-shadow duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trial-kits-banner.jpg"
                alt="Discover Your Glow - GlamGuider Trial Kits: handpicked bestsellers perfect for travel or as a gift"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </div>
          </a>
        </AnimateIn>
      </div>
    </section>
  )
}
