import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import LoadingOverlay from './LoadingOverlay'

afterEach(cleanup)

describe('LoadingOverlay', () => {
  it('blurs its content and announces loading while active', () => {
    render(
      <LoadingOverlay isLoading label='Loading jobs...'>
        <p>Job results</p>
      </LoadingOverlay>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Loading jobs...')
    expect(screen.getByText('Job results').parentElement).toHaveClass('blur-sm')
    expect(screen.getByText('Job results').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders content without a loading overlay when inactive', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <p>Job results</p>
      </LoadingOverlay>
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByText('Job results').parentElement).not.toHaveClass('blur-sm')
  })
})
