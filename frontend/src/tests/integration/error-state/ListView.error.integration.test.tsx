import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ListPage } from '../../../pages/ListPage/ListPage'
import { getAll } from '../../../services/productsService'

// Mock products service endpoints
vi.mock('../../../services/productsService', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
}))

describe('Listing Page integration (error state)', () => {
  beforeEach(() => { // Reset
    vi.clearAllMocks()
  })

  it('shows an error if the API fails', async () => {
    // Force the list API request to fail.
    vi.mocked(getAll).mockRejectedValue(new Error('network error'))

    // Render page under router context because child components use links.
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ListPage />
      </MemoryRouter>,
    )

    // The page should render an alert with the error message.
    expect(await screen.findByRole('alert')).toHaveTextContent('network error')
  })
})