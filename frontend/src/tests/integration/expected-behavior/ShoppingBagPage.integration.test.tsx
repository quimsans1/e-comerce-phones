import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ShoppingBagProvider } from '../../../context/ShoppingBagContext'
import { ShoppingBagPage } from '../../../pages/ShoppingBagPage/ShoppingBagPage'

// This file tests the shopping bag page interactions:
// - shopping bag products render in the DOM
// - removing a product updates the rendered list
// - cart total recalculates after item removal

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

describe('Shopping Bag View integration (happy path)', () => {
  beforeEach(() => { // Add shopping bag in local storage before testing so page has data to render.
    window.localStorage.setItem('shopping-bag-items', JSON.stringify(shoppingBagItems))
  })

  // Render shopping bag page with provider + router dependencies.
  const renderShoppingBag = () => {
    return render(
      <ShoppingBagProvider>
        <MemoryRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ShoppingBagPage />
        </MemoryRouter>
      </ShoppingBagProvider>,
    )
  }

  it('renders added products', () => {
    // Both products should be visible in the shopping bag list.
    renderShoppingBag()
    expect(screen.getByText('Phone 1')).toBeInTheDocument()
    expect(screen.getByText('Phone 2')).toBeInTheDocument()
  })

  it('removing a product removes it from the DOM and total is recalculated correctly', async () => {
    const { container } = renderShoppingBag()

    const totalElement = container.querySelector('.shopping-bag-total') // TOTAL Element
    expect(totalElement).not.toBeNull()
    expect(totalElement).toHaveTextContent('800 EUR')

    // Remove first item --> verify DOM + total update.
    fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0])

    // Hidden accessibility text should reflect one item left in shopping bag
    await waitFor(() => {
      expect(screen.queryByText('Phone 1')).not.toBeInTheDocument()
      expect(totalElement).toHaveTextContent('500 EUR')
    })
  })
})
