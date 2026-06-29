import { MagnifyingGlass, Flask, ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import AnimateIn from './AnimateIn'
import Button from './Button'

const CHIPS = ['Niacinamide', 'Aloe Vera', 'Beeswax', 'Alcohol', 'Zinc PCA']

const RATINGS = [
  { label: 'Comedogenic', value: 2, max: 5, color: '#d97706', bg: '#fef3c7' },
  { label: 'Irritation', value: 0, max: 5, color: '#059669', bg: '#d1fae5' },
]

export default function IngredientCheckerTeaser() {
  return (
    <section className="w-full bg-[#0f3d25] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">

          {/* Left: editorial copy */}
          <AnimateIn className="flex flex-col justify-center gap-7">
            <div className="flex flex-col gap-4">
              <h2
                className="text-[30px] sm:text-[38px] lg:text-[52px] font-semibold leading-[1.1] text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                What&apos;s really<br />in your products?
              </h2>
              <p
                className="text-[16px] text-[#a8d4b8] leading-[1.75] max-w-[380px]"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                Look up any skincare or haircare ingredient in seconds. Get a plain-language safety rating, comedogenic score, and skin-type fit.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button href="/ingredients" variant="mint" arrow className="self-start">
                Try Ingredient Checker
              </Button>

              <div className="flex items-center gap-2 mt-1">
                <Flask size={15} weight="duotone" className="text-[#7fd3a3] shrink-0" />
                <p
                  className="text-[13px] text-[#7fb898]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  2,400+ ingredients decoded, expert-reviewed
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right: search + result preview */}
          <AnimateIn delay={0.12} className="flex flex-col gap-5">
            {/* Search bar */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              <MagnifyingGlass size={18} className="text-[#007237] shrink-0" weight="bold" />
              <span
                className="flex-1 text-[14px] text-[#9aa39c]"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                Search any ingredient, e.g. &ldquo;Retinol&rdquo;
              </span>
              <Button href="/ingredients" size="sm">
                Check
              </Button>
            </div>

            {/* Ingredient chips */}
            <div className="flex items-center flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <a
                  key={chip}
                  href={`/ingredients/${chip.toLowerCase().replace(/ /g, '-')}`}
                  className="text-[12.5px] text-white/80 border border-white/20 rounded-full px-3.5 py-1.5 leading-none hover:border-white/60 hover:text-white transition-all duration-150 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {chip}
                </a>
              ))}
            </div>

            {/* Sample result card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] mt-1">
              {/* Card header */}
              <div className="px-6 pt-5 pb-4 border-b border-[#f0f3f0]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className="text-[22px] font-bold text-[#007237] leading-none mb-1.5"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Niacinamide
                    </h3>
                    <p
                      className="text-[12px] text-[#5b6b60] leading-snug"
                      style={{ fontFamily: 'var(--font-open-sans)' }}
                    >
                      Brightens skin and repairs the moisture barrier. Suits all skin types.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-[#059669]" weight="fill" />
                    <span
                      className="text-[10.5px] font-semibold text-[#059669]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      Safe for all
                    </span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="px-6 py-4 flex flex-col gap-3">
                {RATINGS.map((r) => (
                  <div key={r.label} className="flex items-center gap-4">
                    <span
                      className="text-[11px] text-[#7a8a80] w-28 shrink-0"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {r.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1">
                      {/* Rating dots */}
                      <div className="flex gap-1">
                        {Array.from({ length: r.max }).map((_, i) => (
                          <div
                            key={i}
                            className="size-3 rounded-full"
                            style={{
                              background: i < r.value ? r.color : '#e9f0ea',
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[11px] font-bold ml-1"
                        style={{ color: r.color, fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {r.value}/{r.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-3.5 bg-[#f7fbf8] border-t border-[#eef1ee]">
                <a
                  href="/ingredients/niacinamide"
                  className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#007237] group hover:gap-3 transition-all duration-200"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  See full ingredient analysis
                  <ArrowRight
                    size={13}
                    weight="bold"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
