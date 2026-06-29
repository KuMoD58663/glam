# GlamGuider — Ambient Loyalty: Points + Daily Streak

**Date:** 2026-06-29
**Status:** Approved

---

## Problem

There is no loyalty section in the current codebase. The spec calls for one, and for points + streak to be ambient across the site. The navbar coin currently shows a static `0`. Auth and backend do not exist yet.

---

## Scope

Three layers, delivered in priority order:

- **P0 — Navbar CoinWidget:** upgrade the static coin into a points + streak pill with a check-in dropdown.
- **P1 — CheckInNudge:** dismissible fixed-bottom strip for logged-in users who haven't checked in today.
- **P1 — EarnAsYouGlow section:** new homepage section (stateful for logged-in, pitch for logged-out), placed after `IngredientCheckerTeaser`.

---

## Auth & Data Strategy

**Auth:** Mock `AuthContext` with `isLoggedIn: boolean` and `toggleAuth()`. A dev-only badge (bottom-right, hidden in production via `process.env.NODE_ENV !== 'production'`) flips the state to allow manual QA of both branches.

**Data:** Mock `useMockLoyalty` hook whose return shape mirrors the eventual real API. `LoyaltyContext` wraps this hook and exposes it to the tree. When real auth + backend arrive, only the hook internals change — all consumers stay the same.

---

## Architecture

```
app/
├── context/
│   ├── AuthContext.tsx        # isLoggedIn, toggleAuth
│   └── LoyaltyContext.tsx     # points, streak, checkedInToday, checkIn(), streakAtRisk, lastMilestone
├── hooks/
│   └── useMockLoyalty.ts      # mock data + simulated check-in logic
├── components/
│   ├── Navbar.tsx             # mounts CoinWidget (replaces inline button)
│   ├── CoinWidget.tsx         # collapsed pill + dropdown panel
│   ├── CheckInNudge.tsx       # fixed-bottom dismissible strip
│   └── EarnAsYouGlow.tsx      # stateful loyalty homepage section
└── app/
    ├── layout.tsx             # wraps children with AuthProvider + LoyaltyProvider
    └── page.tsx               # adds CheckInNudge + EarnAsYouGlow in order
```

Both providers go in `layout.tsx` so every page automatically gets the ambient coin widget.

---

## Data Shape

`useMockLoyalty` returns:

```ts
{
  points: number           // e.g. 526
  streak: number           // e.g. 5
  checkedInToday: boolean
  streakAtRisk: boolean    // streak ≥ 1 and last check-in simulated > 20h ago
  lastMilestone: null | { days: number; bonusPoints: number }
  checkIn: () => void      // sets checkedInToday=true, increments streak+points, checks milestones
  nextRewardAt: number     // 80
}
```

`checkIn()` detects 7-day and 30-day milestones and sets `lastMilestone`. Cleared after 4 seconds via `setTimeout`.

---

## Components

### CoinWidget

Replaces the inline `<button>` in `Navbar.tsx`.

**Collapsed — logged-in:**
- Gold coin SVG + points number + `🔥 N` streak count in a `shrink-0` pill.
- If `!checkedInToday`: small pulse dot on the coin (`animate-ping`, `aria-hidden`).
- If `streak === 0`: coin + points only, no flame.

**Collapsed — logged-out:**
- Gold coin + "Rewards" label.

**Dropdown — logged-in:**
- Large points balance + "Redeem →" link.
- Streak row: `🔥 Day N` + `Check in (+1)` button (primary) or `Checked in today ✓` (muted, disabled).
- After check-in: "Come back tomorrow to keep your streak."
- Progress bar: `48 / 80 pts until your first reward`.
- Quick links: `Ways to earn` · `Redeem rewards` · `View history`.

**Dropdown — logged-out:**
- "Earn points & rewards for what you already do." + `Sign in to start` button.

**Dropdown behavior:** closes on outside click (`useEffect` + `ref`). `role="dialog"`, `aria-label="Rewards"`.

**Nav width:** reduce nav link gap from `gap-7` to `gap-5` at `lg` breakpoint to accommodate the wider pill.

### CheckInNudge

- Renders only when `isLoggedIn && !checkedInToday && !dismissed`.
- `fixed bottom-0`, full width, `z-40` (below navbar's `z-50`), 48px tall.
- Normal copy: `🔥 Day N — check in to keep your streak` + `Check in` button.
- At-risk copy (when `streakAtRisk`): `Don't lose your N-day streak — check in now.`
- Dismiss button (×) writes `glam-checkin-dismissed-YYYY-MM-DD` to localStorage.
- Reads localStorage in `useEffect` only (SSR-safe). Hides immediately when `checkedInToday` becomes true.

### EarnAsYouGlow

Placed in `page.tsx` after `<IngredientCheckerTeaser />`.

**Logged-out:** static pitch — "Up to 80 points your first week", Start earning CTA.

**Logged-in:**
- Header shows real points + `🔥 Day N` streak.
- Progress bar: `48 / 80 pts until your first reward`.
- Earn-cards with states: `Earned ✓` / `Auto-credited` / actionable CTA.
- Milestone banner: if `lastMilestone !== null`, shows `🔥 7-day streak — +20 pts!` toast that auto-dismisses after 4s.

---

## Design Tokens (no new ones)

```
--green: #007237
--green-deep: #0a5a30
--gold: #e0a020          /* loyalty/points only */
--gold-bg: #fff6e5
--gold-border: #f0dcb0
--flame: #e8732a         /* streak flame */
--ink: #1c2a22
--muted: #5b6b60
--font-display: 'Playfair Display', serif
--font-body: 'Open Sans', sans-serif
--radius-card: 14px
--shadow-card: 0 6px 24px rgba(0,114,55,.07)
```

Gold is used **only** for loyalty/points surfaces. No new colors introduced.

---

## Edge Cases

| Case | Handling |
|---|---|
| First login, streak = 0 | Collapsed pill shows coin + points, no flame. Dropdown says "Start your streak today." |
| Nudge dismissed, then check-in via coin | `checkedInToday = true` from context — nudge hides on next render even without localStorage re-read |
| Milestone on check-in | `lastMilestone` set in context → `EarnAsYouGlow` shows banner → cleared after 4s |
| Streak at risk | `streakAtRisk: true` in mock → nudge shows at-risk copy, coin pulse active |
| Streak reset (missed day) | Mock sets `streak = 0` when `streakAtRisk && !checkedInToday` on next simulated session load |
| SSR | Both contexts are `'use client'`. localStorage reads in `useEffect` only. No hydration mismatch. |

---

## Acceptance Criteria

- [ ] Points balance and streak count visible in navbar on every page (logged-in).
- [ ] Coin pulses when `!checkedInToday`; stops after check-in.
- [ ] Check-in from any surface (coin dropdown or nudge strip) updates all surfaces simultaneously.
- [ ] After check-in: `Checked in today ✓`, streak increments, nudge hides.
- [ ] Logged-out: no personal data anywhere; only pitch + sign-in.
- [ ] `EarnAsYouGlow` section appears after `IngredientCheckerTeaser`.
- [ ] Milestone banner appears on 7-day and 30-day streak hits; auto-dismisses after 4s.
- [ ] Nudge dismisses per-day via localStorage; never a full-screen block.
- [ ] Dev toggle flips auth state; hidden in production.
- [ ] Gold used only for loyalty surfaces; no new colors introduced.
