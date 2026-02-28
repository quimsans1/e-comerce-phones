import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import './ProductCard.scss'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <Link to={`/phone/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img
            src={product.imageUrl}
            alt={`${product.name} - ${product.brand}`}
            className="product-card-image"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="product-card-info">
          <div>
            <p className="product-card-brand">{product.brand}</p>
            <p className="product-card-title">{product.name}</p>
          </div>
          <p className="product-card-price">
            {product.basePrice} EUR
          </p>
        </div>
      </Link>
    </article>
  )
}
