import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'

function TestConsumer() {
  const { isLoggedIn, toggleAuth } = useAuth()
  return (
    <div>
      <span data-testid="state">{isLoggedIn ? 'logged-in' : 'logged-out'}</span>
      <button onClick={toggleAuth}>toggle</button>
    </div>
  )
}

describe('AuthContext', () => {
  it('starts logged out', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    expect(screen.getByTestId('state')).toHaveTextContent('logged-out')
  })

  it('toggles to logged in', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('state')).toHaveTextContent('logged-in')
  })

  it('toggles back to logged out', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('state')).toHaveTextContent('logged-out')
  })
})
