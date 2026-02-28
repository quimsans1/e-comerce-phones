import { useContext } from 'react'
import { ShoppingBagContext } from './ShoppingBagContextInstance'

export const useShoppingBag = () => {
  const context = useContext(ShoppingBagContext)
  if (!context) {
    throw new Error('useShoppingBag must be used within ShoppingBagProvider')
  }

  return context
}
