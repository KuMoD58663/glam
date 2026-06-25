import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

// Single CTA system for the whole site.
// Shape rule: every interactive CTA is a pill (rounded-full); containers are rounded-2xl, badges rounded-md.
// Font rule: all CTAs use Open Sans. Directional CTAs get a trailing ArrowRight.
type Variant = 'primary' | 'secondary' | 'mint' | 'inverse'
type Size = 'sm' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // green fill — default, works on light and dark sections
  primary: 'bg-[#007237] text-white hover:bg-[#005a2b]',
  // green outline — lower-emphasis actions on light backgrounds
  secondary: 'border border-[#007237] text-[#007237] hover:bg-[#007237] hover:text-white',
  // mint fill — for use on the dark-green ingredient section (green-on-green would fail contrast)
  mint: 'bg-[#7fd3a3] text-[#0c3d22] hover:bg-[#a5e3bf]',
  // white fill — for use over photography (scrim still recommended behind it)
  inverse: 'bg-white text-[#007237] hover:bg-[#ecfff5] shadow-[0_6px_18px_rgba(0,0,0,0.18)]',
}

const SIZES: Record<Size, string> = {
  sm: 'text-[13px] px-5 py-2.5',
  lg: 'text-[15px] px-7 py-4',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  arrow = false,
  fullWidth = false,
  element,
  className = '',
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  size?: Size
  arrow?: boolean
  fullWidth?: boolean
  // 'span' renders a non-interactive visual button (use when the parent is already a link)
  element?: 'a' | 'span' | 'button'
  className?: string
  'aria-label'?: string
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none whitespace-nowrap transition-all duration-200 active:scale-[0.97] ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={size === 'lg' ? 16 : 15} weight="bold" />}
    </>
  )
  const style = { fontFamily: 'var(--font-open-sans)' }
  const Tag = element ?? (href ? 'a' : 'button')

  if (Tag === 'span') {
    return (
      <span className={cls} style={style}>
        {content}
      </span>
    )
  }
  if (Tag === 'button') {
    return (
      <button className={cls} style={style} aria-label={ariaLabel}>
        {content}
      </button>
    )
  }
  return (
    <a href={href} className={cls} style={style} aria-label={ariaLabel}>
      {content}
    </a>
  )
}
