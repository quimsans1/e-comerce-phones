import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from '../../../App'
import { getAll, getById } from '../../../services/productsService'

// This file tests the Detail page interactions:
// - color selection updates phone image
// - storage selection updates displayed price
// - ADD button stays disabled until required selections are complete
// - adding to cart updates the global header cart quantity

// Mock product services
vi.mock('../../../services/productsService', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
}))

const productDetail = {
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

describe('Detail View integration (happy path)', () => {
  beforeEach(() => { // Reset
    vi.clearAllMocks()
    window.localStorage.clear()
    window.history.pushState({}, '', '/phone/product-1')
    vi.mocked(getAll).mockResolvedValue([])
    vi.mocked(getById).mockResolvedValue(productDetail)
  })

  it('changing color updates the image', async () => {
    render(<App />)

    const image = await screen.findByRole('img', { name: 'iPhone Test - Apple' })
    expect(image).toHaveAttribute('src', 'https://example.com/black.png')

    fireEvent.click(screen.getByRole('button', { name: 'Silver' }))

    // Phone image --> should change to selected color image.
    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'https://example.com/silver.png')
    })
  })

  it('changing storage updates the price', async () => {
    // Price is lowest storage value and starts with "From".
    render(<App />)

    expect(await screen.findByText('From 899 EUR')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '256 GB' }))

    // Selecting a storage option --> updates displayed price.
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
  })

  it('button is disabled until selection is complete', async () => {
    // ADD remains disabled until both storage and color are selected.
    render(<App />)

    const addButton = await screen.findByRole('button', { name: 'ADD' })
    expect(addButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: '128 GB' }))
    expect(addButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Black' }))
    expect(addButton).toBeEnabled()
  })

  it('adding to cart updates the global cart icon', async () => {
    render(<App />)
    // Adds product to shopping bag --> verifies shopping bag count updates.
    const addButton = await screen.findByRole('button', { name: 'ADD' })
    fireEvent.click(screen.getByRole('button', { name: '128 GB' }))
    fireEvent.click(screen.getByRole('button', { name: 'Black' }))
    fireEvent.click(addButton)

    // hidden accessibility Shopping bag text should reflect one item in shopping bag.
    await waitFor(() => {
      expect(screen.getByText('1 products in the shopping bag')).toBeInTheDocument()
    })
  })
})
