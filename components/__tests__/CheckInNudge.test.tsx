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
