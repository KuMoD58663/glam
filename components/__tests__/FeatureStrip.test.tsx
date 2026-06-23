import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FeatureStrip from '../FeatureStrip'

describe('FeatureStrip', () => {
  it('renders all 4 feature titles', () => {
    render(<FeatureStrip />)
    ;['Tailored for You', 'Expert Guidance', 'Curated Just for You', 'Real Results'].forEach(
      (title) => expect(screen.getByText(title)).toBeInTheDocument()
    )
  })

  it('renders all 4 feature descriptions', () => {
    render(<FeatureStrip />)
    expect(screen.getByText(/unique needs/i)).toBeInTheDocument()
    expect(screen.getByText(/beauty professionals/i)).toBeInTheDocument()
    expect(screen.getByText(/routines that work/i)).toBeInTheDocument()
    expect(screen.getByText(/confident, beautiful/i)).toBeInTheDocument()
  })
})
