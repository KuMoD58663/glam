import AnimateIn from './AnimateIn'
import Button from './Button'

const REVIEWS = [
  {
    id: 1,
    username: 'Shauvikrana1',
    location: 'Chamba, Himachal Pradesh',
    avatar: 'https://www.figma.com/api/mcp/asset/ae89bbfc-68f3-4475-b6b1-ffd1653b05f1',
    hairTypes: [
      { label: 'straight', bg: '#fbe4ea', border: '#c06b84', text: '#8b2f52' },
      { label: 'oily', bg: '#fdf5e6', border: '#d4a24c', text: '#8a5b00' },
    ],
    date: '22 June 2026',
    brand: 'MCAFFEINE',
    product: 'Men Shaving and Grooming',
    rating: 5,
    review: 'Best product I have seen',
  },
  {
    id: 2,
    username: 'Meet',
    location: 'Arvalli, Gujarat',
    avatar: 'https://www.figma.com/api/mcp/asset/92bbd6da-7112-46ec-af5d-28db6c7fc44e',
    hairTypes: [
      { label: 'straight', bg: '#fbe4ea', border: '#c06b84', text: '#8b2f52' },
      { label: 'dry', bg: '#fdf5e6', border: '#d4a24c', text: '#8a5b00' },
    ],
    date: '21 June 2026',
    brand: 'DECONSTRUCT',
    product: 'Face Serum',
    rating: 5,
    review: 'This product is very nice',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="size-[15px]" viewBox="0 0 20 20" fill={i < count ? '#007237' : '#e5e7eb'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-[12px] font-bold text-[#007237] leading-none">{count}.0</span>
    </div>
  )
}

function ReviewEntry({ review, isLast }: { review: (typeof REVIEWS)[number]; isLast: boolean }) {
  return (
    <div className={`p-4 ${!isLast ? 'border-b border-[#f0f0f0]' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="size-9 rounded-full overflow-hidden border border-[#e5e7eb] shrink-0 bg-[#f0f8f3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={review.avatar} alt={review.username} className="size-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + date row */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div>
              <span className="text-[12.5px] font-bold text-[#111827]">{review.username}</span>
              <span className="text-[10px] text-[#9ca3af] ml-2">{review.location}</span>
            </div>
            <span className="text-[10px] text-[#9ca3af] shrink-0">{review.date}</span>
          </div>

          {/* Hair type badges */}
          <div className="flex gap-1.5 mb-2.5">
            {review.hairTypes.map((tag) => (
              <span
                key={tag.label}
                className="text-[8px] font-bold px-2 py-[3px] rounded-full border leading-none"
                style={{ background: tag.bg, borderColor: tag.border, color: tag.text }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Product */}
          <div className="border-l-2 border-[#007237] pl-2.5 mb-2.5">
            <p className="text-[9px] font-semibold text-[#9ca3af] uppercase tracking-[0.8px] leading-none mb-0.5">{review.brand}</p>
            <p className="text-[11.5px] text-[#374151] leading-snug">{review.product}</p>
          </div>

          {/* Stars + review text */}
          <Stars count={review.rating} />
          <p className="mt-1.5 text-[11.5px] text-[#4b5563] leading-relaxed">{review.review}</p>
        </div>
      </div>
    </div>
  )
}

export default function WhySection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-20">
        <div className="flex items-start gap-20">

          {/* Left: Why GlamGuider copy */}
          <AnimateIn className="w-[500px] shrink-0">
            <div className="flex flex-col gap-5">
              <p
                className="text-[12px] font-bold uppercase tracking-[3px] text-[#0a5a30]"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                WHY GLAMGUIDER
              </p>

              <div className="flex flex-col gap-2 pb-1">
                <h1
                  className="text-[52px] font-semibold leading-[1.14] text-[#1c2a22]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Your Trusted Guide<br />to Beauty
                </h1>
                <p
                  className="text-[24px] italic text-[#0a5a30] tracking-[0.5px] leading-[1.5] pb-1"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Reviews &middot; Ingredients &middot; Self-Care
                </p>
              </div>

              <p
                className="text-[15.5px] text-[#5b6b60] leading-[1.75] max-w-[460px]"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                Real user reviews, ingredient breakdowns and simple guides - so you always know what&apos;s worth it before you buy.
              </p>

              <div className="flex items-center gap-8 pt-1">
                <Button href="/reviews" arrow>
                  Browse Reviews
                </Button>

                <div className="flex items-center gap-3.5">
                  <div className="flex items-center">
                    <div className="size-9 rounded-full bg-[#cfe3d6] border-2 border-white -mr-3 z-[3]" />
                    <div className="size-9 rounded-full bg-[#bcd9c6] border-2 border-white -mr-3 z-[2]" />
                    <div className="size-9 rounded-full bg-[#a8cfb5] border-2 border-white z-[1]" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-[#1c2a22] tracking-[1px] leading-none" style={{ fontFamily: 'var(--font-open-sans)' }}>
                      10K+ REVIEWS
                    </p>
                    <p className="text-[12px] text-[#8a958d] leading-none mt-1" style={{ fontFamily: 'var(--font-open-sans)' }}>
                      Trusted by our community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Vertical divider */}
          <div className="self-stretch w-px bg-[#c9a98a]/50 my-2 shrink-0" />

          {/* Right: Recent Reviews */}
          <AnimateIn delay={0.15} className="flex-1 flex flex-col gap-5">
            <h2
              className="text-[18px] font-bold text-[#111827] tracking-[-0.15px]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Most Recent Reviews
            </h2>

            <div className="bg-white border border-[#efefef] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#f5f5f5]">
              {REVIEWS.map((review, idx) => (
                <ReviewEntry key={review.id} review={review} isLast={idx === REVIEWS.length - 1} />
              ))}
            </div>

            <a
              href="/reviews"
              className="text-[13px] font-semibold text-[#007237] hover:underline underline-offset-2 self-start"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              View all reviews &rarr;
            </a>
          </AnimateIn>

        </div>
      </div>
    </section>
  )
}
