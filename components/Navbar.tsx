import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Guides', href: '/guides' },
  { label: 'Beauty Resources', href: '/beauty-resources' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 w-full">
      <Image
        src="/images/glamguider-logo.png"
        alt="GlamGuider"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />

      <ul className="hidden lg:flex items-center gap-7">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="text-cream/75 hover:text-cream text-sm transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button className="bg-mint text-forest text-sm font-semibold px-5 py-2 rounded-full hover:bg-mint/90 transition-colors whitespace-nowrap">
        Book a Consultation
      </button>
    </nav>
  )
}
