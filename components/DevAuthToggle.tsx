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
