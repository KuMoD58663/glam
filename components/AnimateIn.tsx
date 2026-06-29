'use client'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'

export default function AnimateIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <motion.div
      ref={ref}
      className={className}
      // animate (not initial) is never applied in SSR — server renders content
      // visible. Once hydrated, useInView gates the scroll-triggered entrance.
      animate={
        reduce
          ? {}
          : { opacity: inView ? 1 : 0, y: inView ? 0 : 10, scale: inView ? 1 : 0.96 }
      }
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
