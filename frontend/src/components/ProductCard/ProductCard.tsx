import { Link } from 'react-router-dom'
import type { Product } from '../../services/productsService'
import './ProductCard.scss'

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <article className="product-card">
      <Link to={`/phone/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img
            src={product.imageUrl}
            alt={`${product.name} - ${product.brand}`}
            className="product-card-image"
            loading="lazy"
          />
        </div>
        <div className="product-card-info">
          <div>
            <p className="product-card-brand">{product.brand}</p>
            <h2 className="product-card-title">{product.name}</h2>
          </div>
          <p className="product-card-price">
            {product.basePrice} EUR
          </p>
        </div>
      </Link>
    </article>
  )
}
