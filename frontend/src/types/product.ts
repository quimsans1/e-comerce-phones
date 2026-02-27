export interface Product {
  id: string
  name: string
  brand: string
  basePrice: number
  imageUrl: string
  [key: string]: unknown
}
