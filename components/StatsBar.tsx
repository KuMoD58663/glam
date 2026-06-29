import {
  UsersThree,
  Package,
  ChatCircleText,
  BookOpen,
  Storefront,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react/dist/lib/types'
import AnimateIn from './AnimateIn'

const STATS: { icon: Icon; value: string; label: string }[] = [
  { icon: UsersThree,      value: '2M+',   label: 'Happy Users' },
  { icon: Package,         value: '50K+',  label: 'Products' },
  { icon: ChatCircleText,  value: '1.5L+', label: 'Genuine Reviews' },
  { icon: BookOpen,        value: '100+',  label: 'Expert Articles' },
  { icon: Storefront,      value: '300+',  label: 'Brands' },
]

export default function StatsBar() {
  return (
    <section className="w-full bg-[#f6fbf8] border-b border-[#dceae2]">
      <div className="max-w-[1440px] mx-auto px-8 py-5">
        <div className="flex flex-wrap justify-center gap-y-4 divide-y-0 lg:divide-x lg:divide-[#c8ddd0]">
          {STATS.map((stat, idx) => (
            // Each stat staggers in independently — cascade feels more natural
            // than all five appearing at once.
            <AnimateIn
              key={stat.label}
              delay={idx * 0.07}
              className="flex items-center gap-2.5 px-3 md:px-8 py-1 w-1/2 sm:w-1/3 lg:w-auto justify-center"
            >
              <div className="size-10 rounded-xl bg-[#e6f4ec] flex items-center justify-center shrink-0">
                <stat.icon size={20} weight="fill" className="text-[#007237]" />
              </div>
              <div>
                <p
                  className="text-[20px] font-bold text-[#007237] leading-none"
                  style={{ fontFamily: 'var(--font-open-sans)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[12px] text-[#5b6b60] leading-none mt-1"
                  style={{ fontFamily: 'var(--font-open-sans)' }}
                >
                  {stat.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
