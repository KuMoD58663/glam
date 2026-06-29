export default function HeroBanner() {
  return (
    <section className="w-full overflow-hidden" style={{ height: '355px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-banner.png"
        alt="Hair Confession Week is live - Share your honest haircare review and earn rewards"
        className="w-full h-full object-cover"
      />
    </section>
  )
}
