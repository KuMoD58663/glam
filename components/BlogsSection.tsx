import AnimateIn from './AnimateIn'
import Button from './Button'
import SectionHeader from './SectionHeader'

const BLOGS = [
  {
    id: 1,
    title: "Vitamins in Skincare: The Glow-Boosting Heroes You Can't Ignore",
    excerpt: "In today's beauty world, skincare isn't just about looking good but about feeling healthy and confident. Find out which vitamins are doing the real work.",
    image: 'https://www.figma.com/api/mcp/asset/cc5bd606-7e02-4ea1-972f-e1ddc7a1aef8',
    imagePosition: 'bottom' as const,
    date: null,
    href: '/blog/vitamins-in-skincare',
  },
  {
    id: 2,
    title: 'How to Choose Safe Baby Skincare: What Indian Moms Need to Know',
    excerpt: "A baby's skin is soft, delicate, and more sensitive than adult skin. Choosing the right products from day one protects more than it treats.",
    image: 'https://www.figma.com/api/mcp/asset/15cad4ce-eba9-4a99-a8ec-cbba8a58e9a5',
    imagePosition: 'top' as const,
    date: 'August 22, 2025',
    href: '/blog/safe-baby-skincare',
  },
  {
    id: 3,
    title: 'Fermented Rice Water - A Natural Glow Booster for Indian Skin',
    excerpt: 'Ancient Asian beauty meets Indian skincare needs. Fermented rice water is quickly becoming a favorite for its brightening and soothing properties.',
    image: 'https://www.figma.com/api/mcp/asset/a7579509-12fa-440a-83f5-738024b28876',
    imagePosition: 'bottom' as const,
    date: null,
    href: '/blog/fermented-rice-water',
  },
]

function ReadLink({ href }: { href: string }) {
  return (
    <div className="mt-auto">
      <Button href={href} variant="secondary" size="sm" arrow>
        Read More
      </Button>
    </div>
  )
}

function BlogImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
      />
    </div>
  )
}

export default function BlogsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionHeader
          title="Latest Blogs"
          subtitle="Skincare science, ingredient breakdowns, and routines worth your time."
          actionHref="/blogs"
          actionLabel="View all blogs"
        />

        <div className="grid grid-cols-3 gap-10">
          {BLOGS.map((blog, idx) => (
            <AnimateIn key={blog.id} delay={idx * 0.08}>
              <article className="flex flex-col h-full">

                {/* Center blog: image on top */}
                {blog.imagePosition === 'top' && (
                  <>
                    <BlogImage src={blog.image} alt={blog.title} className="h-[230px]" />
                    <div className="flex flex-col flex-1 pt-5">
                      {blog.date && (
                        <p
                          className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-[0.8px] mb-2"
                          style={{ fontFamily: 'var(--font-dm-sans)' }}
                        >
                          {blog.date}
                        </p>
                      )}
                      <h3
                        className="text-[18px] font-semibold text-[#111827] leading-snug mb-3"
                        style={{ fontFamily: 'var(--font-open-sans)' }}
                      >
                        {blog.title}
                      </h3>
                      <p
                        className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5"
                        style={{ fontFamily: 'var(--font-open-sans)' }}
                      >
                        {blog.excerpt}
                      </p>
                      <ReadLink href={blog.href} />
                    </div>
                  </>
                )}

                {/* Left / Right blogs: near-black left border, content then image */}
                {blog.imagePosition === 'bottom' && (
                  <>
                    <div className="flex flex-col flex-1 pl-5 border-l-2 border-[#111827] mb-5">
                      <h3
                        className="text-[18px] font-semibold text-[#111827] leading-snug mb-3"
                        style={{ fontFamily: 'var(--font-open-sans)' }}
                      >
                        {blog.title}
                      </h3>
                      <p
                        className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5"
                        style={{ fontFamily: 'var(--font-open-sans)' }}
                      >
                        {blog.excerpt}
                      </p>
                      <ReadLink href={blog.href} />
                    </div>
                    <BlogImage src={blog.image} alt={blog.title} className="h-[230px]" />
                  </>
                )}

              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
