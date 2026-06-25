import AnimateIn from './AnimateIn'
import SectionHeader from './SectionHeader'

const CATEGORIES = [
  {
    label: 'Face & Skin Care',
    articles: 13,
    image: 'https://www.figma.com/api/mcp/asset/4637fbcb-1146-44b7-b0c3-49cde49cedaf',
    href: '/face-skin',
  },
  {
    label: 'Hair Care',
    articles: 13,
    image: 'https://www.figma.com/api/mcp/asset/8afe3d43-0919-48fb-ad9e-ca2e4fc85dd0',
    href: '/hair-care',
  },
  {
    label: 'Bath & Body Care',
    articles: 13,
    image: 'https://www.figma.com/api/mcp/asset/664cb402-35be-4bd7-926a-ac63286d39e3',
    href: '/bath-body',
  },
  {
    label: 'Makeup',
    articles: 13,
    image: 'https://www.figma.com/api/mcp/asset/8f065be0-8d34-420a-8968-110476958793',
    href: '/makeup',
  },
]

function CategoryTile({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  return (
    <a
      href={cat.href}
      className="relative overflow-hidden group cursor-pointer block h-[420px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cat.image}
        alt={cat.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Gradient overlay — strong bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Subtle green tint on hover */}
      <div className="absolute inset-0 bg-[#007237]/0 transition-colors duration-300 group-hover:bg-[#007237]/12" />

      {/* Text — lifts slightly on hover */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p
          className="text-[22px] font-bold text-white leading-tight"
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
    <section className="w-full py-16 bg-[#f0f8f3]">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionHeader
          title="Explore Categories"
          subtitle="Honest, research-backed guides across the things you actually shop for."
          actionHref="/categories"
          actionLabel="View all categories"
        />

        {/* 4-column equal-width grid matching Figma */}
        <AnimateIn delay={0.1}>
          <div className="grid grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryTile key={cat.href} cat={cat} />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
