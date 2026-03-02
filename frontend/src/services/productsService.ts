import type { ProductDetail } from '../types/ProductDetail'
import type { Product } from '../types/Product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY ?? '87909682e6cd74208f41a6ef39fe4191'

if (!API_BASE_URL) {
  console.warn(
    'VITE_API_BASE_URL no está configurado. Configúralo en tu archivo .env para poder llamar a la API de productos.'
  )
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error('Falta configurar VITE_API_BASE_URL')
  }

  const headers: HeadersInit = {
    ...(init?.headers ?? {}),
    'x-api-key': API_KEY,
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error('Error al llamar a la API de productos')
  }

  return (await response.json()) as T
}

export const getAll = async (
  search?: string
): Promise<Product[]> => {
  const params = new URLSearchParams()
  if (search && search.trim()) {
    params.set('search', search.trim())
  }

  const query = params.toString()
  const path = query ? `/products?${query}` : '/products'

  const data = await request<Product[]>(path)
  return data
}

export const getById = async (id: string): Promise<ProductDetail> => {
  if (!id) {
    throw new Error('El id del producto es obligatorio')
  }

  const data = await request<ProductDetail>(`/products/${encodeURIComponent(id)}`)
  return data
}

