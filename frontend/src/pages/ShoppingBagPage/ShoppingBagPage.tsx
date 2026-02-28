import { Link } from 'react-router-dom'
import { useShoppingBag } from '../../context/useShoppingBag'
import './ShoppingBagPage.scss'

export const ShoppingBagPage = () => {
  const { items, removeItem } = useShoppingBag()

  return (
    <section className="shopping-bag-page" aria-labelledby="shopping-bag-title">
      <h1 id="shopping-bag-title" className="shopping-bag-title">SHOPPING BAG</h1>

      {items.length === 0 ? (
        <div className="shopping-bag-empty">
          <p>Your shopping bag is empty.</p>
          <Link to="/">Go to products</Link>
        </div>
      ) : (
        <div className="shopping-bag-list">
          {items.map((item) => (
            <article key={item.id} className="shopping-bag-item">
              <img
                src={item.imageUrl}
                alt={`${item.name} - ${item.brand}`}
                className="shopping-bag-item-image"
              />

              <div className="shopping-bag-item-content">
                <h2 className="shopping-bag-item-name">{item.name}</h2>
                <p className="shopping-bag-item-config">
                  {item.selectedStorageCapacity} | {item.selectedColorName}
                </p>
                <p className="shopping-bag-item-price">{item.selectedStoragePrice} EUR</p>

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
    </section>
  )
}

export default ShoppingBagPage
