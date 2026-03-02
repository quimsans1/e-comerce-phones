import { createContext } from 'react'

export interface ShoppingBagItem {
  id: string
  productId: string
  name: string
  brand: string
  imageUrl: string
  selectedColorName: string
  selectedColorHexCode: string
  selectedStorageCapacity: string
  selectedStoragePrice: number
}

export interface ShoppingBagContextValue {
  items: ShoppingBagItem[]
  itemCount: number
  totalPrice: number
  addItem: (item: Omit<ShoppingBagItem, 'id'>) => void
  removeItem: (itemId: string) => void
  clearBag: () => void
}

export const ShoppingBagContext = createContext<ShoppingBagContextValue | null>(null)
