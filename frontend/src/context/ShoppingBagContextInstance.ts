import { createContext } from 'react'
import type { ShoppingBagContextValue } from '../types/ShoppingBagContextValue'

export const ShoppingBagContext = createContext<ShoppingBagContextValue | null>(null)
