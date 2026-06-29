import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMockLoyalty } from '../useMockLoyalty'

describe('useMockLoyalty', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('initialises with correct defaults', () => {
    const { result } = renderHook(() => useMockLoyalty())
    expect(result.current.points).toBe(526)
    expect(result.current.streak).toBe(5)
    expect(result.current.checkedInToday).toBe(false)
    expect(result.current.streakAtRisk).toBe(false)
    expect(result.current.lastMilestone).toBeNull()
    expect(result.current.nextRewardAt).toBe(80)
  })

  it('checkIn increments streak by 1, adds 10 pts, sets checkedInToday', () => {
    const { result } = renderHook(() => useMockLoyalty())
    act(() => { result.current.checkIn() })
    expect(result.current.streak).toBe(6)
    expect(result.current.points).toBe(536)
    expect(result.current.checkedInToday).toBe(true)
  })

  it('checkIn is a no-op when already checked in today', () => {
    const { result } = renderHook(() => useMockLoyalty())
    act(() => { result.current.checkIn() })
    const pts = result.current.points
    act(() => { result.current.checkIn() })
    expect(result.current.points).toBe(pts)
    expect(result.current.streak).toBe(6)
  })

  it('streak 5 → 6 does not trigger a milestone', () => {
    const { result } = renderHook(() => useMockLoyalty())
    act(() => { result.current.checkIn() })
    expect(result.current.lastMilestone).toBeNull()
  })

  it('nextRewardAt is always 80', () => {
    const { result } = renderHook(() => useMockLoyalty())
    expect(result.current.nextRewardAt).toBe(80)
  })
})
