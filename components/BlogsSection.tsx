import AnimateIn from './AnimateIn'
import Button from './Button'
import SectionHeader from './SectionHeader'

const BLOGS = [
  {
    id: 1,
    title: "Vitamins in Skincare: The Glow-Boosting Heroes You Can't Ignore",
    excerpt: "In today's beauty world, skincare isn't just about looking good but about feeling healthy and confident. Find out which vitamins are doing the real work.",
    image: '/images/figma/figma-img-12.jpg',
    date: null,
    href: '/blog/vitamins-in-skincare',
  },
  {
    id: 2,
    title: 'How to Choose Safe Baby Skincare: What Indian Moms Need to Know',
    excerpt: "A baby's skin is soft, delicate, and more sensitive than adult skin. Choosing the right products from day one protects more than it treats.",
    image: '/images/figma/figma-img-20.jpg',
    date: 'August 22, 2025',
    href: '/blog/safe-baby-skincare',
  },
  {
    id: 3,
    title: 'Fermented Rice Water - A Natural Glow Booster for Indian Skin',
    excerpt: 'Ancient Asian beauty meets Indian skincare needs. Fermented rice water is quickly becoming a favorite for its brightening and soothing properties.',
    image: '/images/figma/figma-img-09.png',
    date: null,
    href: '/blog/fermented-rice-water',
  },
]

export default function BlogsSection() {
  return (
    <section className="w-full py-10 lg:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <SectionHeader
          title="Latest Blogs"
          subtitle="Skincare science, ingredient breakdowns, and routines worth your time."
          actionHref="/blogs"
          actionLabel="View all blogs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOGS.map((blog, idx) => (
            <AnimateIn key={blog.id} delay={idx * 0.08}>
              <article className="flex flex-col h-full group">

                {/* Image — always on top */}
                <div className="relative h-[220px] overflow-hidden rounded-xl mb-5 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  {blog.date && (
                    <p
                      className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-[0.8px] mb-2"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {blog.date}
                    </p>
                  )}
                  <h3
                    className="text-[17px] font-semibold text-[#111827] leading-snug mb-2.5"
                    style={{ fontFamily: 'var(--font-open-sans)' }}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="text-[13px] text-[#6b7280] leading-relaxed mb-5 flex-1"
                    style={{ fontFamily: 'var(--font-open-sans)' }}
                  >
                    {blog.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Button href={blog.href} variant="secondary" size="sm" arrow>
                      Read More
                    </Button>
                  </div>
                </div>

              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
