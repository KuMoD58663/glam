# GlamGuider Hero Section — Design Spec
**Date:** 2026-06-23  
**Project:** glamguider.com UI/UX Revamp  
**Stack:** Next.js + Tailwind CSS  

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `forest` | `#1A312C` | Left panel bg, dark CTA text, bottom strip bg |
| `teal` | `#428475` | Depth circle behind photo, secondary CTA outline |
| `mint` | `#89D7B7` | Italic accent word, icon color, primary CTA bg |
| `cream` | `#FFF4E1` | Right panel bg, headline text, body text |

## Typography

**Font:** Open Sans (Google Fonts) — used for all text  
- Headline: Open Sans 700 (bold), ~72px  
- Italic accent ("Perfectly"): Open Sans 700 italic  
- Subheadline: Open Sans 400, ~18px  
- Badge/body: Open Sans 400, ~14px  

---

## Layout

Two-panel horizontal split, full viewport height (`100vh`).

```
[ LEFT PANEL (55%) #1A312C  |  RIGHT PANEL (45%) #FFF4E1 ]
[ NAV: logo | links | CTA   |                            ]
[                            |   [teal circle blur]       ]
[ "Your Beauty,"            |   [model photo             ]
[ "Perfectly Guided"        |    rounded organic clip]   ]
[ subtext                   |                            ]
[ [trust badges row]        |   [sparkle accents]        ]
[ [CTA] [Watch Video]       |                            ]
[-------- FEATURE STRIP (#1A312C, full width) -----------]
[ Tailored | Expert | Curated | Real Results             ]
```

---

## Component Breakdown

### 1. Navbar (inside left panel, top)
- **Logo:** GlamGuider PNG — left-aligned, `h-10`
- **Nav links:** `#FFF4E1` cream, Open Sans 400 — Home · About Us · Services · Guides · Beauty Resources · Contact Us
- **CTA pill:** "Book a Consultation" — `bg-mint text-forest`, rounded-full, px-5 py-2

### 2. Left Panel Hero Content
- **Headline line 1:** `"Your Beauty,"` — Open Sans 700, `text-cream`, ~`text-6xl`
- **Headline line 2:** `"Perfectly"` (Open Sans 700 italic, `text-mint`) + `" Guided"` (Open Sans 700, `text-cream`)
- **Subtext:** `"Personalized beauty guidance for every you."` — Open Sans 400, `text-cream/70`, `text-lg`
- **Trust badge row (4 items, horizontal):**
  - Icon (SVG, `text-mint`) + label (`text-cream/80`, `text-sm`)
  - Personalized Beauty Advice · Expert Guides · Trusted Recommendations · Confidence That Shows
- **Primary CTA:** `"Book a Consultation"` — `bg-mint text-forest font-semibold`, rounded-full, shadow
- **Secondary CTA:** `"► Watch Our Video"` — cream border + text, transparent bg

### 3. Right Panel (cream background)
- `bg-cream` (`#FFF4E1`)
- **Depth element:** Large `#428475` circle, `opacity-20`, absolute positioned, blurred (`blur-3xl`) — behind photo
- **Model photo:** Tall rounded rectangle (`rounded-[2.5rem]`), `object-cover`, ~`w-72 h-[480px]`
- **Sparkle accents:** 3–4 small `✦` or star SVG icons in `text-mint`, scattered around photo

### 4. Bottom Feature Strip (full width)
- `bg-forest` (`#1A312C`) — spans both panels
- 4 equal columns, each: mint icon + bold cream title + cream/70 description
  - **Tailored for You** — Beauty guidance that fits your unique needs
  - **Expert Guidance** — Learn from experienced beauty professionals
  - **Curated Just for You** — Handpicked products & routines that work
  - **Real Results** — Feel confident, beautiful, and unstoppable

---

## Photo
Placeholder: Use a professional beauty/makeup stock image (woman getting makeup done).  
**Swap instruction:** Replace `/images/hero-model.jpg` with the actual photo.

---

## Responsive Notes
- Mobile: Stack panels vertically (photo on top, text below), reduce font sizes
- Tablet: Maintain split but reduce padding
- Desktop: Full split as described above

---

## Assets
- Logo: `public/images/glamguider-logo.png` (copied from `C:\Users\Creative Head\Desktop\Logos\GlamGuider_Logo.png`)
