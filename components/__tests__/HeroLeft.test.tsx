import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeroLeft from '../HeroLeft'

describe('HeroLeft', () => {
  it('renders the two headline lines', () => {
    render(<HeroLeft />)
    expect(screen.getByText('Your Beauty,')).toBeInTheDocument()
    expect(screen.getByText('Guided')).toBeInTheDocument()
  })

  it('renders "Perfectly" with mint italic styling', () => {
    render(<HeroLeft />)
    const el = screen.getByText('Perfectly')
    expect(el).toHaveClass('text-mint')
    expect(el).toHaveClass('italic')
    expect(el).toHaveClass('font-bold')
  })

  it('renders the subheadline', () => {
    render(<HeroLeft />)
    expect(screen.getByText(/Personalized beauty guidance/i)).toBeInTheDocument()
  })

  it('renders all 4 trust badges', () => {
    render(<HeroLeft />)
    ;[
      'Personalized Beauty Advice',
      'Expert Guides',
      'Trusted Recommendations',
      'Confidence That Shows',
    ].forEach((badge) => expect(screen.getByText(badge)).toBeInTheDocument())
  })

  it('renders both CTA buttons', () => {
    render(<HeroLeft />)
    expect(screen.getByRole('button', { name: /book a consultation/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /watch our video/i })).toBeInTheDocument()
  })
})
