import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import api from '../../api/axios'
import SearchJobs from './SearchJobs'

vi.mock('../../api/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('SearchJobs', () => {
  it('clears the search and restores all jobs', async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: [
          { _id: '1', description: 'Frontend developer', location: 'Remote', createdAt: '2026-10-14T00:00:00.000Z' },
          { _id: '2', description: 'Backend developer', location: 'Boston', createdAt: '2026-10-14T00:00:00.000Z' },
        ],
      },
    })

    render(<SearchJobs />)

    const searchInput = await screen.findByPlaceholderText('search by job or location...')
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)

    fireEvent.change(searchInput, { target: { value: 'frontend' } })
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(searchInput).toHaveValue('')
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)
    })
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
  })

  it('filters jobs by location', async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: [
          { _id: '1', description: 'Frontend developer', location: 'Remote', createdAt: '2026-10-14T00:00:00.000Z' },
          { _id: '2', description: 'Backend developer', location: 'Boston', createdAt: '2026-10-14T00:00:00.000Z' },
        ],
      },
    })

    render(<SearchJobs />)

    const searchInput = await screen.findByPlaceholderText('search by job or location...')
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)
    })
    fireEvent.change(searchInput, { target: { value: 'boston' } })

    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1)
      expect(screen.getByRole('heading', { name: 'Backend developer' })).toBeInTheDocument()
    })
  })
})
