import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DetailPage } from '../../pages/DetailPage/DetailPage'
import { getById } from '../../services/productsService'
import { useShoppingBag } from '../../context/useShoppingBag'
import type { ProductDetail } from '../../types/ProductDetail'

// Mock API productsService
vi.mock('../../services/productsService', () => ({
  getById: vi.fn(),
}))

// Mock useShoppingBag context hook
vi.mock('../../context/useShoppingBag', () => ({
  useShoppingBag: vi.fn(),
}))

// Product Data used by the tests
const productDetail: ProductDetail = {
  id: 'product-1',
  brand: 'Apple',
  name: 'iPhone Test',
  description: 'Test phone',
  basePrice: 999,
  rating: 4.5,
  imageUrl: 'https://example.com/default.png',
  specs: {
    screen: '6.1"',
    resolution: '2532x1170',
    processor: 'A17',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3000mAh',
    os: 'iOS',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.png' },
    { name: 'Silver', hexCode: '#CCCCCC', imageUrl: 'https://example.com/silver.png' },
  ],
  storageOptions: [
    { capacity: '128 GB', price: 899 },
    { capacity: '256 GB', price: 999 },
  ],
  similarProducts: [],
}

describe('DetailPage unit logic', () => {
  const addItemSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getById).mockResolvedValue(productDetail)
    vi.mocked(useShoppingBag).mockReturnValue({
      addItem: addItemSpy,
      items: [],
      itemCount: 0,
      totalPrice: 0,
      removeItem: vi.fn(),
      clearBag: vi.fn(),
    })
  })

  const renderPage = () => {
    return render(
      <MemoryRouter
        initialEntries={['/phone/product-1']}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/phone/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  
  it('returns the correct price when changing storage', async () => {    
    renderPage()

    // Verify initial lowest price is shown (From 899 EUR)
    await screen.findByRole('heading', { name: 'iPhone Test' })
    expect(screen.getByText('From 899 EUR')).toBeInTheDocument()

    // When selecting larger storage --> verify displayed price updates
    fireEvent.click(screen.getByRole('button', { name: '256 GB' }))
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
  })

  // ADD button stays disabled if color or storage is missing
  it('does not allow adding to cart if color or storage is missing', async () => {
    renderPage()

    await screen.findByRole('heading', { name: 'iPhone Test' })

    const addButton = screen.getByRole('button', { name: 'ADD' })
    expect(addButton).toBeDisabled()

    // Clicking a disabled button should not trigger addItem.
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(addItemSpy).not.toHaveBeenCalled()
    })
  })
})