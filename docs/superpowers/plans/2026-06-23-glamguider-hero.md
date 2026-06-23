# GlamGuider Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the GlamGuider hero section as a Next.js + Tailwind CSS app featuring a dark-forest/cream split layout, Open Sans typography, and the brand color palette.

**Architecture:** Single Next.js 14 App Router page with five focused React components — Navbar, HeroLeft, HeroRight, FeatureStrip, and a Hero shell that composes them. Tailwind config is extended with four brand color tokens. No state management — fully static and presentational.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Open Sans via `next/font/google`, Jest + React Testing Library

## Global Constraints

- Colors: `forest=#1A312C`, `teal=#428475`, `mint=#89D7B7`, `cream=#FFF4E1` — no pink or rose tones anywhere
- Font: Open Sans only, weights 400 / 600 / 700
- Logo asset: `public/images/glamguider-logo.png`
- TypeScript strict mode
- No external UI component libraries — Tailwind utility classes only

---

## File Map

| File | Responsibility |
|------|---------------|
| `tailwind.config.ts` | Brand color tokens + Open Sans font family |
| `app/layout.tsx` | Root layout: Open Sans font variable, metadata |
| `app/globals.css` | Tailwind directives only |
| `app/page.tsx` | Renders `<Hero />` |
| `components/Navbar.tsx` | Logo + nav links + CTA pill |
| `components/HeroLeft.tsx` | Headline, subtext, trust badges, CTAs (dark panel content) |
| `components/HeroRight.tsx` | Cream panel: teal depth circle, model photo, sparkle accents |
| `components/FeatureStrip.tsx` | Full-width dark bar with 4 feature columns |
| `components/Hero.tsx` | Assembles all components into the split-panel layout |
| `components/__tests__/*.test.tsx` | Smoke tests per component |

---

### Task 1: Scaffold Next.js project, configure Tailwind tokens, copy logo

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx` (via `create-next-app`)
- Modify: `tailwind.config.ts` — add brand tokens
- Modify: `app/layout.tsx` — add Open Sans font
- Modify: `app/globals.css` — strip to Tailwind directives only
- Create: `public/images/glamguider-logo.png` (copy from Desktop)

**Interfaces:**
- Produces: `forest`, `teal`, `mint`, `cream` Tailwind color tokens; `--font-open-sans` CSS variable; dev server running at `http://localhost:3000`

- [ ] **Step 1: Scaffold project**

Run in `D:\glam` (PowerShell):
```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*" --no-git
```
When prompted "Ok to proceed?": press Enter. For all other prompts accept defaults.

Expected output ends with: `Success! Created glamguider...`

- [ ] **Step 2: Copy logo asset**

```powershell
New-Item -ItemType Directory -Force "public\images"
Copy-Item "C:\Users\Creative Head\Desktop\Logos\GlamGuider_Logo.png" "public\images\glamguider-logo.png"
```

- [ ] **Step 3: Replace tailwind.config.ts with brand tokens**

Replace the entire file `tailwind.config.ts` with:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1A312C',
        teal:   '#428475',
        mint:   '#89D7B7',
        cream:  '#FFF4E1',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Replace app/layout.tsx with Open Sans font setup**

```tsx
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'GlamGuider — Your Beauty, Perfectly Guided',
  description: 'Personalized beauty guidance for every you.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Strip app/globals.css to Tailwind directives only**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 6: Verify dev server starts**

```powershell
npm run dev
```
Open `http://localhost:3000`. Expected: default Next.js page loads without console errors. Stop the server (`Ctrl+C`) when confirmed.

- [ ] **Step 7: Initialise git and commit**

```powershell
git init
git add .
git commit -m "feat: scaffold Next.js project with brand tokens and Open Sans"
```

---

### Task 2: Navbar component

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/__tests__/Navbar.test.tsx`

**Interfaces:**
- Consumes: `public/images/glamguider-logo.png`, Tailwind tokens `forest` (implicit via parent bg), `mint`, `cream`
- Produces: `<Navbar />` — logo left, nav links centre, CTA pill right; used by `Hero.tsx` inside the dark left panel

- [ ] **Step 1: Install testing dependencies**

```powershell
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

- [ ] **Step 2: Create jest.config.ts**

```ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/image$': '<rootDir>/__mocks__/nextImage.tsx',
    '\\.(png|jpg|jpeg|svg|gif)$': '<rootDir>/__mocks__/fileMock.ts',
  },
}
export default config
```

- [ ] **Step 3: Create mocks for Next.js Image and static files**

Create `__mocks__/fileMock.ts`:
```ts
export default 'test-file-stub'
```

Create `__mocks__/nextImage.tsx`:
```tsx
import React from 'react'

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  [key: string]: unknown
}

export default function Image({ src, alt, width, height }: Props) {
  return <img src={src} alt={alt} width={width} height={height} />
}
```

- [ ] **Step 4: Write failing test**

Create `components/__tests__/Navbar.test.tsx`:
```tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the GlamGuider logo', () => {
    render(<Navbar />)
    expect(screen.getByAltText('GlamGuider')).toBeInTheDocument()
  })

  it('renders all six nav links', () => {
    render(<Navbar />)
    ;['Home', 'About Us', 'Services', 'Guides', 'Beauty Resources', 'Contact Us'].forEach(
      (link) => expect(screen.getByText(link)).toBeInTheDocument()
    )
  })

  it('renders the Book a Consultation CTA button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /book a consultation/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Run test — confirm it fails**

```powershell
npx jest components/__tests__/Navbar.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../Navbar'`

- [ ] **Step 6: Implement Navbar.tsx**

Create `components/Navbar.tsx`:
```tsx
import Image from 'next/image'

const NAV_LINKS = ['Home', 'About Us', 'Services', 'Guides', 'Beauty Resources', 'Contact Us']

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 w-full">
      <Image
        src="/images/glamguider-logo.png"
        alt="GlamGuider"
        width={160}
        height={40}
        className="h-10 w-auto"
        priority
      />

      <ul className="hidden lg:flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="text-cream/75 hover:text-cream text-sm transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>

      <button className="bg-mint text-forest text-sm font-semibold px-5 py-2 rounded-full hover:bg-mint/90 transition-colors whitespace-nowrap">
        Book a Consultation
      </button>
    </nav>
  )
}
```

- [ ] **Step 7: Run test — confirm it passes**

```powershell
npx jest components/__tests__/Navbar.test.tsx --no-coverage
```
Expected: PASS — 3 tests

- [ ] **Step 8: Commit**

```powershell
git add components/Navbar.tsx components/__tests__/Navbar.test.tsx jest.config.ts __mocks__/fileMock.ts __mocks__/nextImage.tsx
git commit -m "feat: add Navbar with logo, nav links, and mint CTA pill"
```

---

### Task 3: HeroLeft panel

**Files:**
- Create: `components/HeroLeft.tsx`
- Create: `components/__tests__/HeroLeft.test.tsx`

**Interfaces:**
- Consumes: Tailwind tokens `mint`, `cream`
- Produces: `<HeroLeft />` — headline, subtext, trust badge row, dual CTA; used inside the `bg-forest` div in `Hero.tsx`

- [ ] **Step 1: Write failing test**

Create `components/__tests__/HeroLeft.test.tsx`:
```tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeroLeft from '../HeroLeft'

describe('HeroLeft', () => {
  it('renders the two headline lines', () => {
    render(<HeroLeft />)
    expect(screen.getByText('Your Beauty,')).toBeInTheDocument()
    expect(screen.getByText('Guided')).toBeInTheDocument()
  })

  it('renders "Perfectly" with mint italic styling', () => {
    render(<HeroLeft />)
    const el = screen.getByText('Perfectly')
    expect(el).toHaveClass('text-mint')
    expect(el).toHaveClass('italic')
  })

  it('renders the subheadline', () => {
    render(<HeroLeft />)
    expect(screen.getByText(/Personalized beauty guidance/i)).toBeInTheDocument()
  })

  it('renders all 4 trust badges', () => {
    render(<HeroLeft />)
    ;[
      'Personalized Beauty Advice',
      'Expert Guides',
      'Trusted Recommendations',
      'Confidence That Shows',
    ].forEach((badge) => expect(screen.getByText(badge)).toBeInTheDocument())
  })

  it('renders both CTA buttons', () => {
    render(<HeroLeft />)
    expect(screen.getByRole('button', { name: /book a consultation/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /watch our video/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npx jest components/__tests__/HeroLeft.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../HeroLeft'`

- [ ] **Step 3: Implement HeroLeft.tsx**

Create `components/HeroLeft.tsx`:
```tsx
const TRUST_BADGES = [
  'Personalized Beauty Advice',
  'Expert Guides',
  'Trusted Recommendations',
  'Confidence That Shows',
]

export default function HeroLeft() {
  return (
    <div className="flex flex-col flex-1 justify-center px-10 pb-16 pt-4">
      {/* Headline */}
      <h1 className="text-cream font-bold leading-tight text-5xl lg:text-6xl xl:text-7xl mb-5">
        Your Beauty,
        <br />
        <span className="text-mint italic">Perfectly</span>{' '}
        <span className="text-cream">Guided</span>
      </h1>

      {/* Subtext */}
      <p className="text-cream/70 text-lg font-normal mb-8 max-w-md">
        Personalized beauty guidance for every you.
      </p>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 mb-10">
        {TRUST_BADGES.map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 border border-mint/25 bg-white/5 rounded-full px-4 py-2"
          >
            <span className="text-mint text-[10px]">✦</span>
            <span className="text-cream/80 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4 flex-wrap">
        <button className="bg-mint text-forest font-semibold px-8 py-3 rounded-full hover:bg-mint/90 transition-colors text-sm">
          Book a Consultation
        </button>
        <button className="flex items-center gap-2 text-cream border border-cream/30 px-6 py-3 rounded-full hover:border-cream/60 transition-colors text-sm">
          <span className="w-5 h-5 rounded-full border border-cream/50 flex items-center justify-center text-[10px]">
            ▶
          </span>
          Watch Our Video
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — confirm it passes**

```powershell
npx jest components/__tests__/HeroLeft.test.tsx --no-coverage
```
Expected: PASS — 5 tests

- [ ] **Step 5: Commit**

```powershell
git add components/HeroLeft.tsx components/__tests__/HeroLeft.test.tsx
git commit -m "feat: add HeroLeft with headline, trust badges, and dual CTAs"
```

---

### Task 4: HeroRight panel

**Files:**
- Create: `components/HeroRight.tsx`
- Create: `components/__tests__/HeroRight.test.tsx`

**Interfaces:**
- Consumes: Tailwind tokens `cream`, `teal`, `mint`
- Produces: `<HeroRight />` — cream panel with teal depth blur, photo in rounded clip, mint sparkles; used in `Hero.tsx` right column

- [ ] **Step 1: Write failing test**

Create `components/__tests__/HeroRight.test.tsx`:
```tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeroRight from '../HeroRight'

describe('HeroRight', () => {
  it('renders the model photo', () => {
    render(<HeroRight />)
    expect(
      screen.getByRole('img', { name: /beauty consultation/i })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npx jest components/__tests__/HeroRight.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../HeroRight'`

- [ ] **Step 3: Implement HeroRight.tsx**

Create `components/HeroRight.tsx`:
```tsx
export default function HeroRight() {
  return (
    <div className="relative flex items-center justify-center w-full h-full bg-cream overflow-hidden min-h-[500px]">
      {/* Teal depth blur circle */}
      <div className="absolute w-96 h-96 rounded-full bg-teal/25 blur-3xl pointer-events-none" />

      {/* Sparkle accents */}
      <span className="absolute top-14 right-14 text-mint text-3xl select-none pointer-events-none">✦</span>
      <span className="absolute top-1/3 left-8 text-mint/40 text-base select-none pointer-events-none">✦</span>
      <span className="absolute bottom-20 right-10 text-teal/50 text-xl select-none pointer-events-none">✦</span>
      <span className="absolute bottom-1/3 left-1/4 text-mint/30 text-sm select-none pointer-events-none">✦</span>

      {/* Model photo */}
      <div className="relative z-10 w-64 h-[480px] lg:w-72 lg:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/*
          Replace the src below with the actual model/makeup photo.
          Suggested path: /images/hero-model.jpg
          Dimensions: at least 400×600px, portrait orientation.
        */}
        <img
          src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80"
          alt="Beauty consultation — personalized guidance"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — confirm it passes**

```powershell
npx jest components/__tests__/HeroRight.test.tsx --no-coverage
```
Expected: PASS — 1 test

- [ ] **Step 5: Commit**

```powershell
git add components/HeroRight.tsx components/__tests__/HeroRight.test.tsx
git commit -m "feat: add HeroRight with teal depth blur, photo, and sparkle accents"
```

---

### Task 5: FeatureStrip component

**Files:**
- Create: `components/FeatureStrip.tsx`
- Create: `components/__tests__/FeatureStrip.test.tsx`

**Interfaces:**
- Consumes: Tailwind tokens `forest`, `mint`, `cream`
- Produces: `<FeatureStrip />` — full-width `bg-forest` bar with 4 equal feature columns; used at the bottom of `Hero.tsx`

- [ ] **Step 1: Write failing test**

Create `components/__tests__/FeatureStrip.test.tsx`:
```tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FeatureStrip from '../FeatureStrip'

describe('FeatureStrip', () => {
  it('renders all 4 feature titles', () => {
    render(<FeatureStrip />)
    ;['Tailored for You', 'Expert Guidance', 'Curated Just for You', 'Real Results'].forEach(
      (title) => expect(screen.getByText(title)).toBeInTheDocument()
    )
  })

  it('renders all 4 feature descriptions', () => {
    render(<FeatureStrip />)
    expect(screen.getByText(/unique needs/i)).toBeInTheDocument()
    expect(screen.getByText(/beauty professionals/i)).toBeInTheDocument()
    expect(screen.getByText(/routines that work/i)).toBeInTheDocument()
    expect(screen.getByText(/confident, beautiful/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npx jest components/__tests__/FeatureStrip.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../FeatureStrip'`

- [ ] **Step 3: Implement FeatureStrip.tsx**

Create `components/FeatureStrip.tsx`:
```tsx
const FEATURES = [
  {
    icon: '◈',
    title: 'Tailored for You',
    desc: 'Beauty guidance that fits your unique needs.',
  },
  {
    icon: '◈',
    title: 'Expert Guidance',
    desc: 'Learn from experienced beauty professionals.',
  },
  {
    icon: '◈',
    title: 'Curated Just for You',
    desc: 'Handpicked products & routines that work.',
  },
  {
    icon: '◈',
    title: 'Real Results',
    desc: 'Feel confident, beautiful, and unstoppable.',
  },
]

export default function FeatureStrip() {
  return (
    <div className="bg-forest border-t border-mint/10 px-10 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {FEATURES.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-2">
            <span className="text-mint text-xl">{icon}</span>
            <h3 className="text-cream font-semibold text-sm">{title}</h3>
            <p className="text-cream/60 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — confirm it passes**

```powershell
npx jest components/__tests__/FeatureStrip.test.tsx --no-coverage
```
Expected: PASS — 2 tests

- [ ] **Step 5: Commit**

```powershell
git add components/FeatureStrip.tsx components/__tests__/FeatureStrip.test.tsx
git commit -m "feat: add FeatureStrip 4-column bottom bar"
```

---

### Task 6: Assemble Hero and wire into page

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/__tests__/Hero.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `<Navbar />`, `<HeroLeft />`, `<HeroRight />`, `<FeatureStrip />`
- Produces: Full hero visible at `http://localhost:3000`; `<Hero />` exported for use by `app/page.tsx`

- [ ] **Step 1: Write failing test**

Create `components/__tests__/Hero.test.tsx`:
```tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders all major sections', () => {
    render(<Hero />)
    expect(screen.getByAltText('GlamGuider')).toBeInTheDocument()
    expect(screen.getByText('Your Beauty,')).toBeInTheDocument()
    expect(screen.getByText('Tailored for You')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npx jest components/__tests__/Hero.test.tsx --no-coverage
```
Expected: FAIL — `Cannot find module '../Hero'`

- [ ] **Step 3: Implement Hero.tsx**

Create `components/Hero.tsx`:
```tsx
import Navbar from './Navbar'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'
import FeatureStrip from './FeatureStrip'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Split panel */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left — dark forest green */}
        <div className="bg-forest flex flex-col w-full md:w-[55%]">
          <Navbar />
          <HeroLeft />
        </div>

        {/* Right — warm cream */}
        <div className="w-full md:w-[45%]">
          <HeroRight />
        </div>
      </div>

      {/* Bottom feature strip — spans full width */}
      <FeatureStrip />
    </section>
  )
}
```

- [ ] **Step 4: Wire into app/page.tsx**

Replace `app/page.tsx` with:
```tsx
import Hero from '@/components/Hero'

export default function Home() {
  return <Hero />
}
```

- [ ] **Step 5: Run full test suite**

```powershell
npx jest --no-coverage
```
Expected: PASS — all tests across all components (12 tests total)

- [ ] **Step 6: Start dev server and verify visually**

```powershell
npm run dev
```

Open `http://localhost:3000`. Check:
- [ ] Left panel is dark forest green (`#1A312C`), right panel is warm cream (`#FFF4E1`)
- [ ] "Perfectly" is mint-green italic; "Your Beauty," and "Guided" are cream
- [ ] GlamGuider logo appears top-left in the nav
- [ ] Nav links visible in faded cream across the top
- [ ] "Book a Consultation" mint pill buttons appear (nav + hero CTA)
- [ ] 4 trust badge pills appear below the subtext
- [ ] "Watch Our Video" cream-outline button appears
- [ ] Teal blur circle visible behind the photo on the right
- [ ] Mint sparkle ✦ accents scattered around the photo
- [ ] Bottom strip is dark with 4 feature columns in mint/cream

- [ ] **Step 7: Final commit**

```powershell
git add components/Hero.tsx components/__tests__/Hero.test.tsx app/page.tsx
git commit -m "feat: assemble complete GlamGuider hero section"
```
