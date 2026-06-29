import AnimateIn from './AnimateIn'

export default function USPCards() {
  return (
    <section className="w-full py-10 lg:py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">

        {/* Section heading */}
        <AnimateIn>
          <h2
            className="text-center text-[26px] sm:text-[34px] lg:text-[42px] font-bold text-[#1c2a22] leading-tight mb-7 lg:mb-10"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Everything You Need to Make the{' '}
            <em className="not-italic text-[#007237]">Right Choice</em>
          </h2>
        </AnimateIn>

        {/* Bento grid — stacks on mobile, 3-col asymmetric on desktop */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[47fr_27fr_22fr] lg:gap-[22px] lg:items-stretch lg:h-[360px]">

          {/* Left large card — Decode Any Ingredient */}
          <AnimateIn className="h-[260px] sm:h-[300px] lg:h-full">
            <a
              href="/ingredients"
              className="relative flex flex-col justify-between h-full rounded-xl overflow-hidden border border-[#e5e7eb] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/figma/bento-ingredient.jpg"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <div className="relative z-10 flex flex-col justify-between h-full p-8 pb-10">
                <div className="flex flex-col gap-[18px] tracking-[0.2px]">
                  <h3
                    className="text-[36px] font-bold text-[#007237] leading-[1.05]"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Decode Any<br />Ingredient
                  </h3>
                  <p
                    className="text-[15px] font-bold text-[#3b3b3b] leading-snug max-w-[262px]"
                    style={{ fontFamily: 'var(--font-open-sans)' }}
                  >
                    Know what&apos;s really inside — safety, benefits and skin-type fit in seconds.
                  </p>
                </div>
                <span className="inline-flex items-center bg-[#007237] text-white text-[13px] font-semibold px-6 py-[10px] rounded-full self-start group-hover:bg-[#005a2b] transition-colors duration-200">
                  Check an ingredient &rarr;
                </span>
              </div>
            </a>
          </AnimateIn>

          {/* Middle column — two stacked cards */}
          <div className="flex flex-col gap-4 lg:gap-[22px] lg:h-full">

            {/* Top: Compare Before You Buy */}
            <AnimateIn delay={0.06} className="h-[160px] sm:h-[180px] lg:flex-1 lg:h-auto lg:min-h-0">
              <a
                href="/compare"
                className="relative flex flex-col justify-between h-full rounded-xl overflow-hidden border border-[#e5e7eb] group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/figma/bento-compare.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  <div className="flex flex-col gap-2 tracking-[0.2px]">
                    <h3
                      className="text-[20px] font-bold text-[#007237] leading-[1.15]"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Compare Before<br />You Buy
                    </h3>
                    <p
                      className="text-[13px] font-semibold text-[#3b3b3b] leading-snug max-w-[177px]"
                      style={{ fontFamily: 'var(--font-open-sans)' }}
                    >
                      Ingredients, ratings and prices, side by side.
                    </p>
                  </div>
                  <span className="inline-flex items-center bg-[#007237] text-white text-[11px] font-semibold px-4 py-[7px] rounded-full self-start group-hover:bg-[#005a2b] transition-colors duration-200">
                    Compare Now &rarr;
                  </span>
                </div>
              </a>
            </AnimateIn>

            {/* Bottom: Deals Worth Taking */}
            <AnimateIn delay={0.09} className="h-[160px] sm:h-[180px] lg:flex-1 lg:h-auto lg:min-h-0">
              <a
                href="/deals"
                className="relative flex flex-col justify-between h-full rounded-xl overflow-hidden border border-[#e5e7eb] group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/figma/bento-deals.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  <div className="flex flex-col gap-2 tracking-[0.2px]">
                    <h3
                      className="text-[20px] font-bold text-[#007237] leading-[1.15]"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Deals Worth<br />Taking
                    </h3>
                    <p
                      className="text-[13px] font-semibold text-[#3b3b3b] leading-snug max-w-[177px]"
                      style={{ fontFamily: 'var(--font-open-sans)' }}
                    >
                      Up to 25% off picks we&apos;d genuinely recommend.
                    </p>
                  </div>
                  <span className="inline-flex items-center bg-[#007237] text-white text-[11px] font-semibold px-4 py-[7px] rounded-full self-start group-hover:bg-[#005a2b] transition-colors duration-200">
                    See deals &rarr;
                  </span>
                </div>
              </a>
            </AnimateIn>

          </div>

          {/* Right card — Real Reviews, Real People */}
          <AnimateIn delay={0.12} className="h-[280px] sm:h-[320px] lg:h-full">
            <a
              href="/reviews"
              className="relative flex flex-col h-full rounded-xl overflow-hidden border border-[#e5e7eb] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/figma/bento-reviews.jpg"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Light gradient at top so text sits on a readable surface */}
              <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#f0f0f0]/60 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-[10px] p-5 pt-[19px]">
                <h3
                  className="text-[24px] font-bold text-[#007237] leading-[1.1] text-center tracking-[0.2px]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Real Reviews,<br />Real People
                </h3>
                <p
                  className="text-[12px] font-semibold text-[#3b3b3b] leading-snug text-center max-w-[177px] tracking-[0.2px]"
                  style={{ fontFamily: 'var(--font-open-sans)' }}
                >
                  Honest takes from users with your skin type and concerns.
                </p>
                <span className="inline-flex items-center bg-[#007237] text-white text-[11px] font-semibold px-4 py-[7px] rounded-full group-hover:bg-[#005a2b] transition-colors duration-200">
                  Read reviews &rarr;
                </span>
              </div>
            </a>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
