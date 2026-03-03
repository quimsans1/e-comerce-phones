import type { ProductDetail } from '../types/ProductDetail'
import type { Product } from '../types/Product'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!API_URL) throw new Error('VITE_API_URL not configured in your .env file.')
  if (!API_KEY) throw new Error('VITE_API_KEY not configured in your .env file.')

  const headers = new Headers(init?.headers)
  headers.set('x-api-key', API_KEY)

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) throw new Error('Error calling the API')

  return response.json() as Promise<T>
}

export const getAll = async (search?: string): Promise<Product[]> => {
  const query = search
    ? `?search=${encodeURIComponent(search)}`
    : ''

  return request<Product[]>(`/products${query}`)
}

export const getById = async (id: string): Promise<ProductDetail> => {
  if (!id) throw new Error('Product ID is required')

  return request<ProductDetail>(`/products/${encodeURIComponent(id)}`)
}

