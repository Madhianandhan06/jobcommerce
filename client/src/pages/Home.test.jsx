import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('shows the dashboard welcome section and primary actions', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /find jobs/i })).toHaveAttribute('href', '/home/search-jobs')
    expect(screen.getByRole('link', { name: /post a job/i })).toHaveAttribute('href', '/home/post-jobs')
  })
})
