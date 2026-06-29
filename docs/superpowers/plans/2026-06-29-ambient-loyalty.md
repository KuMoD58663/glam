# GlamGuider Ambient Loyalty Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make loyalty points and daily streak ambient across the site via an upgraded navbar coin widget, a dismissible daily check-in nudge, and a new stateful "Earn as You Glow" homepage section.

**Architecture:** Dual React contexts — `AuthContext` (mock auth + dev toggle) and `LoyaltyContext` (wraps `useMockLoyalty` hook) — both mounted in `layout.tsx` so every page automatically receives the ambient coin widget. A single `checkIn()` call in `LoyaltyContext` updates all three surfaces simultaneously.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript, Vitest + React Testing Library (added in Task 1).

## Global Constraints

- Gold `#e0a020` used **only** for loyalty/points surfaces; no new colors introduced.
- CSS font classes throughout: `font-[family-name:var(--font-dm-sans)]`, `font-[family-name:var(--font-playfair)]`.
- All components that use hooks must have `'use client'` as their first line.
- Dev toggle (`DevAuthToggle`) must be invisible in production — guard with `if (process.env.NODE_ENV === 'production') return null`.
- No new npm runtime dependencies; test tooling only added in Task 1.
- Exact copy strings — do not paraphrase:

| Slot | String |
|---|---|
| Coin collapsed (logged-out) | `Rewards` |
| Check-in button | `Check in (+1)` |
| Checked-in state | `Checked in today ✓` |
| After check-in copy | `Come back tomorrow to keep your streak.` |
| Progress | `{ptsToNext} / {nextRewardAt} pts until your first reward` |
| Nudge (normal) | `🔥 Day {streak} — check in to keep your streak` |
| Nudge (at risk) | `Don't lose your {streak}-day streak — check in now.` |
| Milestone | `🔥 {days}-day streak — +{bonusPoints} pts!` |
| Logged-out pitch | `Earn points & rewards for what you already do.` |

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `context/AuthContext.tsx` | `isLoggedIn` state + `toggleAuth`; exports `AuthContext` and `useAuth` |
| Create | `context/LoyaltyContext.tsx` | Wraps `useMockLoyalty`; exports `LoyaltyProvider` and `useLoyalty` |
| Create | `hooks/useMockLoyalty.ts` | Mock loyalty state + `checkIn()` logic; exports `LoyaltyData` type |
| Create | `components/CoinWidget.tsx` | Collapsed pill + dropdown panel; reads both contexts |
| Create | `components/CheckInNudge.tsx` | Fixed-bottom dismissible strip; reads both contexts |
| Create | `components/EarnAsYouGlow.tsx` | Stateful loyalty homepage section; reads both contexts |
| Create | `components/DevAuthToggle.tsx` | Dev-only auth toggle badge |
| Modify | `components/Navbar.tsx` | Mount `<CoinWidget />`, reduce nav gap to `gap-5` |
| Modify | `app/layout.tsx` | Wrap body with `AuthProvider > LoyaltyProvider`; add `<DevAuthToggle />` |
| Modify | `app/page.tsx` | Add `<EarnAsYouGlow />` after `<IngredientCheckerTeaser />`; add `<CheckInNudge />` |
| Create | `vitest.config.ts` | Vitest config with jsdom + `@` alias |
| Create | `vitest.setup.ts` | Import `@testing-library/jest-dom` |
| Create | `context/__tests__/AuthContext.test.tsx` | AuthContext unit tests |
| Create | `hooks/__tests__/useMockLoyalty.test.ts` | Hook unit tests |
| Create | `components/__tests__/CoinWidget.test.tsx` | Widget render + interaction tests |
| Create | `components/__tests__/CheckInNudge.test.tsx` | Nudge visibility + dismiss tests |

---

### Task 1: Test infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (add `"test"` script)

**Interfaces:**
- Produces: `npm test` runs Vitest across `**/__tests__/**/*.{ts,tsx}` files.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom jsdom
```

Expected: packages added, no peer-dep errors.

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to `package.json`**

In `package.json`, add `"test": "vitest"` to `"scripts"`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest"
}
```

- [ ] **Step 5: Verify with a smoke run**

```bash
npx vitest run
```

Expected output: `No test files found` — zero errors, zero failures.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json package-lock.json
git commit -m "chore: add Vitest + React Testing Library"
```

---

### Task 2: AuthContext

**Files:**
- Create: `context/AuthContext.tsx`
- Create: `context/__tests__/AuthContext.test.tsx`

**Interfaces:**
- Produces:
  - `export const AuthContext` — the React context object (needed by test wrappers in later tasks)
  - `export function AuthProvider({ children }): JSX.Element`
  - `export const useAuth: () => { isLoggedIn: boolean; toggleAuth: () => void }`

- [ ] **Step 1: Write failing test**

Create `context/__tests__/AuthContext.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'

function TestConsumer() {
  const { isLoggedIn, toggleAuth } = useAuth()
  return (
    <div>
      <span data-testid="state">{isLoggedIn ? 'logged-in' : 'logged-out'}</span>
      <button onClick={toggleAuth}>toggle</button>
    </div>
  )
}

describe('AuthContext', () => {
  it('starts logged out', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    expect(screen.getByTestId('state')).toHaveTextContent('logged-out')
  })

  it('toggles to logged in', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('state')).toHaveTextContent('logged-in')
  })

  it('toggles back to logged out', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('state')).toHaveTextContent('logged-out')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run context/__tests__/AuthContext.test.tsx
```

Expected: FAIL — `Cannot find module '../AuthContext'`

- [ ] **Step 3: Create `context/AuthContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  toggleAuth: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  toggleAuth: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth: () => setIsLoggedIn(v => !v) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run context/__tests__/AuthContext.test.tsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add context/AuthContext.tsx context/__tests__/AuthContext.test.tsx
git commit -m "feat: add AuthContext with mock auth toggle"
```

---

### Task 3: useMockLoyalty + LoyaltyContext

**Files:**
- Create: `hooks/useMockLoyalty.ts`
- Create: `context/LoyaltyContext.tsx`
- Create: `hooks/__tests__/useMockLoyalty.test.ts`

**Interfaces:**
- Produces:
  - `export type LoyaltyData` — shape below; import this type in later tasks
  - `export function useMockLoyalty(): LoyaltyData`
  - `export function LoyaltyProvider({ children }): JSX.Element`
  - `export const useLoyalty: () => LoyaltyData`

```ts
// LoyaltyData — exact shape for all consumers
type LoyaltyData = {
  points: number           // initial: 526
  streak: number           // initial: 5
  checkedInToday: boolean  // initial: false
  streakAtRisk: boolean    // initial: false (toggle via dev badge in future)
  lastMilestone: null | { days: number; bonusPoints: number }
  nextRewardAt: number     // fixed: 80
  checkIn: () => void      // increments streak+points, sets checkedInToday, fires milestone
}
```

- [ ] **Step 1: Write failing tests**

Create `hooks/__tests__/useMockLoyalty.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run hooks/__tests__/useMockLoyalty.test.ts
```

Expected: FAIL — `Cannot find module '../useMockLoyalty'`

- [ ] **Step 3: Create `hooks/useMockLoyalty.ts`**

```ts
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
```

- [ ] **Step 4: Create `context/LoyaltyContext.tsx`**

```tsx
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
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run hooks/__tests__/useMockLoyalty.test.ts
```

Expected: 5 tests PASS

- [ ] **Step 6: Commit**

```bash
git add hooks/useMockLoyalty.ts hooks/__tests__/useMockLoyalty.test.ts context/LoyaltyContext.tsx
git commit -m "feat: add useMockLoyalty hook and LoyaltyContext"
```

---

### Task 4: Layout providers + DevAuthToggle

**Files:**
- Create: `components/DevAuthToggle.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `AuthProvider` from `@/context/AuthContext`, `LoyaltyProvider` from `@/context/LoyaltyContext`, `useAuth` from `@/context/AuthContext`
- Produces: every route now has `useAuth()` and `useLoyalty()` available.

No automated tests — verify manually via dev server.

- [ ] **Step 1: Create `components/DevAuthToggle.tsx`**

```tsx
'use client'

import { useAuth } from '@/context/AuthContext'

export default function DevAuthToggle() {
  const { isLoggedIn, toggleAuth } = useAuth()
  if (process.env.NODE_ENV === 'production') return null
  return (
    <button
      onClick={toggleAuth}
      className="fixed bottom-16 right-4 z-[100] bg-[#1c2a22] text-white text-[11px] font-mono rounded-lg px-2 py-1 opacity-70 hover:opacity-100 transition-opacity"
    >
      {isLoggedIn ? '🟢 Logged in' : '⚪ Logged out'}
    </button>
  )
}
```

- [ ] **Step 2: Replace `app/layout.tsx` with the following**

```tsx
import type { Metadata } from 'next'
import { Open_Sans, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { LoyaltyProvider } from '@/context/LoyaltyContext'
import DevAuthToggle from '@/components/DevAuthToggle'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'GlamGuider — Your Beauty, Perfectly Guided',
  description: 'Real user reviews, ingredient breakdowns and simple guides for Indian skincare.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${playfair.variable} ${dmSans.variable} font-sans antialiased bg-white`}>
        <AuthProvider>
          <LoyaltyProvider>
            {children}
            <DevAuthToggle />
          </LoyaltyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Page loads without errors.
- Bottom-right corner shows `⚪ Logged out` badge.
- Clicking it shows `🟢 Logged in`. Clicking again reverts.

- [ ] **Step 4: Stop dev server and commit**

```bash
git add components/DevAuthToggle.tsx app/layout.tsx
git commit -m "feat: wrap layout with AuthProvider + LoyaltyProvider, add dev auth toggle"
```

---

### Task 5: CoinWidget

**Files:**
- Create: `components/CoinWidget.tsx`
- Create: `components/__tests__/CoinWidget.test.tsx`

**Interfaces:**
- Consumes: `useAuth()` from `@/context/AuthContext`, `useLoyalty()` from `@/context/LoyaltyContext`, `AuthContext` from `@/context/AuthContext`
- Produces: `export default CoinWidget` — self-contained div containing the pill button and dropdown

- [ ] **Step 1: Write failing tests**

Create `components/__tests__/CoinWidget.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider, AuthContext } from '@/context/AuthContext'
import { LoyaltyProvider } from '@/context/LoyaltyContext'
import CoinWidget from '../CoinWidget'

function LoggedOutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false, toggleAuth: () => {} }}>
      <LoyaltyProvider>{children}</LoyaltyProvider>
    </AuthContext.Provider>
  )
}

function LoggedInWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn: true, toggleAuth: () => {} }}>
      <LoyaltyProvider>{children}</LoyaltyProvider>
    </AuthContext.Provider>
  )
}

describe('CoinWidget — logged out', () => {
  it('shows "Rewards" label', () => {
    render(<LoggedOutWrapper><CoinWidget /></LoggedOutWrapper>)
    expect(screen.getByText('Rewards')).toBeInTheDocument()
  })

  it('opens pitch dropdown on click', () => {
    render(<LoggedOutWrapper><CoinWidget /></LoggedOutWrapper>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Earn points & rewards for what you already do.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in to start/i })).toBeInTheDocument()
  })
})

describe('CoinWidget — logged in', () => {
  it('shows points and streak in pill', () => {
    render(<LoggedInWrapper><CoinWidget /></LoggedInWrapper>)
    expect(screen.getByText('526')).toBeInTheDocument()
    expect(screen.getByText('🔥 5')).toBeInTheDocument()
  })

  it('opens dropdown with check-in button', () => {
    render(<LoggedInWrapper><CoinWidget /></LoggedInWrapper>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button', { name: /check in \(\+1\)/i })).toBeInTheDocument()
  })

  it('transitions to checked-in state after clicking check in', () => {
    render(<LoggedInWrapper><CoinWidget /></LoggedInWrapper>)
    fireEvent.click(screen.getByRole('button')) // open dropdown
    fireEvent.click(screen.getByRole('button', { name: /check in \(\+1\)/i }))
    expect(screen.getByText('Checked in today ✓')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /check in \(\+1\)/i })).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run components/__tests__/CoinWidget.test.tsx
```

Expected: FAIL — `Cannot find module '../CoinWidget'`

- [ ] **Step 3: Create `components/CoinWidget.tsx`**

```tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLoyalty } from '@/context/LoyaltyContext'

function GlamCoin({ pulse }: { pulse?: boolean }) {
  return (
    <span className="relative inline-flex shrink-0">
      <svg className="size-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#fbbf24" />
        <circle cx="12" cy="12" r="8" fill="#f59e0b" />
        <text x="12" y="16" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="700" fontFamily="system-ui">G</text>
      </svg>
      {pulse && (
        <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2.5">
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
        <span className="text-[14px] font-semibold text-[#1c2a22] font-[family-name:var(--font-dm-sans)] shrink-0">
          🔥 Day {streak}
        </span>
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
            aria-pressed={false}
            className="bg-[#007237] text-white text-[12px] font-semibold rounded-full px-3 py-1.5 hover:bg-[#005a2b] transition-colors font-[family-name:var(--font-dm-sans)] shrink-0"
          >
            Check in (+1)
          </button>
        )}
      </div>

      <div>
        <p className="text-[11px] text-[#5b6b60] mb-1.5 font-[family-name:var(--font-dm-sans)]">
          {ptsToNext} / {nextRewardAt} pts until your first reward
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

  const showPulse = isLoggedIn && !checkedInToday && streak > 0

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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run components/__tests__/CoinWidget.test.tsx
```

Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add components/CoinWidget.tsx components/__tests__/CoinWidget.test.tsx
git commit -m "feat: add CoinWidget with logged-in/out dropdown states"
```

---

### Task 6: Update Navbar.tsx

**Files:**
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes: `CoinWidget` from `@/components/CoinWidget`
- Produces: navbar renders `<CoinWidget />` in place of the old static button; desktop nav gap reduced to `gap-5`

No new test file — verify visually.

- [ ] **Step 1: Apply changes to `components/Navbar.tsx`**

Make three edits:

**Edit 1** — Add import after the existing imports (line 7):
```tsx
import CoinWidget from '@/components/CoinWidget'
```

**Edit 2** — Remove the `GlamCoin` function entirely (lines 27–35 — it now lives inside `CoinWidget`).

**Edit 3** — Replace the desktop nav section. Find this block (around line 67):

```tsx
{/* Desktop nav */}
<nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.13px] font-[family-name:var(--font-dm-sans)] shrink-0">
  ...
</nav>

{/* Desktop buttons */}
<button className="hidden lg:flex ml-4 border border-[#f0f0f2] rounded-full items-center gap-1.5 px-3 h-[37px] shrink-0 hover:border-[#d8d8d8] transition-colors">
  <GlamCoin />
  <span className="font-bold text-[13px] text-[#1a1a1a] font-[family-name:var(--font-dm-sans)]">0</span>
</button>
```

Replace with:

```tsx
{/* Desktop nav */}
<nav className="hidden lg:flex items-center gap-5 text-[13px] tracking-[0.13px] font-[family-name:var(--font-dm-sans)] shrink-0">
  <Link href="/trial-kit" className="font-semibold text-[#7c3aed] hover:opacity-75 transition-opacity whitespace-nowrap">
    Trial Kit
  </Link>
  <Link href="/deals" className="font-semibold text-[#007237] hover:opacity-75 transition-opacity whitespace-nowrap">
    Deals &amp; Rewards
  </Link>
  <Link href="/blogs" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
    Blogs
  </Link>
  <Link href="/community" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
    Community
  </Link>
  <Link href="/ingredients" className="font-medium text-[#1a1a1a] hover:text-[#007237] transition-colors whitespace-nowrap">
    Ingredients Checker
  </Link>
</nav>

{/* Desktop buttons */}
<div className="hidden lg:flex ml-4">
  <CoinWidget />
</div>
```

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Run through this checklist:

- [ ] Navbar shows coin pill with "Rewards" (logged-out default)
- [ ] Clicking coin opens logged-out dropdown: "Earn points & rewards for what you already do." + "Sign in to start"
- [ ] Click dev badge → `🟢 Logged in`
- [ ] Coin pill now shows `526 🔥 5` with pulse dot
- [ ] Clicking coin shows logged-in dropdown: balance, streak row with "Check in (+1)", progress bar, quick links
- [ ] Click "Check in (+1)" → dropdown shows "Checked in today ✓" + "Come back tomorrow to keep your streak."
- [ ] Pulse dot on coin disappears after check-in

- [ ] **Step 3: Stop dev server and commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: mount CoinWidget in navbar, reduce nav gap to gap-5"
```

---

### Task 7: CheckInNudge

**Files:**
- Create: `components/CheckInNudge.tsx`
- Create: `components/__tests__/CheckInNudge.test.tsx`

**Interfaces:**
- Consumes: `useAuth()` from `@/context/AuthContext`, `useLoyalty()` from `@/context/LoyaltyContext`, `AuthContext` from `@/context/AuthContext`
- Produces: `export default CheckInNudge` — returns `null` when hidden; fixed-bottom strip when visible

- [ ] **Step 1: Write failing tests**

Create `components/__tests__/CheckInNudge.test.tsx`:

```tsx
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthContext } from '@/context/AuthContext'
import { LoyaltyProvider } from '@/context/LoyaltyContext'
import CheckInNudge from '../CheckInNudge'

beforeEach(() => { localStorage.clear() })
afterEach(() => { localStorage.clear() })

function LoggedOutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false, toggleAuth: () => {} }}>
      <LoyaltyProvider>{children}</LoyaltyProvider>
    </AuthContext.Provider>
  )
}

function LoggedInWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn: true, toggleAuth: () => {} }}>
      <LoyaltyProvider>{children}</LoyaltyProvider>
    </AuthContext.Provider>
  )
}

describe('CheckInNudge', () => {
  it('renders nothing when logged out', () => {
    const { container } = render(<LoggedOutWrapper><CheckInNudge /></LoggedOutWrapper>)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the nudge when logged in and not checked in', () => {
    render(<LoggedInWrapper><CheckInNudge /></LoggedInWrapper>)
    expect(screen.getByText(/check in to keep your streak/i)).toBeInTheDocument()
  })

  it('hides after dismiss button click', () => {
    render(<LoggedInWrapper><CheckInNudge /></LoggedInWrapper>)
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByText(/check in to keep your streak/i)).not.toBeInTheDocument()
  })

  it('writes dismissal key to localStorage on dismiss', () => {
    render(<LoggedInWrapper><CheckInNudge /></LoggedInWrapper>)
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    const today = new Date().toISOString().split('T')[0]
    expect(localStorage.getItem(`glam-checkin-dismissed-${today}`)).toBe('1')
  })

  it('renders nothing when already dismissed today', () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem(`glam-checkin-dismissed-${today}`, '1')
    const { container } = render(<LoggedInWrapper><CheckInNudge /></LoggedInWrapper>)
    expect(container).toBeEmptyDOMElement()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run components/__tests__/CheckInNudge.test.tsx
```

Expected: FAIL — `Cannot find module '../CheckInNudge'`

- [ ] **Step 3: Create `components/CheckInNudge.tsx`**

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run components/__tests__/CheckInNudge.test.tsx
```

Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add components/CheckInNudge.tsx components/__tests__/CheckInNudge.test.tsx
git commit -m "feat: add CheckInNudge dismissible fixed-bottom strip"
```

---

### Task 8: EarnAsYouGlow section

**Files:**
- Create: `components/EarnAsYouGlow.tsx`

**Interfaces:**
- Consumes: `useAuth()` from `@/context/AuthContext`, `useLoyalty()` from `@/context/LoyaltyContext`
- Produces: `export default EarnAsYouGlow` — `<section>` element; stateful when logged-in, pitch when logged-out

No automated test — verify visually after Task 9 wires it in.

- [ ] **Step 1: Create `components/EarnAsYouGlow.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/EarnAsYouGlow.tsx
git commit -m "feat: add EarnAsYouGlow stateful loyalty section"
```

---

### Task 9: Wire page.tsx + full acceptance check

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CheckInNudge` from `@/components/CheckInNudge`, `EarnAsYouGlow` from `@/components/EarnAsYouGlow`
- Produces: homepage renders all three layers in correct positions

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import StatsBar from '@/components/StatsBar'
import USPCards from '@/components/USPCards'
import WhySection from '@/components/WhySection'
import CategoriesSection from '@/components/CategoriesSection'
import IngredientCheckerTeaser from '@/components/IngredientCheckerTeaser'
import EarnAsYouGlow from '@/components/EarnAsYouGlow'
import BlogsSection from '@/components/BlogsSection'
import TopDealsSection from '@/components/TopDealsSection'
import TrialKitSection from '@/components/TrialKitSection'
import Footer from '@/components/Footer'
import CheckInNudge from '@/components/CheckInNudge'

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <Navbar />
      <main>
        <HeroCarousel />
        <StatsBar />
        <USPCards />
        <CategoriesSection />
        <WhySection />
        <IngredientCheckerTeaser />
        <EarnAsYouGlow />
        <BlogsSection />
        <TopDealsSection />
        <TrialKitSection />
      </main>
      <Footer />
      <CheckInNudge />
    </div>
  )
}
```

Note: `<CheckInNudge />` is placed after `<Footer />` so it renders as a fixed overlay without pushing any layout.

- [ ] **Step 2: Run the full test suite**

```bash
npx vitest run
```

Expected: all tests PASS, zero failures.

- [ ] **Step 3: Start dev server and run full acceptance check**

```bash
npm run dev
```

Open `http://localhost:3000` and verify every criterion:

**Logged-out (default):**
- [ ] Coin pill shows "Rewards"
- [ ] Coin dropdown shows pitch + "Sign in to start"; no personal data
- [ ] No nudge strip visible
- [ ] "Earn as You Glow" section shows "Up to 80 points your first week" + "Start earning"; cards have no action buttons

**Switch to logged-in via dev badge:**
- [ ] Coin pill shows `526 🔥 5` with pulse dot
- [ ] Coin dropdown shows balance in gold, "🔥 Day 5", "Check in (+1)", progress bar, three quick links
- [ ] Nudge strip appears at bottom: "🔥 Day 5 — check in to keep your streak" + "Check in" button
- [ ] "Earn as You Glow" shows `526 pts · 🔥 Day 5`, progress bar, cards with Earned ✓ / Auto-credited / Check in (+1) / Earn now states

**Check-in via coin dropdown:**
- [ ] Click coin → click "Check in (+1)"
- [ ] Dropdown: "Checked in today ✓" + "Come back tomorrow to keep your streak."
- [ ] Coin pulse dot disappears
- [ ] Nudge strip hides immediately
- [ ] Daily check-in card in EarnAsYouGlow shows "Checked in today ✓"
- [ ] Streak increments: coin pill shows `536 🔥 6`

**Check-in via nudge:**
- [ ] Toggle to logged-out, clear localStorage (`localStorage.clear()` in browser console), toggle to logged-in
- [ ] Nudge reappears
- [ ] Click "Check in" in nudge → nudge hides, all surfaces update

**Nudge dismiss:**
- [ ] Toggle to logged-out, run `localStorage.clear()`, toggle to logged-in
- [ ] Click × in nudge → hides; key `glam-checkin-dismissed-{today}` written to localStorage
- [ ] Refresh page — nudge stays hidden

- [ ] **Step 4: Stop dev server and commit**

```bash
git add app/page.tsx
git commit -m "feat: wire EarnAsYouGlow and CheckInNudge into homepage — ambient loyalty complete"
```
