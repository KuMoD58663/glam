import { useState, useRef } from 'react'

export type LoyaltyData = {
  points: number
  streak: number
  checkedInToday: boolean
  streakAtRisk: boolean
  lastMilestone: null | { days: number; bonusPoints: number }
  nextRewardAt: number
  checkIn: () => void
}

export function useMockLoyalty(): LoyaltyData {
  const [points, setPoints] = useState(526)
  const [streak, setStreak] = useState(5)
  const [checkedInToday, setCheckedInToday] = useState(false)
  const [streakAtRisk] = useState(false)
  const [lastMilestone, setLastMilestone] = useState<LoyaltyData['lastMilestone']>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function checkIn() {
    if (checkedInToday) return
    const newStreak = streak + 1
    const bonusPoints = newStreak === 7 ? 20 : newStreak === 30 ? 50 : 10
    setPoints(p => p + bonusPoints)
    setStreak(newStreak)
    setCheckedInToday(true)
    if (newStreak === 7 || newStreak === 30) {
      setLastMilestone({ days: newStreak, bonusPoints })
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setLastMilestone(null), 4000)
    }
  }

  return { points, streak, checkedInToday, streakAtRisk, lastMilestone, nextRewardAt: 80, checkIn }
}
