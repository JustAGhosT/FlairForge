import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../src/test/utils'
import Header from '../../../src/components/Header/Header'

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />)
    const logo = screen.getByAltText(/flairforge logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/templates/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })

  it('has correct navigation structure', () => {
    render(<Header />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4) // Logo + 3 nav links
  })

  it('applies correct CSS classes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('header')
  })
}) 