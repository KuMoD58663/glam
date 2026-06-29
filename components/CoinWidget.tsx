'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLoyalty } from '@/context/LoyaltyContext'

function GlamCoin({ pulse }: { pulse?: boolean }) {
  return (
    <span className="relative inline-flex shrink-0">
      <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden={true}>
        <circle cx="12" cy="12" r="10" fill="#fbbf24" />
        <circle cx="12" cy="12" r="8" fill="#f59e0b" />
        <text x="12" y="16" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="700" fontFamily="system-ui">G</text>
      </svg>
      {pulse && (
        <span aria-hidden={true} className="absolute -top-0.5 -right-0.5 size-2.5">
          <span className="animate-ping absolute inline-flex size-full rounded-full bg-[#e0a020] opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#e0a020]" />
        </span>
      )}
    </span>
  )
}

function LoggedInDropdown({
  points, streak, checkedInToday, checkIn, nextRewardAt, onClose,
}: {
  points: number
  streak: number
  checkedInToday: boolean
  checkIn: () => void
  nextRewardAt: number
  onClose: () => void
}) {
  const ptsEarned = points % nextRewardAt
  const ptsToNext = nextRewardAt - ptsEarned
  const progress = Math.round((ptsEarned / nextRewardAt) * 100)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-[28px] font-bold text-[#e0a020] font-[family-name:var(--font-dm-sans)]">{points}</span>
          <span className="text-[13px] text-[#5b6b60] ml-1 font-[family-name:var(--font-dm-sans)]">points</span>
        </div>
        <Link href="/rewards" onClick={onClose} className="text-[12px] font-semibold text-[#007237] hover:underline font-[family-name:var(--font-dm-sans)]">
          Redeem →
        </Link>
      </div>

      <div className="flex items-center justify-between bg-[#fff6e5] border border-[#f0dcb0] rounded-xl px-3 py-2.5 gap-3">
        {streak === 0 ? (
          <span className="text-[14px] font-semibold text-[#1c2a22] font-[family-name:var(--font-dm-sans)] shrink-0">
            Start your streak today.
          </span>
        ) : (
          <span className="text-[14px] font-semibold text-[#1c2a22] font-[family-name:var(--font-dm-sans)] shrink-0">
            🔥 Day {streak}
          </span>
        )}
        {checkedInToday ? (
          <div className="text-right">
            <p className="text-[12px] text-[#007237] font-semibold font-[family-name:var(--font-dm-sans)]">
              Checked in today ✓
            </p>
            <p className="text-[11px] text-[#5b6b60] font-[family-name:var(--font-dm-sans)]">
              Come back tomorrow to keep your streak.
            </p>
          </div>
        ) : (
          <button
            onClick={checkIn}
            className="bg-[#007237] text-white text-[12px] font-semibold rounded-full px-3 py-1.5 hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)] shrink-0"
          >
            Check in (+1)
          </button>
        )}
      </div>

      <div>
        <p className="text-[11px] text-[#5b6b60] mb-1.5 font-[family-name:var(--font-dm-sans)]">
          {ptsEarned} / {nextRewardAt} pts until your first reward
        </p>
        <div className="h-1.5 bg-[#f0f0f2] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e0a020] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1 border-t border-[#f5f5f5]">
        {([['Ways to earn', '/earn'], ['Redeem rewards', '/rewards'], ['View history', '/history']] as const).map(
          ([label, href]) => (
            <Link key={href} href={href} onClick={onClose} className="text-[11px] font-medium text-[#007237] hover:underline font-[family-name:var(--font-dm-sans)]">
              {label}
            </Link>
          )
        )}
      </div>
    </div>
  )
}

function LoggedOutDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center py-2">
      <p className="text-[14px] text-[#1c2a22] font-[family-name:var(--font-dm-sans)]">
        Earn points &amp; rewards for what you already do.
      </p>
      <Link
        href="/signin"
        onClick={onClose}
        className="bg-[#007237] text-white rounded-full px-5 py-2 text-[13px] font-semibold hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)]"
      >
        Sign in to start
      </Link>
    </div>
  )
}

export default function CoinWidget() {
  const { isLoggedIn } = useAuth()
  const { points, streak, checkedInToday, checkIn, nextRewardAt } = useLoyalty()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const showPulse = isLoggedIn && !checkedInToday

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex border border-[#f0f0f2] rounded-full items-center gap-1.5 px-3 h-[37px] shrink-0 hover:border-[#d8d8d8] transition-colors"
      >
        <GlamCoin pulse={showPulse} />
        {isLoggedIn ? (
          <>
            <span className="font-bold text-[13px] text-[#1a1a1a] font-[family-name:var(--font-dm-sans)]">{points}</span>
            {streak > 0 && (
              <span className="text-[12px] font-semibold text-[#e8732a] font-[family-name:var(--font-dm-sans)]">🔥 {streak}</span>
            )}
          </>
        ) : (
          <span className="font-bold text-[13px] text-[#1a1a1a] font-[family-name:var(--font-dm-sans)]">Rewards</span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Rewards"
          aria-modal={true}
          className="absolute right-0 top-[calc(100%+8px)] w-[300px] bg-white rounded-2xl border border-[#f0f0f2] shadow-[0_6px_24px_rgba(0,114,55,0.07)] p-4 z-50"
        >
          {isLoggedIn
            ? <LoggedInDropdown points={points} streak={streak} checkedInToday={checkedInToday} checkIn={checkIn} nextRewardAt={nextRewardAt} onClose={() => setOpen(false)} />
            : <LoggedOutDropdown onClose={() => setOpen(false)} />
          }
        </div>
      )}
    </div>
  )
}
