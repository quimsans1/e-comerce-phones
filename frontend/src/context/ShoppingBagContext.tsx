import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ShoppingBagContext,
  type ShoppingBagContextValue,
  type ShoppingBagItem,
} from './ShoppingBagContextInstance'

const SHOPPING_BAG_STORAGE_KEY = 'shopping-bag-items'

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

  const addItem: ShoppingBagContextValue['addItem'] = (item) => {
    const nextItem: ShoppingBagItem = {
      ...item,
      id: `${item.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }

    setItems((prev) => {
      const next = [...prev, nextItem]
      window.localStorage.setItem(SHOPPING_BAG_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const removeItem: ShoppingBagContextValue['removeItem'] = (itemId) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== itemId)
      window.localStorage.setItem(SHOPPING_BAG_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const clearBag: ShoppingBagContextValue['clearBag'] = () => {
    setItems(() => {
      window.localStorage.setItem(SHOPPING_BAG_STORAGE_KEY, JSON.stringify([]))
      return []
    })
  }

  const value = useMemo<ShoppingBagContextValue>(
    () => ({
      items,
      itemCount: items.length,
      addItem,
      removeItem,
      clearBag,
    }),
    [items],
  )

  return (
    <ShoppingBagContext.Provider value={value}>
      {children}
    </ShoppingBagContext.Provider>
  )
}
