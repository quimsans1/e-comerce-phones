import type { Product } from '../../services/productsService'
import './ProductsGrid.scss'
import { ProductCard } from '../ProductCard/ProductCard'

type Props = {
  products: Product[]
  /** maximum number of items to render; undefined for no limit */
  maxItems?: number
}

export const ProductsGrid = ({ products, maxItems }: Props) => {
  const items = typeof maxItems === 'number' ? products.slice(0, maxItems) : products
  return (
    <div className="phones-grid" aria-label="Listado de teléfonos">
      {items.map((phone) => (
        <ProductCard key={phone.id} product={phone} />
      ))}
    </div>
  )
}

export default ProductsGrid
