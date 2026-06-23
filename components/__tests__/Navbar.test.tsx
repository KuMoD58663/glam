import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the GlamGuider logo', () => {
    render(<Navbar />)
    expect(screen.getByAltText('GlamGuider')).toBeInTheDocument()
  })

  it('renders all six nav links', () => {
    render(<Navbar />)
    ;['Home', 'About Us', 'Services', 'Guides', 'Beauty Resources', 'Contact Us'].forEach(
      (label) => expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    )
  })

  it('renders the Book a Consultation CTA button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /book a consultation/i })).toBeInTheDocument()
  })
})
