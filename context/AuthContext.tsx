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
