import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeroRight from '../HeroRight'

describe('HeroRight', () => {
  it('renders the model photo', () => {
    render(<HeroRight />)
    expect(
      screen.getByRole('img', { name: /beauty consultation/i })
    ).toBeInTheDocument()
  })
})
