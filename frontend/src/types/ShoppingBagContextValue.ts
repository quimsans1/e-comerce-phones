import type { ShoppingBagItem } from './ShoppingBagItem'

export interface ShoppingBagContextValue {
  items: ShoppingBagItem[]
  itemCount: number
  totalPrice: number
  addItem: (item: Omit<ShoppingBagItem, 'id'>) => void
  removeItem: (itemId: string) => void
  clearBag: () => void
}