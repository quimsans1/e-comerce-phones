import './ProductsGrid.scss'
import type { Product } from '../../types/Product'
import { ProductCard } from '../ProductCard/ProductCard'

interface ProductsGridProps {
  products: Product[]
  maxItems?: number
}

export const ProductsGrid = ({ products, maxItems }: ProductsGridProps) => {
  const items = typeof maxItems === 'number' ? products.slice(0, maxItems) : products
  return (
    <div className="phones-grid" aria-label="Listado de teléfonos">
      {items.map((phone, index) => (
        <ProductCard key={`${phone.id}-${index}`} product={phone} />
      ))}
    </div>
  )
}
