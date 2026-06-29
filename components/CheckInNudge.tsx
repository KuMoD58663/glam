'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useLoyalty } from '@/context/LoyaltyContext'

function getTodayKey() {
  return `glam-checkin-dismissed-${new Date().toISOString().split('T')[0]}`
}

export default function CheckInNudge() {
  const { isLoggedIn } = useAuth()
  const { streak, checkedInToday, streakAtRisk, checkIn } = useLoyalty()
  // Start dismissed=true to avoid a flash on SSR hydration; useEffect corrects it client-side.
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDismissed(localStorage.getItem(getTodayKey()) === '1')
  }, [])

  function dismiss() {
    localStorage.setItem(getTodayKey(), '1')
    setDismissed(true)
  }

  if (!isLoggedIn || checkedInToday || dismissed) return null

  const copy =
    streakAtRisk && streak > 0
      ? `Don't lose your ${streak}-day streak — check in now.`
      : `🔥 Day ${streak} — check in to keep your streak`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff6e5] border-t border-[#f0dcb0] flex items-center justify-between px-4 h-12 gap-3">
      <span className="text-[13px] font-medium text-[#1c2a22] font-[family-name:var(--font-dm-sans)] truncate">
        {copy}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => { checkIn(); dismiss() }}
          className="bg-[#007237] text-white text-[12px] font-semibold rounded-full px-3 h-7 hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)]"
        >
          Check in
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-[#5b6b60] hover:text-[#1c2a22] transition-colors text-[20px] leading-none w-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    </div>
  )
}
