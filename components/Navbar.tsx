'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlass, CaretDown, List, X } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'motion/react'
import CoinWidget from '@/components/CoinWidget'

const CATEGORY_LINKS = [
  { label: 'Face & Skin', href: '/face-skin' },
  { label: 'Hair Care', href: '/hair-care' },
  { label: 'Makeup', href: '/makeup' },
  { label: 'Bath & Body', href: '/bath-body' },
  { label: 'Baby & Kids', href: '/baby-kids' },
  { label: "Women's Care", href: '/womens-care' },
  { label: "Men's Care", href: '/mens-care' },
]

const NAV_LINKS = [
  { label: 'Trial Kit', href: '/trial-kit', color: '#7c3aed', bold: true },
  { label: 'Deals & Rewards', href: '/deals', color: '#007237', bold: true },
  { label: 'Blogs', href: '/blogs', color: '#1a1a1a', bold: false },
  { label: 'Community', href: '/community', color: '#1a1a1a', bold: false },
  { label: 'Ingredients Checker', href: '/ingredients', color: '#1a1a1a', bold: false },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white sticky top-0 z-50 w-full">
        {/* Top row */}
        <div className="h-[70px] border-b border-[#f0f0f2] flex items-center px-4 lg:px-12 gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/glamguider-logo.png"
              alt="GlamGuider"
              width={161}
              height={37}
              className="h-7 w-auto lg:h-9"
              priority
            />
          </Link>

          {/* Search bar — desktop only */}
          <div className="hidden lg:flex ml-3 items-center bg-[#fafafa] border border-[#e5e7eb] rounded-full h-[43px] px-4 gap-3 w-[490px] shrink-0 cursor-text">
            <MagnifyingGlass size={16} className="text-[#b0b0b8] shrink-0" weight="regular" />
            <span className="text-[#b0b0b8] text-[13.5px] font-[family-name:var(--font-dm-sans)] truncate select-none">
              Search for products, brands, ingredients...
            </span>
          </div>

          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] tracking-[0.13px] font-[family-name:var(--font-dm-sans)] shrink-0">
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

          {/* Desktop buttons */}
          <div className="hidden lg:flex ml-4">
            <CoinWidget />
          </div>

          <Link
            href="/signin"
            className="hidden lg:flex ml-2 bg-[#007237] text-white rounded-full px-5 h-[37px] items-center text-[13px] font-semibold font-[family-name:var(--font-dm-sans)] tracking-[0.13px] shrink-0 hover:bg-[#005a2b] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
          >
            Sign In
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-1 text-[#1a1a1a] hover:text-[#007237] transition-all active:scale-[0.9] duration-150"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <List size={26} weight="bold" />
          </button>
        </div>

        {/* Category bar — desktop only */}
        <div className="hidden lg:flex h-[44px] border-b border-[#f0f0f2] items-center justify-center">
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

      {/* Mobile menu — slides in from the right with iOS drawer curve */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col lg:hidden overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-[70px] border-b border-[#f0f0f2] shrink-0">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/images/glamguider-logo.png"
                  alt="GlamGuider"
                  width={140}
                  height={32}
                  className="h-7 w-auto"
                />
              </Link>
              <button
                className="p-2 -mr-1 text-[#1a1a1a] hover:text-[#007237] transition-all active:scale-[0.9] duration-150"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={26} weight="bold" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
              {/* Search */}
              <div className="flex items-center bg-[#fafafa] border border-[#e5e7eb] rounded-full h-[46px] px-4 gap-3">
                <MagnifyingGlass size={16} className="text-[#b0b0b8] shrink-0" weight="regular" />
                <span className="text-[#b0b0b8] text-[14px] font-[family-name:var(--font-dm-sans)] select-none">
                  Search products, brands, ingredients...
                </span>
              </div>

              {/* Loyalty widget */}
              <CoinWidget />

              {/* Sign In */}
              <Link
                href="/signin"
                className="flex items-center justify-center bg-[#007237] text-white rounded-full h-[46px] text-[15px] font-semibold font-[family-name:var(--font-dm-sans)] hover:bg-[#005a2b] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>

              {/* Nav links */}
              <div className="flex flex-col">
                {NAV_LINKS.map(({ label, href, color, bold }) => (
                  <Link
                    key={label}
                    href={href}
                    className="py-3.5 border-b border-[#f5f5f5] text-[16px] transition-colors hover:text-[#007237] active:opacity-60"
                    style={{ color, fontWeight: bold ? 600 : 500, fontFamily: 'var(--font-dm-sans)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Categories */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#9ca3af] mb-3" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_LINKS.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-[14px] font-medium text-[#1a1a1a] bg-[#f6fbf8] rounded-xl px-4 py-3 hover:bg-[#e6f4ec] hover:text-[#007237] transition-colors active:scale-[0.97] transition-transform duration-150"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
