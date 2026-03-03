import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ShoppingBagProvider } from '../../context/ShoppingBagContext'
import { useShoppingBag } from '../../context/useShoppingBag'

// ShoppingBagContext behavior:
// - initial state starts with 0 items and 0 total
// - adding two products updates item count and total price
// - removing one product updates item count and recalculates total

// Consumer to trigger actions and display context values when adding or removing items
const TestConsumer = () => {
  const { items, totalPrice, addItem, removeItem } = useShoppingBag()

  return (
    <div>
      <span data-testid="items-count">{items.length}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <button
        onClick={() =>
          addItem({
            productId: 'phone-1',
            name: 'Phone 1',
            brand: 'Brand',
            imageUrl: 'https://example.com/phone-1.png',
            selectedColorName: 'Black',
            selectedColorHexCode: '#000000',
            selectedStorageCapacity: '128 GB',
            selectedStoragePrice: 300,
          })
        }
      >
        Add First
      </button>
      <button
        onClick={() =>
          addItem({
            productId: 'phone-2',
            name: 'Phone 2',
            brand: 'Brand',
            imageUrl: 'https://example.com/phone-2.png',
            selectedColorName: 'White',
            selectedColorHexCode: '#FFFFFF',
            selectedStorageCapacity: '256 GB',
            selectedStoragePrice: 500,
          })
        }
      >
        Add Second
      </button>
      <button onClick={() => items[0] && removeItem(items[0].id)}>Remove First Item</button>
    </div>
  )
}

describe('ShoppingBagContext unit logic', () => {
  beforeEach(() => { // Clean state before tests
    window.localStorage.clear()
  })
  
  it('cart total adds up correctly and removing a product updates state', () => {
    // Render provider + test consumer
    render(
      <ShoppingBagProvider>
        <TestConsumer />
      </ShoppingBagProvider>,
    )

    // Initial state --> should be empty shopping bag and total is zero
    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')

    // Add two items --> and verify count + total
    fireEvent.click(screen.getByRole('button', { name: 'Add First' }))
    fireEvent.click(screen.getByRole('button', { name: 'Add Second' }))

    expect(screen.getByTestId('items-count')).toHaveTextContent('2')
    expect(screen.getByTestId('total-price')).toHaveTextContent('800')

    // Remove one item --> verify state updates correctly
    fireEvent.click(screen.getByRole('button', { name: 'Remove First Item' }))

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total-price')).toHaveTextContent('500')
  })
})