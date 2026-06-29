'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLoyalty } from '@/context/LoyaltyContext'

type CardState = 'earned' | 'auto' | 'checkin' | 'available'

const EARN_CARDS: { label: string; pts: string; state: CardState }[] = [
  { label: 'Write a review', pts: '+10 pts', state: 'earned' },
  { label: 'Daily check-in', pts: '+5 pts', state: 'checkin' },
  { label: 'Complete your profile', pts: '+20 pts', state: 'auto' },
  { label: 'Share a product', pts: '+15 pts', state: 'available' },
]

export default function EarnAsYouGlow() {
  const { isLoggedIn } = useAuth()
  const { points, streak, checkedInToday, lastMilestone, nextRewardAt, checkIn } = useLoyalty()
  const [milestoneVisible, setMilestoneVisible] = useState(false)

  useEffect(() => {
    setMilestoneVisible(lastMilestone !== null)
  }, [lastMilestone])

  const ptsEarned = points % nextRewardAt
  const ptsToNext = nextRewardAt - ptsEarned
  const progress = Math.round((ptsEarned / nextRewardAt) * 100)

  return (
    <section className="py-16 px-4 lg:px-12 bg-[#fff6e5]">
      <div className="max-w-5xl mx-auto">
        {milestoneVisible && lastMilestone && (
          <div className="mb-6 bg-[#e0a020] text-white rounded-2xl px-5 py-3 text-center font-semibold text-[15px] font-[family-name:var(--font-dm-sans)]">
            🔥 {lastMilestone.days}-day streak — +{lastMilestone.bonusPoints} pts!
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[32px] lg:text-[40px] font-bold text-[#1c2a22] leading-tight">
              Earn as You Glow
            </h2>
            {isLoggedIn ? (
              <p className="text-[#5b6b60] text-[15px] mt-1 font-[family-name:var(--font-dm-sans)]">
                <span className="text-[#e0a020] font-bold">{points} pts</span>
                {streak > 0 && <span> · 🔥 Day {streak}</span>}
              </p>
            ) : (
              <p className="text-[#5b6b60] text-[15px] mt-1 font-[family-name:var(--font-dm-sans)]">
                Up to 80 points your first week
              </p>
            )}
          </div>
          {!isLoggedIn && (
            <Link
              href="/signin"
              className="bg-[#007237] text-white rounded-full px-6 py-2.5 text-[14px] font-semibold hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)] self-start lg:self-auto"
            >
              Start earning
            </Link>
          )}
        </div>

        {isLoggedIn && (
          <div className="mb-8">
            <p className="text-[13px] text-[#5b6b60] mb-2 font-[family-name:var(--font-dm-sans)]">
              {ptsToNext} / {nextRewardAt} pts until your first reward
            </p>
            <div className="h-2 bg-[#f0dcb0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e0a020] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EARN_CARDS.map(({ label, pts, state }) => (
            <div
              key={label}
              className="bg-white rounded-[14px] p-5 shadow-[0_6px_24px_rgba(0,114,55,0.07)] flex flex-col gap-2"
            >
              <span className="text-[14px] font-semibold text-[#1c2a22] font-[family-name:var(--font-dm-sans)]">
                {label}
              </span>
              <span className="text-[13px] font-bold text-[#e0a020] font-[family-name:var(--font-dm-sans)]">
                {pts}
              </span>
              {isLoggedIn && (
                state === 'earned' ? (
                  <span className="text-[12px] text-[#007237] font-semibold font-[family-name:var(--font-dm-sans)]">Earned ✓</span>
                ) : state === 'auto' ? (
                  <span className="text-[12px] text-[#5b6b60] font-[family-name:var(--font-dm-sans)]">Auto-credited</span>
                ) : state === 'checkin' ? (
                  checkedInToday ? (
                    <span className="text-[12px] text-[#007237] font-semibold font-[family-name:var(--font-dm-sans)]">Checked in today ✓</span>
                  ) : (
                    <button
                      onClick={checkIn}
                      className="text-[12px] font-semibold rounded-full px-3 py-1 bg-[#007237] text-white hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)] w-fit"
                    >
                      Check in (+1)
                    </button>
                  )
                ) : (
                  <button className="text-[12px] font-semibold rounded-full px-3 py-1 bg-[#007237] text-white hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)] w-fit">
                    Earn now
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
