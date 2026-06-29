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
