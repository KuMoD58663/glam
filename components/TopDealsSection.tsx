import { ShoppingBag } from '@phosphor-icons/react/dist/ssr'
import AnimateIn from './AnimateIn'
import Button from './Button'
import SectionHeader from './SectionHeader'

const DEALS = [
  {
    id: 1,
    brand: 'Minimalist',
    product: 'Hair Shampoo',
    image: 'https://www.figma.com/api/mcp/asset/32af57a3-d423-47c7-a550-4c6d6b6dfae2',
    mrp: 729,
    price: 450,
    discount: 38,
    href: '/deals/minimalist-hair-shampoo',
  },
  {
    id: 2,
    brand: 'Tuco Kids',
    product: 'Sun Lotion',
    image: 'https://www.figma.com/api/mcp/asset/8ba2dc20-321f-4aef-9714-3f3bd4313849',
    mrp: 1071,
    price: 450,
    discount: 58,
    href: '/deals/tuco-kids-sun-lotion',
  },
  {
    id: 3,
    brand: 'Naturali',
    product: 'Conditioner',
    image: 'https://www.figma.com/api/mcp/asset/bfe10fd5-e96f-4735-8d75-63c1eb382ddb',
    mrp: 978,
    price: 450,
    discount: 54,
    href: '/deals/naturali-conditioner',
  },
  {
    id: 4,
    brand: 'Naturali',
    product: 'Shampoo',
    image: 'https://www.figma.com/api/mcp/asset/19c3ef00-74ff-4715-b450-07318adf6e09',
    mrp: 682,
    price: 450,
    discount: 34,
    href: '/deals/naturali-shampoo',
  },
]

function DealCard({ deal, delay }: { deal: (typeof DEALS)[number]; delay: number }) {
  return (
    <AnimateIn delay={delay} className="h-full">
      <a
        href={deal.href}
        className="h-full bg-white border border-black/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(46,68,35,0.08)] hover:shadow-[0_16px_36px_rgba(46,68,35,0.18)] hover:border-[#007237]/35 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] transition-all duration-300 group block"
      >
        {/* Product image */}
        <div className="relative w-full aspect-square bg-[#f6f6f6] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={deal.image}
            alt={`${deal.brand} ${deal.product}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Card content */}
        <div className="flex flex-col gap-3 px-3.5 pt-3.5 pb-4 flex-1">
          <div className="flex flex-col gap-1.5 flex-1">
            <p
              className="text-[18px] font-bold text-[#161616] leading-tight"
              style={{ fontFamily: 'var(--font-open-sans)' }}
            >
              {deal.brand}
            </p>
            <p
              className="text-[14px] text-[#5b6b60] leading-tight"
              style={{ fontFamily: 'var(--font-open-sans)' }}
            >
              {deal.product}
            </p>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-auto pt-2">
              <span
                className="text-[16px] font-bold text-[#161616] leading-none"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                ₹{deal.price}
              </span>
              <span
                className="text-[13px] text-[#9aa39c] line-through leading-none"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                ₹{deal.mrp}
              </span>
              <span
                className="text-[11px] font-bold text-[#007237] bg-[#ecfff5] px-2 py-1 rounded-md leading-none"
                style={{ fontFamily: 'var(--font-open-sans)' }}
              >
                {deal.discount}% OFF
              </span>
            </div>
          </div>
          <Button element="span" size="sm" fullWidth>
            <ShoppingBag size={15} weight="bold" />
            Buy Now
          </Button>
        </div>
      </a>
    </AnimateIn>
  )
}

export default function TopDealsSection() {
  return (
    <section className="w-full py-16 bg-[#f0f8f3]">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionHeader
          title="Top Deals"
          subtitle="Editor-picked beauty buys at their lowest prices this week."
          actionHref="/deals"
          actionLabel="View all deals"
        />

        {/* 5-col grid: 4 products + promo banner — items-stretch keeps equal card heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
          {DEALS.map((deal, idx) => (
            <DealCard key={deal.id} deal={deal} delay={idx * 0.07} />
          ))}

          {/* Promo banner card — full-bleed cover with scrim + CTA, links to /deals */}
          <AnimateIn delay={DEALS.length * 0.07} className="h-full col-span-2 md:col-span-3 lg:col-span-1">
            <a
              href="/deals"
              className="relative h-full rounded-2xl overflow-hidden block min-h-[360px] shadow-[0_8px_24px_rgba(46,68,35,0.08)] hover:shadow-[0_16px_36px_rgba(46,68,35,0.18)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group"
              aria-label="Where Glam Meets Great Deals, Shop all deals"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/deals-promo-banner.png"
                alt="Where Glam Meets Great Deals"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              />
              {/* Scrim so the CTA stays legible over any photo (WCAG AA) */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <Button element="span" variant="inverse" size="sm" fullWidth arrow>
                  Shop All Deals
                </Button>
              </div>
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
