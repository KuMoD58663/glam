/**
 * ⚠️  TAILWIND v4 — THIS FILE IS NOT USED AT RUNTIME  ⚠️
 *
 * This project uses Tailwind CSS v4. In v4, all configuration (colors, fonts,
 * breakpoints) is defined via the `@theme {}` block in `app/globals.css`.
 * Tailwind v4 does NOT read tailwind.config.ts — any changes here have zero
 * effect on generated CSS.
 *
 * To update brand tokens, edit `app/globals.css` → the `@theme {}` block.
 *
 * This file is kept as documentation of the intended design tokens only.
 */
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
