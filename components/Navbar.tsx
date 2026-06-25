import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlass, CaretDown } from '@phosphor-icons/react/dist/ssr'

const CATEGORY_LINKS = [
  { label: 'Face & Skin', href: '/face-skin' },
  { label: 'Hair Care', href: '/hair-care' },
  { label: 'Makeup', href: '/makeup' },
  { label: 'Bath & Body', href: '/bath-body' },
  { label: 'Baby & Kids', href: '/baby-kids' },
  { label: "Women's Care", href: '/womens-care' },
  { label: "Men's Care", href: '/mens-care' },
]

function GlamCoin() {
  return (
    <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#fbbf24" />
      <circle cx="12" cy="12" r="8" fill="#f59e0b" />
      <text x="12" y="16" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="700" fontFamily="system-ui">G</text>
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 z-50 w-full">
      {/* Top row */}
      <div className="h-[70px] border-b border-[#f0f0f2] flex items-center px-12 gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/glamguider-logo.png"
            alt="GlamGuider"
            width={161}
            height={37}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <div className="ml-3 flex items-center bg-[#fafafa] border border-[#e5e7eb] rounded-full h-[43px] px-4 gap-3 w-[490px] shrink-0 cursor-text">
          <MagnifyingGlass size={16} className="text-[#b0b0b8] shrink-0" weight="regular" />
          <span className="text-[#b0b0b8] text-[13.5px] font-[family-name:var(--font-dm-sans)] truncate select-none">
            Search for products, brands, ingredients...
          </span>
        </div>

        <div className="flex-1" />

        <nav className="flex items-center gap-7 text-[13px] tracking-[0.13px] font-[family-name:var(--font-dm-sans)] shrink-0">
          <Link href="/trial-kit" className="font-semibold text-[#7c3aed] hover:opacity-75 transition-opacity whitespace-nowrap">
            Trial Kit
          </Link>
          <Link href="/deals" className="font-semibold text-[#007237] hover:opacity-75 transition-opacity whitespace-nowrap">
            Deals &amp; Rewards
          </Link>
          <Link href="/blogs" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
            Blogs
          </Link>
          <Link href="/community" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
            Community
          </Link>
          <Link href="/ingredients" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
            Ingredients Checker
          </Link>
        </nav>

        <button className="ml-4 border border-[#f0f0f2] rounded-full flex items-center gap-1.5 px-3 h-[37px] shrink-0 hover:border-[#d8d8d8] transition-colors">
          <GlamCoin />
          <span className="font-bold text-[13px] text-[#1a1a1a] font-[family-name:var(--font-dm-sans)]">0</span>
        </button>

        <Link
          href="/signin"
          className="ml-2 bg-[#007237] text-white rounded-full px-5 h-[37px] flex items-center text-[13px] font-semibold font-[family-name:var(--font-dm-sans)] tracking-[0.13px] shrink-0 hover:bg-[#005a2b] transition-colors active:scale-[0.98]"
        >
          Sign In
        </Link>
      </div>

      {/* Bottom row */}
      <div className="h-[44px] border-b border-[#f0f0f2] flex items-center justify-center">
        <nav className="flex items-center gap-8 text-[13px] font-medium text-[#1a1a1a] tracking-[0.13px] font-[family-name:var(--font-dm-sans)]">
          {CATEGORY_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-[#007237] transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
          <button className="flex items-center gap-1 font-semibold text-[#1a1a1a] hover:text-[#007237] transition-colors">
            More
            <CaretDown size={12} weight="bold" />
          </button>
        </nav>
      </div>
    </header>
  )
}
