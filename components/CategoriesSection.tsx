import AnimateIn from './AnimateIn'
import SectionHeader from './SectionHeader'

const CATEGORIES = [
  {
    label: 'Face & Skin Care',
    articles: 13,
    image: '/images/figma/figma-img-05.jpg',
    href: '/face-skin',
  },
  {
    label: 'Hair Care',
    articles: 13,
    image: '/images/figma/figma-img-14.jpg',
    href: '/hair-care',
  },
  {
    label: 'Bath & Body Care',
    articles: 13,
    image: '/images/figma/figma-img-15.jpg',
    href: '/bath-body',
  },
  {
    label: 'Makeup',
    articles: 13,
    image: '/images/figma/figma-img-12.jpg',
    href: '/makeup',
  },
]

function CategoryTile({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  return (
    <a
      href={cat.href}
      className="relative overflow-hidden group cursor-pointer block h-[190px] sm:h-[260px] lg:h-[420px] rounded-none active:opacity-90 transition-opacity duration-150"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cat.image}
        alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Subtle green tint on hover */}
      <div className="absolute inset-0 bg-[#007237]/0 transition-colors duration-300 group-hover:bg-[#007237]/12" />

      {/* Text — lifts on hover */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p
          className="text-[15px] sm:text-[18px] lg:text-[22px] font-bold text-white leading-tight"
          style={{ fontFamily: 'var(--font-open-sans)' }}
        >
          {cat.label}
        </p>
        <p
          className="text-[14px] font-medium text-white/75 mt-1 flex items-center gap-1"
          style={{ fontFamily: 'var(--font-open-sans)' }}
        >
          {cat.articles} Articles
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1">&rarr;</span>
        </p>
      </div>
    </a>
  )
}

export default function CategoriesSection() {
  return (
    <section className="w-full py-10 lg:py-16 bg-[#f0f8f3]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <SectionHeader
          title="Explore Categories"
          subtitle="Honest, research-backed guides across the things you actually shop for."
          actionHref="/categories"
          actionLabel="View all categories"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {CATEGORIES.map((cat, idx) => (
            // Stagger each tile individually so they cascade in left-to-right.
            <AnimateIn key={cat.href} delay={idx * 0.07}>
              <CategoryTile cat={cat} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
