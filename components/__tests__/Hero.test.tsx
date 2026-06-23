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
