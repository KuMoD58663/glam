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
