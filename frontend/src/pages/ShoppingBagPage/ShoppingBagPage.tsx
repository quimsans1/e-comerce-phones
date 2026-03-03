import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { useShoppingBag } from '../../context/useShoppingBag'
import { formatPriceEur } from '../../utils/formatPriceEur'
import './ShoppingBagPage.scss'

export const ShoppingBagPage = () => {
  const navigate = useNavigate()
  const { items, removeItem, totalPrice } = useShoppingBag()

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
                <span className="shopping-bag-item-price">{formatPriceEur(item.selectedStoragePrice)}</span>

                <button
                  type="button"
                  className="shopping-bag-remove-btn"
                  // Accessibility: on delete include product's name in aria-label for clarity for screen reader users
                  aria-label={`Delete ${item.name} from shopping bag`}
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
        <Button
          className="shopping-bag-btn shopping-bag-continue-link"
          type="white"
          onClick={() => navigate('/')}
        >
          CONTINUE SHOPPING
        </Button>

        <div className="shopping-bag-checkout">
          {/* Accessibility: announce total of items after shopping bag changes for screen readers */}
          <span className="shopping-bag-total" role="status" aria-live="polite">
            <span>TOTAL</span>
            <span>{formatPriceEur(totalPrice)}</span>
          </span>
          <Button className="shopping-bag-btn" id="shopping-bag-pay-btn" disabled={items.length === 0}>PAY</Button>
        </div>
      </div>
    </section>
  )
}
