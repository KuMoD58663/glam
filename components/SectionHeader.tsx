import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import AnimateIn from './AnimateIn'

// Shared section header: left-aligned title + optional subtitle, with an optional
// right-aligned "view all" action. Replaces the repeated centered-Playfair headers
// so every section reads with the same intentional rhythm.
export default function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  title: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <AnimateIn>
      <div className="flex items-end justify-between gap-6 mb-6 lg:mb-10">
        <div className="flex flex-col gap-1.5">
          <h2
            className="text-[34px] md:text-[40px] font-bold text-[#007237] leading-none"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-[15px] text-[#5b6b60] leading-snug max-w-[46ch]"
              style={{ fontFamily: 'var(--font-open-sans)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {actionHref && actionLabel && (
          <a
            href={actionHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#007237] hover:gap-2.5 transition-all duration-200 shrink-0 pb-1"
            style={{ fontFamily: 'var(--font-open-sans)' }}
          >
            {actionLabel}
            <ArrowRight size={16} weight="bold" />
          </a>
        )}
      </div>
    </AnimateIn>
  )
}
