import type { Metadata } from 'next'
import { Open_Sans, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
