'use client'

import { useState, useEffect, useCallback } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'

const SLIDES = [
  {
    id: 'about',
    type: 'coded' as const,
    href: '/about',
  },
  {
    id: 'hair-confession',
    type: 'image' as const,
    src: '/images/hero.png',
    href: '/campaigns/hair-confession-week',
    alt: 'Hair Confession Week is live — share your honest haircare review and earn rewards',
  },
]

const INTERVAL_MS = 6500

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const total = SLIDES.length

  const go = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total)
  }, [total])

  const prev = useCallback(() => go(current - 1), [go, current])
  const next = useCallback(() => go(current + 1), [go, current])

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % total), INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce, paused, total])

  return (
    <section
      className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1440/400]"
      aria-roledescription="carousel"
      aria-label="Featured banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slide track */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: reduce ? 'none' : 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      >
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="relative w-full h-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1} of ${total}`}
            aria-hidden={idx !== current}
          >
            <a href={slide.href} className="block w-full h-full" tabIndex={idx !== current ? -1 : 0}>
              {slide.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <AboutSlide />
              )}
            </a>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={e => { e.preventDefault(); prev() }}
        className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 size-8 lg:size-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/35 flex items-center justify-center text-white transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Previous slide"
      >
        <CaretLeft size={16} weight="bold" className="lg:hidden" />
        <CaretLeft size={20} weight="bold" className="hidden lg:block" />
      </button>
      <button
        onClick={e => { e.preventDefault(); next() }}
        className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 size-8 lg:size-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/35 flex items-center justify-center text-white transition-[background-color,transform] duration-[160ms] ease-out active:scale-[0.87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Next slide"
      >
        <CaretRight size={16} weight="bold" className="lg:hidden" />
        <CaretRight size={20} weight="bold" className="hidden lg:block" />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slides"
      >
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => go(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current ? 'w-5 h-2 lg:w-6 lg:h-2.5 bg-white' : 'w-2 h-2 lg:w-2.5 lg:h-2.5 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

function AboutSlide() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a5a30]">
      {/* Decorative circles */}
      <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-white/[0.04] pointer-events-none" />
      <div className="absolute right-6 top-6 lg:right-24 lg:top-12 w-[140px] h-[140px] lg:w-[260px] lg:h-[260px] rounded-full bg-[#007237]/50 pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-[360px] h-[360px] rounded-full bg-[#007237]/25 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-[1440px] mx-auto px-6 lg:px-20">
        <p
          className="text-[9px] lg:text-[11px] font-bold tracking-[3.5px] text-[#7fc9a0] uppercase mb-2 lg:mb-3"
          style={{ fontFamily: 'var(--font-open-sans)' }}
        >
          Your Trusted Guide to Beauty
        </p>
        <h2
          className="text-[26px] sm:text-[36px] lg:text-[52px] font-semibold text-white leading-[1.1] mb-2 lg:mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Beauty Decisions<br />Made Simple
        </h2>
        <p
          className="hidden sm:block text-[13px] lg:text-[16px] text-[#b8dfc8] leading-relaxed max-w-[460px] mb-4 lg:mb-6"
          style={{ fontFamily: 'var(--font-open-sans)' }}
        >
          Real reviews, ingredient breakdowns, honest comparisons — everything you need before you buy.
        </p>
        <div>
          <span className="inline-flex items-center gap-2 bg-white text-[#007237] font-bold px-5 py-2.5 lg:px-7 lg:py-3 rounded-full text-[13px] lg:text-[14px] hover:bg-[#f0faf4] transition-colors cursor-pointer">
            Explore GlamGuider &rarr;
          </span>
        </div>
      </div>
    </div>
  )
}
