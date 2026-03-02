import type { Product } from './Product'

interface ProductSpecs {
  screen: string
  resolution: string
  processor: string
  mainCamera: string
  selfieCamera: string
  battery: string
  os: string
  screenRefreshRate: string
}

interface ProductColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

interface ProductStorageOption {
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
