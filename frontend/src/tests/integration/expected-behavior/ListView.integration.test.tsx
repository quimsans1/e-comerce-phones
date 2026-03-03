import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ListPage } from '../../../pages/ListPage/ListPage'
import { App } from '../../../App'
import { getAll } from '../../../services/productsService'

// This file tests the List Page interactions:
// - renders up to 20 products
// - shows loading state while request is pending
// - applies search and updates results counter
// - reflects shopping bag quantity in the global header icon

// Mock endpoints
vi.mock('../../../services/productsService', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
}))

// Helper to generate a list of products for testing
const createProducts = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `phone-${index}`,
    name: `Phone ${index}`,
    brand: 'Brand',
    basePrice: 100 + index,
    imageUrl: `https://example.com/${index}.png`,
  }))
}

const renderListPage = () => {
  return render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ListPage />
    </MemoryRouter>,
  )
}

describe('Listing View integration (happy path)', () => {
  beforeEach(() => {
    // Reset mocks/storage and ensure route is list page.
    vi.clearAllMocks()
    window.localStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('renders 20 phones', async () => {
    // API returns more than max; UI must cap at 20 rendered cards.
    vi.mocked(getAll).mockResolvedValue(createProducts(25))

    const { container } = renderListPage()

    await waitFor(() => {
      expect(container.querySelectorAll('.product-card')).toHaveLength(20)
    })
  })

  it('shows a loader while loading', async () => {
    // Keep request pending to validate loading state visibility.
    vi.mocked(getAll).mockImplementation(
      () => new Promise(() => {}) as ReturnType<typeof getAll>,
    )

    renderListPage()

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('search bar filters correctly and results counter updates', async () => {
    // First call loads full list; second call simulates filtered result.
    vi.mocked(getAll)
      .mockResolvedValueOnce(createProducts(25))
      .mockResolvedValueOnce(createProducts(3))

    renderListPage()

    expect(await screen.findByText('20 RESULTS')).toBeInTheDocument()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search for a smartphone' }), {
      target: { value: 'iphone' },
    })

    // Verify search term is sent and results indicator changes.
    await waitFor(() => {
      expect(getAll).toHaveBeenLastCalledWith('iphone')
    })

    expect(await screen.findByText('3 RESULTS')).toBeInTheDocument()
  })

  it('shopping bag icon shows the correct quantity', async () => {
    const shoppingBagItems = [
      {
        id: 'item-1',
        productId: 'phone-1',
        name: 'Phone 1',
        brand: 'Brand',
        imageUrl: 'https://example.com/1.png',
        selectedColorName: 'Black',
        selectedColorHexCode: '#000000',
        selectedStorageCapacity: '128 GB',
        selectedStoragePrice: 300,
      },
      {
        id: 'item-2',
        productId: 'phone-2',
        name: 'Phone 2',
        brand: 'Brand',
        imageUrl: 'https://example.com/2.png',
        selectedColorName: 'White',
        selectedColorHexCode: '#FFFFFF',
        selectedStorageCapacity: '256 GB',
        selectedStoragePrice: 500,
      },
    ]

    // Shopping bag items in local storage
    window.localStorage.setItem('shopping-bag-items', JSON.stringify(shoppingBagItems))
    vi.mocked(getAll).mockResolvedValue([])

    render(<App />) // Header should reflect 2 items in shopping bag

    // Hidden accessibility text in header reflects shopping bag quantity
    await waitFor(() => {
      expect(screen.getByText('2 products in the shopping bag')).toBeInTheDocument()
    })
  })
})
