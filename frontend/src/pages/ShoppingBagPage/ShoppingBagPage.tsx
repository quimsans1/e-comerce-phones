import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { useShoppingBag } from '../../context/useShoppingBag'
import './ShoppingBagPage.scss'

export const ShoppingBagPage = () => {
  const { items, removeItem } = useShoppingBag()
  const totalPrice = items.reduce((sum, item) => sum + item.selectedStoragePrice, 0)

  return (
    <section className="shopping-bag-page" aria-labelledby="shopping-bag-title">
      <h1 id="shopping-bag-title" className="shopping-bag-title">CART ({items.length})</h1>

      {items.length > 0 && (
        <div className="shopping-bag-list">
          {items.map((item) => (
            <article key={item.id} className="shopping-bag-item">
              <img
                src={item.imageUrl}
                alt={`${item.name} - ${item.brand}`}
                className="shopping-bag-item-image"
              />

              <div className="shopping-bag-item-content">
                <span className="shopping-bag-item-name">{item.name}</span>
                <span className="shopping-bag-item-config">
                  {item.selectedStorageCapacity} | {item.selectedColorName}
                </span>
                <span className="shopping-bag-item-price">{item.selectedStoragePrice} EUR</span>

                <button
                  type="button"
                  className="shopping-bag-remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="shopping-bag-actions" aria-label="shopping bag actions">
        <Link to="/" className="shopping-bag-continue-link">
          <Button className="shopping-bag-btn" type="white">CONTINUE SHOPPING</Button>
        </Link>

        <div className="shopping-bag-checkout">
          <span className="shopping-bag-total">
            <span>TOTAL</span>
            <span>{totalPrice} EUR</span>
          </span>
          <Button className="shopping-bag-btn" id="shopping-bag-pay-btn" disabled={items.length === 0}>PAY</Button>
        </div>
      </div>
    </section>
  )
}
