import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ShoppingBagContext } from './ShoppingBagContextInstance'
import type { ShoppingBagContextValue } from '../types/ShoppingBagContextValue'
import type { ShoppingBagItem } from '../types/ShoppingBagItem'

const SHOPPING_BAG_STORAGE_KEY = 'shopping-bag-items'

const createItemId = (productId: string) => {
  return `${productId}-${uuidv4()}`
}

const getInitialItems = (): ShoppingBagItem[] => {
  if (typeof window === 'undefined') return []

  const raw = window.localStorage.getItem(SHOPPING_BAG_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const ShoppingBagProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ShoppingBagItem[]>(getInitialItems)
  const totalPrice = items.reduce((sum, item) => sum + item.selectedStoragePrice, 0)

  useEffect(() => {
    window.localStorage.setItem(SHOPPING_BAG_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem: ShoppingBagContextValue['addItem'] = (item) => {
    const nextItem: ShoppingBagItem = {
      ...item,
      id: createItemId(item.productId),
    }
    setItems((prev) => [...prev, nextItem])
  }

  const removeItem: ShoppingBagContextValue['removeItem'] = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const clearBag: ShoppingBagContextValue['clearBag'] = () => {
    setItems([])
  }

  const value = useMemo<ShoppingBagContextValue>(
    () => ({
      items,
      itemCount: items.length,
      totalPrice,
      addItem,
      removeItem,
      clearBag,
    }),
    [items, totalPrice],
  )

  return (
    <ShoppingBagContext.Provider value={value}>
      {children}
    </ShoppingBagContext.Provider>
  )
}
