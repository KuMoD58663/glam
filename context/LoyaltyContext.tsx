'use client'

import { createContext, useContext } from 'react'
import { useMockLoyalty, type LoyaltyData } from '@/hooks/useMockLoyalty'

const LoyaltyContext = createContext<LoyaltyData>({
  points: 0,
  streak: 0,
  checkedInToday: false,
  streakAtRisk: false,
  lastMilestone: null,
  nextRewardAt: 80,
  checkIn: () => {},
})

export function LoyaltyProvider({ children }: { children: React.ReactNode }) {
  const loyalty = useMockLoyalty()
  return <LoyaltyContext.Provider value={loyalty}>{children}</LoyaltyContext.Provider>
}

export const useLoyalty = () => useContext(LoyaltyContext)
