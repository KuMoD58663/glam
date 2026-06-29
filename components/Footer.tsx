import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'

const LINKS = {
  Discover: [
    { label: 'Browse Reviews', href: '/reviews' },
    { label: 'Explore Categories', href: '/categories' },
    { label: 'Ingredient Checker', href: '/ingredients' },
    { label: 'Latest Blogs', href: '/blogs' },
  ],
  Community: [
    { label: 'Write a Review', href: '/write-review' },
    { label: 'Community Forum', href: '/community' },
    { label: 'Deals & Rewards', href: '/deals' },
    { label: 'Trial Kit', href: '/trial-kit' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1c2a22] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 col-span-2 lg:col-span-1">
            <Image
              src="/images/glamguider-logo.png"
              alt="GlamGuider"
              width={140}
              height={32}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="text-[13.5px] text-white/60 leading-relaxed max-w-[220px]" style={{ fontFamily: 'var(--font-open-sans)' }}>
              Real reviews. Honest ingredients. Guides that actually help.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[11px] font-bold uppercase tracking-[2px] text-white/40 mb-4" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13.5px] text-white/70 hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 lg:mt-12 pt-5 lg:pt-6 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/40" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            &copy; 2026 GlamGuider. All rights reserved.
          </p>
          <Button href="/write-review" size="sm">
            Write a Review
          </Button>
        </div>
      </div>
    </footer>
  )
}
