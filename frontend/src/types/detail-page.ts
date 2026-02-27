import type { Product } from './product'

export interface OptionValue {
  id: string
  label: string
  imageUrl?: string
  hexCode?: string
  price?: number
}

export interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

export interface ProductColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

export interface ProductStorageOption {
  capacity: string
  price: number
}

export interface ProductDetail {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  imageUrl?: string
  specs: ProductSpecs
  colorOptions: ProductColorOption[]
  storageOptions: ProductStorageOption[]
  similarProducts: Product[]
}
